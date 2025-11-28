import { Box, Typography } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useEffect, useRef, useState } from "react";
import MapSection from "../components/MapSection";

const EN_TEXT = "WELCOME TO AN AI OF OUR OWN";
const KM_TEXT = "សូមស្វាគមន៍មកកាន់ AI របស់យើងផ្ទាល់";

export default function Home() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const scrollToMap = () => {
    if (!containerRef.current) return;
    const mapSection = containerRef.current.querySelector("#map-section");
    if (mapSection instanceof HTMLElement) {
      mapSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Box
      ref={containerRef}
      sx={{
        height: "100vh",
        width: "100%",
        overflowY: "auto",
        scrollSnapType: "y mandatory",
        bgcolor: "#E6E7EB",
      }}
    >
      <Box
        sx={{
          height: "100vh",
          scrollSnapAlign: "start",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            border: "1px solid #C7C7C7",
            borderRadius: "40px",
            height: "95vh",
            width: { xs: "80%", sm: "420px" },
            maxWidth: "480px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            backgroundColor: "#fff",
            px: 2,
          }}
        >
          <Box style={{ padding: "8px" }}>
          <Typography
            sx={{
              fontFamily: '"Josefin Sans", sans-serif',
              fontSize: "24px",
              letterSpacing: "0.18em",
              textAlign: "center",
              textTransform: "uppercase",
              color: "#AF522C"
            }}
          >
            {EN_TEXT}
          </Typography>

            <Typography
              sx={{
                mt: 3,
                fontFamily: '"Josefin Sans", sans-serif',
                fontSize: "24px",
                textAlign: "center",
                lineHeight: 1.4,
                color: "#E6AC73"
              }}
            >
              {KM_TEXT}
            </Typography>
          </Box>

          <Box
            onClick={scrollToMap}
            sx={{
              position: "absolute",
              bottom: 28,
              left: "50%",
              transform: "translateX(-50%)",
              cursor: "pointer",
            }}
          >
            <ArrowDownwardIcon fontSize="large" sx={{ color: "#C7C7C7" }}/>
          </Box>
        </Box>
      </Box>

      <Box
        id="map-section"
        sx={{
          height: "100vh",
          scrollSnapAlign: "start",
          bgcolor: "#f9fafb",
        }}
      >
        <MapSection />
      </Box>
    </Box>
  );
}
