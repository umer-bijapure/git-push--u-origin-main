// components/Participants.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CommonButtonGreen } from '@/app/components/common/buttons';
import BulkEnrollUsers from './userEnroll';
import { CommonCreateEditSlideover, CommonSlideover } from '@/app/components/common/slideovers';
import { CommonFormSearchSelect } from '@/app/components/common/inputs';


interface User {
  id: string;
  username: string;
  email: string;
  collegeName: string;
  city: string;
  state: string;
  role: string;
 
}
interface ParticipantsProps {
    onClose: () => void;
  
  }
  
const Participants: React.FC<ParticipantsProps> = ({onClose}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [participants, setParticipants] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [activeSlideover, setActiveSlideover] = useState<string | null>(null);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>('');
  const [successText, setSuccessText] = useState<string>('');
  const [courseId, setCourseId] = useState<number>(0);
  

  useEffect(() => {
    // Fetch users enrolled in the course
    const fetchUsers = async () => {
      if (courseId <= 0) return;
      setLoading(true);
      try {
        const response = await axios.get<User[]>(`/api/courses/${courseId}/participants`);
        setParticipants(response.data);
      } catch (error) {
        setErrorText('Failed to fetch users.');
        setShowError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [courseId]);
  const [userId, setUserId] = useState<string>('');
  useEffect(() => {
    // Fetch users from the backend
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get<User[]>('/api/Users');
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (error:any) {
        console.log('Failed to fetch users.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleUserSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(event.target.value);
  };
  const [selectedUserId, setSelectedUserId] = useState<string | undefined>(undefined);

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(event.target.value);
  };
  return (
    <CommonCreateEditSlideover
    title="Bulk Enroll Users"
    description="Enroll multiple users into the course."
    handleSubmit={onClose}
    onClose={onClose}
    >

    <div className='col-span-6 sm:col-span-3'>
      {activeSlideover === 'user' && (
      <div className="col-span-6">
      <label className="block text-sm font-medium text-gray-700">User ID</label>
      <CommonFormSearchSelect
        id="user-select"
        title="User Email"
        value={selectedUserId}
        onChange={handleUserChange}
        required={true}
        labelSide={false}
        defaultValue=""
      />
       {selectedUserId && (
        <div>
          <p>Selected User ID: {selectedUserId}</p>
          {/* Additional logic or UI based on the selected user */}
        </div>
      )}
    </div>
      )}
      {activeSlideover === 'bulkEnroll' && (
        <BulkEnrollUsers
          courseId={courseId}
          onClose={() => setActiveSlideover(null)}
          

        />
      )}
      <div className="flex mb-4 justify-between">
        <div className='flex items-center justify-end p-2 m-2'>
          <CommonButtonGreen text="Enroll User" onClick={() => setActiveSlideover('user')} />
        </div>
        <div className='flex items-center justify-end p-2 m-2'>
          <CommonButtonGreen text="Bulk Enroll Users" onClick={() => setActiveSlideover('bulkEnroll')} />
        </div>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">College Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">State</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {participants.map(user => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.username}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.collegeName}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.city}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.state}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </CommonCreateEditSlideover>
  );
};

export default Participants;
