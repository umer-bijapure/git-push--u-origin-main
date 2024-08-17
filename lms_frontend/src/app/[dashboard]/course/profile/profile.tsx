import React, { useState } from 'react';
import Image from 'next/image';
import { FaArrowAltCircleLeft, FaPlayCircle } from 'react-icons/fa';
import { CollapsibleMenu } from '@/app/components/common/collapsible';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faClipboardList, faCalendarAlt, faAward} from '@fortawesome/free-solid-svg-icons';
import Modules from '../modules/page';
import Participants from '../courseUsers/participants';
interface Module {
  id: string;
  title: string;
  pdfLink?: string; // Add other properties if needed
}


interface CourseDetailsProps {
  onClick: () => void;
  details: {
    id: string;
    title: string;
    description:string;
    courseCategoryId: string;
    startDate: Date;
    endDate: Date;
    profilePicture:string;
    createdAt:Date;
    modules: string[];
    assessmentsCount: number;
    attendance: string[];
    certificates: string[];
  };
}

export const CourseDetail: React.FC<CourseDetailsProps> = ({ onClick, details }) => {
  const [selectedMenuItem, setSelectedMenuItem] = useState('Participants');
  const [selectedTab, setSelectedTab] = useState('Modules');
  const menuItems = ['Participants', 'Announcements', 'Reports', 'Analytics'];
  const [moduleData, setModuleData] = useState<Module | null>(null);
  const [activeSlideover, setActiveSlideover] = useState<null | 'Participants' | 'Announcements' |'Reports'|'Analytics'>('Participants');
  // const tabs = ['Modules', 'Assessments', 'Attendance', 'Certificates'];
  const tabs = [
    { name: 'Modules', icon: faBook },
    { name: 'Assessments', icon: faClipboardList },
    { name: 'Attendance', icon: faCalendarAlt },
    { name: 'Certificates', icon: faAward }
  ];

  const onClose = () => {
    setActiveSlideover(null);
  };
  const handleMenuItemClick = (item: string) => {
    const validItems: ('Participants' | 'Announcements' |'Reports'|'Analytics')[] = ['Participants', 'Announcements','Reports','Analytics'];
    
    if (validItems.includes(item as 'Participants' | 'Announcements' |'Reports'|'Analytics')) {
      setActiveSlideover(item as 'Participants' | 'Announcements' |'Reports'|'Analytics');
      setSelectedMenuItem(item);
    }
  };
  

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  const renderMenuContent = () => {
    switch (selectedMenuItem) {
      case 'Participants':
        return (
          <div>
            { activeSlideover==="Participants" &&
            <Participants
              onClose={onClose}
            />}
          </div>
        );
      case 'Announcements':
        return <div>Announcements Content</div>;
      case 'Reports':
        return <div>Reports Content</div>;
      case 'Analytics':
        return <div>Analytics Content</div>;
      default:
        return <div>Select a menu item</div>;
    }
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'Modules':
        return <Modules modules={details?.modules} />;
      case 'Assessments':
        return (
          <div>
            <h2>Assessments</h2>
            <p>Number of assessments remaining: {details.assessmentsCount}</p>
          </div>
        );
      case 'Attendance':
        return (
          <div>
            <h2>Attendance</h2>
            <ul>
              {details.attendance?.map((record, index) => (
                <li key={index}>{record}</li>
              ))}
            </ul>
          </div>
        );
      case 'Certificates':
        return (
          <div>
            <h2>Certificates</h2>
            <ul>
              {details.certificates?.map((certificate, index) => (
                <li key={index}>{certificate}</li>
              ))}
            </ul>
          </div>
        );
      default:
        return <div>Select a tab</div>;
    }
  };
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const handleIsOpenChange = (isOpen: boolean) => {
    setIsMenuOpen(isOpen);
  };

  const handleItemClick = (item: string) => {
    setSelectedTab(item); // Update selected tab
  };

  return (
    <div className='bg-white h-full'>
      <div className='flex flex-col'>
        <div className='flex items-center gap-x-2 cursor-pointer text-white text-xl top-20 p-2 m-2 hover:-translate-x-1 hover:scale-102 duration-300' onClick={onClick}>
          <h1 className='text-3xl'><FaArrowAltCircleLeft /></h1> Back
        </div>

        <div className='flex items-center justify-start gap-x-4 m-4'>
          <Image className='sm:pt-4' width={200} height={200} src={details.profilePicture ? details.profilePicture : '/course-4.png'} alt={details.title} />
          <div className='flex items-center w-full justify-between'>
            <div className='flex flex-col border-l-2 border-[color:var(--textColor)]'>
              <h1 className='text-3xl ml-4'>{details.title}</h1>
              <h2 className='ml-4'>{details.description}</h2>
              <div className='sm:ml-4 flex gap-x-2'>
                <h3>
                  Start: {details.startDate ? new Date(details.startDate).toDateString() : 'Start Date Not Available'}
                </h3>
                <h3>
                  End: {details.endDate ? new Date(details.endDate).toDateString() : 'End Date Not Available'}
                </h3>
              </div>
            </div>

            <div className='mt-10 flex flex-col mr-10'>
              <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                <CollapsibleMenu items={menuItems} onItemClick={handleMenuItemClick} onIsOpenChange={handleIsOpenChange} />
              </div>

            </div>
          </div>
        </div>
        {isMenuOpen && renderMenuContent()}
        
          <div className="border-b border-gray-200 dark:border-gray-700">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
              {tabs.map((tab) => (
                <li key={tab.name} className="me-2">
                  <button
                    onClick={() => handleTabChange(tab.name)}
                    className={`inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg 
                                ${selectedTab === tab.name ? 'text-[color:var(--mainTitleLightColor)] border-[color:var(--primaryColor)] dark:text--[color:var(--primaryColor)] dark:border-[color:var(--primaryColor)]' : 
                                'text-[color:var(--textColor)] border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'}`}
                  >
                    <FontAwesomeIcon icon={tab.icon} className="h-5 w-5 me-2" /> {/* Render the icon */}
                    {tab.name} {/* Render the tab name */}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        <div className='p-4 mt-4'>
          {renderTabContent()}
        </div>
        
      </div>
    </div>
  );
};
