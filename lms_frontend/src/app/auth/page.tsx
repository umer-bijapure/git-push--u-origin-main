'use client';
import React, { useState } from 'react';
import { CommonTextInput } from '@/app/components/common/inputs';
import { useRouter } from 'next/navigation';

import Cookies from 'js-cookie';
import { CommonButtonSolidBlue } from '@/app/components/common/buttons';
import { CommonAlert, CommonSpinner } from '@/app/components/common/notifications';
import Image from 'next/image'
import Link from 'next/link';
import axios from 'axios';
import { login } from '../../../redux/authSlice';
import { useDispatch } from 'react-redux';


const staticUsers = [{id: '1',email: 'rubicon@gmail.com',password: 'Pass@123',role: 'user'}];

export default function LoginPage() {
  const [isPopupForgotPass, setPopupForgotPass] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showLoader, setShowLoader] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const imageUrls = [
    '/log-1.jpg',
    '/log-2.jpg',
    '/log-3.jpg',
  
    // Add more image URLs as needed
  ];
  const imageUrls2= [
    '/log-1.jpg',
    '/log-2.jpg',
    '/log-3.jpg',
    // Add more image URLs as needed
  ];

  const hexagonSize = 100; // Adjust the size as needed
  const hexagonMargin = 5; // Adjust the margin between hexagons

  const calculatePosition = (index: number) => {
    const row = Math.floor(index / 2);
    const offsetX = row % 2 === 0 ? hexagonSize * 1.5 : 0;
    const offsetY = row * (hexagonSize * 0.86 + hexagonMargin);
    return {
      left: index % 2 === 0 ? offsetX : offsetX + hexagonSize + hexagonMargin-100,
      top: offsetY,
    };
  };

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };


  const cookies = Cookies;
  
  const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      console.log("Sending request to backend11111111111");
      // if (email.length === 0 || password.length === 0) {
      //   setErrorMessage('Email and Password are required');
      //   return;
      // }
  
      setErrorMessage('');
      setShowLoader(true);
  
      console.log("Sending request to backend");
      
  
      // Use fetch instead of axios
      const response = await fetch('http://localhost:5116/api/Auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const data = await response.json();
        const { token, role } = data;
  
        localStorage.setItem('token', token);
        cookies.set('token', token);
        dispatch(login());
        if (role === 'Admin') {
          router.push('/admin/home');
        } else if (role === 'User') {
          router.push(`/dashboard`);
        } else {
          router.push(`/user/home`);
        }
      } else {
        setErrorMessage('Invalid email or password');
      }
  
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage('Login failed');
    } finally {
      setShowLoader(false);
    }
  };
  

  return (
    <div className="grid grid-cols-2 w-full items-start justify-between h-screen bg-[color:var(--mainTitleColor)] ">
      <div className="col-span-1 p-4 shadow-md hover:bg-white bg-white bg-opacity-40 shadow-xl w-2/3">
        <div className='flex items-center mt-20 justify-center'>
        <Image  src='/rubiconversity.png' width={200} height={200} alt={'Rubicon'}/></div> 
      

        {showLoader ? (
          <div className="mx-auto flex flex-col align-middle items-center mt-[-20px] justify-center">
            <CommonSpinner />
          </div>
        ) : (
          <></>
        )}
        {errorMessage.length > 0 ? <CommonAlert message={errorMessage} type="error" /> : <></>}

        <form onSubmit={formSubmitHandler} className="my-2 flex flex-col justify-center space-y-2 p-4 ">
          
          <div className="col-span-6">
            <CommonTextInput
              id="email"
              required={true}
              placeholder="Enter Email"
              onChange={handleChange}
              
            />
          </div>
          <div className="col-span-6">
            <CommonTextInput
              id="password"
              required={true}
              placeholder="Password"
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-center sm:mt-6 p-4">
          <CommonButtonSolidBlue type="submit" loading={true} text="Login"  />
              
          </div>

        </form>
        <div className="flex justify-between text-center mt-2 text-md text-[color:var(--primaryPink)] font-semibold">
            <p className="text-[color:var(--mainTitleColor)] cursor-pointer mt-4" onClick={() => setPopupForgotPass(true)}>
              Forgot Password?
            </p>
            <Link href="/auth/signup">
            <p className="text-[color:var(--mainTitleColor)] cursor-pointer mt-4">
              Create Account?
            </p>
            </Link>
          </div>
      </div>
      <div className=" col-span-1 w-full flex flex-col justify-start items-center">
  {/* First grid with two hexagons */}
  <div className="flex gap-2">
    {[6].map((index) => {
      const position = calculatePosition(index);
      return (
        <div
          key={index}
          className={`w-140 h-180 relative  hexagon opacity-20 transition  duration-300 ease-in-out col-span-2 `}
          style={{
            left: `${position.left}px`,
            top: `${position.top}px`,
          }}
        >
         
          <img src={imageUrls[index]} alt={`Image ${index + 1}`} className="w-full h-full object-cover hover:opacity-20" />
          
        </div>
      );
    })}
  </div>
  <div className="flex gap-2">
    {[0, 1].map((index) => {
      const position = calculatePosition(index);
      return (
        <div
          key={index}
          className={`w-200 h-230 relative bg-blue-500 hexagon transition duration-300 ease-in-out hexagon-wrapper`}
          style={{
            left: `${position.left}px`,
            top: `${position.top}px`,
          }}
        >
          
          <img src={imageUrls[index]} alt={`Image ${index + 1}`} className="w-full h-full object-cover hover:opacity-60" />
        </div>
      );
    })}
  </div>

  {/* Second grid with the third hexagon */}
  <div className="flex gap-2">
    {[2,3].map((index) => {
      const position = calculatePosition(index);
      return (
        <div
          key={index}
          className={`relative bg-blue-500 hexagon2 opacity-50 transition duration-300 ease-in-out col-span-2`}
          style={{
            left: `${position.left}px`,
            top: `${position.top}px`,
          }}
        >
          <img src={imageUrls[index]} alt={`Image ${index + 1}`} className="w-full h-full object-cover hover:opacity-60" />
        </div>
      );
    })}
  </div>

      </div>



    </div>
  );
}
