'use client';
// components/VerticalNavBar.tsx
import { useState, useEffect } from 'react';
import { FaBars, FaCalendar, FaFile, FaGraduationCap, FaHome, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Import usePathname hook
import { BsFileBarGraph } from 'react-icons/bs';
import { FaPeopleGroup } from 'react-icons/fa6';

interface VerticalNavBarProps {
  userRole: 'student' | 'teacher' | 'manager' | 'admin';
}

const VerticalNavBar: React.FC<VerticalNavBarProps> = ({ userRole }) => {
  const [isOpen, setIsOpen] = useState(false);
  const currentPath = usePathname(); // Get the current pathname
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = {
    student: [
      { label: 'Home', link: '/home', icon: <FaHome /> },
      { label: 'Courses', link: '/course', icon: <FaGraduationCap /> },
      { label: 'Events', link: '/events', icon: <FaCalendar /> },
    ],
    teacher: [
      { label: 'Home', link: '/home', icon: <FaHome /> },
      { label: 'Courses', link: '/courses', icon: <FaGraduationCap /> },
      { label: 'Submissions', link: '/teacher/submissions', icon: <FaGraduationCap /> },
      { label: 'Events', link: '/events', icon: <FaCalendar /> },
    ],
    manager: [
      { label: 'Home', link: '/home', icon: <FaHome /> },
      { label: 'Users', link: '/users', icon: <FaPeopleGroup /> },
      { label: 'Courses', link: '/courses', icon: <FaGraduationCap /> },
      { label: 'Events', link: '/events', icon: <FaCalendar /> },
    ],
    admin: [
      { label: 'Analytics', link: '/analytics', icon: <BsFileBarGraph /> },
      { label: 'Home', link: '/home', icon: <FaHome /> },
      { label: 'Users', link: '/users', icon: <FaPeopleGroup /> },
      { label: 'Courses', link: '/course', icon: <FaGraduationCap /> },
      { label: 'Events', link: '/events', icon: <FaCalendar /> },
      { label: 'Rports', link: '/reports', icon: <FaFile /> },

    ],
  };

  const getDashboardLink = (baseLink: string) => {
    const dashboardType = userRole;
    return `/${dashboardType}${baseLink}`;
  };

  const handleClick = (link: string) => {
    // Custom logic can be added here
    console.log(`Navigating to ${link}`);
  };

  return (
    <div className="flex flex-col h-full bg-[color:var(--mainTitleLightColor)] sm:w-[120px]  fixed top-20 left-0 transition-transform transform md:translate-x-0 -translate-x-full z-50">
      <ul className={`flex flex-col ${isOpen ? 'block' : 'hidden'} md:block`}>
        {navItems[userRole].map(item => (
          <li
            key={item.link}
            className={`py-4 px-4 h-[90px] w-[120px] text-white hover:bg-white hover:opacity-30 hover:text-gray-800 ${currentPath === getDashboardLink(item.link) ? 'bg-[color:var(--primaryColor)]' : ''}`}
            onClick={() => handleClick(item.link)}
          >
            <Link className='flex flex-col items-center justify-center' href={getDashboardLink(item.link)}>
              <h1 className='text-2xl'>{item.icon}</h1>
              <h2>{item.label}</h2>
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between p-4 md:hidden">
        <button onClick={toggleMenu} className="focus:outline-none">
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </div>
  );
};

export default VerticalNavBar;
