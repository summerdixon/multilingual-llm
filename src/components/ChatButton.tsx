import { Button } from "@mui/material";

interface ChatButtonProps {
  label: string;
  onClick: () => void;
}

export default function ChatButton({ label, onClick }: ChatButtonProps) {
  return (
    <Button
      onClick={onClick}
      sx={{
        borderRadius: "9999px",
        px: 4,
        py: 0.5,
        fontSize: 14,
        fontFamily: "Lato",
        textTransform: "none",
        color: "#F18C6A",
        border: "1.5px solid #FFF",
        background: "#FFFFFF",
        boxShadow: "0 0 0 1px rgba(0,0,0,0.05)",
        alignSelf: "center",
        marginLeft: "8px",
        height: "36px"
      }}
    >
      {label}
    </Button>
  );
}