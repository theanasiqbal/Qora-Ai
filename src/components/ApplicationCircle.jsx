"use client";
import { Box, styled, Tooltip, Typography } from "@mui/material";
import { Bot } from "lucide-react";
import { useEffect, useState } from "react";

// Styled components for the visualization
const Container = styled(Box)({
  width: "100%",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#000",
  position: "relative",
});

const CenterLogo = styled(Box)({
  width: "60px",
  height: "60px",
  position: "absolute",
  zIndex: 2,
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
});

const Circle = styled(Box)({
  width: "400px",
  height: "400px",
  position: "relative",
  animation: "rotate 20s linear infinite",
  "@keyframes rotate": {
    "0%": {
      transform: "rotate(0deg)",
    },
    "100%": {
      transform: "rotate(360deg)",
    },
  },
});

const Icon = styled(Box)({
  width: "50px",
  height: "50px",
  position: "absolute",
  left: "50%",
  top: "50%",
  marginLeft: "-25px",
  marginTop: "-25px",
  animation: "counter-rotate 20s linear infinite",
  "@keyframes counter-rotate": {
    "0%": {
      transform: "rotate(0deg)",
    },
    "100%": {
      transform: "rotate(-360deg)",
    },
  },
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
});

// Sample integration data
const apps = [
  {
    id: 1,
    name: "Figma",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    description: "Design and prototyping tool",
  },
  {
    id: 2,
    name: "GitHub",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    description: "Code hosting and collaboration",
    class: "w-8 h-8 bg-white p-2 rounded",
  },
  {
    id: 3,
    name: "Discord",
    icon: "https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png",
    description: "Communication platform",
  },
  {
    id: 4,
    name: "Slack",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg",
    description: "Team collaboration hub",
  },
  {
    id: 5,
    name: "VS Code",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
    description: "Code editor",
  },
  {
    id: 6,
    name: "Jira",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg",
    description: "Project management tool",
  },
  {
    id: 7,
    name: "GitLab",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg",
    description: "DevOps platform",
  },
  {
    id: 8,
    name: "Notion",
    icon: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png",
    description: "All-in-one workspace",
  },
];

export default function RotatingIntegrations() {
  const [radius, setRadius] = useState(220); // Default size

  useEffect(() => {
    const updateRadius = () => {
      const newRadius =
        window.innerWidth < 600 ? 120 : window.innerWidth < 900 ? 180 : 220;
      setRadius(newRadius);
    };

    updateRadius(); // Set initial value
    window.addEventListener("resize", updateRadius);

    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  return (
    <Container
      sx={{
        backgroundColor: "transparent",
        position: "relative",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        "&:before": {
          content: '""',
          position: "absolute",
          width: { xs: "300px", sm: "450px", md: "600px" },
          height: { xs: "300px", sm: "450px", md: "600px" },
          background:
            "radial-gradient(circle, rgba(113, 47, 255, 0.15) 0%, transparent 70%)",
          top: { xs: "10%", md: "20%" },
          left: { xs: "5%", md: "10%" },
        },
        "&:after": {
          content: '""',
          position: "absolute",
          width: { xs: "200px", sm: "300px", md: "400px" },
          height: { xs: "200px", sm: "300px", md: "400px" },
          background:
            "radial-gradient(circle, rgba(113, 47, 255, 0.15) 0%, transparent 70%)",
          top: { xs: "5%", md: "10%" },
          left: { xs: "40%", md: "60%" },
        },
      }}
    >
      <Box
        sx={{
          height: { xs: "auto", md: "50vh" },
          width: { xs: "90%", md: "50%" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          mb: { xs: 5, md: 0 },
        }}
      >
        <Typography
          align="center"
          variant="h2"
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
            mb: 3,
          }}
        >
          Integrates with <br /> your favorite tools.
        </Typography>
        <Box sx={{ width: { xs: "80%", md: "60%" } }}>
          <Typography
            align="center"
            variant="h4"
            sx={{
              fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
              mb: 5,
            }}
          >
            {process.env.NEXT_PUBLIC_NAME} works in harmony with your existing software to help you
            achieve more without the hassle of switching platforms. Say goodbye
            to disjointed processes and hello to a unified, streamlined
            solution.
          </Typography>
        </Box>
      </Box>

      <Circle sx={{ position: "relative", mr: { xs: 0, md: 10 } }}>
        {/* Center Logo */}
        <CenterLogo
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Bot className="size-10 text-white" />
        </CenterLogo>

        {/* Apps mapped around the center */}
        {apps.map((app, index) => {
          const angle = (360 / apps.length) * index;
          const radian = (angle * Math.PI) / 180;

          const x = Math.cos(radian) * radius;
          const y = Math.sin(radian) * radius;

          return (
            <Tooltip
              key={app.id}
              title={
                <Box sx={{ p: 1 }}>
                  <strong>{app.name}</strong>
                  <br />
                  {app.description}
                </Box>
              }
              arrow
              placement="top"
            >
              <Icon
                sx={{
                  position: "absolute",
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <img
                  className={app.class || ""}
                  src={app.icon || "/placeholder.svg"}
                  alt={app.name}
                />
              </Icon>
            </Tooltip>
          );
        })}
      </Circle>
    </Container>

  );
}
