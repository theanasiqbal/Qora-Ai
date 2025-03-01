"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from "@mui/material";

const faqs = [
  {
    question: `What can I use ${process.env.NEXT_PUBLIC_NAME} for?`,
    answer:
      `${process.env.NEXT_PUBLIC_NAME} can be used for a wide range of business automation needs, from marketing campaigns to customer support workflows. Our AI-powered platform helps streamline your operations and improve efficiency.`,
  },
  {
    question: "Is there a money-back guarantee?",
    answer:
      "Yes, we offer a 30-day money-back guarantee. If you are not completely satisfied with our service, you can request a full refund within the first 30 days of your subscription.",
  },
  {
    question: `Can I invite my team to use ${process.env.NEXT_PUBLIC_NAME}?`,
    answer:
      `${process.env.NEXT_PUBLIC_NAME} is designed for team collaboration. You can easily invite team members and manage their access levels through your account settings.`,
  },
  {
    question: `Does ${process.env.NEXT_PUBLIC_NAME} have an affiliate program?`,
    answer:
      `Yes, we have an affiliate program that rewards partners for referring new customers to ${process.env.NEXT_PUBLIC_NAME}. Contact our partnership team for more details.`,
  },
  {
    question: `Are there tutorials or guides to help me use ${process.env.NEXT_PUBLIC_NAME}?`,
    answer:
      `We provide comprehensive documentation, video tutorials, and guided walkthroughs to help you get started. Our support team is also available 24/7.`,
  },
  {
    question: `Can ${process.env.NEXT_PUBLIC_NAME} integrate with other software I use?`,
    answer:
      `${process.env.NEXT_PUBLIC_NAME} offers extensive integration capabilities with popular business tools and platforms. Check our integration directory for a full list of supported services.`,
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        "&:before": {
          content: '""',
          position: "absolute",
          width: "600px",
          // border: "1px solid red",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(113, 47, 255, 0.15) 0%, transparent 70%)",
          top: "20%",
          left: "10%",
        },
        "&:after": {
          content: '""',
          position: "absolute",
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(circle, rgba(113, 47, 255, 0.15) 0%, transparent 70%)",
          top: "40%",
          left: "10%",
        },
        color: "white",

        p: 6,
      }}
    >
      <Box
        sx={{
          maxWidth: "1200px",
          display: "flex",
          alignItems: "center",
          flexDirection: {
            xs: "column",
            md: "row",
            sm: "row",
            lg: "row",
            xl: "row",
          },
          justifyContent: "center",
          margin: "30px auto 0 auto",
          backgroundColor: "transparent",
        }}
      >
        <Box sx={{ marginBottom: 4, width: "40vw" }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "2rem", md: "3rem" },
              mb: 2,
            }}
          >
            Questions?
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "2rem", md: "3rem" },
              mb: 4,
            }}
          >
            Let us clear things up.
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "#ced4da", fontSize: "1rem" }}
          >
            Yes, we understand—AI-powered solutions, business automation tools,
            AI for marketing, AI for customer support... a lot of big words can
            get confusing.
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "#ced4da", fontSize: "1rem", mt: 2 }}
          >
            We are here to make it clear—check out our FAQs, and if you still
            feel the need to ask AI questions, Cassie is always ready to answer.
          </Typography>
        </Box>

        <Box
          sx={{
            spaceY: 2,
            backgroundColor: "transparent",
            width: "40vw",
          }}
        >
          {faqs.map((faq, index) => (
            <Accordion
              key={index}
              expanded={openIndex === index}
              onChange={() => setOpenIndex(openIndex === index ? null : index)}
              sx={{
                borderBottom: "1px solid #333",
                backgroundColor: "transparent",
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ChevronDown
                    style={{ color: "white" }}
                    className={`w-5 h-5 transition-transform duration-200 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                }
                sx={{
                  backgroundColor: "transparent",
                  color: "white",
                  "&:hover": { color: "white" },
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "16px 24px",
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: "500" }}>
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{ padding: "16px 24px", backgroundColor: "transparent" }}
              >
                <Typography variant="body2" sx={{ color: "#ced4da" }}>
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
