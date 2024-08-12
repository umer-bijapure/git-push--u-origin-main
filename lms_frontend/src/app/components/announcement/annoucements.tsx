import React, { useState } from 'react';

import ManageAnnouncement, { Announcement } from './createAnnouncement';
import { CommonButtonGreen } from '../common/buttons';

const Announcements: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [activeSlideover, setActiveSlideover] = useState<null | 'create' | 'edit'>(
    null
  );
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);

  const handleCreateAnnouncement = () => {
    setActiveSlideover('create');
  };

  const handleEditAnnouncement = (announcement: Announcement) => {
    setEditingAnnouncement(announcement);
    setActiveSlideover('edit');
  };

  const handleClose = () => {
    setActiveSlideover(null);
    setEditingAnnouncement(null);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle submit logic here
    handleClose();
  };

  return (
    <div>
      
      <div className="bg-white p-4 rounded-lg shadow-md ">
        <div className='flex justify-between'>
          <h2 className="text-xl font-bold mb-4">Announcements</h2>
          <CommonButtonGreen  text="Create" onClick={handleCreateAnnouncement}/>
        </div>
        <ul className="list-disc list-inside">
          {announcements.map((announcement) => (
            <li key={announcement.id} className="mb-2">
              {announcement.text} ({announcement.date.toLocaleDateString()})
              <button onClick={() => handleEditAnnouncement(announcement)}>Edit</button>
            </li>
          ))}
        </ul>
      </div>

      {activeSlideover === 'create' && (
        <ManageAnnouncement
          onClose={handleClose}
          handleSubmit={handleSubmit}
          loading={false}
          showError={false}
          errorText=""
        />
      )}

      {activeSlideover === 'edit' && editingAnnouncement && (
        <ManageAnnouncement
          onClose={handleClose}
          handleSubmit={handleSubmit}
          loading={false}
          showError={false}
          errorText=""
          announcement={editingAnnouncement}
        />
      )}
    </div>
  );
};

export default Announcements;
