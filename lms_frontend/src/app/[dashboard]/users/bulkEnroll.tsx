import React, { useState } from 'react';
import { FC } from 'react';
import { usePapaParse } from 'react-papaparse';
import axios from 'axios';
import { CommonCreateEditSlideover } from '@/app/components/common/slideovers';

interface User {
  Email: string;
  FirstName: string;
  LastName: string;
  PhoneNo: string;
  Institution: string;
  State: string;
  City: string;
  Stream: string;
  Password: string;
}

interface BulkEnrollUsersProps {
  onClose: () => void;
  handleSubmit?: (data: any) => void;
  loading: boolean;
 
 
}

const BulkEnrollUsers: FC<BulkEnrollUsersProps> = ({ onClose, handleSubmit, loading}) => {
  const [file, setFile] = useState<File | null>(null);
  const [role, setRole] = useState<string>('');
  const [errorText, setErrorText] = React.useState('');
  const [showError, setShowError] = React.useState(false); // Processing state

  const [csvData, setCsvData] = useState<User[]>([]);
  const [progress, setProgress] = useState<number>(0); // Progress state
  const [isProcessing, setIsProcessing] = useState<boolean>(false); // Processing state
  

  const [duplicateUsers, setDuplicateUsers] = useState<{ usernames: string[]; emails: string[] }>({ usernames: [], emails: [] }); // State for duplicate users
  const { readString } = usePapaParse();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    
        
    setShowError(false)
    event.preventDefault();
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          readString(reader.result as string, {
            complete: (results) => {
              setCsvData(results.data as User[]);
            },
            header: true,
          });
        }
      };
      reader.readAsText(selectedFile);
    }
  };

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(event.target.value);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevents the default form submission behavior

    if (csvData.length === 0) {
      alert("No CSV data found.");
      return;
    }

    setIsProcessing(true);
    const totalRows = csvData.length;
    const duplicateUsersArray: { usernames: string[]; emails: string[] } = { usernames: [], emails: [] }; // Initialize duplicate users array

    for (let i = 0; i < totalRows; i++) {
      const user = csvData[i];

      const formData = {
        firstName: user.FirstName?.trim() || '',
        lastName: user.LastName?.trim() || '',
        email: user.Email?.trim() || '',
        phoneNo: user.PhoneNo?.trim() || '',
        institution: user.Institution?.trim() || '',
        state: user.State?.trim() || '',
        city: user.City?.trim() || '',
        stream: user.Stream?.trim() || '',
        password: user.Password?.trim() || `${user.FirstName}@Rubicon123`,
      };

      try {
        const response = await fetch('http://localhost:5116/api/Users/create-user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          if (response.status === 409 && errorData?.duplicates) {
            if (errorData.duplicates.duplicateUsernames) {
              duplicateUsersArray.usernames.push(errorData.duplicates.duplicateUsernames);
            }
            if (errorData.duplicates.duplicateEmails) {
              duplicateUsersArray.emails.push(errorData.duplicates.duplicateEmails);
            }
          } else {
            const errorMessage = errorData[""]?.[0] || "An unknown error occurred.";
            setErrorText(`Failed to create user at row ${i + 1}`+ errorMessage)
            setShowError(true)
          }
        }

        setProgress(((i + 1) / totalRows) * 100);
      } catch (error:any) {
        console.error('Error:', error);

        
      }
    }

    setDuplicateUsers(duplicateUsersArray); // Update state with duplicates
    setIsProcessing(false);
    // alert("Bulk user enrollment process completed.");
  };

  return (
    <CommonCreateEditSlideover
      title="Bulk Enroll Users"
      description="Upload a CSV file to bulk enroll users into the system."
      handleSubmit={handleFormSubmit}
      onClose={onClose}
      loading={loading}
      showError={showError}
      errorText={errorText}
     
    >
      <div className="col-span-6 sm:col-span-3">
        <label className="block text-sm font-medium text-gray-700">Select CSV File</label>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="mt-1 block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-md file:border file:border-gray-300
          file:bg-gray-50 file:text-sm
          hover:file:bg-gray-100"
        />
      </div>

      <div className="col-span-6 sm:col-span-3">
        <label className="block text-sm font-medium text-gray-700">User Role</label>
        <select
          value={role}
          onChange={handleRoleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
        >
          <option value="">Select Role</option>
          <option value="student">Student</option>
          <option value="trainer">Trainer</option>
          <option value="manager">Manager</option>
        </select>
      </div>

      {isProcessing && (
        <div className="col-span-6 mt-4">
          <h3 className="text-lg font-medium text-gray-900">Processing...</h3>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div className="bg-blue-600 h-4 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      )}

      {duplicateUsers.usernames.length > 0 || duplicateUsers.emails.length > 0 ? (
        <div className="col-span-6 mt-4">
          <h3 className="text-lg font-medium text-gray-900 bg-[color:var(--primaryPink)] p-1 text-white">Duplicate Users Found</h3>
          <div className='flex items-center gap-x-10 '>
          {duplicateUsers.usernames.length > 0 && (
            <div>
              <strong className='text-[color:var(--primaryPink)]'>Duplicate Usernames</strong>
              <ul className="list-disc ml-6">
                {duplicateUsers.usernames.map((username, index) => (
                  <li key={index}>{username}</li>
                ))}
              </ul>
            </div>
          )}
          {duplicateUsers.emails.length > 0 && (
            <div>
              <strong className='text-[color:var(--primaryPink)]'>Duplicate Emails</strong>
              <ul className="list-disc ml-6">
                {duplicateUsers.emails.map((email, index) => (
                  <li key={index}>{email}</li>
                ))}
              </ul>
            </div>
          )}
          </div>
        </div>
      ) : null}

      {csvData.length > 0 && (
        <div className="col-span-6 mt-4">
          <h3 className="text-lg font-medium text-gray-900">Preview CSV Data</h3>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {Object.keys(csvData[0]).map((key, index) => (
                  <th
                    key={index}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {csvData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.values(row).map((value, cellIndex) => (
                    <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </CommonCreateEditSlideover>
  );
};

export default BulkEnrollUsers;



