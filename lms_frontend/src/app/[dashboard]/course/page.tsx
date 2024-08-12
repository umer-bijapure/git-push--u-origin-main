'use client';
import React, { useEffect } from 'react';
import {useState} from 'react'
import Image from 'next/image'
import Link from 'next/link'


import axios from 'axios';
import { CommonTextInput } from '@/app/components/common/inputs';
import { CourseDetail } from './profile/page';
import { CommonButton, CommonButtonGreen, CommonButtonSolidBlue } from '@/app/components/common/buttons';
import AddCourse from './addCourse';
import AddCourseCategory from './category/creatCategory';


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
    category: string;
  }
  const initialCourses: Course[] = [
    {
      course_name: 'Python for Data Science',
      course_id: '3',
      date: new Date('2022-05-20'),
      amount: 150,
      month: 'May',
      year: '2022',
      profile_picture: '/python.jpg',
      description: 'Learn Python for data science.',
      createdAt: new Date('2022-05-20'),
      category: 'It and Software',
    },
    {
      course_name: 'Aptitude Development',
      course_id: '1',
      date: new Date('2023-03-01'),
      amount: 100,
      month: 'March',
      year: '2023',
      profile_picture: '/apti.png',
      description: 'Learn problem solving & critical thinking',
      createdAt: new Date('2023-03-01'),
      category: 'Aptitude Development',
    },
    {
      course_name: 'Advanced JavaScript',
      course_id: '2',
      date: new Date('2023-04-15'),
      amount: 200,
      month: 'April',
      year: '2023',
      profile_picture: '/course-bg.png',
      description: 'Master advanced JavaScript concepts.',
      createdAt: new Date('2023-04-15'),
      category: 'It and Software',
    },

  ];
export default function Home(){
const [selectedMonth, setSelectedMonth] = useState<string>('All Months');
const [selectedYear, setSelectedYear] = useState<string>('All Years');
const [searchTerm, setSearchTerm] = useState('');
const [sortBy, setSortBy] = useState(''); // Added sorting state
const [showDetails,setShowDetails]=useState(false);
const [details, setDetails] = useState<Course[]>(initialCourses);
const [selectedProfileData, setSelectedProfileData] = useState<typeof details[number] | null>(null);
const [activeSlideover, setActiveSlideover] = useState<null | 'user' | 'course' | 'courseCategory'>(null);
const [selectedCategory, setSelectedCategory] = useState<string>('All Categories'); 
const [loading, setLoading] = useState(false);
const [showError, setShowError] = useState(false);
const [errorText, setErrorText] = useState('');

const months = ['All Months', 'January', 'February', 'March'];
const years = ['All Years', '2022', '2023', '2024' ];
const categories = ['All Categories', 'It and Software', 'Aptitude Development']; 

  
const filteredCourses = details
    .filter((course) => {
      const isMonthMatch = selectedMonth === 'All Months' || course.month === selectedMonth;
      const isYearMatch = selectedYear === 'All Years' || course.year === selectedYear;
      const isCategoryMatch = selectedCategory === 'All Categories' || course.category === selectedCategory; // Added category filter
      return isMonthMatch && isYearMatch && isCategoryMatch;
    })
    .filter((course) => course.course_name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.course_name.localeCompare(b.course_name);
      } else if (sortBy === 'id') {
        return a.course_id.localeCompare(b.course_id);
      } else if (sortBy === 'date') {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);

        // Check if conversion to Date was successful before comparing
        if (!isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) {
          return dateA.getTime() - dateB.getTime();
        } else {
          // Handle the case where conversion fails, e.g., by treating it as equal
          return 0;
        }
      } else {
        return 0;
      }
    });


  const toggleProfile = (index: any) => {
    const selectedItem = details[index];
    setSelectedProfileData(selectedItem);
    setShowDetails(true);
  };
  const handleCreateSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic
  };

  const onClose = () => {
    setActiveSlideover(null);
  };

return(
    <>
  {showDetails && selectedProfileData &&<CourseDetail details={selectedProfileData} onClick={()=>setShowDetails(false)}/>}
  {activeSlideover === 'course' && (
        <AddCourse
          onClose={onClose}
          handleSubmit={handleCreateSubmit}
          loading={loading}
          showError={showError}
          errorText={errorText}
        />
      )}
            {activeSlideover === 'courseCategory' && (
        <AddCourseCategory
          onClose={onClose}
          handleSubmit={handleCreateSubmit}
          loading={loading}
          showError={showError}
          errorText={errorText}
        />
      )}
    {!showDetails && 
    <div className='bg-gray-200 w-full pt-14'>

        <div className='bg-white w-full text-2xl p-2 m-2'>
          <div className='flex justify-between items-center'>
            <h3 className='font-semibold text-[color:var(--mainTitleColor)] opacity-60'>Course Overiew</h3>
            <div className='flex items-center justify-end p-2 m-2'>
       <div className='flex items-center justify-end p-2 m-2'>
        <CommonButtonGreen text='Create Course' onClick={() => setActiveSlideover('course')}/>

         </div>
         <div className='flex items-center justify-end p-2 m-2'>
        <CommonButtonGreen text='Create Category' onClick={() => setActiveSlideover('courseCategory')}/>

         </div>
         </div>
            </div>
            <hr className='mt-4'></hr>
            <div className='flex flex-col items-center justify-center space-x-4 mb-4 p-2 md:p-4 text-md'>
           
          <div className='w-full hover:-translate-y-1 hover:scale-101  duration-300 cursor-pointer'>
            <CommonTextInput
              id='search'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder='Search Course..'
            />
          </div>
          <div className='flex flex-wrap sm:p-4 '>
          <div className="relative h-10 m-2 w-40 min-w-[200px] md:w-72 md:min-w-[200px] ">

              <select
                id='sortBy'
                className='peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all
                 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50'
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value=''>-- Select --</option>
                <option value='name'>Name</option>
                <option value='id'>ID</option>
                <option value='date'>Date</option>
              </select>
              <label htmlFor='sortBy' className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l 
              before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200
               after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent 
               peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Sort By
              </label>
            </div>
            <div className="relative h-10 m-2 w-40 min-w-[200px] md:w-72 md:min-w-[200px]">

              <select
                id='selectMonth'
                className='peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all
                placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50'
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                {months.map((month, index) => (
                  <option key={index} value={month}>
                    {month}
                  </option>
                ))}
              </select>
              <label htmlFor='selectMonth' 
              className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l 
              before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200
               after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent 
               peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Select Month
              </label>
            </div>
            <div className="relative h-10 m-2 w-40 min-w-[200px] md:w-72 md:min-w-[200px]">

              <select
                id='selectYear'
                className='peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all
                placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50'
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                {years.map((year, index) => (
                  <option key={index} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <label htmlFor='selectYear' 
                     className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l 
                     before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200
                      after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent 
                      peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Select Year
              </label>
            </div>
            <div className="relative h-10 m-2 w-40 min-w-[200px] md:w-72 md:min-w-[200px]">

              <select
                id='categories'
                className='peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all
                placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50'
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <label
                    htmlFor='categories'
                    className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l 
                    before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200
                     after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent 
                     peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Category
                  </label>
                </div>
            </div>
            
      </div>
      <div className='text-center font-semibold'>
      <div className='flex flex-wrap gap-4 items-center justify-start  ' >
        {filteredCourses.length === 0 ? (
          <p>No Courses found.</p>
        ) : (
          filteredCourses.map((course, index) => (
            <div className='shadow-md rounded-md gap-x-4 gap-y-4 w-[240px] hover:-translate-y-1 hover:scale-105  duration-300 cursor-pointer' >
             <div className='relative flex items-center justify-center h-[120px] w-full rounded-t-md p-4 group hover:bg-slate-900 hover:bg-opacity-100'>
             <Image className=" group-hover:opacity-20 rounded-t-md" fill={true}  src={course.profile_picture} alt='/'/>
             <div className='hidden group-hover:block absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                 <h3 className='text-xl text-white tracking-wider text-center '>{course.course_name}</h3>
                 <p className='text-sm pb-4 pt-2 text-white text-center'>Course Date and Technology Stack</p>
 
             </div>
 
         </div>
         <div className='flex items-center justify-center w-full bg-white h-[50px] rounded-b-md overflow-hidden'>
           <p className='text-[16px] mt-2 text-[color:var(--mainTitleColor)] overflow-hidden whitespace-nowrap text-overflow-ellipsis'>
             {course.course_name}
           </p>
         </div>
  
            
              </div>
           )))}

        </div>
      </div>
        </div>
    </div>}
    </>
)
}