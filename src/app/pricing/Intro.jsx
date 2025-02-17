"use client"
import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// Custom MUI theme with Google Fonts
const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, Arial, sans-serif", // Default font
    h1: {
      fontFamily: "Playfair Display, serif", // Professional font for headers
    },
  },
});

const IntroText = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          marginBottom: 8,
          textAlign: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Line 1 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: "3.5rem",
              fontWeight: 900,
              lineHeight: "4rem",
              color: "#ffffff", // Clean and professional white text
            }}
          >
            Manage all
          </Typography>
        </motion.div>

        {/* Line 2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Typography
            variant="h1"
            component="span"
            sx={{
              fontSize: "3.5rem",
              fontWeight: 900,
              lineHeight: "4rem",
              color: "#ffffff", // Consistent white text
            }}
          >
            your company
          </Typography>
        </motion.div>

        {/* Line 3 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Typography
            variant="h1"
            component="span"
            sx={{
              fontSize: "3.5rem",
              fontWeight: 900,
              lineHeight: "4rem",
              color: "#ffffff",
            }}
          >
            work
          </Typography>
        </motion.div>

        {/* Line 4 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: "3.5rem",
              fontWeight: 900,

              lineHeight: "4rem",
              color: "#ffffff",

            }}
          >
            at one place
          </Typography>
        </motion.div>
      </Box>
    </ThemeProvider>
  );
};

export default IntroText;
