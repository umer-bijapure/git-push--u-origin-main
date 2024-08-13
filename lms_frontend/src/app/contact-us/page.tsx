'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { AiOutlineMail, AiOutlinePhone } from 'react-icons/ai';
import { BsFillPersonLinesFill, BsFillTelephoneFill } from 'react-icons/bs';
import { MdEmail } from "react-icons/md";
import { FaInstagram, FaFacebook, FaLocationArrow, FaTwitter } from 'react-icons/fa';
import axios from 'axios';
import { IoLocationSharp } from 'react-icons/io5';

type Props = {};

export default function ContactUs({}: Props) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const formSubmitHandler = (e: any) => {
    e.preventDefault();
    if (name.length == 0) {
      setErrorMessage('Name is Required');
      return;
    }
    if (phone.length == 0) {
      setErrorMessage('Phone No. is Required');
      return;
    }
    if (email.length == 0) {
      setErrorMessage('Email is Required');
      return;
    }
    if (subject.length == 0) {
      setErrorMessage('Subject is Required');
      return;
    }
    if (message.length == 0) {
      setErrorMessage('Message is Required');
      return;
    }
    const secondsSinceEpoch = Math.round(Date.now() / 1000);
    const body = {
      name,
      phone,
      email,
      subject,
      message,
      datetime: secondsSinceEpoch.toString(),
    };
    setErrorMessage('');
    axios
      .post('https://api.kuickplan.com/api/contact-us', body, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        setErrorMessage('Sent Successfully!');
        return;
      })
      .catch((e) => {
        setErrorMessage(e.response.data['message']);
      });
  };

  return <div className='min-h-[90vh] mt-20 py-8 px-4 flex flex-col-reverse lg:flex-row align-middle justify-start bg-white'>
    <div className='flex-1 m-4 flex flex-col align-middle justify-start'>
      <h3 className='font-bold text-lg lg:text-2xl my-4 text-[color:var(--primaryPink)]'>For Enquiry</h3>
      <div className='mt-4 mb-2 flex flex-row align-middle justify-start'>
        <BsFillTelephoneFill className='m-4' color='var(--primaryPink)' size={32} />
        <div className='grow flex flex-col align-middle justify-center m-2'>
          <h5 className='text-lg font-bold text-[color:var(--primaryPink)]'>Mr. Pravir Kumar</h5>
          <Link href={"tel:+919529882280"}><p className='text-lg font-semibold'>+91 954573663738</p></Link>
        </div>
      </div>
      <div className='mt-4 mb-2 flex flex-row align-middle justify-start'>
        <MdEmail className='m-4' color='var(--primaryPink)' size={32} />
        <div className='grow flex flex-col align-middle justify-center m-2'>
          <h5 className='text-lg font-bold text-[color:var(--primaryPink)]'>Email</h5>
          <Link href={"mailto:contact_us@kuickplan.com"}><p className='text-lg font-semibold'>contact_us@myrubicon.com</p></Link>
        </div>
      </div>
      <div className='my-2 flex flex-row align-middle justify-start'>
        <IoLocationSharp className='m-4' color='var(--primaryPink)' size={32} />
        <div className='grow flex flex-col align-middle justify-center m-2'>
          <h5 className='text-lg font-bold text-[color:var(--primaryPink)]'>Address</h5>
          <p className='text-lg font-semibold leading-6'>
            Mantri Business Pakr<br />
            Viman-nagar<br />
            Pune - 411048<br />
            Maharashtra, India<br />
          </p>
        </div>
      </div>
      <div className='mt-6 mb-4 flex flex-col align-top justify-start text-center'>
        <h5 className='text-lg font-bold text-[color:var(--primaryPink)]'>Follow Us On</h5>
        <div className='grow flex flex-row align-middle justify-center mx-auto'>
          <div className='m-4'>
            <Link href={"https://www.instagram.com/kuickplan"}>
              <FaInstagram color='var(--mainTitleColor)' size={30} />
            </Link>
          </div>
          <div className='m-4'>
            <FaFacebook color='var(--mainTitleColor)' size={30} />
          </div>
          <div className='m-4'>
            <FaTwitter color='var(--mainTitleColor)' size={30} />
          </div>
        </div>
      </div>
    </div>
    <div className='flex-1 p-4 flex flex-col align-top justify-start'>
      <h1 className='mb-2 font-bold text-[color:var(--primaryPink)] text-2xl lg:text-4xl'>CSR Trainings</h1>
      <p className='text-lg mb-4 text-[color:var(--mainTitleColor)] font-semibold'>Drop us a message and we will get back to you</p>
      <div className="w-full">
          <p className="my-4 text-center text-xl  font-semibold text-[color:var(--primaryPink)]">
            {errorMessage}
          </p>
          <form onSubmit={formSubmitHandler} className='text-[color:var(--titleColor)]'>
            <div className="grid md:grid-cols-2 gap-4 w-full py-2 font-bold">
              <div className="flex flex-col">
                <label className="uppercase text-sm py-2">Name</label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  className="border-[1px] font-medium rounded-lg p-1 flex border-gray-300"
                  type="text"
                />
              </div>
              <div className="flex flex-col">
                <label className="uppercase text-sm py-2">
                  Phone Number
                </label>
                <input
                  onChange={(e) => setPhone(e.target.value)}
                  className="border-[1px] font-medium rounded-lg p-1 flex border-gray-300"
                  type="text"
                />
              </div>
            </div>

            <div className="flex flex-col font-bold">
              <label className="uppercase text-sm py-2">Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="border-[1px] font-medium rounded-lg p-1 flex border-gray-300"
                type="email"
              />
            </div>
            <div className="flex flex-col font-bold">
              <label className="uppercase text-sm py-2">Subject</label>
              <input
                onChange={(e) => setSubject(e.target.value)}
                className="border-[1px] font-medium rounded-lg p-1 flex border-gray-300"
                type="text"
              />
            </div>
            <div className="flex flex-col py-2 font-bold ">
              <label className="uppercase text-sm py-2 ">Message</label>
              <textarea
                onChange={(e) => setMessage(e.target.value)}
                className="border-[1px] font-medium rounded-lg p-1 border-gray-300"
                rows={5}
              ></textarea>
            </div>
            <div className=" flex items-center justify-center font-bold">
              <button className="w-full p-4 bg-[color:var(--contact)] mt-4 primaryBtn">
                Send Message
              </button>
            </div>
          </form>
      </div>
    </div>
  </div>
}
