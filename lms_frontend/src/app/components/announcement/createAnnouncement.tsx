import React, { FC, useState, ChangeEvent } from 'react';
import { CommonCreateEditSlideover } from '@/app/components/common/slideovers';
import { CommonFormTextInput } from '@/app/components/common/inputs';

export interface Announcement {
    id: string;
    type: 'general' | 'course';
    text: string;
    date: Date;
  }

interface ManageAnnouncementProps {
  onClose: () => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
  showError: boolean;
  errorText: string;
  announcement?: Announcement; // optional for editing
}

const ManageAnnouncement: FC<ManageAnnouncementProps> = ({
  onClose,
  handleSubmit,
  loading,
  showError,
  errorText,
  announcement
}) => {
  const [type, setType] = useState<'general' | 'course'>(announcement?.type || 'general');
  const [text, setText] = useState<string>(announcement?.text || '');
  const [date, setDate] = useState<Date>(announcement?.date || new Date());

  const handleTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setType(event.target.value as 'general' | 'course');
  };

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDate(new Date(event.target.value));
  };

  return (
    <CommonCreateEditSlideover
      title={announcement ? 'Edit Announcement' : 'Create New Announcement'}
      description={announcement ? 'Edit an existing announcement.' : 'Create a new announcement to be displayed to users.'}
      handleSubmit={handleSubmit}
      onClose={onClose}
      loading={loading}
      showError={showError}
      errorText={errorText}
    >
      <div className="col-span-6 sm:col-span-3">
        <label className="block text-sm font-medium text-gray-700">Type</label>
        <select
          value={type}
          onChange={handleTypeChange}
          className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
        >
          <option value="general">General</option>
          <option value="course">Course</option>
        </select>
      </div>

      <div className="col-span-6 sm:col-span-3">
        <CommonFormTextInput
          id="announcement_text"
          title="Announcement Text"
          value={text}
          onChange={handleTextChange}
          required={true}
        />
      </div>

      <div className="col-span-6 sm:col-span-3">
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          value={date.toISOString().split('T')[0]}
          onChange={handleDateChange}
          className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
        />
      </div>
    </CommonCreateEditSlideover>
  );
};

export default ManageAnnouncement;
