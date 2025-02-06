import Link from "next/link";

import AppBar from "@/components/AppBar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#151221] dark group/design-root overflow-x-hidden" style={{
      fontFamily: `Space Grotesk, Noto Sans, sans-serif`
    }}>
      <div className="layout-container flex h-full grow flex-col">
        <AppBar />
        <div className="px-40 flex flex-1 justify-center">
          <div className="layout-content-container flex flex-col flex-1 min-w-[90vw]">

            {/* HERO SECTION */}
            <div className="@container">
              <div
                className="flex min-h-[90vh] flex-col gap-6 bg-cover bg-center bg-no-repeat items-center justify-center px-4 pb-10"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://cdn.usegalileo.ai/sdxl10/adaff7d2-dd71-4072-8cb9-9d2914adb126.png")`
                }}
              >
                <div className="flex flex-col gap-2">
                  <h1
                    className="text-white text-4xl font-black leading-tight tracking-[-0.033em]"
                  >
                    AI assistants for your team
                  </h1>
                  <h2 className="text-white text-sm font-normal leading-normal">
                    We provide specialized AI assistants for different domains to help your company be more productive and efficient.
                  </h2>
                </div>
                <label className="flex flex-col min-w-[50vw] h-14">
                  <div className="flex w-full flex-1 items-stretch rounded-xl h-full max-w-[30vw]">
                    <div
                      className="text-[#9e95c6] flex border border-[#3e3663] bg-[#1f1b32] items-center justify-center pl-[15px] rounded-l-xl border-r-0"
                      data-icon="MagnifyingGlass"
                      data-size="20px"
                      data-weight="regular"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                        <path
                          d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"
                        ></path>
                      </svg>
                    </div>
                    <input
                      placeholder="Your work email"
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-[#3e3663] bg-[#1f1b32] focus:border-[#3e3663] h-full placeholder:text-[#9e95c6] px-[15px] rounded-r-none border-r-0 pr-2 rounded-l-none border-l-0 pl-2 text-sm font-normal leading-normal"
                      value=""
                    // onChange={() => {}}
                    />
                    <div className="flex items-center justify-center rounded-r-xl border-l-0 border border-[#3e3663] bg-[#1f1b32] pr-[7px]">
                      <button
                        className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#3117a6] text-white text-sm font-bold leading-normal tracking-[0.015em]"
                      >
                        <span className="truncate">Get started</span>
                      </button>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* ASSISTANT LIST */}
            <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Meet our specialized assistants</h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
              <div
                className="bg-cover bg-center flex flex-col gap-3 rounded-xl justify-end p-4 aspect-square"
                style={{
                  backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 100%, rgba(0, 0, 0, 0.1) 100%, rgba(0, 0, 0, 0) 100%), url("https://cdn.usegalileo.ai/sdxl10/cfd063dc-6bfa-4678-86c9-8cabc4424cb5.png")`
                }}
              >
                <p className="text-white text-base font-bold leading-tight w-4/5 line-clamp-2">Anna - Sales Specialist</p>
              </div>
              <div
                className="bg-cover bg-center flex flex-col gap-3 rounded-xl justify-end p-4 aspect-square"
                style={{
                  backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 100%, rgba(0, 0, 0, 0.1) 100%, rgba(0, 0, 0, 0) 100%), url("https://cdn.usegalileo.ai/sdxl10/d8bf1d54-ccb5-4e3c-ba6b-677090bde36e.png")`
                }}
              >
                <p className="text-white text-base font-bold leading-tight w-4/5 line-clamp-2">Andy - Marketing Expert</p>
              </div>
              <div
                className="bg-cover bg-center flex flex-col gap-3 rounded-xl justify-end p-4 aspect-square"
                style={{
                  backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 100%, rgba(0, 0, 0, 0.1) 100%, rgba(0, 0, 0, 0) 100%), url("https://cdn.usegalileo.ai/sdxl10/a75d88a8-e5a6-487f-b365-96d11919d1bf.png")`
                }}
              >
                <p className="text-white text-base font-bold leading-tight w-4/5 line-clamp-2">Alice - Customer Support Pro</p>
              </div>
              <div
                className="bg-cover bg-center flex flex-col gap-3 rounded-xl justify-end p-4 aspect-square"
                style={{
                  backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 100%, rgba(0, 0, 0, 0.1) 100%, rgba(0, 0, 0, 0) 100%), url("https://cdn.usegalileo.ai/sdxl10/44944b82-4937-4328-977d-a21f67a8a809.png")`
                }}
              >
                <p className="text-white text-base font-bold leading-tight w-4/5 line-clamp-2">Alex - Task Automation Ninja</p>
              </div>
            </div>

            {/* TONE LIST */}
            <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Choose the right tone</h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
              <div className="flex flex-1 gap-3 rounded-lg border border-[#3e3663] bg-[#1f1b32] p-4 items-center">
                <div className="text-white" data-icon="ChatCircleDots" data-size="24px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path
                      d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128ZM84,116a12,12,0,1,0,12,12A12,12,0,0,0,84,116Zm88,0a12,12,0,1,0,12,12A12,12,0,0,0,172,116Zm60,12A104,104,0,0,1,79.12,219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Zm-16,0A88,88,0,1,0,51.81,172.06a8,8,0,0,1,.66,6.54L40,216,77.4,203.53a7.85,7.85,0,0,1,2.53-.42,8,8,0,0,1,4,1.08A88,88,0,0,0,216,128Z"
                    ></path>
                  </svg>
                </div>
                <h2 className="text-white text-base font-bold leading-tight">Professional</h2>
              </div>
              <div className="flex flex-1 gap-3 rounded-lg border border-[#3e3663] bg-[#1f1b32] p-4 items-center">
                <div className="text-white" data-icon="ChatCircleDots" data-size="24px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path
                      d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128ZM84,116a12,12,0,1,0,12,12A12,12,0,0,0,84,116Zm88,0a12,12,0,1,0,12,12A12,12,0,0,0,172,116Zm60,12A104,104,0,0,1,79.12,219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Zm-16,0A88,88,0,1,0,51.81,172.06a8,8,0,0,1,.66,6.54L40,216,77.4,203.53a7.85,7.85,0,0,1,2.53-.42,8,8,0,0,1,4,1.08A88,88,0,0,0,216,128Z"
                    ></path>
                  </svg>
                </div>
                <h2 className="text-white text-base font-bold leading-tight">Friendly</h2>
              </div>
              <div className="flex flex-1 gap-3 rounded-lg border border-[#3e3663] bg-[#1f1b32] p-4 items-center">
                <div className="text-white" data-icon="ChatCircleDots" data-size="24px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path
                      d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128ZM84,116a12,12,0,1,0,12,12A12,12,0,0,0,84,116Zm88,0a12,12,0,1,0,12,12A12,12,0,0,0,172,116Zm60,12A104,104,0,0,1,79.12,219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Zm-16,0A88,88,0,1,0,51.81,172.06a8,8,0,0,1,.66,6.54L40,216,77.4,203.53a7.85,7.85,0,0,1,2.53-.42,8,8,0,0,1,4,1.08A88,88,0,0,0,216,128Z"
                    ></path>
                  </svg>
                </div>
                <h2 className="text-white text-base font-bold leading-tight">Energetic</h2>
              </div>
              <div className="flex flex-1 gap-3 rounded-lg border border-[#3e3663] bg-[#1f1b32] p-4 items-center">
                <div className="text-white" data-icon="ChatCircleDots" data-size="24px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path
                      d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128ZM84,116a12,12,0,1,0,12,12A12,12,0,0,0,84,116Zm88,0a12,12,0,1,0,12,12A12,12,0,0,0,172,116Zm60,12A104,104,0,0,1,79.12,219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Zm-16,0A88,88,0,1,0,51.81,172.06a8,8,0,0,1,.66,6.54L40,216,77.4,203.53a7.85,7.85,0,0,1,2.53-.42,8,8,0,0,1,4,1.08A88,88,0,0,0,216,128Z"
                    ></path>
                  </svg>
                </div>
                <h2 className="text-white text-base font-bold leading-tight">Neutral</h2>
              </div>
              <div className="flex flex-1 gap-3 rounded-lg border border-[#3e3663] bg-[#1f1b32] p-4 items-center">
                <div className="text-white" data-icon="ChatCircleDots" data-size="24px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path
                      d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128ZM84,116a12,12,0,1,0,12,12A12,12,0,0,0,84,116Zm88,0a12,12,0,1,0,12,12A12,12,0,0,0,172,116Zm60,12A104,104,0,0,1,79.12,219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Zm-16,0A88,88,0,1,0,51.81,172.06a8,8,0,0,1,.66,6.54L40,216,77.4,203.53a7.85,7.85,0,0,1,2.53-.42,8,8,0,0,1,4,1.08A88,88,0,0,0,216,128Z"
                    ></path>
                  </svg>
                </div>
                <h2 className="text-white text-base font-bold leading-tight">Funny</h2>
              </div>
              <div className="flex flex-1 gap-3 rounded-lg border border-[#3e3663] bg-[#1f1b32] p-4 items-center">
                <div className="text-white" data-icon="ChatCircleDots" data-size="24px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path
                      d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128ZM84,116a12,12,0,1,0,12,12A12,12,0,0,0,84,116Zm88,0a12,12,0,1,0,12,12A12,12,0,0,0,172,116Zm60,12A104,104,0,0,1,79.12,219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Zm-16,0A88,88,0,1,0,51.81,172.06a8,8,0,0,1,.66,6.54L40,216,77.4,203.53a7.85,7.85,0,0,1,2.53-.42,8,8,0,0,1,4,1.08A88,88,0,0,0,216,128Z"
                    ></path>
                  </svg>
                </div>
                <h2 className="text-white text-base font-bold leading-tight">Formal</h2>
              </div>
            </div>

            {/* FORM */}
            <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Start with our AI assistants today</h2>
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-white text-base font-medium leading-normal pb-2">Company name</p>
                <input
                  placeholder="Your company name"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-[#3e3663] bg-[#1f1b32] focus:border-[#3e3663] h-14 placeholder:text-[#9e95c6] p-[15px] text-base font-normal leading-normal"
                  value=""
                // onChange={() => {}}
                />
              </label>
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-white text-base font-medium leading-normal pb-2">Email</p>
                <input
                  placeholder="Your email"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-[#3e3663] bg-[#1f1b32] focus:border-[#3e3663] h-14 placeholder:text-[#9e95c6] p-[15px] text-base font-normal leading-normal"
                  value=""
                // onChange={() => {}}
                />
              </label>
            </div>
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-white text-base font-medium leading-normal pb-2">Category</p>
                <input
                  placeholder="Category"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-[#3e3663] bg-[#1f1b32] focus:border-[#3e3663] h-14 placeholder:text-[#9e95c6] p-[15px] text-base font-normal leading-normal"
                  value=""
                // onChange={() => {}}
                />
              </label>
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-white text-base font-medium leading-normal pb-2">Location</p>
                <input
                  placeholder="Location"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-[#3e3663] bg-[#1f1b32] focus:border-[#3e3663] h-14 placeholder:text-[#9e95c6] p-[15px] text-base font-normal leading-normal"
                  value=""
                // onChange={() => {}}
                />
              </label>
            </div>
            <div className="flex justify-center px-4 py-3">
              <fieldset className="relative flex gap-4">
                <input
                  className="flex h-14 w-12 text-center [appearance:textfield] focus:outline-0 focus:ring-0 [&amp;::-webkit-inner-spin-button]:appearance-none [&amp;::-webkit-outer-spin-button]:appearance-none border-0 border-b border-[#3e3663] focus:border-0 focus:border-b focus:border-[#3e3663] text-base font-normal leading-normal"
                  type="number"
                  maxLength={1}
                  max="9"
                  min="0"
                  value=""
                // onChange={() => {}}
                />
                <input
                  className="flex h-14 w-12 text-center [appearance:textfield] focus:outline-0 focus:ring-0 [&amp;::-webkit-inner-spin-button]:appearance-none [&amp;::-webkit-outer-spin-button]:appearance-none border-0 border-b border-[#3e3663] focus:border-0 focus:border-b focus:border-[#3e3663] text-base font-normal leading-normal"
                  type="number"
                  maxLength={1}
                  max="9"
                  min="0"
                  value=""
                // onChange={() => {}}
                />
                <input
                  className="flex h-14 w-12 text-center [appearance:textfield] focus:outline-0 focus:ring-0 [&amp;::-webkit-inner-spin-button]:appearance-none [&amp;::-webkit-outer-spin-button]:appearance-none border-0 border-b border-[#3e3663] focus:border-0 focus:border-b focus:border-[#3e3663] text-base font-normal leading-normal"
                  type="number"
                  maxLength={1}
                  max="9"
                  min="0"
                  value=""
                // onChange={() => {}}
                />
                <input
                  className="flex h-14 w-12 text-center [appearance:textfield] focus:outline-0 focus:ring-0 [&amp;::-webkit-inner-spin-button]:appearance-none [&amp;::-webkit-outer-spin-button]:appearance-none border-0 border-b border-[#3e3663] focus:border-0 focus:border-b focus:border-[#3e3663] text-base font-normal leading-normal"
                  type="number"
                  maxLength={1}
                  max="9"
                  min="0"
                  value=""
                // onChange={() => {}}
                />
                <input
                  className="flex h-14 w-12 text-center [appearance:textfield] focus:outline-0 focus:ring-0 [&amp;::-webkit-inner-spin-button]:appearance-none [&amp;::-webkit-outer-spin-button]:appearance-none border-0 border-b border-[#3e3663] focus:border-0 focus:border-b focus:border-[#3e3663] text-base font-normal leading-normal"
                  type="number"
                  maxLength={1}
                  max="9"
                  min="0"
                  value=""
                // onChange={() => {}}
                />
                <input
                  className="flex h-14 w-12 text-center [appearance:textfield] focus:outline-0 focus:ring-0 [&amp;::-webkit-inner-spin-button]:appearance-none [&amp;::-webkit-outer-spin-button]:appearance-none border-0 border-b border-[#3e3663] focus:border-0 focus:border-b focus:border-[#3e3663] text-base font-normal leading-normal"
                  type="number"
                  maxLength={1}
                  max="9"
                  min="0"
                  value=""
                // onChange={() => {}}
                />
              </fieldset>
            </div>
            <div className="flex px-4 py-3">
              <button
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 flex-1 bg-[#2b2546] text-white text-base font-bold leading-normal tracking-[0.015em]"
              >
                <span className="truncate">Upload document</span>
              </button>
            </div>
            <div className="flex px-4 py-3">
              <button
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 flex-1 bg-[#3117a6] text-white text-base font-bold leading-normal tracking-[0.015em]"
              >
                <span className="truncate">Get Started</span>
              </button>
            </div>


          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
