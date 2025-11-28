import { Box, Typography } from "@mui/material";
import type { ReactNode } from "react";

export default function ChatBubbleRecent({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        height: 36,
      }}
    >
      <Box
        component="svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 219 34"
        preserveAspectRatio="none"
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.31533 14.5301C9.31533 19.4196 6.57322 22.8385 1.089 24.7867L0.719331 24.9144C0.149156 25.1059 -0.142192 25.6811 0.0685912 26.1991C0.147633 26.3933 0.291108 26.5605 0.479206 26.6775C2.41702 27.8827 5.54334 28.5809 9.85817 28.7719C11.0998 31.8244 14.3308 34 18.121 34H211C215.418 34 219 30.4183 219 26V8C219 3.58172 215.418 0 211 0L17.5649 0C13.2628 0 9.73107 3.40227 9.57045 7.70133L9.31533 14.5301Z" fill="#F18C6A"/>
      </Box>

      <Typography
        sx={{
          position: "relative",
          px: "12px",
          py: "4px",
          fontSize: 14,
          lineHeight: 1,
          fontFamily: "Lato",
          color: "#fff",
          whiteSpace: "nowrap",
          marginLeft: "6px"
        }}
      >
        {children}
      </Typography>
    </Box>
  );
}