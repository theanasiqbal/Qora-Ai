import React from 'react'

const AppBar = () => {
    return (
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#2b2546] px-10 py-3">
            <div className="flex items-center gap-4 text-white">
                <div className="size-4">
                    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z"
                            fill="currentColor"
                        ></path>
                    </svg>
                </div>
                <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">Qora AI</h2>
            </div>
            <div className="flex flex-1 justify-end gap-8">
                <div className="flex items-center gap-9">
                    <a className="text-white text-sm font-medium leading-normal" href="#">Our Services</a>
                    <a className="text-white text-sm font-medium leading-normal" href="#">About Us</a>
                    <a className="text-white text-sm font-medium leading-normal" href="#">Contact</a>
                </div>
                <div className="flex gap-2">
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
                </div>
            </div>
        </header>
    )
}

export default AppBar