import { Bot } from "lucide-react";
import React from "react";

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
        {/* <div className="flex gap-2">
                    <button
                        className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#3117a6] text-white text-sm font-bold leading-normal tracking-[0.015em]"
                    >
                        <span className="truncate">Sign Up</span>
                    </button>
                    <button
                        className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#2b2546] text-white text-sm font-bold leading-normal tracking-[0.015em]"
                    >
                        <span className="truncate">Log in</span>
                    </button>
                </div> */}
      </div>
    </header>
  );
};

export default AppBar;
