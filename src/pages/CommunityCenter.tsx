import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IMAGE_CLUSTERS } from "../data/images";

const ORBIT_POSITIONS = [
  { top: "15%", left: "15%" },
  { top: "20%", right: "12%" },
  { top: "45%", right: "8%" },
  { bottom: "18%", right: "18%" },
  { bottom: "18%", left: "18%" },
  { top: "45%", left: "8%" },
];

export default function CommunityCenter() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#ffffff",
      }}
    >
        {/* Center circle */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 120,
            height: 120,
            borderRadius: "50%",
            bgcolor: "#e5e7eb",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            px: 2,
          }}
        >
          <Typography className="community-center-title">
            Community Center
          </Typography>
        </Box>

        {IMAGE_CLUSTERS.map((cluster, idx) => {
          const pos = ORBIT_POSITIONS[idx % ORBIT_POSITIONS.length];

          return (
            <Box
              key={cluster.id}
              sx={{
                position: "absolute",
                ...pos,
                width: 64,
                height: 64,
                borderRadius: "50%",
                bgcolor: "#e5e7eb",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                px: 1,
                cursor: "pointer",
              }}
              onClick={() => {
                // later: navigate to topic detail or cluster view
                // e.g. navigate(`/topics/${cluster.id}`);
                console.log("Clicked cluster", cluster.id);
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  lineHeight: 1.2,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "wrap",
                }}
              >
                {cluster.label}
              </Typography>
            </Box>
          );
        })}
    </Box>
  );
}