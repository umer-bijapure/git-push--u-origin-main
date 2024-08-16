'use client';
import React, { ReactNode, useState,FC } from 'react';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';
import styled from 'styled-components';
import Image from 'next/image';
import { FaPlayCircle } from 'react-icons/fa';
interface CollapsibleComponentProps {
  expanded: boolean;
  children: ReactNode;
  leftIcon?:ReactNode|string;
  className?:string;
  
}

export const CollapsibleComponent: React.FC<CollapsibleComponentProps> = ({ expanded, children ,leftIcon,className}) => {
  const [isExpanded, setIsExpanded] = useState(expanded);

  const toggleCollapse = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex flex-col items-center mt-6 ">
      {className?
            <button
            className={`inline-block rounded px-10 py-2 text-xs font-medium uppercase leading-normal ${className}`}
    
            type="button"
            onClick={toggleCollapse}
            aria-expanded={isExpanded}
          >
            {leftIcon? <div className='flex gap-x-4 items-center'>{leftIcon} <FaChevronDown /></div>:<FaChevronDown />}
          </button>
      :
      <button
        className="inline-block rounded bg-primary px-10 py-2 text-xs font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"

        type="button"
        onClick={toggleCollapse}
        aria-expanded={isExpanded}
      >
        {leftIcon? leftIcon:<FaChevronDown />}
      </button>
}
      <div
        className={`${
          isExpanded ? 'block' : 'hidden'
        } mt-2 w-full rounded-lg bg-white p-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:text-neutral-50`}
      >
        <div className='w-full z-2'>{children}</div>
      </div>
    </div>
  );
};



interface CollapsibleItemProps {
    headerText: string | JSX.Element;
    iconClass: ReactNode;
    
    isActive?: boolean;
    onItemClick?: () => void;
    children?: ReactNode;
    leftIcon?:ReactNode;
    className?:string;
}

const CollapsibleItem: React.FC<CollapsibleItemProps> = ({   headerText,
    iconClass,
    isActive,
    onItemClick,
    children,leftIcon,className }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleCollapse = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <li>
      <div
        className={`${className} z-10 collapsible-header cursor-pointer flex items-center justify-between p-3 rounded-sm hover:bg-[color:var(--lightBackgroundGreyColor)] shadow-sm`}
        onClick={onItemClick}

      >   
        
        <i className={`material-icons mr-2 text-[color:var(--mainTitleLightColor)]`}>{iconClass}</i>
        {typeof headerText === 'string' ? (
        <span className="  flex-1">{headerText}</span>
        ) : (
          <span className=''>{headerText}</span>
        )}
        <i className={`material-icons mr-2 margin-left: auto`}>{leftIcon? leftIcon:<FaChevronDown />}</i> 
      </div>
      {isActive && <div className=" bg-gray-30 p-3 shadow-md"><span>{children}</span></div>}
    </li>
  );
};

interface CollapsibleProps {
    expanded?: number; // Index of the item to be initially expanded
  children: ReactNode;
}

const Collapsible: React.FC<CollapsibleProps> = ({expanded, children}) => {
    const [activeIndex, setActiveIndex] = useState(expanded !== undefined ? expanded : -1);

    const onItemClick = (index: number) => {
      if (activeIndex === index) {
        setActiveIndex(-1); // Collapse if already open
      } else {
        setActiveIndex(index); // Expand if closed
      }
    };
  return (
    <ul className="collapsible z-10 w-full">
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child as React.ReactElement, {
          onItemClick: () => onItemClick(index),
          isActive: activeIndex === index,
        })
      )}
    </ul>
  );
};

export { Collapsible, CollapsibleItem };





import { FaEdit, FaTrash } from 'react-icons/fa';

interface CollapsibleProps {
  header: string;
  children: React.ReactNode;
  onEdit: () => void;
  onDelete: () => void;
}

export const EditCollapsible: React.FC<CollapsibleProps> = ({ header, children, onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="collapsible">
      <div className="collapsible-header flex justify-between items-center p-4 bg-gray-200 cursor-pointer" onClick={toggleOpen}>
        <div>{header}</div>
        <div className="flex gap-x-4">
          <FaEdit onClick={onEdit} className="text-blue-500 cursor-pointer" />
          <FaTrash onClick={onDelete} className="text-red-500 cursor-pointer" />
        </div>
      </div>
      {isOpen && <div className="collapsible-content p-4 bg-gray-100">{children}</div>}
    </div>
  );
};




import { FaCog, FaTimes } from 'react-icons/fa';

// Define types for the component props
interface CollapsibleMenuProps {
  items: string[];
}

const MenuContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const MenuButton = styled.div`
  display: flex;
  align-items: center;
  background: #f8f8f8;
  padding: 10px;
  cursor: pointer;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-weight: bold;
  color: #333;
  transition: background 0.3s;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 2;

  &:hover {
    background: #e0e0e0;
  }
`;

const MenuContent = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  white-space: nowrap;
  display: flex;
  flex-direction: row;
  align-items: center;
  transition: max-width 0.3s ease-out, opacity 0.3s ease-out;
  max-width: ${(props) => (props.isOpen ? '600px' : '0')};
  opacity: ${(props) => (props.isOpen ? '1' : '0')};
  z-index: 1;
`;

const MenuItem = styled.div<{ isSelected: boolean }>`
  padding: 10px;
  border-bottom:  '#C4D559 2px solid';
  color: ${(props) => (props.isSelected ? '#ffffff' : '#4B86B4')};
  cursor: pointer;
  background: ${(props) => (props.isSelected ? '#C4D559' : 'transparent')};
  transition: background 0.3s, color 0.3s;

  &:hover {
    background: #C4D559;
  }
`;

const CloseButton = styled.div`
  padding: 10px;
  cursor: pointer;
  color: #333;
  transition: background 0.3s;
  border-left: 1px solid #ddd;

  &:hover {
    background: #F25C78;
    color: #ffffff;
  }
`;

const SettingsIcon = styled.div`
  display: flex;
  align-items: center;
  background: #f8f8f8;
  padding: 10px;
  cursor: pointer;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: #333;
  transition: background 0.3s;
  z-index: 3;

  &:hover {
    background: #e0e0e0;
  }
`;

interface CollapsibleMenuProps {
  items: string[];
  onItemClick: (item: string) => void;
  onIsOpenChange?: (isOpen: boolean) => void; // New prop for passing isOpen value to parent
  selectedItem?: string; // Add selectedItem prop
}



export const CollapsibleMenu: React.FC<CollapsibleMenuProps> = ({ items, onItemClick, onIsOpenChange }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const toggleMenu = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    if (onIsOpenChange) {
      onIsOpenChange(newIsOpen); // Notify parent of the isOpen change
    }
  };

  const handleMenuItemClick = (item: string) => {
    setSelectedItem(item); // Set the selected item
    onItemClick(item);
  };
  return (
    <MenuContainer>
      {!isOpen && (
        <SettingsIcon onClick={toggleMenu}>
          <FaCog />
        </SettingsIcon>
      )}
      <MenuContent isOpen={isOpen}>
      {items.map((item, index) => (
          <MenuItem
            key={index}
            onClick={() => handleMenuItemClick(item)}
            isSelected={selectedItem === item}
          >
            {item}
          </MenuItem>
        ))}
        <CloseButton onClick={() => { 
          setIsOpen(false); 
          if (onIsOpenChange) onIsOpenChange(false); // Notify parent of the isOpen change
        }}>
          <FaTimes />
        </CloseButton>
      </MenuContent>
    </MenuContainer>
  );
};



interface TabsProps {
  selectedTab: string;
}

export const Tabs: React.FC<TabsProps> = ({ selectedTab }) => {
  return (
    <div className="p-4">
      {selectedTab === 'Modules' && (
        <div className="flex flex-wrap gap-x-2 w-auto items-center justify-start">
          <div className="flex gap-x-2 items-center justify-center shadow-md shadow-gray-100 rounded-md p-4">
            <Image src="/course1.jpg" alt="Course 1" width={80} height={80} />
            <h2 className="relative rounded-md flex items-center justify-center bg-[color:var(--primaryPink)] text-white p-2 gap-x-2">
              <FaPlayCircle />PLAY
            </h2>
          </div>
          <div className="flex gap-x-2 items-center justify-center shadow-md shadow-gray-100 rounded-md p-4">
            <Image src="/course2.jpg" alt="Course 2" width={80} height={80} />
            <h2 className="relative rounded-md flex items-center justify-center bg-[color:var(--primaryPink)] text-white p-2 gap-x-2">
              <FaPlayCircle />PLAY
            </h2>
          </div>
        </div>
      )}
      {selectedTab === 'Assessments' && <div>Assessments Content</div>}
      {selectedTab === 'Attendance' && <div>Attendance Content</div>}
      {selectedTab === 'Certificates' && <div>Certificates Content</div>}
    </div>
  );
};



