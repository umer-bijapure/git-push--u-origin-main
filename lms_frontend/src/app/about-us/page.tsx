'use client';
import React from 'react';
import Link from 'next/link';
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';

type Props = {};

export default function AboutUs({}: Props) {
  return (
    <div className='min-h-[90vh] flex flex-col align-middle justify-start bg-white'>
      <h2 className='mt-8 my-4 lg:my-8 font-bold text-[color:var(--primaryPink)] text-center text-2xl xl:text-4xl'>About Us</h2>
      <div className='flex flex-col align-middle mx-auto justify-start my-4 w-[90vw] lg:w-[70vw] font-semibold text-lg xl:text-xl text-[color:var(--mainTitleColor)]'>
        <p className='my-2'>
Business and Journy Details
        </p>
        <p className='my-2'>
          excellence drove us from the beginning and continues to drive us today. To find out more, take a look at our website, visit our store, email us, or pick up the phone and give us a call!
        </p>
        <p className='my-4'>
        We look forward to meeting you.
        </p>
      </div>
      <p className='text-center mb-2 mt-4 lg:mt-8 font-semibold text-[color:var(--primaryPink)] text-lg xl:text-xl'>See The Success Stories</p>
      <div className='mx-auto flex flex-row align-middle justify-center'>
        <div className='m-4'>
          <Link target={"_blank"} href={"https://www.instagram.com/kuickplan"}>
            <FaInstagram color='var(--mainTitleColor)' size={30} />
          </Link>
        </div>
        <div className='m-4'>
          <Link target={"_blank"} href={"https://www.facebook.com/profile.php?id=100089094078254&mibextid=ZbWKwL"}>
            <FaFacebook color='var(--mainTitleColor)' size={30} />
          </Link>
        </div>
        <div className='m-4'>
          <Link target={"_blank"} href={"https://twitter.com/kuickplan?t=dA_cnQ5SoW3G8SIojgCOkQ&s=09"}>
            <FaTwitter color='var(--mainTitleColor)' size={30} />
          </Link>
        </div>
      </div>
    </div>
  );
}
