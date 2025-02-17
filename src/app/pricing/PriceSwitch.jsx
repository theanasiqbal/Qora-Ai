"use client"
import { Box, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";

const Switcher = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#0f1111",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color: "grey",
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette?.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: "#E1E1E1",
    opacity: 1,
    transition: theme?.transitions?.create(["background-color"], {
      duration: 500,
    }),
  },
}));

const PriceSwitch = ({ checkStatus, price, setPrice, color }) => {
  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      justifyContent="center"
      sx={{ pt: 5 }}
    >
      <Box sx={{ position: "relative" }}>
        <Typography
         color={color}
          sx={{
            fontFamily: "'Dancing Script', cursive",
            transform: "rotate(-25deg)",
            left: "-90px",
            top: "-35px",
            position: "absolute",
            color: "black"
            
          }}
        >
          get 3 months free
        </Typography>
        <Box sx={{ position: "absolute", left: "-32px", bottom: "8px" }}>
          <svg 
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_123_4)">
              <rect width="28" height="28" />
              <path 
                d="M26 26C18 24.8211 2 18.3705 2 2"
                stroke="#1465FA"
                stroke-width="3"
                stroke-linecap="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_123_4">
                <rect width="28" height="28" />
              </clipPath>
            </defs>
          </svg>
        </Box>
     
        <Typography color={color} variant="body2">Billed Yearly </Typography>
        
      </Box>
      <Switcher
        name="Price Change"
        sx={{ m: 1 }}
        onChange={setPrice}
        checked={checkStatus === "Monthly"}
      />
      <Typography  color={color} variant="body2">Billed Monthly</Typography>
    </Stack>
  );
};

export default PriceSwitch;
