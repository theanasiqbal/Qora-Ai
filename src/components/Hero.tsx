"use client";
import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

const Hero = () => {
  const [inView, setInView] = useState(false);
  const boxRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    if (boxRef.current) {
      observer.observe(boxRef.current);
    }
    return () => {
      if (boxRef.current) observer.unobserve(boxRef.current);
    };
  }, []);
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "120vh",
        overflow: "hidden",
        textAlign: "center",
        px: 2,
        "&:before": {
          content: '""',
          position: "absolute",
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(113, 47, 255, 0.15) 0%, transparent 70%)",
          // top: "40%",
          left: "10%",
        },
        "&:after": {
          content: '""',
          position: "absolute",
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(circle, rgba(113, 47, 255, 0.15) 0%, transparent 70%)",
          top: "16%",
          left: "40%",
        },
        zIndex: 2,
      }}
    >
      {/* Background Image Left */}
      <Box
        ref={boxRef}
        sx={{
          top: "-10%",
          right: "63%",
          position: "absolute",
          width: "60%",
          height: "100%",
          backgroundImage: "url('/image/hero.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top",
          zIndex: 1,
          flex: 1,
          opacity: inView ? 1 : 0,
          transform: inView ? "translateX(0)" : "translateX(-100px)",
          transition: "transform 1s ease-out, opacity 1s ease-out",
        }}
      />
      {/* Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(21, 18, 33, 0.5)", // Adjust opacity/color as needed
          zIndex: 2,
        }}
      />

      <Box
        sx={{
          position: "relative", // Ensures content is above background & overlay
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          justifyContent: "center",
          gap: 2,
          width: "90vw",
          zIndex: 3,
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontWeight: "bold",
            fontSize: "6rem",
            lineHeight: 1.2,
            color: "white",
            letterSpacing: "-1px",
            maxWidth: "800px",
            opacity: 0.9,
            textTransform: "uppercase",
            textShadow: "2px 2px 8px rgba(0, 0, 0, 0.6)",
          }}
        >
          {process.env.NEXT_PUBLIC_NAME}
        </Typography>

        <Typography
          variant="h4"
          sx={{
            color: "rgba(255, 255, 255, 0.8)",
            fontSize: "22px",
            maxWidth: "700px",
            letterSpacing: "0.3px",
            opacity: 0.8,
            fontWeight: 500,
            marginTop: 1,
          }}
        >
          Your Smart Partner for Seamless Productivity
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "rgba(255, 255, 255, 0.8)",
            fontSize: "18px",
            maxWidth: "600px",
            letterSpacing: "0.2px",
            opacity: 0.7,
            marginTop: 2,
          }}
        >
          AI - Powered Assitants Designed for <br /> Businesses and Freelancers
        </Typography>

        <Button
          variant="contained"
          sx={{
            backgroundColor: "white",
            color: "black",
            fontWeight: "bold",
            borderRadius: "50px",
            width: "12vw",
            height: "6vh",
            px: 4,
            py: 1,
            textTransform: "none",
            marginTop: 3,
            ":hover": { backgroundColor: "#ddd" },
          }}
        >
          Try for Free
        </Button>
      </Box>
      {/* Background Image Right */}
      <Box
        ref={boxRef}
        sx={{
          top: "-10%",
          left: "77%",
          position: "absolute",
          width: "60%",
          height: "100%",
          backgroundImage: "url('/image/hero.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top",
          zIndex: 1,
          opacity: inView ? 1 : 0,
          transform: inView ? "translateX(0)" : "translateX(100px)",
          transition: "transform 1s ease-out, opacity 1s ease-out",
        }}
      />
    </Box>
  );
};

export default Hero;
