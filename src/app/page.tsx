" use client";
import Link from "next/link";

import AppBar from "@/components/AppBar";
import Footer from "@/components/Footer";
import Benefits from "../app/pricing/Keybenefits";
// import "@/image/mainimg.jpg";

export default function Home() {
  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#151221] dark group/design-root overflow-x-hidden"
      style={{
        fontFamily: `Space Grotesk, Noto Sans, sans-serif`,
      }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <AppBar />

        {/* HERO SECTION */}
        <div className="@container">
          <div className="relative flex min-h-[90vh] flex-col gap-6 bg-cover bg-center bg-no-repeat items-center justify-center px-4 pb-10 backdrop-blur-sm">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("/image/makeimg.png")`,
                backgroundSize: "cover",
                backgroundPosition: "center", // Image ko center me rakhne ke liye
                zIndex: -1, // Image ko background mein rakhna
              }}
            ></div>
            <div className=" relative z-10 flex flex-col gap-2">
              <h1 className="uppercase text-4xl leading-tight font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] to-[#2B1742]">
                AI assistants for <br /> ‎ ‎ ‎ ‎ ‎ ‎ ‎ your team
              </h1>
              <h2 className="text-white  text-md font-normal  leading-normal">
                We provide specialized AI assistants for different domains to
                help your company be more productive and efficient.
              </h2>
            </div>
            <label className="flex flex-col min-w-[58vw] h-14">
              <div className="flex w-full flex-1 items-stretch rounded-xl h-full max-w-[36vw]">
                <div
                  className="text-[#9e95c6] flex border border-[#3e3663] bg-[#1f1b32] items-center justify-center pl-[15px] rounded-l-xl border-r-0"
                  data-icon="MagnifyingGlass"
                  data-size="20px"
                  data-weight="regular"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20px"
                    height="20px"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                  </svg>
                </div>
                <input
                  placeholder="Your work email"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-[#3e3663] bg-[#1f1b32] focus:border-[#3e3663] h-full placeholder:text-[#9e95c6] px-[15px] rounded-r-none border-r-0 pr-2 rounded-l-none border-l-0 pl-2 text-sm font-normal leading-normal"
                  value=""
                  // onChange={() => {}}
                />
                <div className="flex items-center justify-center rounded-r-xl border-l-0 border border-[#3e3663] bg-[#1f1b32] pr-[7px]">
                  <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#3117a6] text-white text-sm font-bold leading-normal tracking-[0.015em]">
                    <span className="truncate">Get started</span>
                  </button>
                </div>
              </div>
            </label>
          </div>
        </div>

        <div className="px-40 flex flex-1 justify-center">
          <div className="layout-content-container flex flex-col flex-1 min-w-[90vw]">
            <h2 className="uppercase text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] to-[#2B1742] ">
              Meet our specialized assistants
            </h2>
            {/* ASSISTANT LIST */}
            <div className="flex gap-3 p-4 overflow-x-scroll" style={{ scrollbarWidth: "none" }}>
              
              <div
                className="bg-cover bg-center flex flex-col gap-3 rounded-xl justify-end p-4 aspect-square min-w-[158px] flex-shrink-0"
                style={{
                  backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%), url("https://cdn.usegalileo.ai/sdxl10/cfd063dc-6bfa-4678-86c9-8cabc4424cb5.png")`,
                }}
              >
                <div className="backdrop-blur-sm bg-black bg-opacity-50 p-2 rounded-lg">
                  <p className="text-white text-base font-bold leading-tight w-4/5 line-clamp-2">
                    Alice - Customer Support Pro
                  </p>
                </div>
              </div>

              <div
                className="bg-cover bg-center flex flex-col gap-3 rounded-xl justify-end p-4 aspect-square min-w-[158px] flex-shrink-0"
                style={{
                  backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%), url("https://cdn.usegalileo.ai/sdxl10/d8bf1d54-ccb5-4e3c-ba6b-677090bde36e.png")`,
                }}
              >
                <div className="backdrop-blur-sm bg-black bg-opacity-50 p-2 rounded-lg">
                  <p className="text-white text-base font-bold leading-tight w-4/5 line-clamp-2">
                    Alice - Customer Support Pro
                  </p>
                </div>
              </div>

              <div
                className="bg-cover bg-center flex flex-col gap-3 rounded-xl justify-end p-4 aspect-square min-w-[158px] flex-shrink-0"
                style={{
                  backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%), url("https://cdn.usegalileo.ai/sdxl10/a75d88a8-e5a6-487f-b365-96d11919d1bf.png")`,
                }}
              >
                <div className="backdrop-blur-sm bg-black bg-opacity-50 p-2 rounded-lg">
                  <p className="text-white text-base font-bold leading-tight w-4/5 line-clamp-2">
                    Alice - Customer Support Pro
                  </p>
                </div>
              </div>

              <div
                className="bg-cover bg-center flex flex-col gap-3 rounded-xl justify-end p-4 aspect-square min-w-[158px] flex-shrink-0"
                style={{
                  backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%), url("https://cdn.usegalileo.ai/sdxl10/44944b82-4937-4328-977d-a21f67a8a809.png")`,
                }}
              >
                <div className="backdrop-blur-sm bg-black bg-opacity-50 p-2 rounded-lg">
                  <p className="text-white text-base font-bold leading-tight w-4/5 line-clamp-2">
                    Alice - Customer Support Pro
                  </p>
                </div>
              </div>

              <div
                className="bg-cover bg-center flex flex-col gap-3 rounded-xl justify-end p-4 aspect-square min-w-[158px] flex-shrink-0"
                style={{
                  backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%), url("https://cdn.usegalileo.ai/sdxl10/44944b82-4937-4328-977d-a21f67a8a809.png")`,
                }}
              >
                <div className="backdrop-blur-sm bg-black bg-opacity-50 p-2 rounded-lg">
                  <p className="text-white text-base font-bold leading-tight w-4/5 line-clamp-2">
                    Alice - Customer Support Pro
                  </p>
                </div>
              </div>
            </div>
            {/* ASSITANT LIST END  */}

            {/* TONE LIST */}
            <div className="rounded-lg shadow-lg bg-gradient-to-r from-[#1f1b32] to-[#2b2546] p-6">
              <h2 className="text-[27px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] to-[#2B1742] mb-6">
                Choose the right tone
              </h2>

              <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-6">
                <div className="flex flex-1 gap-3 rounded-lg border border-[#3e3663] bg-[#1f1b32] p-6 items-center justify-center hover:scale-105 transition-transform duration-300 ease-in-out">
                  <div className="text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128ZM84,116a12,12,0,1,0,12,12A12,12,0,0,0,84,116Zm88,0a12,12,0,1,0,12,12A12,12,0,0,0,172,116Zm60,12A104,104,0,0,1,79.12,219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Zm-16,0A88,88,0,1,0,51.81,172.06a8,8,0,0,1,.66,6.54L40,216,77.4,203.53a7.85,7.85,0,0,1,2.53-.42,8,8,0,0,1,4,1.08A88,88,0,0,0,216,128Z"></path>
                    </svg>
                  </div>
                  <h2 className="text-white text-base font-bold leading-tight">
                    Professional
                  </h2>
                </div>

                <div className="flex flex-1 gap-3 rounded-lg border border-[#3e3663] bg-[#1f1b32] p-6 items-center justify-center hover:scale-105 transition-transform duration-300 ease-in-out">
                  <div className="text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128ZM84,116a12,12,0,1,0,12,12A12,12,0,0,0,84,116Zm88,0a12,12,0,1,0,12,12A12,12,0,0,0,172,116Zm60,12A104,104,0,0,1,79.12,219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Zm-16,0A88,88,0,1,0,51.81,172.06a8,8,0,0,1,.66,6.54L40,216,77.4,203.53a7.85,7.85,0,0,1,2.53-.42,8,8,0,0,1,4,1.08A88,88,0,0,0,216,128Z"></path>
                    </svg>
                  </div>
                  <h2 className="text-white text-base font-bold leading-tight">
                    Friendly
                  </h2>
                </div>

                <div className="flex flex-1 gap-3 rounded-lg border border-[#3e3663] bg-[#1f1b32] p-6 items-center justify-center hover:scale-105 transition-transform duration-300 ease-in-out">
                  <div className="text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128ZM84,116a12,12,0,1,0,12,12A12,12,0,0,0,84,116Zm88,0a12,12,0,1,0,12,12A12,12,0,0,0,172,116Zm60,12A104,104,0,0,1,79.12,219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Zm-16,0A88,88,0,1,0,51.81,172.06a8,8,0,0,1,.66,6.54L40,216,77.4,203.53a7.85,7.85,0,0,1,2.53-.42,8,8,0,0,1,4,1.08A88,88,0,0,0,216,128Z"></path>
                    </svg>
                  </div>
                  <h2 className="text-white text-base font-bold leading-tight">
                    Energetic
                  </h2>
                </div>

                <div className="flex flex-1 gap-3 rounded-lg border border-[#3e3663] bg-[#1f1b32] p-6 items-center justify-center hover:scale-105 transition-transform duration-300 ease-in-out">
                  <div className="text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128ZM84,116a12,12,0,1,0,12,12A12,12,0,0,0,84,116Zm88,0a12,12,0,1,0,12,12A12,12,0,0,0,172,116Zm60,12A104,104,0,0,1,79.12,219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Zm-16,0A88,88,0,1,0,51.81,172.06a8,8,0,0,1,.66,6.54L40,216,77.4,203.53a7.85,7.85,0,0,1,2.53-.42,8,8,0,0,1,4,1.08A88,88,0,0,0,216,128Z"></path>
                    </svg>
                  </div>
                  <h2 className="text-white text-base font-bold leading-tight">
                    Neutral
                  </h2>
                </div>

                <div className="flex flex-1 gap-3 rounded-lg border border-[#3e3663] bg-[#1f1b32] p-6 items-center justify-center hover:scale-105 transition-transform duration-300 ease-in-out">
                  <div className="text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128ZM84,116a12,12,0,1,0,12,12A12,12,0,0,0,84,116Zm88,0a12,12,0,1,0,12,12A12,12,0,0,0,172,116Zm60,12A104,104,0,0,1,79.12,219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Zm-16,0A88,88,0,1,0,51.81,172.06a8,8,0,0,1,.66,6.54L40,216,77.4,203.53a7.85,7.85,0,0,1,2.53-.42,8,8,0,0,1,4,1.08A88,88,0,0,0,216,128Z"></path>
                    </svg>
                  </div>
                  <h2 className="text-white text-base font-bold leading-tight">
                    Funny
                  </h2>
                </div>

                <div className="flex flex-1 gap-3 rounded-lg border border-[#3e3663] bg-[#1f1b32] p-6 items-center justify-center hover:scale-105 transition-transform duration-300 ease-in-out">
                  <div className="text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128ZM84,116a12,12,0,1,0,12,12A12,12,0,0,0,84,116Zm88,0a12,12,0,1,0,12,12A12,12,0,0,0,172,116Zm60,12A104,104,0,0,1,79.12,219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Zm-16,0A88,88,0,1,0,51.81,172.06a8,8,0,0,1,.66,6.54L40,216,77.4,203.53a7.85,7.85,0,0,1,2.53-.42,8,8,0,0,1,4,1.08A88,88,0,0,0,216,128Z"></path>
                    </svg>
                  </div>
                  <h2 className="text-white text-base font-bold leading-tight">
                    Formal
                  </h2>
                </div>
              </div>
            </div>

            {/* TONE LIST END  */}

            {/* FORM */}
            <div className="flex flex-col justify-center items-center bg-gradient-to-r from-[#2b2546] to-[#1f1b32] p-6 rounded-lg shadow-lg">
              <h2 className="uppercase text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] to-[#3117A6] mb-6">
                Start with our AI assistants today
              </h2>

              <div className="flex flex-wrap gap-6 w-full max-w-4xl">
                <label className="flex flex-col flex-1">
                  <p className="text-white text-lg font-semibold mb-2">
                    Company name
                  </p>
                  <input
                    placeholder="Your company name"
                    className="w-full h-14 px-4 py-3 rounded-xl bg-[#1f1b32] text-white placeholder:text-[#9e95c6] border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-[#3117A6] focus:border-[#3117A6]"
                  />
                </label>

                <label className="flex flex-col flex-1">
                  <p className="text-white text-lg font-semibold mb-2">Email</p>
                  <input
                    placeholder="Your email"
                    className="w-full h-14 px-4 py-3 rounded-xl bg-[#1f1b32] text-white placeholder:text-[#9e95c6] border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-[#3117A6] focus:border-[#3117A6]"
                  />
                </label>
              </div>

              <div className="flex flex-wrap gap-6 w-full max-w-4xl mt-6">
                <label className="flex flex-col flex-1">
                  <p className="text-white text-lg font-semibold mb-2">
                    Category
                  </p>
                  <input
                    placeholder="Category"
                    className="w-full h-14 px-4 py-3 rounded-xl bg-[#1f1b32] text-white placeholder:text-[#9e95c6] border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-[#3117A6] focus:border-[#3117A6]"
                  />
                </label>

                <label className="flex flex-col flex-1">
                  <p className="text-white text-lg font-semibold mb-2">
                    Location
                  </p>
                  <input
                    placeholder="Location"
                    className="w-full h-14 px-4 py-3 rounded-xl bg-[#1f1b32] text-white placeholder:text-[#9e95c6] border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-[#3117A6] focus:border-[#3117A6]"
                  />
                </label>
              </div>

              <div className="flex w-full justify-center mt-6">
                <button className="w-full max-w-xs h-12 rounded-xl bg-[#2b2546] text-white font-semibold text-lg hover:bg-[#3117A6] transition duration-300 ease-in-out">
                  Upload document
                </button>
              </div>

              <div className="flex w-full justify-center mt-4">
                <button className="w-full max-w-xs h-12 rounded-xl bg-[#3117A6] text-white font-semibold text-lg hover:bg-[#2b2546] transition duration-300 ease-in-out">
                  Get Started
                </button>
              </div>
            </div>

            {/* FORM END*/}
          </div>
        </div>
        <Benefits />
        <Footer />

      </div>
    </div>
  );
}
