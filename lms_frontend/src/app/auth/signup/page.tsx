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
    <div className="flex w-full items-center justify-center h-screen py-10 bg-[color:var(--mainTitleColor)] ">
      <div className="w-2/3 m-20 p-4 shadow-md hover:bg-white bg-white bg-opacity-40 shadow-xl  ">
        <div className='flex items-center justify-center'>
        <Image  src='/rubiconversity.png' width={200} height={200} alt={'Rubicon'}/></div> 
      

        {showLoader ? (
          <div className="mx-auto flex flex-col align-middle items-center mt-[-20px] justify-center">
            <CommonSpinner />
          </div>
        ) : (
          <></>
        )}
        {errorMessage.length > 0 ? <CommonAlert message={errorMessage} type="error" /> : <></>}
        <form onSubmit={formSubmitHandler} className="my-2 gird grid-cols-2 col-span-6 space-y-2 p-20">
        <div className="col-span-6">
            <CommonTextInput
              id="email_id"
              required={true}
              placeholder="First Name"
              onChange={(e) => setEmail(e.target.value)}
              
            />
          </div>
          <div className="col-span-6">
            <CommonTextInput
              id="email_id"
              required={true}
              placeholder="Last Name"
              onChange={(e) => setEmail(e.target.value)}
              
            />
          </div>
          <div className="col-span-6">
            <CommonTextInput
              id="email_id"
              required={true}
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
              
            />
          </div>
          <div className="col-span-6">
            <CommonTextInput
              id="password1"
              required={true}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="col-span-6">
            <CommonTextInput
              id="password1"
              required={true}
              placeholder="Confirm Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-center sm:mt-6 p-4" onClick={() => setShowLoader(true)}>
            <CommonButtonSolidBlue text="Login" />
          </div>
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
        </form>
      </div>
      <div className="w-full flex flex-col justify-center items-center mt-[-400px]">
  {/* First grid with two hexagons */}
  <div className="flex gap-2  ml-[300px]  p-10 z-10">
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
  <div className="flex gap-2 mt-[246px]">
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
  <div className="flex gap-2 mt-[-100px] ml-[78px] ">
    {[2,3].map((index) => {
      const position = calculatePosition(index);
      return (
        <div
          key={index}
          className={`w-200 h-230 relative bg-blue-500 hexagon2 opacity-50 transition duration-300 ease-in-out col-span-2`}
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
  <div className="flex gap-2 mt-[-110px]">
    {[4,5].map((index) => {
      const position = calculatePosition(index);
      return (
        <div
          key={index}
          className={`w-140 h-180 relative  hexagon2 opacity-20 transition duration-300 ease-in-out col-span-2 `}
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
</div>

    </div>
  );
}
