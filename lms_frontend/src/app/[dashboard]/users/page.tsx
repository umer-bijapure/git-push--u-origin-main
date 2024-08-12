'use client';
import { CommonButton, CommonButtonGreen } from '@/app/components/common/buttons';
import React, { useState, useEffect, ChangeEvent } from 'react';
import AddUser from './addUser';
import BulkEnrollUsers from './bulkEnroll';



export interface User {
    id: string;
    username: string;
    email: string;
    collegeName: string;
    role: string;
    city: string;
    state: string;
  }
  
  const dummyUsers: User[] = [
    { id: '1', username: 'bmerbijapure', email: 'bmerbijapure@example.com', collegeName: 'SIT College', role: 'student', city: 'Solapur', state: 'Maharashtra' },
    { id: '2', username: 'vilasbirardar', email: 'vilasbirardar@example.com', collegeName: 'JSPM College', role: 'trainer', city: 'Sangli', state: 'Maharashtra' },
    { id: '3', username: 'shreyashdotunde', email: 'shreyashdotunde@example.com', collegeName: 'JSPM College', role: 'manager', city: 'Pune', state: 'Maharashtra' },
    { id: '4', username: 'sohelshaikh', email: 'sohelshaikh@example.com', collegeName: 'PDEA College', role: 'student', city: 'Bijapure', state: 'Karnataka' },
    { id: '5', username: 'malikgadwal', email: 'malikgadwal@example.com', collegeName: 'JSPM College', role: 'trainer', city: 'Kalburgi', state: 'Karnataka' },
  ];
  
  const UserList: React.FC = () => {
    const [filteredUsers, setFilteredUsers] = useState<User[]>(dummyUsers);
    const [roleFilter, setRoleFilter] = useState<string>('');
    const [collegeFilter, setCollegeFilter] = useState<string>('');
    const [cityFilter, setCityFilter] = useState<string>('');
    const [stateFilter, setStateFilter] = useState<string>('');
    const [activeSlideover, setActiveSlideover] = useState<null | 'user' | 'bulkEnroll'>(null);
  
    useEffect(() => {
      filterUsers();
    }, [roleFilter, collegeFilter, cityFilter, stateFilter]);
  
    const handleRoleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
      setRoleFilter(event.target.value);
    };
  
    const handleCollegeFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
      setCollegeFilter(event.target.value);
    };
  
    const handleCityFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
      setCityFilter(event.target.value);
    };
  
    const handleStateFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
      setStateFilter(event.target.value);
    };
  
    const filterUsers = () => {
      let updatedUsers = dummyUsers;
  
      if (roleFilter) {
        updatedUsers = updatedUsers.filter(user => user.role === roleFilter);
      }
  
      if (collegeFilter) {
        updatedUsers = updatedUsers.filter(user =>
          user.collegeName.toLowerCase().includes(collegeFilter.toLowerCase())
        );
      }
  
      if (cityFilter) {
        updatedUsers = updatedUsers.filter(user =>
          user.city.toLowerCase().includes(cityFilter.toLowerCase())
        );
      }
  
      if (stateFilter) {
        updatedUsers = updatedUsers.filter(user =>
          user.state.toLowerCase().includes(stateFilter.toLowerCase())
        );
      }
  
      setFilteredUsers(updatedUsers);
    };
  
    const [loading, setLoading] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorText, setErrorText] = useState('');
  

  
    const onClose = () => {
      setActiveSlideover(null);
    };

    const handleBulkEnrollSubmit = (users: User[]) => {
        // Handle bulk enroll submission logic
        console.log('Enrolled Users:', users);
      };
    
  
    return (
      <div className="bg-white container mx-auto p-4 top-20 sm:pt-[100px] bg-white">
        {activeSlideover === 'user' && (
          <AddUser
            onClose={onClose}
            
            loading={loading}
            showError={showError}
            errorText={errorText}
          />
        )}
    {activeSlideover === 'bulkEnroll' && (
        <BulkEnrollUsers
          onClose={onClose}
          // handleSubmit={handleBulkEnrollSubmit}
          loading={loading}

        />
      )}
        <div className="flex mb-4 justify-between">
          <div className="mr-4">
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select
              value={roleFilter}
              onChange={handleRoleFilterChange}
              className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            >
              <option value="">All</option>
              <option value="trainer">Trainer</option>
              <option value="student">Student</option>
              <option value="manager">Manager</option>
            </select>
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-700">College Name</label>
            <input
              type="text"
              value={collegeFilter}
              onChange={handleCollegeFilterChange}
              className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              value={cityFilter}
              onChange={handleCityFilterChange}
              className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-700">State</label>
            <input
              type="text"
              value={stateFilter}
              onChange={handleStateFilterChange}
              className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
          </div>
  
          <div className="flex items-center justify-end p-2 m-2">
            <CommonButtonGreen text="Create User" onClick={() => setActiveSlideover('user')} />
            </div>
            <div className='flex items-center justify-end p-2 m-2'>
            <CommonButtonGreen  text="Bulk Users Create" onClick={() => setActiveSlideover('bulkEnroll')} />
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
            {filteredUsers.map(user => (
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
    );
  };
export default UserList;
