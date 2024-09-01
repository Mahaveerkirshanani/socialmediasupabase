"use client";
import {
  Bell,
  HomeIcon,
  PlusSquare,
  Search,
  Settings,
  User2,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import AddPost from "../post/AddPost";
import { User } from "@supabase/supabase-js";
import DropDownSetting from "./DropDownSetting";

const TopNav = ({ user }: { user: User }) => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle menu visibility
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="flex items-center justify-between p-2 shadow-lg h-[80px] bg-white dark:bg-gray-900">
      {/* Main Logo for large screens */}
      <Image
        src={"/logo.svg"}
        alt="logo"
        width={150}
        height={80}
        className="hidden lg:block"
      />

      {/* Small logo for small screens */}
      <Image
        src={"/smallLogo.svg"}
        alt="small-logo"
        width={40}
        height={50}
        className="lg:hidden"
      />

      {/* Links/icons for large screens */}
      <div className="hidden lg:flex items-center justify-between md:space-x-12">
        <Link
          href={"/"}
          className={`${
            pathname === "/"
              ? "text-red-500"
              : "text-gray-600 dark:text-gray-300"
          }`}
        >
          <HomeIcon size={30} />
        </Link>
        <Link
          href={"/search"}
          className={`${
            pathname === "/search"
              ? "text-red-500"
              : "text-gray-600 dark:text-gray-300"
          }`}
        >
          <Search size={30} />
        </Link>

        <AddPost user={user} />
        <Link
          href={"/notifications"}
          className={`${
            pathname === "/notifications"
              ? "text-red-500"
              : "text-gray-600 dark:text-gray-300"
          }`}
        >
          <Bell size={30} />
        </Link>
        <Link
          href={"/profile"}
          className={`${
            pathname === "/profile"
              ? "text-red-500"
              : "text-gray-600 dark:text-gray-300"
          }`}
        >
          <User2 size={30} />
        </Link>
      </div>

      {/* Right side: user icon and hamburger for small screens */}
      <div className="flex items-center space-x-4">
        {/* User icon always visible */}
        <div className="hidden lg:flex text-gray-600 dark:text-gray-300">
          <DropDownSetting>
            <Settings size={30} />
          </DropDownSetting>
        </div>
        <Link
          href={"/setting"}
          className={`block lg:hidden ${
            pathname === "/profile" ? "text-red-500" : "text-gray-600 dark:text-gray-300"
          }`}
        >
          <User2 size={30} />
        </Link>

        {/* Hamburger menu for small screens */}
        <button
          onClick={toggleMenu}
          id="hamburger-btn"
          className="block lg:hidden text-gray-600 dark:text-gray-300"
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile side menu */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="fixed top-0 right-0 h-full w-[70%] bg-white dark:bg-gray-900 shadow-lg z-50 px-2 lg:hidden"
        >
          <button
            onClick={toggleMenu}
            className="absolute top-4 right-4 text-gray-600 dark:text-gray-300"
            aria-label="Close Menu"
          >
            <X size={30} />
          </button>

          <nav className="mt-14">
            <div className="space-y-2">
              <Link
                href={"/"}
                className={`flex items-center rounded-md bg-slate-100 dark:bg-gray-800 py-2 px-3 ${
                  pathname === "/"
                    ? "text-red-500"
                    : "text-gray-600 dark:text-gray-300"
                }`}
              >
                <HomeIcon size={30} className="inline-block mr-2" />
                <p className="text-xl">Home</p>
              </Link>
              <Link
                href={"/search"}
                className={`flex items-center rounded-md bg-slate-100 dark:bg-gray-800 py-2 px-3 ${
                  pathname === "/search"
                    ? "text-red-500"
                    : "text-gray-600 dark:text-gray-300"
                }`}
              >
                <Search size={30} className="inline-block mr-2" />
                <p className="text-xl">Search</p>
              </Link>
              <Link
                href={"/notifications"}
                className={`flex items-center rounded-md bg-slate-100 dark:bg-gray-800 py-2 px-3 ${
                  pathname === "/notifications"
                    ? "text-red-500"
                    : "text-gray-600 dark:text-gray-300"
                }`}
              >
                <Bell size={30} className="inline-block mr-2" />
                <p className="text-xl">Notifications</p>
              </Link>
            </div>

            <div className="fixed bottom-5">
              <div
                className={`rounded-md py-2 px-3 text-gray-600 dark:text-gray-300`}
              >
                <DropDownSetting>
                  <div className="flex items-center">
                    <Settings size={30} className="inline-block mr-2" />
                    <p className="text-xl">Setting</p>
                  </div>
                </DropDownSetting>
              </div>
              <Link
                href={"/profile"}
                className={`flex items-center rounded-md py-2 px-3 ${
                  pathname === "/profile"
                    ? "text-red-500"
                    : "text-gray-600 dark:text-gray-300"
                }`}
              >
                <User2 size={30} className="inline-block mr-2" />
                <p className="text-xl">Profile</p>
              </Link>
            </div>
          </nav>
        </div>
      )}

      {/* Create button at the bottom right for small screens */}
      <div className="fixed bottom-4 right-4 bg-blue-600 dark:bg-blue-800 text-white p-3 rounded-full shadow-lg lg:hidden">
        <AddPost user={user} />
      </div>
    </nav>
  );
};

export default TopNav;
