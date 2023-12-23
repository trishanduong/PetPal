'use client'

import React, { useState } from 'react';
import Link from 'next/link';

import { RiArrowDownSFill } from "react-icons/ri";
import { HiArrowLeftOnRectangle } from 'react-icons/hi2';
import { RiAccountCircleFill, RiSettings2Fill } from "react-icons/ri";

const Dropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    console.log('toggle', isDropdownOpen)
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center pl-5 pr-3 py-2 text-gray-900 bg-white rounded-full hover:bg-gray-100 dark:text-white dark:bg-amber-700 hover:dark:bg-amber-600"
        id="dropdownNavbarLink"
        aria-expanded={isDropdownOpen}>
        {'★'}
        <RiArrowDownSFill />
      </button>
      { isDropdownOpen && (
        <div
          className="absolute right-0 z-20 w-44 py-2 mt-2 bg-white rounded-lg shadow-xl dark:bg-amber-50"
          id="dropdownNavbar"
        >
          <Link
            href="/profileview"
            className="block px-4 py-2 text-sm text-amber-700 hover:bg-gray-100 dark:text-amber-800 dark:hover:bg-amber-600 dark:hover:text-white"
          >
            <div className='flex items-center gap-2'>
              <RiAccountCircleFill />  Profile
            </div>
          </Link>
          <Link
            href="/profileview/edit" 
            className="block px-4 py-2 text-sm text-amber-700 hover:bg-gray-100 dark:text-amber-800 dark:hover:bg-amber-600 dark:hover:text-white"
          >
            <div className='flex items-center gap-2'>
              <RiSettings2Fill /> Settings
            </div>
          </Link>
          <a
            href="/api/auth/signout"
            className="block px-4 py-2 text-sm text-amber-700 hover:bg-gray-100 dark:text-amber-800 dark:hover:bg-amber-600 dark:hover:text-white"
          >
            <div className='flex items-center gap-2'>
            <HiArrowLeftOnRectangle /> Sign out
            </div>
          </a>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
