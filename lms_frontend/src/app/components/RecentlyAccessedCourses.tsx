import React from 'react';
import { Course } from '../[dashboard]/course/page';
import Image from 'next/image'
const RecentlyAccessedCourses: React.FC = () => {
  const courses = [
    "Introduction to Programming",
    "Advanced Mathematics",
    "History of Art"
  ];
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
      createdAt: new Date('2022-05-20')
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
      createdAt: new Date('2023-03-01')
    },


  ];
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">Recently Accessed Courses</h2>
      <div className='flex flex-wrap gap-4 items-center justify-start' >
        {
          initialCourses.map((course, index) => (
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
          ))
        }
        </div>
    </div>
  );
};

export default RecentlyAccessedCourses;
