import { ReactNode, useEffect, useState } from "react";
import Image from 'next/image';
import React from "react";
import CommonPopup from "./common/popUp";
import { CommonIconInput } from "./common/inputs";
import { FaShare, FaStar, FaTrash } from "react-icons/fa";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { CommonButtonSolidBlue } from "./common/buttons";
interface GridItemProps {
      gridTemplateColumns:string;
      gridTemplateRows:string;
      id: string;
      name: ReactNode;
      address?: ReactNode;
      customer_number?: ReactNode ;
      meter_serial_number?: string;

      onDeleteClick?: () => void;
      children?:ReactNode;
      onClick?:()=>void;
    
  }
  export const CommonGridItemRows: React.FC<GridItemProps> = ({gridTemplateColumns,gridTemplateRows,id,name,meter_serial_number,address,customer_number,onDeleteClick,children}) => {

  
        return (
          
          <div className="grid grid-cols-7 items-center justify-between bg-[color:var(--mainTitleLightestColor)] hover:bg-[color:var(--lightBackgroundColor)] rounded-2xl  mb-1"  style={{ gridTemplateColumns, gridTemplateRows:gridTemplateRows}}>

            <div className="col-span-1 m-2" >
            <div className={` flex justify-center items-center text-sm uppercase option hover:scale-105 transition-all duration-300 border-l border-gray-300 first:border-l-0 ml-[-6px]`}>
          <Image
            src={"/default-user-profile.png"}
            alt="/"
            width={40}
            height={40}

            className={`rounded-full border-2 border-white cursor-pointer`}
          />
        </div>
            </div>
            
              <div className="col-span-1 m-2  vvsm:items-center"  >{name}</div>

            {customer_number?
            <div className="col-span-1 m-2">{customer_number}</div>:<div className='text-[12px] text-red-400'>Contact</div>}
            {meter_serial_number?
            <div className="col-span-1 m-2">{meter_serial_number}</div>:<div className='text-[12px] text-red-400'>Meter Serial Number</div>}
    
            {/* <div className="bg-red-100 rounded-xl flex justify-center items-center gap-x-2 p-2 text-red-500 font-bold m-4" onClick={onDeleteClick}>
                <h1 className="text-lg">
                  <FaTrash />
                </h1>
                <h1 className="text-sm">Delete</h1>
            </div> */}
            {children}
          </div>
        
        );
      };

interface CommonGridRowsProps {
    rows: number;
    columns: number;
    items:Array<{
      name:string;//compulsory
      customer_number:string;//compulsory
      address?:string;
      meter_serial_number?:string;

    }>;
      
    
  }
  
  export const CommonGridRows: React.FC<CommonGridRowsProps> = ({ rows, columns,items}) => {
    const gridTemplateColumns = `repeat(${columns}, 1fr)`;
    const [selectedProfileData, setSelectedProfileData] = useState<typeof items[number] | null>(null);
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [selectedEmployees, setSelectedEmployees] = useState<Record<string, boolean>>({});
    const [showLoader, setShowLoader] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const [customer_number, setPhoneNo] = useState('');
    const [address, setAddress] = useState('');
    const [meter_serial_number, setMeterSerialNo] = useState('');
   
  
    const toggleProfile = (index: any) => {
      const selectedItem = items[index];
      setSelectedProfileData(selectedItem);
      setShowProfile(!showProfile);
      setPopupVisible(true);
    };
  
    useEffect(() => {
      if (selectedProfileData) {
        setName(selectedProfileData.name);
        setAddress(selectedProfileData.address);
        setPhoneNo(selectedProfileData.customer_number);
        setMeterSerialNo(selectedProfileData.meter_serial_number);
      }
    }, [selectedProfileData]);
    const handleUpdate = async () => {
      try {
        if (!name) {
          console.error('Name is required for update operation');
          setErrorMessage('Name is required for update operation');
          return;
        }
    
        const response = await fetch(`http://127.0.0.1:8000/${name}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            customer_number,
            address,
            meter_serial_number,
          }),
        });
    
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setMessage('Data updated successfully');
        } else {
          console.error('Error updating data:', response.statusText);
          setErrorMessage('Failed to update data');
        }
      } catch (error) {
        console.error('Error updating data:', error);
        setErrorMessage('Failed to update data');
      } finally {
        // Close the popup and reset state
        setPopupVisible(false);
        setShowProfile(false);
        window.location.reload();
        
      }
    };
    

  
    const handleDeleteCustomer = async () => {
      try {
        if (!name) {
          console.error('Name is required for delete operation');
          setErrorMessage('Name is required for delete operation');
          return;
        }
    
        const response = await fetch(`http://127.0.0.1:8000/delete/${name}`, {
          method: 'DELETE',
        });
    
        if (response.ok) {
          const data = await response.json();
          console.log(data.message);
          setMessage(`Data deleted successfully: ${data.message}`);
        } else {
          console.error('Error deleting customer:', response.statusText);
          setErrorMessage('Failed to delete customer');
        }
      } catch (error) {
        console.error('Error deleting customer:', error);
        setErrorMessage('Failed to delete customer');
      }finally {
        // Close the popup and reset state
        setPopupVisible(false);
        setShowProfile(false);
        window.location.reload();
      }
    };
    
  

  const selectedEmployeeCount = Object.values(selectedEmployees).filter(Boolean).length;

  const handleClose = () => {
    setPopupVisible(false);
    setShowProfile(false);
  };
    return ( 
    <>
        { selectedProfileData && (
          <div>
            <CommonPopup
                showModal={isPopupVisible}
                onClose={handleClose}
                heading={"Customer Details Here"}
                content='' >
            <form onSubmit={(e) => e.preventDefault()}>
                
                <div className="grid grid-cols-1 sm:grid-cols-2">
                  <div className="flex p-4">
                <CommonIconInput
                    id="name"
                    icon={faUser}
                    required={false} 
                    defaultvalue={selectedProfileData.name }
                    placeholder='Name'
                    isDisabled={true}
                    onChange={(e) => {
                    setName(e.target.value);
                    }} 
                    />
                    </div>
                    <div className="flex p-4">
                <CommonIconInput
                    id="address"
                    icon={faUser}
                    required={false} 
                    defaultvalue={selectedProfileData.address}
                    placeholder='Full Address'
                    onChange={(e) => {
                    setAddress(e.target.value);
                    }} 
                    />
                    </div>
                    <div className="flex p-4">
                <CommonIconInput
                    id="contact"
                    icon={faUser}
                    required={false} 
                    defaultvalue={selectedProfileData.customer_number}
                    placeholder='Contact Number'
                    onChange={(e) => {
                    setPhoneNo(e.target.value);
                    }} 
                    />
                    </div>
                    <div className="flex p-4">
                <CommonIconInput
                    id="meter_number"
                    icon={faUser}
                    required={false} 
                    defaultvalue={selectedProfileData.meter_serial_number }
                    placeholder='Meter Serial Number'
                    onChange={(e) => {
                    setMeterSerialNo(e.target.value);
                    }} 
                    />
                    </div>
                    
                  
                </div>
                <div className="flex justify-end p-4">
                <CommonButtonSolidBlue  onClick={handleUpdate} text="Update"/>
                 
               
                </div>
                <div className="flex justify-end p-4">
                <CommonButtonSolidBlue  onClick={handleDeleteCustomer} text="Delete"/>
                 
               
                </div>
                </form>
            </CommonPopup>

            
          </div>
        )}
  
   
      <div className=''>
  
   
      <div>
        
        <div className="hidden sm:grid">

          {items.map((item, index) => (
            <div className='relative'>
                      <div className='flex justify-start absolute'>

            </div>
            <div key={index} onClick={() => toggleProfile(index)}>
              <CommonGridItemRows
                gridTemplateColumns={gridTemplateColumns}
                gridTemplateRows={`repeat(${rows}, auto)`}
                id={'1'}
                name={item.name}
                customer_number={item.customer_number}
                address={item.address}
                meter_serial_number={item.meter_serial_number}
              >
  
              </CommonGridItemRows>
  
            </div>
  
            </div>
          ))}
          
        </div>
    

        </div>       

      </div>
  
    
    </>
    );
  };