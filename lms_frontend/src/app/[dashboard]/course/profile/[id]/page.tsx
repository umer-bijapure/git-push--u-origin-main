'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Course {
  id: string;
  title: string;
  description: string;
  profilePicture: string;
  startDate: string;
  endDate: string;
  // Add other course properties here
}

interface CourseProfileProps {
  params: {
    id: string;
  };
}

export default function CourseProfile({ params }: CourseProfileProps) {
  const { id } = params; // Get the course ID from the URL
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5116/api/Course/${id}`); // Update with your API endpoint
        setCourse(response.data);
      } catch (error) {
        setError('Failed to load course details');
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='p-4 bg-white text-gray-900'>
      <h1 className='text-2xl font-bold'>{course?.title || 'No Title Available'}</h1>
      <p className='mt-2'>{course?.description || 'No Description Available'}</p>
      {course?.profilePicture && (
        <img src={course.profilePicture} alt={course.title} className='mt-4 w-full h-auto object-cover' />
      )}
      {/* Display other course details here */}
    </div>
  );
}
