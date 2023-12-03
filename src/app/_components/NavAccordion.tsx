
'use client'

import { useUser } from '@clerk/nextjs';
import React, { useState } from 'react';
import Link from 'next/link';
import { SignOutButton } from "@clerk/nextjs";

const Dropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const {user} = useUser();
  const username = user?.username;

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center pl-5 pr-3 py-2 text-gray-900 bg-white rounded-full hover:bg-gray-100 dark:text-white dark:bg-amber-700 hover:dark:bg-amber-600"
        id="dropdownNavbarLink"
        aria-expanded={isDropdownOpen}>
        {username ? username : '★'}
        <svg
          className="w-4 h-4 ml-2"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {/* Dropdown menu */}
      {isDropdownOpen && (
        <div
          className="absolute right-0 z-20 w-44 py-2 mt-2 bg-white rounded-lg shadow-xl dark:bg-amber-50"
          id="dropdownNavbar"
        >
          <Link
            href="/profileview"
            className="block px-4 py-2 text-sm text-amber-700 hover:bg-gray-100 dark:text-amber-800 dark:hover:bg-amber-600 dark:hover:text-white"
          >
            Profile
          </Link>
          <Link
            href="/profileview/edit" 
            className="block px-4 py-2 text-sm text-amber-700 hover:bg-gray-100 dark:text-amber-800 dark:hover:bg-amber-600 dark:hover:text-white"
          >
            Settings
          </Link>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-amber-700 hover:bg-gray-100 dark:text-amber-800 dark:hover:bg-amber-600 dark:hover:text-white"
          >
            <SignOutButton>Sign Out</SignOutButton>
          </a>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
