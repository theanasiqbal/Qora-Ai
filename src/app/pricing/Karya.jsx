"use client"
import { Stack, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import { content, packagesKarya } from "./data";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import PriceSwitch from "./PriceSwitch";
import PriceCard from "./PriceCard";
import { motion, useInView } from "framer-motion";

const Karya = () => {
  const [billing, setBilling] = useState("Yearly");
  const pricesKarya = useMemo(
    () =>
      packagesKarya.map((item) => ({
        ...item,
        price:
          billing === "Monthly" ? Math.floor(item.price * 1.2) : item.price,
      })),
    [billing]
  );
  const handlePriceChange = (event) => {
    setBilling(event.target.checked ? "Monthly" : "Yearly");
  };
  return (
    <Stack
      direction="column"
      spacing={5}
      alignItems="center"
      justifyContent="center"
      sx={{
        top: "0",
        padding: "3rem",
        // width: "100vw",
        background: `linear-gradient(to bottom, #d7d1fd, #c0bde5, #aaa9cd, #9496b5, #80839e)`,
        backgroundBlendMode: "difference, normal",
        // paddingTop: "100px",
      }}
    >
      {/* Feature List */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={5}
        alignItems="center"
        justifyContent="space-evenly"
        sx={{  }}
      >
        {content.features.map((item, index) => (
          <Stack key={index} direction="row" spacing={1}>
            <CheckOutlinedIcon sx={{ color: "black" }} />
            <Typography color="black" variant="body1">
              {item}
            </Typography>
          </Stack>
        ))}
      </Stack>
      {/* Price Toggle Switch */}
      <PriceSwitch
        setPrice={handlePriceChange}
        checkStatus={billing}
        color="black"
      />

      {/* Pricing Cards */}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={8}>
        {pricesKarya.map((item, index) => {
          const ref = React.useRef(null);
          const isInView = useInView(ref, { once: true, margin: "50px" });

          return (
            <motion.div
              key={item.id}
              ref={ref}
              initial={{ opacity: 0, y: 40 }}
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

export default Karya;
