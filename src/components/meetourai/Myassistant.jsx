import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';

const HorizontalScrollSlider = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const scrollPercentage = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    const maxScroll = document.querySelector('.slider').scrollWidth - window.innerWidth;
    const newScrollPosition = scrollPercentage * maxScroll;
    setScrollPosition(newScrollPosition);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        overflowX: 'hidden',
        overflowY: 'scroll',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        className="slider"
        sx={{
          display: 'flex',
          transition: 'transform 0.3s ease',
          transform: `translateX(-${scrollPosition}px)`,
        }}
      >
        <Box
          sx={{
            width: '100vw',
            height: '100vh',
            backgroundImage: 'url(image1.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Box
          sx={{
            width: '100vw',
            height: '100vh',
            backgroundImage: 'url(image2.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Box
          sx={{
            width: '100vw',
            height: '100vh',
            backgroundImage: 'url(image3.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </Box>
    </Box>
  );
};

export default HorizontalScrollSlider;
