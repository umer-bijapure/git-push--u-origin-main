import { CommonFormPasswordInput, CommonFormTextInput } from '@/app/components/common/inputs';
import { CommonCreateEditSlideover } from '@/app/components/common/slideovers';
import { FC, useState } from 'react';

interface AddUserProps {
  onClose: () => void;
  loading: boolean;
  
  showError: boolean;
  errorText: string;
}

const AddUser: FC<AddUserProps> = ({ onClose, loading, showError, errorText }) => {
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
    console.warn("JJJJJJJJJJJJJJJJJJJJJHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH")
    try {
      const response = await fetch('http://localhost:5116/api/Users/create-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        // Handle successful submission (e.g., show a success message, close the modal)
        onClose();
      } else {
        // Handle errors
        const data = await response.json();
        console.error(data);
        // Set error state or display error message
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle network or unexpected errors
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
