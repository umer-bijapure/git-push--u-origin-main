import React from 'react';
// import propertyImg from '../public/assests/TaskPage.png';
import Image from 'next/image';
import Link from 'next/link';

import { FaArrowAltCircleLeft, FaPlayCircle } from 'react-icons/fa';
export interface Course {
  course_name: string;
  course_id: string;
  date: Date;
  amount: number;
  month:string;
  year:string;
  profile_picture:string;
  description:string;
  createdAt:Date;
}
interface CourseDetailsProps {

    onClick:()=>void;
   details:Course;
  }

    export const CourseDetail: React.FC<CourseDetailsProps> = ({ onClick,details }) => {
  return (
    <div>
        <div className=' flex flex-col'>
            <div className='w-screen h-[30vh] lg:h-[40vh] relative'>
                <div className='absolute top-0 left-0 w-full h-[30vh] lg:h-[40vh]  bg-black/80 z-10]'/>
                <Image className='absolute z-1' layout='fill' objectFit='cover' src={details.profile_picture} alt='/' />
                <div className='absolute top-[70%] hover:-translate-y-1 hover:scale-110  duration-300 cursor-pointer max-w-[1240px] w-full left-[50%] right-[50%] translate-x-[-50%] translate-y-[-50%] text-white z-10 p-2'>
                    <h1 className='py-2 text-3xl '>{details.course_name}</h1>
                    <h3>{details.month} {details.year}</h3>
                    <h2>{details.description}</h2>
                </div>
                <div className='flex items-center gap-x-2 cursor-pointer text-white text-xl absolute bottom-0 p-2 m-2 hover:-translate-y-1 hover:scale-110  duration-300 cursor-pointer' onClick={onClick}><h1 className='text-3xl '><FaArrowAltCircleLeft/></h1> Back</div>
            </div>
            <div className='max-w-[1240px] mx-auto p-2 grid md:grid-cols-5 gap-8 pt-8'>
                <div className='col-span-4'>
                    <p>{details.course_name}</p>
                  
                    <p>
                      {details.description}
                    </p>
                </div>   
            </div>
        </div>
        <div className='flex  gap-x-2 w-full justify-center col-span-4 md:col-span-1 shadow-xl  shadow-gray-400 rounded-xl p-4'>          
           
            <div className='w-200 col-span-4 md:col-span-1 shadow-xl  shadow-gray-400 rounded-xl p-4'> 
            <Image src='/course1.jpg' alt={''} width={200} height={200} />
            <h2 className='relative  rounded-md flex items-center justify-center bg-red-700 text-white bottom-0 right-0 p-2 gap-x-2 m-10'> <FaPlayCircle/>PLAY</h2>
            </div>
            <div className='col-span-4 md:col-span-1 shadow-xl shadow-gray-400 rounded-xl p-4'>  
            <Image src='/course2.jpg' alt={''} width={200} height={200} /> 
            <h2 className='relative  rounded-md flex items-center justify-center bg-red-700 text-white bottom-0 right-0 p-2 gap-x-2 m-10'> <FaPlayCircle/>PLAY</h2>

            </div>
        </div>
    </div>
  );
};

export default CourseDetail