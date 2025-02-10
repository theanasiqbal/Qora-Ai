"use client"
import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Card,
  Divider,
  List,
  ListItem,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { blue } from "@mui/material/colors";

const PriceCard = ({
  id,
  name,
  desc,
  price,
  includes,
  color,
  buttoncolor,
  hovercolor,
  border,
  packagesHrms,
  packagesKarya,
  index
}) => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null); // Ref for the card element

  // Function to set unique border colors based on id
  const hoverBorder = () => {
    switch (id) {
      case 1:
        return "1.5px solid #FFC107";
      case 2:
        return "1.5px solid #0077C2";
      case 3:
        return "1.5px solid #A61DFF";
      default:
        return border;
    }
  };

  // Scroll event handler to check if card is in view
  const handleScroll = () => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top <= windowHeight * 0.8) { // Trigger when 80% in view
        setIsVisible(true);
      }
    }
  };

  useEffect(() => {
    // Add scroll listener
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on mount in case it's already in view

    // Remove scroll listener on cleanup
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Conditional animation styles based on index
  const fadeAnimation = index % 2 === 0
    ? {
       
      }
    : {
      
      };

  return (
    <Card
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        backgroundColor: color,
        p: 3,
        borderRadius: "10px",
        
        "&:hover": {
          transform:
            packagesKarya && isHovered
              ? "rotate(1deg) scale(0.98)"
              : packagesHrms && isHovered
              ? "scale(1.02)"
              : "scale(0.99)",
          boxShadow:
            packagesHrms && isHovered
              ? "0px 4px 20px rgba(0, 0, 255, 0.3)"
              : packagesKarya && isHovered
              ? "0px 6px 25px rgba(128, 0, 128, 0.3)"
              : "0px 4px 20px rgba(0, 0, 0, 0.2)",

                
        },
        ...fadeAnimation, // Apply fade animation based on index
      }}
    >
      <Stack direction="column" spacing={2}>
        <Stack
          direction="column"
          alignItems="center"
          className="break-words"
          spacing={1}
        >
          <Typography variant="h3" sx={{ fontSize: "1.5rem" }}>
            {name}
          </Typography>
          <Typography variant="h4" sx={{ fontSize: "4rem", fontWeight: "700" }}>
            €{price}
          </Typography>
          <Typography variant="body2" align="left">
            {desc}
          </Typography>
          <Button
            variant="contained"
            fullWidth
            sx={{
              borderRadius: "15px",
              backgroundColor: buttoncolor,
              color: "white",
              border: "none",
              "&:hover": {
                border: "none",
                backgroundColor: "#616161",
                color: "white",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
          <Typography> Start My 15-day Trial </Typography>
          </Button>
        </Stack>
        <Divider sx={{ width: 1 }} />
        <List>
          {includes.map((feature, idx) => (
            <ListItem
              key={idx}
              sx={{
                px: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="body2">{feature}</Typography>
            </ListItem>
          ))}
        </List>
      </Stack>
    </Card>
  );
};

export default PriceCard;
