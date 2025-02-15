import React from "react";

import Carousel from "./Carousel";
import { Box, Typography } from "@mui/material";

const AssistantList = () => {
  return (
    <Box>
      <Typography
        align="center"
        variant="h2"
        sx={{
          fontWeight: "bold",
          fontSize: { xs: "2rem", md: "3rem" },
          mt: 5,
          mb: 2,
          // letterSpacing: 1.5, // Subtle Spacing for Elegance
          // lineHeight: 1.2, // Better Readability
          color: "#fffff", // Dark Grey for a Premium Look
          textTransform: "capitalize", // Keeps it Refined
          textShadow: "2px 2px 8px rgba(0, 0, 0, 0.1)", // Soft Shadow for Depth
        }}
      >
        AI Assistants for All Your Need
      </Typography>

      <Carousel />
    </Box>
  );
};

export default AssistantList;
