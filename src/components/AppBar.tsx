"use client";
import React, { useEffect, useRef, useState } from "react";
import { Bot } from "lucide-react";
import { LogIn } from "lucide-react";
import Link from "next/link";
import { clearCookie, getCookie, getInitials } from "@/lib/helpers";

const AppBar = () => {
  const company = getCookie("company");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current?.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex items-center justify-between whitespace-nowrap bg-[#151221] px-10 py-3 overflow-hidden sticky top-0 z-50 h-[5vh]">
      <div className="flex items-center gap-4 text-white">
        <a href="/">
          <Bot className="size-6 text-white" />
          <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">
            {/* Qora AI */}
          </h2>
        </a>
      </div>
      <div className="flex flex-1 justify-end gap-8">
        <div className="flex items-center gap-9">
          {/* <a
            className="text-white text-sm font-medium leading-normal"
            href="/pricing"
          >
            Pricing
          </a> */}
          {/* <a className="text-white text-sm font-medium leading-normal" href="#">About Us</a> */}
          {/* <a className="text-white text-sm font-medium leading-normal" href="#">Contact</a> */}
        </div>
      </div>
      <div className="flex flex-1 justify-end gap-8">
        <div className="flex items-center gap-9">
          {/* Optional links can go here */}
        </div>
        {/* Login icon section */}
        <div className="relative" ref={dropdownRef}>
          {company ? (
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <div className="w-8 h-8 bg-purple-600 text-white font-bold flex items-center justify-center rounded-full">
                {getInitials(company.name)}
              </div>
              <span className="text-white text-sm font-medium">
                {company.name}
              </span>
            </div>
          ) : (
            <button className="text-white text-sm font-medium flex items-center gap-2">
              <LogIn className="text-white" size={18} />
              <Link href={"/auth/sign-up"}>Log In</Link>
            </button>
          )}

          {/* Dropdown Menu */}
          {dropdownOpen && company && (
            <div className="absolute right-0 mt-2 w-60 bg-[#1e1b29] shadow-lg rounded-lg text-white p-4 z-50">
              <div className="flex items-center gap-3 border-b border-gray-700 pb-3">
                <div className="w-10 h-10 bg-purple-600 text-white font-bold flex items-center justify-center rounded-full text-lg">
                  {getInitials(company.name)}
                </div>
                <div>
                  <p className="font-semibold">{company.name}</p>
                  <p className="text-sm text-gray-400">{company.email}</p>
                </div>
              </div>
              <Link
                onClick={() => setDropdownOpen(false)}
                href="/settings"
                className="block text-sm  mt-3 hover:text-purple-300"
              >
                Settings
              </Link>
              <button
                onClick={() => {
                  clearCookie("company");
                  setDropdownOpen(false);
                }}
                className="block text-sm text-red-500 mt-3 hover:text-red-400"
              >
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AppBar;
