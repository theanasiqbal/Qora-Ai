"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Box, Typography } from "@mui/material";

const initialSlides = [
  {
    id: 1,
    name: "Oliver",
    type: "Sales Agent",
    image: "/image/carousel1.png",
    description:
      "Tracks leads, automates follow-ups, and manages customer relationships for better conversions.",
  },
  {
    id: 2,
    name: "Cassie",
    type: "Marketing Agent",
    image: "/image/carousel2.png",
    description:
      "Creates personalized marketing campaigns and analyzes data to drive targeted marketing efforts.",
  },
  {
    id: 3,
    name: "James",
    type: "Finance Manager",
    image: "/image/carousel3.png",
    description:
      "Automates bookkeeping tasks, generates reports, and provides insights to improve financial health.",
  },
  {
    id: 4,
    name: "Cooper",
    type: "Social Media Manager",
    image: "/image/carousel4.png",
    description:
      "Schedules posts, tracks engagement, and analyzes audience insights for social media optimization.",
  },
  // { id: 5, name: "Alex", image: "/image/carousel3.png" },
];

export default function HorizontalInfiniteScroll({ stop, setAgent }) {
  const [items, setItems] = useState([...initialSlides]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const loader = useRef<HTMLDivElement>(null);

  // Function to load more items when scrolling reaches the end
  const loadMoreItems = () => {
    setTimeout(() => {
      setItems((prev) => [
        ...prev,
        ...initialSlides.map((item) => ({
          ...item,
          id: prev.length + item.id,
        })),
      ]);
    }, 10);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreItems();
        }
      },
      { root: scrollContainerRef.current, threshold: 1.0 }
    );

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => observer.disconnect();
  }, []);

  // Scroll Left Function
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -350, behavior: "smooth" });
    }
  };

  // Scroll Right Function
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 350, behavior: "smooth" });
    }
  };

  useEffect(() => {
    // Set interval to scroll every 2 seconds
    if (!stop) {
      const intervalId = setInterval(() => {
        scrollRight();
      }, 2000); // 2000 milliseconds = 2 seconds
      return () => clearInterval(intervalId);
    }
  }, []);

  return (
    <div className="relative max-w-7xl  mx-auto p-6">
      {/* Scroll Buttons */}
      {/* <button
        onClick={scrollLeft}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-900 hover:bg-gray-700 text-white p-3 rounded-full transition-all shadow-lg z-10"
      >
        <ChevronLeft className="w-7 h-7" />
      </button> */}

      {/* Scrollable Horizontal Container */}
      <div
        ref={scrollContainerRef}
        className="flex space-x-9 overflow-x-auto whitespace-nowrap p-10 rounded-lg scrollbar-hide bg-transparent"
        style={{ scrollBehavior: "smooth", scrollSnapType: "x mandatory" }}
      >
        {items.map((item) => (
          <div
            key={item.id}
            className={`flex-shrink-0 ${stop ? 'cursor-pointer' : ''} w-full sm:w-[80vw] md:w-[40vw] lg:w-[20vw] h-[60vh] rounded-lg overflow-hidden bg-contain bg-transparent bg-top bg-no-repeat flex flex-col justify-end`}
            style={{
              scrollSnapAlign: "center",
              backgroundImage: `url(${item.image})`,
            }}
            onClick={() => stop && setAgent(item.name)}
          >
            <Box key={item.id} className="bg-opacity-90 pb-40 sm:pb-3 md:pb-2">
              <h2 className="text-xl font-semibold text-center mb-2">
                {item.name}
              </h2>
              <Typography
                align="center"
                variant="h4"
                sx={{
                  fontSize: { xs: "1rem", md: "0.9rem" },
                  wordWrap: "break-word",
                  whiteSpace: "normal",
                  textAlign: "center",
                  marginBottom: "1rem",
                }}
              >
                {item.type}
              </Typography>
              {!stop && (<Typography
                align="center"
                variant="h4"
                sx={{
                  fontSize: { xs: ".8rem", md: "0.9rem" },
                  wordWrap: "break-word",
                  whiteSpace: "normal",
                  textAlign: "center",
                  color: "grey",
                }}
              >
                {item.description}
              </Typography>)}
            </Box>
          </div>
        ))}

        {/* Invisible Loader for IntersectionObserver */}
        <div
          ref={loader}
          className="w-[1px] h-[1px] opacity-0 pointer-events-none"
        ></div>
      </div>

      {/* <button
        onClick={scrollRight}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-900 hover:bg-gray-700 text-white p-3 rounded-full transition-all shadow-lg z-10"
      >
        <ChevronRight className="w-7 h-7" />
      </button> */}
    </div>
  );
}