"use client";
import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Bot, LogIn } from "lucide-react";
import Link from "next/link";
import { clearCookie, getCookie, getInitials } from "@/lib/helpers";

const AppBar = () => {
  const [company, setCompany] = useState<any>(null); // Ensure state starts as null
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Fetch company data only on the client
  useEffect(() => {
    const companyData = getCookie("company");
    if (companyData) {
      try {
        setCompany(companyData); // Ensure it's properly parsed
      } catch (error) {
        console.error("Error parsing company cookie:", error);
      }
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex items-center justify-between whitespace-nowrap bg-[#151221] px-10 py-3 sticky top-0 z-50 h-[6vh]">
      <div className="flex items-center gap-4 text-white">
        <a href="/">
          <Bot className="size-6 text-white" />
          <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">
            {/* Qora AI */}
          </h2>
        </a>
      </div>
      <div className="flex flex-1 justify-end gap-8">
        <div className="flex items-center gap-9">{/* Links */}</div>
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
              <div className="w-6 h-6 bg-purple-600 text-white font-bold flex items-center justify-center rounded-full">
                {getInitials(company.name)}
              </div>
              <span className="text-white text-sm font-medium">{company.name}</span>
            </div>
          ) : (
            <button className="text-white text-sm font-medium flex items-center gap-2">
              <LogIn className="text-white" size={18} />
              <Link href="/auth/sign-up">Log In</Link>
            </button>
          )}

          {/* Dropdown Menu */}
          {dropdownOpen && company && (
            <div
              className="absolute right-0 top-full mt-2 w-60 bg-[#1e1b29] shadow-lg rounded-lg text-white p-4 z-50"
              style={{ position: "absolute" }}
            >
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
                href="/chat"
                className="text-sm flex justify-between items-center mt-3 bg-violet-600 hover:bg-violet-700 rounded-lg p-2"
              >
                <span>Workspace</span>
                <span><ArrowUpRight/></span>
              </Link>
              <Link
                onClick={() => setDropdownOpen(false)}
                href="/settings"
                className="block text-sm mt-3 hover:text-purple-300"
              >
                Settings
              </Link>
              <button
                onClick={() => {
                  clearCookie("company");
                  setCompany(null); // Reset state on logout
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
