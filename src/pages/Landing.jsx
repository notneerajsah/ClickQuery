import React from 'react';
import { useNavigate } from 'react-router-dom';
import image from '../assets/image.png'; // Assuming you have imported your image correctly

const Landing = () => {
  const navigate = useNavigate();

  const handleClick = (targetRoute) => {
    navigate(targetRoute);
  };

  return (
    <div
      className="landing-container flex flex-col items-center justify-center min-h-screen bg-gray-100"
      style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <section className="hero w-full px-4 py-8 text-center">
        <h1 className="text-4xl font-bold text-gray">Welcome to ClickQuery</h1>
        <p className="text-xl text-black-100 text-clip text-pretty z-100 mt-4 hover:underline underline-offset-2">
          Welcome to our innovative database management tool! Our platform allows you to easily create and manage your
          databases without the need to write complex SQL queries. Whether you're a beginner or an experienced developer,
          our user-friendly interface simplifies the process of setting up and managing your data.
        </p>
        <button
          onClick={() => handleClick('/about')}
          className="mt-8 px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700"
        >
          Learn More
        </button>
      </section>

      <section className="cta w-full px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-black-100">Ready to Get Started?</h2>
        <button
          onClick={() => handleClick('/signup')}
          className="mt-8 px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700"
        >
          Sign Up Now!
        </button>
      </section>
    </div>
  );
};

export default Landing;
