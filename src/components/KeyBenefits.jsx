"use client";
import React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Box, Typography, Grid, Paper } from "@mui/material";

gsap.registerPlugin(ScrollTrigger);

export default function Benefits() {
  const features = [
    {
      id: 1,
      title: "Content Generation",
      description:
        "Generate drafts for blogs, emails, product descriptions, and more in English.",
    },
    {
      id: 2,
      title: "Customizable Personas",
      description:
        "Tailored AI characters like a marketing manager, software developer, and HR specialist provide personalized assistance for each domain.",
    },
    {
      id: 3,
      title: "Multilingual Support",
      description: "Support for over 20 languages ensures global reach.",
    },
    {
      id: 4,
      title: "Integration Capabilities",
      description: "Seamless integration with email tools and other platforms.",
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: "#151221",
        color: "white",
        marginTop: "10vh",
        minHeight: "70vh",
        padding: 4,
        overflow: "hidden",
        position: "relative",
        "&:before": {
          content: '""',
          position: "absolute",
          width: "600px",
          // border: "1px solid red",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(113, 47, 255, 0.15) 0%, transparent 70%)",
          top: "20%",
          left: "10%",
        },
        "&:after": {
          content: '""',
          position: "absolute",
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(circle, rgba(113, 47, 255, 0.15) 0%, transparent 70%)",
          top: "20%",
          left: "10%",
        },
      }}
    >
      <Typography
        align="center"
        variant="h2"
        sx={{
          fontWeight: "bold",
          fontSize: { xs: "2rem", md: "3rem" },
          mb: 10,
        }}
      >
        Key Features & Benefits
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {features.map((feature) => (
          <Grid item xs={12} sm={6} md={5} key={feature.id}>
            <Paper
              sx={{
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(12px)",
                padding: 3,
                borderRadius: 2,
                // boxShadow: 3,
              }}
              elevation={0}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", marginBottom: 1, color: "white" }}
              >
                {feature.title}
              </Typography>
              <Typography sx={{ color: "white" }} variant="body1">
                {feature.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
