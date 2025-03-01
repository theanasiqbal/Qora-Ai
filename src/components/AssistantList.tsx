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
    fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem", lg: "3rem" }, // More responsive scaling
    mt: { xs: 3, sm: 4, md: 5 },
    mb: { xs: 1, sm: 2 },
    color: "#ffffff", // Fixed color code typo
    textTransform: "capitalize",
    textShadow: "2px 2px 8px rgba(0, 0, 0, 0.1)",
    lineHeight: { xs: 1.2, sm: 1.3, md: 1.4 }, // Ensures better readability on different screens
    px: { xs: 2, sm: 4 }, // Adds slight padding on small screens to prevent text cutoff
  }}
>
  AI Assistants for All Your Needs
</Typography>


      <Carousel />
    </Box>
  );
};

export default AssistantList;
