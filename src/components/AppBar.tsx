"use client";
import React from "react";

import { Bot } from "lucide-react";
import { LogIn } from "lucide-react";

const AppBar = () => {
  return (
    <header className="flex items-center justify-between whitespace-nowrap bg-[#151221] px-10 py-3 overflow-hidden sticky top-0 z-50">
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
        <div className="flex items-center gap-4">
          <button
            className="text-white text-sm font-medium flex items-center gap-2"
          >
            <LogIn className="text-white" size={18} />
            <span>Log In</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default AppBar;
