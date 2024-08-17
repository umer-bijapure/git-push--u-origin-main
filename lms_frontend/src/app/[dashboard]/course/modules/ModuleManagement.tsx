import { CommonFormTextInput } from '@/app/components/common/inputs';
import { CommonCreateEditSlideover } from '@/app/components/common/slideovers';
import React, { useState } from 'react';

const AddModule: React.FC<{ onClose: () => void; loading: boolean; showError: boolean; errorText: string }> = ({
  onClose,
  loading,
  showError,
  errorText,
}) => {
  const [moduleTitle, setModuleTitle] = useState('');
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setPdfFile(event.target.files[0]);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Implement the submit logic, including uploading the PDF file
    const formData = new FormData();
    formData.append('title', moduleTitle);
    if (pdfFile) {
      formData.append('pdfFile', pdfFile);
    }

    // Example: Sending data to the backend (adjust the endpoint as needed)
    fetch('http://localhost:5116/api/module/create-module', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        // Handle success
        onClose();
      })
      .catch(error => {
        // Handle error
        console.error('Error:', error);
      });
  };

  return (
    <CommonCreateEditSlideover
      title="Create Module"
      description="Provide details to create a new module."
      handleSubmit={handleSubmit}
      onClose={onClose}
      loading={loading}
      showError={showError}
      errorText={errorText}
    >
      <div className="col-span-6 sm:col-span-3">
       
        <CommonFormTextInput
          id="title"
          title="Module Title"
          required
          value={moduleTitle}
          onChange={(e) => setModuleTitle(e.target.value)}
        />
      </div>

      <div className="col-span-6 sm:col-span-3">
        <label htmlFor="ProfilePicture" className="block text-sm font-medium text-[color:var(--mainTitleLightColor)]">
          Profile Picture
        </label>
        <input
          
          id="pdflink"
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="mt-1 cursor-pointer block w-full text-sm text-[color:var(--textColor)]
          file:mr-4 file:py-2 file:px-4
          file:rounded-md file:border file:border-gray-300
          file:bg-gray-50 file:text-sm
          hover:file:bg-gray-100"
          required
        />
      </div>
    </CommonCreateEditSlideover>
  );
};

export default AddModule;
