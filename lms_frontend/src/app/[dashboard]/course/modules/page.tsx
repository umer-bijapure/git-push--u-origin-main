import React, { FormEvent, useState } from 'react';
import Image from 'next/image'; // Adjust based on your project

import { FaPlayCircle } from 'react-icons/fa'; // Adjust based on your needs
import Module from 'module';
import { CommonButtonGreen } from '@/app/components/common/buttons';
import { CommonCreateEditSlideover } from '@/app/components/common/slideovers';
import AddModule from './ModuleManagement';

interface ModulesProps {
    modules: string[];
  }
  
  const Modules: React.FC<ModulesProps> = ({ modules }) => {

  const [activeSlideover, setActiveSlideover] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorText, setErrorText] = useState('');

  const handleAddModuleClick = () => {
    setActiveSlideover('addModule');
  };

  const handleEditModuleClick = (module: string) => {
    setActiveSlideover('editModule');
    // Set module data to edit
  };

  const handleDeleteModuleClick = (moduleId: string) => {
    // Implement delete logic
  };

function handleSubmit(event: FormEvent<HTMLFormElement>): void {
          throw new Error('Function not implemented.');
      }
    const onClose = () => {
        setActiveSlideover(null);
      };

  return (
    <div>
      <h2>Modules</h2>
      <div className='flex flex-wrap gap-x-2 w-auto items-center justify-start p-2'>
        {/* Sample participants content */}
        <div className='flex gap-x-2 w-auto items-center justify-center shadow-md shadow-gray-100 rounded-md p-4'>
          <Image src='/course1.jpg' alt='Course 1' width={80} height={80} />
          <h2 className='relative rounded-md flex items-center justify-center bg-[color:var(--primaryPink)] text-white p-2 gap-x-2'>
            <FaPlayCircle /> PLAY
          </h2>
        </div>
        <div className='flex gap-x-2 w-auto items-center justify-center shadow-md shadow-gray-100 rounded-md p-4'>
          <Image src='/course2.jpg' alt='Course 2' width={80} height={80} />
          <h2 className='relative rounded-md flex items-center justify-center bg-[color:var(--primaryPink)] text-white p-2 gap-x-2'>
            <FaPlayCircle /> PLAY
          </h2>
        </div>
      </div>
 
      <div className='flex items-center justify-end p-2 m-2'>
        <CommonButtonGreen text="Add Module" onClick={handleAddModuleClick} />
      </div>
      {activeSlideover === 'addModule' && (
        <AddModule
          onClose={onClose}
          loading={loading}
          showError={showError}
          errorText={errorText}
        />
      )}
    </div>
  );
};

export default Modules;
