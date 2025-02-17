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
import { Bold } from "lucide-react";

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

  return (
    <Box
      sx={{
        backgroundColor: "transparent", // Dark background for neon contrast
        color: "white",
        mt: 15,
        minHeight: "110vh",
        padding: 6,
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
        sx={{ maxWidth: 1200, position: "relative", zIndex: 2 }}
      >
        {/* Left Section: 3D Illustration */}
        <Grid item xs={12} md={6}>
          <Box
            ref={boxRef}
            sx={{
              backgroundImage: "url('/image/robo-team.jpg')",
              backgroundSize: "contain",
              backgroundPosition: "center",
              height: "100%",
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
              // "&:hover": {
              //   transform: "perspective(1000px) rotateY(-10deg)",
              //   boxShadow: "0 0 60px rgba(108, 93, 211, 0.8)",
              // },
            }}
          ></Box>
        </Grid>

        {/* Right Section: Neon Content */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            borderRadius: 3,
            backgroundColor: "rgba(15, 15, 15, 0.8)",
            backdropFilter: "blur(12px)",
            padding: 4,
            height: "100%",
            // mb: 8,
            border: "1px solid rgba(108, 93, 211, 0.3)",
            boxShadow: "0 0 30px rgba(108, 93, 211, 0.4)",
            marginTop: "4.5vh",
            "&:hover": {
              // boxShadow: "0 0 60px rgba(108, 93, 211, 0.8)",
            },
            transition: "all 0.4s ease-in-out",
          }}
        >
          {/* Title with Neon Glow */}
          <Typography
            align="center"
            variant="h2"
            gutterBottom
            sx={{
              fontWeight: "Bold",
              marginBottom: 2,
              fontSize: "2.35rem",
              // background: "linear-gradient(45deg, #b3a6ff 20%, #ffffff 80%)",
              // WebkitBackgroundClip: "text",
              // WebkitTextFillColor: "transparent",
              // textAlign: "center",
              // position: "relative",
              // animation: "glow 3s infinite alternate",
              // "@keyframes glow": {
              //   "0%": { textShadow: "0 0 10px rgba(179, 166, 255, 0.8)" },
              //   "100%": { textShadow: "0 0 20px rgba(179, 166, 255, 1)" },
              // },
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
                    // boxShadow: "0 0 20px rgba(108, 93, 211, 0.4)",
                    // transition: "all 0.3s",
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
        </Grid>
      </Grid>
    </Box>
  );
}
