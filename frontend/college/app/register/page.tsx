'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';


const RegisterPage: React.FC = () => {
  

  const router = useRouter();

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    usertype: 'student',
    password: '',
    confirmpassword: '',
    sendmail: false,
  });
  const [error, setError] = useState('');

  const [message, setMessage] = useState('');

  const handleSubmitRegister = async () => {
    try {
      const response = await fetch('http://localhost:3030/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
       router.push('/home');

      } else {
        setMessage(data.message || 'Error occurred');
      }
      
    } catch (error) {
      setMessage('An unexpected error occurred');
    }
  }

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  //   const { name, value } = e.target;
  
  //   if (e.target instanceof HTMLInputElement && e.target.type === 'checkbox') {
  //     setFormData({
  //       ...formData,
  //       [name]: e.target.checked,
  //     });
  //   } else {
  //     setFormData({
  //       ...formData,
  //       [name]: value,
  //     });
  //   }
  // };
 
  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setFormData({
      ...formData,
      firstname: value,
    });

  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setFormData({
      ...formData,
      email: value,
    });

  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setFormData({
      ...formData,
      password: value,
    });

  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setFormData({
      ...formData,
      confirmpassword: value,
    });

  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setFormData({
      ...formData,
      phone: value,
    });

  };

  const handleUserTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    setFormData({
      ...formData,
      usertype: value,
    });

  };


  return (
    <div className="font-[sans-serif] relative">
      <div className="h-[240px] font-[sans-serif]">
        <img src="https://readymadeui.com/cardImg.webp" alt="Banner Image" className="w-full h-full object-cover" />
      </div>

      <div className="relative -mt-40 m-10">
        <form className="bg-white max-w-xl w-full mx-auto shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6 sm:p-8 rounded-2xl">
          <div className="mb-12">
            <h3 className="text-gray-800 text-3xl text-center">Register</h3>
          </div>

          <div>
            <label className="text-gray-800 text-xs block mb-2">Full Name</label>
            <div className="relative flex items-center">
              <input name="name" placeholder="Enter name" type="text"  required className="w-full bg-transparent text-sm text-gray-800 border-b border-gray-300 focus:border-blue-500 pl-2 pr-8 py-3 outline-none" onChange={handleFullNameChange}  />
              <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-2" viewBox="0 0 24 24">
                <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
              </svg>
            </div>
          </div>

          <div className="mt-8">
            <label className="text-gray-800 text-xs block mb-2">Email</label>
            <div className="relative flex items-center">
              <input name="email" type="text" required className="w-full bg-transparent text-sm text-gray-800 border-b border-gray-300 focus:border-blue-500 pl-2 pr-8 py-3 outline-none" placeholder="Enter email" onChange={handleEmailChange} />
              <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-2" viewBox="0 0 682.667 682.667">
                <defs>
                  <clipPath id="a" clipPathUnits="userSpaceOnUse">
                    <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                  </clipPath>
                </defs>
                <g clip-path="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                  <path fill="none" stroke-miterlimit="10" stroke-width="40" d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z" data-original="#000000"></path>
                  <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z" data-original="#000000"></path>
                </g>
              </svg>
            </div>
          </div>

          <div className="mt-8">
            <label className="text-gray-800 text-xs block mb-2">Phone Number</label>
            <div className="relative flex items-center">
              <input name="phone" type="text" required className="w-full bg-transparent text-sm text-gray-800 border-b border-gray-300 focus:border-blue-500 pl-2 pr-8 py-3 outline-none" placeholder="Enter phone number" onChange={handlePhoneNumberChange}/>
              <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-2 cursor-pointer" viewBox="0 0 128 128">
                <path d="M104.3 80.7l-16-16c-2.1-2.1-5.5-2.1-7.6 0l-5.1 5.1c-1.6 1.6-1.6 4.1 0 5.7l6.9 6.9c-6.5 3.8-14.1 6.4-22.1 7.7-8.4 1.4-16.9-.1-24.3-4.7-7.2-4.5-13.1-10.4-18.5-17.1-5.2-6.7-9.2-14.3-12.1-22.2-1.2-3.5 1.2-7.4 4.7-8.5l5.1-1.8c2.7-.9 5.7.2 7.4 2.5l4.9 7.3c1.3 2 3.8 2.6 5.7 1.3l8.2-5.4c2.6-1.7 3.5-5.1 2.1-7.8-5.5-11.4-14.4-20.4-25.5-26.7-6.6-4.4-14.2-7.4-21.8-8.9-2.7-.7-5.5 1-6.5 3.6l-3.3 9.4c-1.1 3.1 1.1 6.4 4.3 6.7 7.6 1 14.9 4.7 21.1 9.8 6.2 5.1 11.5 11.4 16.2 18.1 2.1 3.2 4.8 6.3 8.4 7.8 3.4 1.3 7.3.9 10.3-1.4l13.5-10.8c2.4-2 2.5-5.4.1-7.6z" data-original="#000000"></path>
              </svg>
            </div>
          </div>

          <div className="mt-8">
          <label className="text-gray-800 text-xs block mb-2">User Type</label>
            <select className="bg-white border border-gray-300 text-gray-800 rounded-md p-2 mt-1" onChange={handleUserTypeChange}>
                <option value="student">Student</option>
                <option value="parent">Parent</option>
                <option value="other">Other</option>
            </select>
            </div>

          <div className="mt-8">
            <label className="text-gray-800 text-xs block mb-2">Password</label>
            <div className="relative flex items-center">
              <input name="password" type="password" required className="w-full bg-transparent text-sm text-gray-800 border-b border-gray-300 focus:border-blue-500 pl-2 pr-8 py-3 outline-none" placeholder="Enter password" onChange={handlePasswordChange} />
              <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-2 cursor-pointer" viewBox="0 0 128 128">
                <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
              </svg>
            </div>
          </div>

          <div className="mt-8">
            <label className="text-gray-800 text-xs block mb-2">Confirm Password</label>
            <div className="relative flex items-center">
              <input name="confirmpassword" type="password" required className="w-full bg-transparent text-sm text-gray-800 border-b border-gray-300 focus:border-blue-500 pl-2 pr-8 py-3 outline-none" placeholder="Confirm password" onChange={handleConfirmPasswordChange} />
              <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-2 cursor-pointer" viewBox="0 0 128 128">
                <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
              </svg>
            </div>
          </div>

          <div className="flex items-center mt-8">
            <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 rounded" />
            <label htmlFor="remember-me" className="ml-3 block text-sm">
              I accept the <a href="javascript:void(0);" className="text-blue-500 font-semibold hover:underline ml-1">Terms and Conditions</a>
            </label>
          </div>

          <div className="flex items-center mt-8">
            <input id="send-email" name="send-email" type="checkbox" className="h-4 w-4 shrink-0 rounded" />
            <label htmlFor="send-email" className="ml-3 block text-sm">
              send notification to your email 
            </label>
          </div>

          <div className="mt-8">
            <button type="button" className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none transition-all" onClick={handleSubmitRegister}>
              Register
            </button>
            <p className="text-gray-800 text-sm mt-4 text-center">Already have an account? <a href="javascript:void(0);" className="text-blue-500 font-semibold hover:underline ml-1">Login here</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
