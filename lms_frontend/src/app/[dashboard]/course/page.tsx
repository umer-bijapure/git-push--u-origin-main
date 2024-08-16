'use client';
import React, { useEffect } from 'react';
import {useState} from 'react'
import Image from 'next/image'
import Link from 'next/link'


import axios from 'axios';
import { CommonTextInput } from '@/app/components/common/inputs';

import { CommonButton, CommonButtonGreen, CommonButtonSolidBlue } from '@/app/components/common/buttons';
import AddCourse from './addCourse';
import AddCourseCategory from './category/creatCategory';
import CourseDetail from './profile/profile';


export interface Course {
    id: string;
    title: string;
    description:string;
    courseCategoryId: string;
    startDate: Date;
    endDate: Date;
    profilePicture:string;
    createdAt:Date;
    
  }

  export default function Home() {
    const [selectedMonth, setSelectedMonth] = useState<string>('All Months');
    const [selectedYear, setSelectedYear] = useState<string>('All Years');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState(''); // Added sorting state
    const [showDetails, setShowDetails] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null); // State for selected course
    const [details, setDetails] = useState<Course[]>();
    const [activeSlideover, setActiveSlideover] = useState<null | 'user' | 'course' | 'courseCategory'>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('All Categories'); 
    const [loading, setLoading] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorText, setErrorText] = useState('');
  
    const months = ['All Months', 'January', 'February', 'March'];
    const years = ['All Years', '2022', '2023', '2024'];
    const categories = ['All Categories', 'IT and Software', 'Aptitude Development'];
  
    const fetchCourses = async () => {
      setLoading(true);
      setShowError(false);
      try {
        const response = await axios.get('http://localhost:5116/api/Course'); // Update with your API endpoint
        setDetails(response.data);
      } catch (error) {
        setShowError(true);
        setErrorText('Failed to load courses');
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchCourses();
    }, []);
  
    const handleCourseClick = (course: Course) => {
      setSelectedCourse(course);
      setShowDetails(true);
    };
  
    const onClose = () => {
      setActiveSlideover(null);
    };
  
    return (
      <>
        {activeSlideover === 'course' && (
          <AddCourse
            onClose={onClose}
            loading={loading}
            showError={showError}
            errorText={errorText}
          />
        )}
        {activeSlideover === 'courseCategory' && (
          <AddCourseCategory
            onClose={onClose}
            loading={loading}
            showError={showError}
            errorText={errorText}
          />
        )}
        {!showDetails && (
          <div className='bg-gray-200 w-full pt-14'>
            <div className='bg-white w-full text-2xl p-2 m-2'>
              <div className='flex justify-between items-center'>
                <h3 className='font-semibold text-[color:var(--mainTitleColor)] opacity-60'>Course Overview</h3>
                <div className='flex items-center justify-end p-2 m-2'>
                  <div className='flex items-center justify-end p-2 m-2'>
                    <CommonButtonGreen text='Create Course' onClick={() => setActiveSlideover('course')} />
                  </div>
                  <div className='flex items-center justify-end p-2 m-2'>
                    <CommonButtonGreen text='Create Category' onClick={() => setActiveSlideover('courseCategory')} />
                  </div>
                </div>
              </div>
              <hr className='mt-4'></hr>
              <div className='flex flex-col items-center justify-center space-x-4 mb-4 p-2 md:p-4 text-md'>
                <div className='w-full hover:-translate-y-1 hover:scale-101 duration-300 cursor-pointer'>
                  <CommonTextInput
                    id='search'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder='Search Course..'
                  />
                </div>
              </div>
              <div className='text-center font-semibold'>
                <div className='flex flex-wrap gap-4 items-center justify-start'>
                  {details?.map((course) => (
                    <div
                      key={course.id}
                      className='shadow-md rounded-md gap-x-4 gap-y-4 w-[240px] hover:-translate-y-1 hover:scale-105 duration-300 cursor-pointer'
                      onClick={() => handleCourseClick(course)}
                    >
                      <div className='relative flex items-center justify-center h-[120px] w-full rounded-t-md p-4 group hover:bg-slate-900 hover:bg-opacity-100'>
                        <Image className="group-hover:opacity-20 rounded-t-md" fill={true} src={course.profilePicture ? course.profilePicture : '/course-4.png'} alt={course.title} />
                        <div className='hidden group-hover:block absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                          <h3 className='text-xl text-white tracking-wider text-center'>{course.title}</h3>
                          <p className='text-sm pb-4 pt-2 text-white text-center'>Course Date and Technology Stack</p>
                        </div>
                      </div>
                      <div className='flex items-center justify-center w-full bg-white h-[50px] rounded-b-md overflow-hidden'>
                        <p className='text-[16px] mt-2 text-[color:var(--mainTitleColor)] overflow-hidden whitespace-nowrap text-overflow-ellipsis'>
                          {course.title}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        {showDetails && selectedCourse && (
          <CourseDetail
            details={selectedCourse}
            onClick={() => setShowDetails(false)}
          />
        )}
      </>
    );
  }