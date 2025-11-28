import { Box, Typography } from "@mui/material";
import type { ReactNode } from "react";

interface ChatBubbleProps {
  children: ReactNode;
}

export default function ChatBubble({ children }: ChatBubbleProps) {
  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        height: 36,
        marginLeft: "6px"
      }}
    >
      <Box
        component="svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 249 34"
        preserveAspectRatio="none"
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M249 26C249 30.4183 245.418 34 241 34H8C3.58172 34 0 30.4183 0 26V8C0 3.58172 3.58172 0 8 0H241C245.418 0 249 3.58172 249 8V26Z"
          fill="#F18C6A"
        />
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
        }}
      >
        {children}
      </Typography>
    </Box>
  );
}
