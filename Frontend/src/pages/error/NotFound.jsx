import React from 'react';
import { Link } from 'react-router-dom';
import BGImage from '../../assets/bg.png';

const NotFound = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center h-screen bg-[#DCE2ED] text-white">
      <div className="flex flex-col text-black items-center md:w-1/2 p-4">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl mb-4">Page Not Found</h2>
        <p className="mb-4 text-center">Sorry, the page you're looking for doesn't exist.</p>
        <Link to="/signin" className="text-white font-semibold mt-4 px-4 py-2 bg-blue-500 rounded hover:bg-blue-600">
          Go Back Home
        </Link>
      </div>
      <div className="md:w-1/2 flex justify-center">
        <img 
          src={BGImage} 
          alt="Not Found" 
          className="hidden md:block p-2 w-full object-cover" // Hide on small screens, show on md and larger
        />
      </div>
    </div>
  );
};

export default NotFound;
