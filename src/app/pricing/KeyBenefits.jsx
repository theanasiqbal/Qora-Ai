"use client";
import React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Box, Typography, Grid2, Paper } from "@mui/material";

gsap.registerPlugin(ScrollTrigger);

export default function Benefits() {
  const features = [
    {
      title: "Content Generation",
      description:
        "Generate drafts for blogs, emails, product descriptions, and more in English.",
    },
    {
      title: "Customizable Personas",
      description:
        "Tailored AI characters like a marketing manager, software developer, and HR specialist provide personalized assistance for each domain.",
    },
    {
      title: "Multilingual Support",
      description: "Support for over 20 languages ensures global reach.",
    },
    {
      title: "Integration Capabilities",
      description: "Seamless integration with email tools and other platforms.",
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: "#151221",
        color: "white",
        minHeight: "100vh",
        padding: 4,
      }}
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold" }}
      >
        Key Features & Benefits
      </Typography>
      <Grid2 container spacing={4} justifyContent="center">
        {features.map((feature, index) => (
          <Grid2 item xs={12} sm={6} md={5} key={index}>
            <Paper
              sx={{
                backgroundColor: "blue",
                padding: 3,
                borderRadius: 2,
                boxShadow: 3,
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
          </Grid2>
        ))}
        
      </Grid2>
    </Box>
  );
}
