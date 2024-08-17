// components/BulkEnrollUsers.tsx

import React, { useState } from 'react';
import axios from 'axios';
import { CommonCreateEditSlideover } from '@/app/components/common/slideovers';


interface BulkEnrollUsersProps {
  courseId: number;
  onClose: () => void;
  

}

const BulkEnrollUsers: React.FC<BulkEnrollUsersProps> = ({ courseId, onClose }) => {
  const [userIds, setUserIds] = useState<string>('');
  const [errorText, setErrorText] = React.useState('');
  const [showError, setShowError] = React.useState(false); // Processing state
  const [successText, setSuccessText] = React.useState('');
  const [showSuccess, setShowSuccess] = React.useState(false); // Processing state
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    const ids = userIds.split(',').map(id => id.trim());
    try {
      await axios.post(`/api/courses/${courseId}/bulk-enroll`, { userIds: ids });
      setSuccessText('Users enrolled in bulk successfully.');
      onClose();
    } catch (error) {
      setShowError(true);
    }
  };

  return (
    <CommonCreateEditSlideover
      title="Bulk Enroll Users"
      description="Enroll multiple users into the course."
      handleSubmit={handleSubmit}
      onClose={onClose}
      loading={loading}
      showError={showError}
      errorText={errorText}
      showSuccess={showSuccess}
      successtext={successText}
    >
      <div className="col-span-6">
        <label className="block text-sm font-medium text-gray-700">User IDs (comma separated)</label>
        <input
          type="text"
          value={userIds}
          onChange={(e) => setUserIds(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
        />
      </div>
    </CommonCreateEditSlideover>
  );
};

export default BulkEnrollUsers;
