"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  createTheme,
  Grid2,
} from "@mui/material";
import { useMediaQuery } from "@mui/material";




export default function UserJourney() {
  const [isVisible, setIsVisible] = useState(false);
  const boxRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update state whenever visibility changes
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.5, // Trigger when 10% of element is visible
        rootMargin: "-50px 0px", // Adjust trigger point
      }
    );

    if (boxRef.current) {
      observer.observe(boxRef.current);
    }

    return () => {
      if (boxRef.current) {
        observer.unobserve(boxRef.current);
      }
    };
  }, []);
  const theme = createTheme({
    typography: {
      fontFamily: "Montserrat, Arial, sans-serif", // Default font
      h1: {
        fontFamily: "Playfair Display, serif", // Professional font for headers
      },
    },
  });
  const steps = [
    {
      id: 1,
      title: "Onboarding",
      description: "Users sign up and enter their details.",
    },
    {
      id: 2,
      title: "Content Creation",
      description: "Select a persona and input content requirements.",
    },
    {
      id: 3,
      title: "Integration",
      description: "Export content directly to email and other platforms.",
    },
    {
      id: 4,
      title: "Feedback Loop",
      description: "Users provide feedback to improve AI performance.",
    },
  ];
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Box
      sx={{
        backgroundColor: "transparent",
        color: "white",
        mt: 15,
        minHeight: "100vh", // Adjust height for responsiveness
        padding: { xs: 4, md: 6 }, // Add padding based on screen size
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
        "&:before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
          pointerEvents: "none",
        },
      }}
    >
      {/* Glowing background effect */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "120%",
          height: "120%",
          background:
            "radial-gradient(circle, rgba(108, 93, 211, 0.2) 0%, transparent 60%)",
          animation: "pulse 6s infinite alternate",
          "@keyframes pulse": {
            "0%": { opacity: 0.3 },
            "100%": { opacity: 0.8 },
          },
        }}
      />

      <Grid
        container
        spacing={4}
        sx={{
          maxWidth: "1200px", position: "relative", zIndex: 2,ml: "0",

        }}
      >
        {/* Left Section: 3D Illustration */}
        <Grid sx={{

        }} item xs={12} md={6}>
          <Box
            ref={boxRef}
            sx={{
              display: isMobile ? "none" : "block",
              backgroundImage: "url('/image/robo-team.jpg')",
              backgroundSize: "contain",
              backgroundPosition: "center",
              height: { xs: "50vh", md: "100%" }, // Set responsive height
              borderRadius: 3,
              boxShadow: "0 0 20px rgba(108, 93, 211, 0.6)",
              overflow: "hidden",
              transform: isVisible
                ? "perspective(1000px) rotateY(0deg)"
                : "perspective(1000px) rotateY(25deg)",
              transition:
                "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), " +
                "box-shadow 0.5s ease-in-out",
              opacity: isVisible ? 1 : 0.7,
            }}
          ></Box>
        </Grid>

        {/* Right Section: Neon Content */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display:'flex',
justifyContent:{
  xs:'center', sm:"", md:" ",
},

            borderRadius: 3,
            backgroundColor: "rgba(15, 15, 15, 0.8)",
            backdropFilter: "blur(12px)",
            padding: { xs: 3, md: 4 }, // Adjust padding based on screen size
            height: "100%",
            border: "1px solid rgba(108, 93, 211, 0.3)",
            boxShadow: "0 0 30px rgba(108, 93, 211, 0.4)",
            marginTop: { xs: "2vh", md: "4.5vh" }, // Adjust margin based on screen size
            transition: "all 0.4s ease-in-out",
          }}
        >
          {/* Title with Neon Glow */}
          <Box>
          <Typography
            align="center"
            variant="h2"
            gutterBottom
            sx={{
              fontWeight: "Bold",
              marginBottom: 2,
              fontSize: { xs: "1.8rem", md: "2.35rem" }, // Adjust font size for smaller screens
            }}
          >
            User Journey
          </Typography>

          {/* line indicator */}
          <Box
            sx={{
              position: "relative",
              pl: { xs: 0, md: 4 },
              "&:before": {
                content: '""',
                position: "absolute",
                left: { xs: 0, md: 24 },
                top: 0,

                bottom: 0,
                background:
                  "linear-gradient(180deg, #6c5dd3 0%, rgba(108, 93, 211, 0) 100%)",
                borderRadius: "2px",
                boxShadow: "0 0 20px rgba(108, 93, 211, 0.6)",
              },
            }}
          >
            {steps.map((step, index) => (
              <Box
                key={step.id}
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: "center",
                  mb: 3,
                  position: "relative",
                  transition: "transform 0.3s, opacity 0.3s",
                  "&:hover": {
                    transform: "scale(1.02)",
                    opacity: 1,
                  },
                  opacity: 0.9,
                }}
              >
                {/* Neon Number Circle */}
                <Box
                  sx={{
                    width: 35,
                    height: 35,
                    flexShrink: 0,
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, #6c5dd3 0%, #8b7dee 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 800,
                    fontSize: "1rem",
                    color: "white",
                    mr: { xs: 0, md: 4 },
                    mb: { xs: 2, md: 0 },
                    boxShadow: "0 0 20px rgba(108, 93, 211, 0.6)",
                    animation: "neonPulse 3s infinite alternate",
                    "@keyframes neonPulse": {
                      "0%": { boxShadow: "0 0 10px rgba(108, 93, 211, 0.6)" },
                      "100%": { boxShadow: "0 0 20px rgba(108, 93, 211, 0.8)" },
                    },
                  }}
                >
                  {step.id}
                </Box>

                {/* Neon Content Card */}
                <Box
                  sx={{
                    background: "rgba(15, 15, 15, 0.8)",
                    backdropFilter: "blur(12px)",
                    borderRadius: "16px",
                    padding: 2,
                    flexGrow: 1,
                    width: "100%",
                    border: "1px solid rgba(108, 93, 211, 0.3)",
                  }}
                >
                  <Typography
                    variant="h7"
                    sx={{
                      fontWeight: 600,
                      mb: 1.5,
                      color: "#b3a6ff",
                      letterSpacing: "0.5px",
                      textShadow: "0 0 10px rgba(179, 166, 255, 0.6)",
                    }}
                  >
                    {step.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#e6e1ff",
                      lineHeight: 1.7,
                      opacity: 0.9,
                    }}
                  >
                    {step.description}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>

  );
}
