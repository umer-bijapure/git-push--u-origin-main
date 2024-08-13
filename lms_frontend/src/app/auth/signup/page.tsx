'use client';
import React, { useState } from 'react';
import { CommonTextInput } from '@/app/components/common/inputs';
import { useRouter } from 'next/navigation';
import Cookies from 'universal-cookie';
import { CommonButtonSolidBlue } from '@/app/components/common/buttons';
import { CommonAlert, CommonSpinner } from '@/app/components/common/notifications';
import Image from 'next/image'
import Link from 'next/link';
const cookies = new Cookies();

const staticUsers = [{id: '1',email: 'rubicon@gmail.com',password: 'Pass@123',role: 'user'}];

export default function SignUpPage() {
  const [isPopupForgotPass, setPopupForgotPass] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showLoader, setShowLoader] = useState(false);
  const router = useRouter();

  const findUserByEmailAndPassword = (email: string, password: string) => {
    return staticUsers.find((user) => user.email === email && user.password === password);
  };

  const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (email.length === 0 || password.length === 0) {
        setErrorMessage('Email and Password are required');
        return;
      }

      setErrorMessage('');
      const user = findUserByEmailAndPassword(email, password);

      if (user) {
        const token = 'your_generated_token'; 
        localStorage.setItem('token', token);
        cookies.set('token', token);

      
        if (user.role === 'user') {
          router.push(`/${encodeURIComponent(email)}/`);
        }
        // Add more conditions for other roles as needed
      } else {
        setErrorMessage('Invalid credentials');
      }

      setShowLoader(false);
    } catch (error) {
      setShowLoader(false);
      setErrorMessage('Login failed');
    }
  };
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


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 w-screen items-start justify-between bg-[color:var(--mainTitleColor)] ">
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
        <div className="">
            <CommonTextInput
              id="FirstName"
              required={true}
              placeholder="First Name"
              onChange={(e) => setEmail(e.target.value)}
              
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <CommonTextInput
              id="LastName"
              required={true}
              placeholder="Last Name"
              onChange={(e) => setEmail(e.target.value)}
              
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <CommonTextInput
              id="email_id"
              required={true}
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
              
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <CommonTextInput
              id="institute"
              required={true}
              placeholder="Enter Institute"
              onChange={(e) => setEmail(e.target.value)}
              
            />
          </div>

          <div className="col-span-2 sm:col-span-1">
            <CommonTextInput
              id="password"
              required={true}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <CommonTextInput
              id="password1"
              required={true}
              placeholder="Confirm Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-center sm:mt-6 p-4" onClick={() => setShowLoader(true)}>
            <CommonButtonSolidBlue text="Register" />
          </div>

        </form>
        <div className="flex justify-between text-center mt-2 text-md text-[color:var(--primaryPink)] font-semibold">
            <p className="text-[color:var(--mainTitleColor)] cursor-pointer mt-4" onClick={() => setPopupForgotPass(true)}>
              Forgot Password?
            </p>
            <Link href="/auth/">
            <p className="text-[color:var(--mainTitleColor)] cursor-pointer mt-4">
              Dont have an Account?
            </p>
            </Link>
          </div>
      </div>
      <div className="hidden sm:block mt-20 sm:mt-0 col-span-1 w-full flex flex-col justify-start items-center">
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
         
          <img src={imageUrls[index]} alt={``} className="w-full h-full object-cover hover:opacity-20" />
          
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
          
          <img src={imageUrls[index]} alt={``} className="w-full h-full object-cover hover:opacity-60" />
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
          <img src={imageUrls[index]} alt={``} className="w-full h-full object-cover hover:opacity-60" />
        </div>
      );
    })}
  </div>

      </div>

    </div>
  );
}
