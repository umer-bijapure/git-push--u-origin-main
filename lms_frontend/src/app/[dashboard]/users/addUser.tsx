import { CommonFormPasswordInput, CommonFormTextInput } from '@/app/components/common/inputs';
import { CommonCreateEditSlideover } from '@/app/components/common/slideovers';
import React,{ FC, useState } from 'react';

interface AddUserProps {
  onClose: () => void;
  loading: boolean;
  

}

const AddUser: FC<AddUserProps> = ({ onClose, loading }) => {
  const [errorText, setErrorText] = React.useState('');
  const [showError, setShowError] = React.useState(false); // Processing state
  const [successText, setSuccessText] = React.useState('');
  const [showSuccess, setShowSuccess] = React.useState(false); // Processing state

 
  const [progress, setProgress] = useState<number>(0); // Progress state
  const [isProcessing, setIsProcessing] = useState<boolean>(false); // Processing state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNo: '',
    institution: '',
    state: '',
    city: '',
    stream: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowError(false)
    setShowSuccess(false)
    try {
      const response = await fetch('http://localhost:5116/api/Users/create-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const errorData = await response.json();
      
      if (response.ok) {
        setShowSuccess(true);
        setSuccessText(errorData.message);
      } else {
        const errorMessage = errorData[""]?.[0] || errorData.message;
        setErrorText(errorMessage)
        setShowError(true)
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <CommonCreateEditSlideover
      title="Create New User"
      description="Create a new user in the system, bypassing the registration process."
      handleSubmit={handleSubmit}
      onClose={onClose}
      loading={loading}
      showError={showError}
      errorText={errorText}
      showSuccess={showSuccess}
      successtext={successText}
    >
      <div className="col-span-6 sm:col-span-3">
        <CommonFormTextInput id="firstName" title="First name" required={true} onChange={handleChange} />
      </div>
      <div className="col-span-6 sm:col-span-3">
        <CommonFormTextInput id="lastName" title="Last name" required={true} onChange={handleChange} />
      </div>
      <div className="col-span-6 sm:col-span-3">
        <CommonFormTextInput id="email" title="Email" required={true} onChange={handleChange} />
      </div>
      <div className="col-span-6 sm:col-span-3">
        <CommonFormTextInput id="phoneNo" title="Telephone Number" required={true} onChange={handleChange} />
      </div>
      <div className="col-span-6 sm:col-span-3">
        <CommonFormTextInput id="institution" title="Institute" onChange={handleChange} />
      </div>
      <div className="col-span-6 sm:col-span-3">
        <CommonFormTextInput id="state" title="State" onChange={handleChange} />
      </div>
      <div className="col-span-6 sm:col-span-3">
        <CommonFormTextInput id="city" title="City" onChange={handleChange} />
      </div>
      <div className="col-span-6 sm:col-span-3">
        <CommonFormTextInput id="stream" title="Stream/Branch" onChange={handleChange} />
      </div>
      <div className="col-span-6">
        <CommonFormPasswordInput id="password" title="Password" required={true} onChange={handleChange} />
      </div>
      {/* Add other form fields as necessary */}
    </CommonCreateEditSlideover>
  );
};

export default AddUser;
