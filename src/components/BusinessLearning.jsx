import React from "react";
import {
  Grid,
  Paper,
  Typography,
  Box,
  Avatar,
  IconButton,
} from "@mui/material";
import { Facebook, Email, Business, AttachMoney } from "@mui/icons-material";

const BusinessLearningCard = ({ title, description, icon }) => (
  <Paper
    elevation={3}
    sx={{ padding: 2, textAlign: "center", backgroundColor: "#2F2B54" }}
  >
    <IconButton
      sx={{
        fontSize: 40,
        color: "#fff",
      }}
    >
      {icon}
    </IconButton>
    <Typography
      sx={{
        color: "#fff",
        fontFamily: `Roboto", "Helvetica", "Arial", sans-serif`,
        fontWeight: "600",
      }}
      variant="h6"
    >
      {title}
    </Typography>
    <Typography sx={{ color: "#fff" }} variant="body2">
      {description}
    </Typography>
  </Paper>
);

const App = () => {
  return (
    <Box
      sx={{
        backgroundColor: "trans",
        minHeight: "100vh",
        color: "white",
        padding: 4,
      }}
    >
      <Typography
        variant="h3"
        sx={{
          textAlign: "center",
          fontWeight: 700,
          lineHeight: 1.2,
          color: "white",
          letterSpacing: "-0.5px",
          fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
        }}
      >
        They learn your business. <br /> Just like real employees.
      </Typography>

      <Typography
        variant="h6"
        sx={{
          textAlign: "center",
          color: "rgba(255, 255, 255, 0.8)",
          fontSize: "18px",
          maxWidth: "600px",
          margin: "0 auto", // Centers the element horizontally
          mb: 9,
          fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
        }}
      >
        Answer questions about your brand, add files, instructions, and your
        website for more unique results. The more information they have, the
        better the outcome.
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={3}>
          <BusinessLearningCard
            title="Brand website"
            description="eCommerce, 2+ pages"
            icon={<Business />}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <BusinessLearningCard
            title="Facebook Insights"
            description="Trustpilot, 30+ reviews"
            icon={<Facebook />}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <BusinessLearningCard
            title="Services pricing"
            description="Starting at $X, 2+ more"
            icon={<AttachMoney />}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <BusinessLearningCard
            title="Team Photos"
            description="Company retreat 2021"
            icon={<Avatar sx={{ width: 56, height: 56 }} />}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <BusinessLearningCard
            title="Team handbook"
            description="16 pages, guidelines"
            icon={<Avatar sx={{ width: 56, height: 56 }} />}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <BusinessLearningCard
            title="Client proposal"
            description="$50k budget"
            icon={<Email />}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <BusinessLearningCard
            title="Conversation with Julia"
            description="Follow-up scheduled"
            icon={<Email />}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default App;
