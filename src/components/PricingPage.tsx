import { Box, Button, Card, Container, Typography, Stack } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

export default function PricingCards() {
  const plans = [
    {
      title: "Basic",
      price: "9.99",
      period: "/week",
      savings: "Save ~80% with annual billing",
      features: ["Cancel anytime", "Premium with no limits", "Full support"],
      buttonColor: "coral",
    },
    {
      title: "Premium",
      price: "19.99",
      period: "/month",
      savings: "Save ~60% with annual billing",
      features: [
        "24 hours Free trial, then charge",
        "Cancel anytime",
        "Premium with no limits",
      ],
      buttonColor: "white",
      popular: true,
    },
    {
      title: "Enterprise",
      price: "99.99",
      period: "/year",
      savings: "Best price",
      features: ["Cancel anytime", "Premium with no limits", "Premium support"],
      buttonColor: "coral",
    },
  ];

  return (
    <Box
      sx={{
        bgcolor: "trans",
        minHeight: "100vh",
        py: 8,
        overflow: "hidden",
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
          top: "20%",
          left: "10%",
        },
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={3}
          justifyContent="center"
          alignItems="stretch"
        >
          {plans.map((plan, index) => (
            <Card
              key={index}
              sx={{
                // bgcolor: "#1a1a1a",
                borderRadius: 4,
                p: 4,
                flex: 1,
                position: "relative",
                minWidth: { xs: "100%", md: "300px" },
                display: "flex",
                flexDirection: "column",
                height: "80vh",
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)",
                overflow: "hidden",
              }}
            >
              {plan.popular && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    bgcolor: "#1a4d4d",
                    color: "#4fd1c5",
                    px: 2,
                    py: 0.5,
                    borderRadius: 2,
                    fontSize: "0.875rem",
                  }}
                >
                  Popular
                </Box>
              )}

              <Typography
                variant="h4"
                component="h2"
                sx={{ color: "white", mb: 3 }}
              >
                {plan.title}
              </Typography>

              <Box sx={{ display: "flex", alignItems: "baseline", mb: 1 }}>
                <Typography
                  variant="h3"
                  component="span"
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "2.5rem",
                  }}
                >
                  ${plan.price}
                </Typography>
                <Typography
                  variant="subtitle1"
                  component="span"
                  sx={{ color: "#888", ml: 0.5 }}
                >
                  {plan.period}
                </Typography>
              </Box>

              <Typography
                sx={{
                  color: "#ff6b6b",
                  mb: 4,
                  fontSize: "0.875rem",
                }}
              >
                {plan.savings}
              </Typography>

              <Stack spacing={2} sx={{ mb: 4, flex: 1 }}>
                {plan.features.map((feature, idx) => (
                  <Box
                    key={idx}
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <CheckIcon sx={{ color: "white", fontSize: "1.25rem" }} />
                    <Typography sx={{ color: "white" }}>{feature}</Typography>
                  </Box>
                ))}
              </Stack>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    //   mt: "0 auto",

                    py: 1,
                    height: "6vh",
                    textTransform: "none",
                    width: "15vw",
                    background:
                      "linear-gradient(45deg, #8a63f2 0%, #c063f2 100%)",
                    fontSize: "1.1rem",
                    boxShadow: "0 4px 16px rgba(138, 99, 242, 0.3)",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 6px 20px rgba(138, 99, 242, 0.4)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Try for Free
                </Button>
              </Box>
            </Card>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
