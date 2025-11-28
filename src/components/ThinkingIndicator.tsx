import { Box } from "@mui/material";

export default function ThinkingIndicator() {
  return (
    <Box
      sx={{
        width: 48,
        height: 48,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        animation: "thinkingPulse 1.6s ease-out infinite",
      }}
    >
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="24" fill="#F18C6A"/>
            <circle cx="24" cy="24" r="17" fill="#FFC0C0"/>
            <circle cx="24" cy="24" r="10" fill="white"/>
        </svg>
    </Box>
  );
}