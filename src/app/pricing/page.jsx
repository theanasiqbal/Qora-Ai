import React from "react";
import "./parallax.css";
import { Typography } from "@mui/material";

import Karya from "./Karya";
import Hrms from "./Hrms";
import { Payroll } from "./Payroll";
import IntroText from "./Intro";

const Pricing = () => {
  return (
    <>
      <div
        className="parallaxf2fin"
        style={{
          height: "100vh", // Full-screen height
          display: "flex",
          alignItems: "center",
          position: "relative", // For positioning the overlay
          justifyContent: "center",
          textAlign: "center", // Center align text horizontally
        }}
      >
        {/* Intro Overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.4)", // Black overlay with 50% opacity
            zIndex: 1, // Ensure it sits below the content but above the background
          }}
        ></div>
        {/* Intro Content */}
        <div style={{ position: "relative", zIndex: 2 }}>
          <IntroText />
        </div>
      </div>

      <div
        className="parallaxKarya"
        style={{
          height: "1000px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {/* Karya Overlay */}
        <div
          style={{
            position: "absolute",
            height: "1000px",
            width: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.4)", // Black overlay with 50% opacity
            zIndex: 1, // Ensure it sits below the content but above the background
          }}
        ></div>
        {/* Karya Content */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: "4rem",
              fontWeight: 900,
              textAlign: "center",
              lineHeight: "5rem",
              textShadow: "2px 2px 5px rgba(55, 113, 126, 1)",
              color: "#fff",
              padding: "20px 40px",
              borderRadius: "10px",
              fontFamily: "monospace",
            }}
          >
            {`KARYA.IO`}
          </Typography>
          <div
            style={{
              marginTop: "5rem",
              width: "70%",
            }}
          >
            <Typography
              variant="h3"
              component="h3"
              sx={{
                fontSize: "1.5rem",
                fontWeight: 400,
                textAlign: "center",
                lineHeight: "3rem",
                textShadow: "2px 2px 5px rgba(55, 113, 126, 1)",
                color: "#fff",
                padding: "10px 20px",
              }}
            >
              {`Karya.io helps teams plan, track, and manage projects by organizing tasks into customizable workflows. It offers task creation, prioritization, and assignment, using a visual board. Karya.io enhances collaboration, progress tracking, and reporting for efficient project execution.`}
            </Typography>
          </div>
        </div>
      </div>

      <Karya />

      <div
        className="parallaxHrms"
        style={{
          height: "1000px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {/* EMS Overlay */}
        <div
          style={{
            position: "absolute",
            height: "1000px",
            width: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.4)", // Black overlay with 50% opacity
            zIndex: 1, // Ensure it sits below the content but above the background
          }}
        ></div>
        {/* EMS Content */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: "4rem",
              fontWeight: 900,
              textAlign: "center",
              lineHeight: "5rem",
              textShadow: "2px 2px 5px rgba(55, 113, 126, 1)",
              color: "#fff",
              padding: "20px 40px",
              borderRadius: "10px",
              fontFamily: "monospace",
            }}
          >
            {`EMS`}
          </Typography>
          <div
            style={{
              marginTop: "5rem",
              width: "70%",
            }}
          >
            <Typography
              variant="h3"
              component="h3"
              sx={{
                fontSize: "1.5rem",
                fontWeight: 400,
                textAlign: "center",
                lineHeight: "3rem",
                textShadow: "2px 2px 5px rgba(55, 113, 126, 1)",
                color: "#fff",
                padding: "10px 20px",
              }}
            >
              {`An Employee Management System (EMS) is a software solution designed to streamline and automate various HR tasks, including employee records management, attendance tracking, and leave management. It helps organizations efficiently manage their workforce, improve productivity, and ensure compliance with company policies and regulations.`}
            </Typography>
          </div>
        </div>
      </div>

      <Hrms />

      {/* this is a payroll */}
      <div
        className="parallaxPayroll"
        style={{
          height: "1000px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {/* Payroll Overlay */}
        <div
          style={{
            position: "absolute",
            height: "1000px",
            width: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.4)", // Black overlay with 50% opacity
            zIndex: 1, // Ensure it sits below the content but above the background
          }}
        ></div>
        {/* Payroll content */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: "4rem",
              fontWeight: 900,
              textAlign: "center",
              lineHeight: "5rem",
              textShadow: "2px 2px 5px rgba(55, 113, 126, 1)",
              color: "#fff",
              fontFamily: "monospace",
              padding: "20px 40px",
              borderRadius: "10px",
            }}
          >
            {`PAYROLL`}
          </Typography>
          <div
            style={{
              marginTop: "5rem",
              width: "70%",
            }}
          >
            <Typography
              variant="h3"
              component="h3"
              sx={{
                fontSize: "1.5rem",
                fontWeight: 400,
                textAlign: "center",
                lineHeight: "3rem",
                textShadow: "2px 2px 5px rgba(55, 113, 126, 1)",
                color: "#fff",

                padding: "10px 20px",
              }}
            >
              {`A Payroll Management System is a software solution that automates the process of calculating, managing, and distributing employee salaries and wages. It handles tasks such as tax deductions, benefits administration, overtime calculation, and generating payslips, ensuring timely and accurate payroll processing while maintaining compliance with legal and regulatory requirements.`}
            </Typography>
          </div>
        </div>
      </div>

      <Payroll />
    </>
  );
};

export default Pricing;
