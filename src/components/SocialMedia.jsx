"use client";
import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";

const SocialMedia = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh", // Make sure it takes full height of the screen
          fontFamily:
            "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif",
          overflow: "hidden",
          position: "relative",
          "&:before": {
            content: '""',
            position: "absolute",
            width: "60vw", // Adjust width for responsiveness
            height: "60vw", // Adjust height for responsiveness
            background:
              "radial-gradient(circle, rgba(113, 47, 255, 0.15) 0%, transparent 70%)",
            top: "20%",
            left: "10%",
          },
          "&:after": {
            content: '""',
            position: "absolute",
            width: "40vw", // Adjust width for responsiveness
            height: "40vw", // Adjust height for responsiveness
            background:
              "radial-gradient(circle, rgba(255, 74, 162, 0.1) 0%, transparent 70%)",
            bottom: "20%",
            right: "10%",
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            borderRadius: "32px",
            width: { xs: "90vw", md: "75vw" }, // Adjust width for responsiveness
            height: { xs: "70vh", md: "85vh" }, // Adjust height for responsiveness
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)",
            overflow: "hidden",
            "&:before": {
              content: '""',
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(120deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)",
            },
          }}
        >
          <Box
            sx={{
              position: "relative",
              zIndex: 2,
              padding: { xs: 3, md: 6 }, // Adjust padding for smaller screens
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{ maxWidth: { xs: "100%", md: "50%" }, position: "relative" }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "1.8rem", md: "2rem" }, // Adjust font size for responsiveness
                  fontWeight: 550,
                  lineHeight: 1.2,
                  background: "linear-gradient(45deg, #fff 30%, #c3b5e3 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mb: 3,
                  textShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                }}
              >
                Cooper: Automate Your Social Media Mastery
              </Typography>

              <Typography
                variant="subtitle1"
                sx={{
                  fontSize: { xs: "1rem", md: "1.25rem" },
                  color: "rgba(255, 255, 255, 0.85)",
                  lineHeight: 1.6,
                  mb: 4,
                  maxWidth: "30rem",
                  fontWeight: 400,
                }}
              >
                Engage your audience with business automation tools. Use AI for
                customer support to analyze comments and craft personalized responses.
              </Typography>

              <Button
                variant="contained"
                size="large"
                sx={{
                  background:
                    "linear-gradient(45deg, #8a63f2 0%, #c063f2 100%)",
                  borderRadius: "12px",
                  padding: "10px 26px",
                  fontWeight: 600,
                  textTransform: "none",
                  fontSize: "1.1rem",
                  boxShadow: "0 4px 16px rgba(138, 99, 242, 0.3)",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 20px rgba(138, 99, 242, 0.4)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Start Free Trial
              </Button>
            </Box>

            <Box
              sx={{
                display: {
                  xs: 'none', md: 'flex',
                },
                position: "absolute",
                right: { xs: "-10%", md: "5%" },
                bottom: "-5%",
                height: { xs: "60%", md: "90%" }, // Adjust height for responsiveness
                width: { xs: "60%", md: "40%" }, // Adjust width for responsiveness
                background:
                  "url('/image/carousel4.png') no-repeat center/contain",
                filter: "drop-shadow(0 16px 32px rgba(0, 0, 0, 0.3))",
                animation: "float 6s ease-in-out infinite",
                "@keyframes float": {
                  "0%, 100%": { transform: "translateY(0)" },
                  "50%": { transform: "translateY(-20px)" },
                },
              }}
            />
          </Box>
        </Box>
      </Box>


      {/* PARENT BOTH  */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 5,
          minHeight: "100vh",
          fontFamily:
            "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif",
          overflow: "hidden",
          position: "relative",
          flexDirection: { xs: "column", md: "row" }, // Stack items in column for smaller screens
          "&:before": {
            content: '""',
            position: "absolute",
            width: "50vw", // Use vw for responsiveness
            height: "50vw", // Use vw for responsiveness
            background:
              "radial-gradient(circle, rgba(113, 47, 255, 0.15) 0%, transparent 70%)",
            top: "20%",
            left: "10%",
          },
          "&:after": {
            content: '""',
            position: "absolute",
            width: "35vw", // Use vw for responsiveness
            height: "35vw", // Use vw for responsiveness
            background:
              "radial-gradient(circle, rgba(255, 74, 162, 0.1) 0%, transparent 70%)",
            bottom: "20%",
            right: "10%",
          },
        }}
      >
        {/* LEFT BOX */}
        <Box
          sx={{
            position: "relative",
            borderRadius: "32px",
            height: { xs: "auto", md: "90vh" }, // Adjust height for smaller screens
            width: { xs: "90%", md: "35.5vw" }, // Adjust width for smaller screens
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)",
            overflow: "hidden",
            "&:before": {
              content: '""',
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(120deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)",
            },
          }}
        >
          <Box
            sx={{
              padding: "40px",
              position: "relative",
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2rem", md: "30px" },
                fontWeight: 550,
                lineHeight: 1.5,
                background: "linear-gradient(45deg, #fff 30%, #c3b5e3 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 3,
                textShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              }}
            >
              James: Manages your Finances
            </Typography>

            <Typography
              variant="subtitle1"
              sx={{
                fontSize: { xs: "1rem", md: "18px" },
                color: "rgba(255, 255, 255, 0.85)",
                lineHeight: 1.6,
                fontWeight: 400,
                marginTop: "1rem",
                width: { xs: "100%", md: "27vw" }, // Adjust width for smaller screens
              }}
            >
              {`
        Transform your social presence with AI-powered content creation,
        scheduling, and analytics. Effortlessly maintain your brand's
        voice across all platforms.`}
            </Typography>
          </Box>

          <Box
            sx={{
              position: "absolute",
              display: {
                xs: 'none', md: 'flex',
              },
              right: { xs: "-10%", md: "20%" },
              bottom: "-15%",
              height: { xs: "40%", md: "90%" }, // Adjust height for smaller screens
              width: { xs: "70%", md: "60%" }, // Adjust width for smaller screens
              background:
                "url('/image/carousel3.png') no-repeat center/contain",
              filter: "drop-shadow(0 16px 32px rgba(0, 0, 0, 0.3))",
              animation: "float 6s ease-in-out infinite",
              "@keyframes float": {
                "0%, 100%": { transform: "translateY(0)" },
                "50%": { transform: "translateY(-20px)" },
              },
            }}
          />
        </Box>

        {/* RIGHT BOX */}
        <Box
          sx={{
            position: "relative",
            borderRadius: "32px",
            height: { xs: "auto", md: "90vh" }, // Adjust height for smaller screens
            width: { xs: "90%", md: "35.5vw" }, // Adjust width for smaller screens
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)",
            overflow: "hidden",
            "&:before": {
              content: '""',
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(120deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)",
            },
          }}
        >
          <Box
            sx={{
              padding: "40px",
              position: "relative",
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2rem", md: "30px" },
                fontWeight: 550,
                lineHeight: 1.5,
                background: "linear-gradient(45deg, #fff 30%, #c3b5e3 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 3,
                textShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              }}
            >
              Cassie: Manages your Marketing campaigns
            </Typography>

            <Typography
              variant="subtitle1"
              sx={{
                fontSize: { xs: "1rem", md: "18px" },
                color: "rgba(255, 255, 255, 0.85)",
                lineHeight: 1.6,
                fontWeight: 400,
                marginTop: "1rem",
                width: { xs: "100%", md: "27vw" }, // Adjust width for smaller screens
              }}
            >
              {`
        Transform your social presence with AI-powered content creation,
        scheduling, and analytics. Effortlessly maintain your brand's
        voice across all platforms.`}
            </Typography>
          </Box>

          <Box
            sx={{
              display: {
                xs: 'none', md: 'flex',
              },
              position: "absolute",
              right: { xs: "-10%", md: "20%" },
              bottom: "-15%",
              height: { xs: "40%", md: "90%" }, // Adjust height for smaller screens
              width: { xs: "70%", md: "60%" }, // Adjust width for smaller screens
              background:
                "url('/image/carousel2.png') no-repeat center/contain",
              filter: "drop-shadow(0 16px 32px rgba(0, 0, 0, 0.3))",
              animation: "float 6s ease-in-out infinite",
              "@keyframes float": {
                "0%, 100%": { transform: "translateY(0)" },
                "50%": { transform: "translateY(-20px)" },
              },
            }}
          />
        </Box>
      </Box>

    </>
  );
};

export default SocialMedia;
