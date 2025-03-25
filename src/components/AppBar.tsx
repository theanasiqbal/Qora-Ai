"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Bot, LogIn } from "lucide-react";
import Link from "next/link";
import {
  SignInButton,
  useUser,
  useClerk,
} from "@clerk/clerk-react";
import { usePathname, useRouter } from "next/navigation";

const AppBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { isSignedIn, user } = useUser(); // Get authenticated user
  const { signOut } = useClerk(); // Clerk sign-out function
  const router = useRouter();
  const pathname = usePathname();
  const isSalesMagnetRoute = pathname.includes("/sales-magnet");


  // Log user info after signing in
  useEffect(() => {
    if (isSignedIn && user) {
      const createdAt = new Date(user?.createdAt);
      const now = new Date();

      // If user signed up in the last 30 seconds, assume it's their first login
      if ((now.getTime() - createdAt.getTime()) / 1000 < 30) {
        router.push("/onboarding");
      }
    }
  }, [isSignedIn, user]);

  // Handle outside click for dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex items-center justify-between whitespace-nowrap bg-[#151221] px-10 py-3 sticky top-0 z-50 h-[6vh]">
      <div className="flex items-center gap-4 text-white">
        <a href="/" className="flex items-center justify-center">
          <Bot className="size-6 text-white" />
          {isSalesMagnetRoute && <span className="ml-2 font-semibold text-sm text-white">Qora Ai</span>}
        </a>
      </div>
      <div className="flex flex-1 justify-end gap-8">
        <div className="flex items-center gap-9">{/* Links */}</div>
      </div>

      <div className="flex flex-1 justify-end gap-8">
        <div className="flex items-center gap-9">{/* Optional links */}</div>

        <div className="relative" ref={dropdownRef}>
          {isSignedIn && user ? (
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <img
                src={user.imageUrl}
                alt="User Avatar"
                className="w-8 h-8 rounded-full border border-gray-300"
              />
              <span className="text-white text-sm font-medium">
                {user.fullName}
              </span>
            </div>
          ) : (
            <SignInButton mode="modal"  forceRedirectUrl={'/'}>
              <button className="text-white text-sm font-medium flex items-center gap-2">
                <LogIn className="text-white" size={18} />
                <span>Log In</span>
              </button>
            </SignInButton>
          )}

          {/* Dropdown Menu */}
          {dropdownOpen && isSignedIn && user && (
            <div className="absolute right-0 top-full mt-2 w-60 bg-[#1e1b29] shadow-lg rounded-lg text-white p-4 z-50">
              <div className="flex items-center gap-3 border-b border-gray-700 pb-3">
                <img
                  src={user.imageUrl}
                  alt="User Avatar"
                  className="w-6 h-6 rounded-full border border-gray-300"
                />
                <div>
                  <p className="font-semibold">{user.fullName}</p>
                  <p className="text-sm text-gray-400">
                    {user.primaryEmailAddress?.emailAddress}
                  </p>
                </div>
              </div>
              <Link
                onClick={() => setDropdownOpen(false)}
                href="/chat"
                className="text-sm flex justify-between items-center mt-3 bg-violet-600 hover:bg-violet-700 rounded-lg p-2"
              >
                <span>Workspace</span>
                <ArrowUpRight />
              </Link>
              <Link
                onClick={() => setDropdownOpen(false)}
                href="/profile"
                className="block text-sm mt-3 hover:text-purple-300"
              >
                Profile
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
                  signOut();
                  setDropdownOpen(false);
                }}
                className="block text-sm text-red-500 mt-3 hover:text-red-400"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AppBar;
