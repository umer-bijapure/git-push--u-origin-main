import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';

const Advertisements: React.FC = () => {
  const ads = [
    "Enroll in our summer courses now!",
    "Get 20% off on all textbooks.",
    "Join our community forum for free."
  ];
  const advertisements = [
    { id: 1, text: 'Python Course', imageUrl: '/course1.jpg' },
    { id: 2, text: 'Java Course', imageUrl: '/course2.jpg' },
    { id: 3, text: 'Trainings and Workshops', imageUrl: '/personal.png' },

  ];

  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentAdIndex((prevIndex) => (prevIndex - 1 + advertisements.length) % advertisements.length);
  };

  const handleNext = () => {
    setCurrentAdIndex((prevIndex) => (prevIndex + 1) % advertisements.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdIndex((prevIndex) => (prevIndex + 1) % advertisements.length);
    }, 5000); // Adjust the interval as needed (5 seconds in this example)

    return () => {
      clearInterval(interval);
    };
  }, []);



  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4"></h2>
          <div className="flex flex-col items-start relative m-2">
    <div className="relative flex w-full items-center justify-between h-[200px] ">
      <button
        onClick={handlePrevious}
        className="absolute left-[-50px] text-3xl"
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>
      <div className='flex justify-between items-center w-full'>
        <ul>
      {ads.map((ad, index) => (
          <li key={index} className="mb-2">{ad}</li>
        ))}</ul>
      <div className="flex flex-col items-center justify-center text-xl font-bold">
        <img
          src={advertisements[currentAdIndex].imageUrl}
          alt={advertisements[currentAdIndex].text}
          className="w-[200px] h-[200px] object-contain rounded-xl"
        />
        <h1 className="mt-4">{advertisements[currentAdIndex].text}</h1>
      </div>
      </div>
      <button
        onClick={handleNext}
        className="absolute right-[-50px] text-3xl "
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
    </div>
  </div>
     
    </div>
  );
};

export default Advertisements;
