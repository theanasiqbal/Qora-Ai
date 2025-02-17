"use client"
import { Stack, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import { content, packagesHrms } from "./data";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import PriceSwitch from "./PriceSwitch";
import PriceCard from "./PriceCard";
import { motion, useInView } from "framer-motion";

const Hrms = () => {
  const [billing, setBilling] = useState("Yearly");
  const handlePriceChange = (event) => {
    setBilling(event.target.checked ? "Monthly" : "Yearly");
  };
  const pricesHrms = useMemo(
    () =>
      packagesHrms.map((item) => ({
        ...item,
        price:
          billing === "Monthly" ? Math.floor(item.price * 1.2) : item.price,
      })),
    [billing]
  );
  return (
    <Stack
      direction="column"
      spacing={5}
     
      alignItems="center"
      justifyContent="center"
      sx={{
        padding: "3rem",
        // width: "100vw",
        background:` linear-gradient(to top, #4dd0b3, #35bfc6, #52abc8, #7196b8, #80839e); 
       linear-gradient(127.43deg, rgba(0, 213, 200, 0.5) 0%, rgba(34, 0, 170, 0.5) 100%)`,
        backgroundBlendMode: "difference, normal",
      }}
    >
      {/* <Typography
        variant="h2"
        sx={{
          fontSize: "2rem",
          fontWeight: 600,
          textAlign: "center",
          color: "white",
        }}
      >
        {"HRMS"}
      </Typography> */}

      {/* Feature List */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={5}
        alignItems="center"
        justifyContent="space-evenly"
        sx={{ color: "white" }}
      >
        {content.features.map((item, index) => (
          <Stack key={index} direction="row" spacing={1}>
            <CheckOutlinedIcon />
            <Typography variant="body1" l>
              {item}
            </Typography>
          </Stack>
        ))}
      </Stack>
      {/* Price Toggle Switch */}
      <PriceSwitch
        setPrice={handlePriceChange}
        checkStatus={billing}
        color="white"
      />

      {/* Pricing Cards */}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={8}>
        {pricesHrms.map((item, index) => {
          const ref = React.useRef(null);
          const isInView = useInView(ref, { once: true, margin: "50px" });

          return (
            <motion.div
              key={item.id}
              ref={ref}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              whileHover={{
                scale: 1.02,

                boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.2)",
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <PriceCard
                id={item.id}
                name={item.name}
                desc={item.desc}
                price={item.price}
                includes={item.includes}
                color={item.color}
                buttoncolor={item.buttoncolor}
                hovercolor={item.hovercolor}
                border={item.border}
                includescolor={item.includescolor}
                index={index}
              />
            </motion.div>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default Hrms;
