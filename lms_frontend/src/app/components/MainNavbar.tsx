
'use client';
import React,{useState,useEffect, useRef} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {AiOutlineLogout,AiOutlineMenu} from 'react-icons/ai';
import { useParams, usePathname, useRouter } from 'next/navigation'
import { CommonButton, CommonButtonSolidBlue } from './common/buttons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

import { login,logout } from '../../../redux/authSlice';
import { setNavColor } from '../../../redux/navSlice';

const MainNavbar: React.FC<{ userId: string}> = ({ userId }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const navColor = useSelector((state: RootState) => state.nav.color);
  const [toggle, setToggle] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isPopupLogin, setPopupLogin] = useState(false);
  const floatingMenuRef = useRef<HTMLDivElement | null>(null);
  const [isInputVisible, setInputVisible] = useState(false);
  const [login,setLogin]=useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (floatingMenuRef.current && !floatingMenuRef.current.contains(event.target as Node)) {
        setInputVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  useEffect(() => {
    if (isLoggedIn) {
      dispatch(setNavColor('bg-[#FCFCFC]')); // Change to desired color when logged in
    }
  }, [isLoggedIn, dispatch]);

  const toggleInput = () => {
    setInputVisible(!isInputVisible);
  };

  const handleLogout = () => {
   
    dispatch(logout());
    dispatch(setNavColor('bg-[#040f49]'));
    router.push("/");
  };

  return (
    <div className='z-50'>
      <div className={`hidden sm:flex justify-between items-center fixed top-0 font-bold w-full h-20 ${navColor} no-scrollbar`}>
      <Link href="/">
          <Image className='p-4 ml-10' src='/logo.png' width={200} height={200} alt={'Rubicon'}/>
      </Link>
        <div className='w-[510px] max-auto p-4'>
          <div className='flex items-center justify-center gap-x-6 text-white'>
            {!isLoggedIn ? (
              <>
                <Link href="/contact-us">
                  <button className='hover:ring-2 m-2 p-2 ring-white shadow-mg rounded-xl hover:bg-white hover:text-[color:var(--mainTitleColor)] hover:scale-105 duration-100' >Contact</button>
                </Link>
                <Link href="/about-us/">
                  <button className='hover:ring-2 m-2 p-2 ring-white shadow-mg rounded-xl hover:bg-white hover:text-[color:var(--mainTitleColor)] hover:scale-105 duration-100' >About</button>
                </Link>
                <Link href="/auth">
                <button className='z-10 m-2 p-2 pl-4 pr-4 hover:ring-white shadow-mg rounded-xl bg-[color:var(--primaryPink)] hover:text-white hover:scale-110 duration-100'>Login</button></Link>
                <Link href="/auth/signup">
                <button className=' m-2 p-2 pl-2 pr-2 hover:ring-white shadow-mg rounded-xl bg-[color:var(--primaryPink)] hover:text-white hover:scale-110 duration-100' >Register</button></Link>
             
              </>
            ) : (
              <button onClick={handleLogout} className='flex items-center hover:bg-red-200 justify-center gap-x-2 text-red-500 bg-red-100 p-2 pl-10 pr-10 rounded-xl font-semibold hover:scale-110 duration-100'>
                Logout <AiOutlineLogout />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="sm:hidden floating-menu" ref={floatingMenuRef}>
        <button className="flex items-between floating-menu-button-logout" onClick={toggleInput}>
          <AiOutlineMenu />
        </button>

        {isInputVisible && (
          <div className="floating-menu-content-logout">
            <div className='p-2 flex flex-col items-center space-y-4'>
              {isLoggedIn ? (
                <>
                  <Link href="/contact">
                    <CommonButtonSolidBlue text='Contact' className='pl-10 pr-10 hover:text-white hover:bg-[color:var(--primaryColor)] pt-1 pb-1 rounded-md' />
                  </Link>
                  <Link href="/about">
                    <CommonButtonSolidBlue text='About' className='pl-10 pr-10 hover:text-white hover:bg-[color:var(--primaryColor)] pt-1 pb-1 rounded-md' />
                  </Link>
                  <Link href="/auth/login" >
                    <CommonButtonSolidBlue text='Login' className='pl-10 pr-10 hover:text-white hover:bg-[color:var(--primaryColor)] pt-1 pb-1 rounded-md' />
                  </Link>
                  <Link href="/auth/signup" >
                    <CommonButtonSolidBlue text='Register' className='pl-10 pr-10 hover:text-white hover:bg-[color:var(--primaryColor)] pt-1 pb-1 rounded-md' />
                  </Link>
                </>
              ) : (
                <button onClick={handleLogout} className='flex items-center hover:bg-red-200 justify-center gap-x-2 text-red-500 bg-red-100 p-2 pl-10 pr-10 rounded-xl font-semibold'>
                  Logout <AiOutlineLogout />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainNavbar;