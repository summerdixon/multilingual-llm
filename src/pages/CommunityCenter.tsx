import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, IconButton, Typography } from "@mui/material";
import { Image, Headphones, Chat, Hub } from "@mui/icons-material";
import Navbar from "../components/Navbar";
import ChatBubble from "../components/ChatBubble";
import ChatBubbleRecent from "../components/ChatBubbleRecent";
import ThinkingIndicator from "../components/ThinkingIndicator";

type ChatStage = 0 | 1 | 2 | 3;

export default function CommunityCenter() {
  const navigate = useNavigate();
  const [chatStage, setChatStage] = useState<ChatStage>(0);

  useEffect(() => {
    const t1 = setTimeout(() => setChatStage(1), 1600);
    const t2 = setTimeout(() => setChatStage(2), 4800);
    const t3 = setTimeout(() => setChatStage(3), 6400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  // TODO: wire these to real routes
  const handleListen = () => {
    // navigate("/cambodia/community/listen");
    console.log("Listen clicked");
  };

  const handleLook = () => {
    // navigate("/cambodia/community/look");
    console.log("Look clicked");
  };

  const handleUnderstand = () => {
    // navigate("/cambodia/community/understand");
    console.log("Understand clicked");
  };

  const handleChat = () => {
    // navigate("/cambodia/community/chat");
    console.log("Chat clicked");
  };

  const iconButtonSx = {
    width: 64,
    height: 64,
    bgcolor: "#FFFFFF40",
    border: "1px solid",
    borderColor: "#FFF",
    borderRadius: "50%",
    "&:hover": {
      bgcolor: "rgba(255,255,255,1)",
    },
  } as const;

  const iconSx = { fontSize: 32, color: "#FFF" } as const;

  return (
    <>
    <Navbar/>
    <Box
      className="landing-container"
      style={{
        background:
          "linear-gradient(170deg, #FFD992 2.66%, #FDCF91 42.08%, #F5C68E 66.15%, #D7A189 114.84%, #C59B8A 144.98%)",
      }}
    >
      {/* CENTER DIAGRAM */}
      <Box
        className="landing-center"
        sx={{
          position: "relative",
          width: 320,
          height: 320,
        }}
      >
        {/* Central circle svg */}
        <Box
          component="svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 160 160"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 160,
            height: 160,
            transform: "translate(-50%, -50%)",
          }}
        >
          <circle cx="80" cy="80" r="80" fill="white" fill-opacity="0.2"/>
        </Box>

        {/* Central label */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Lato",
              fontSize: 24,
              fontWeight: 500,
              color: "#FFF",
              padding: "4px"
            }}
          >
            Community Center
          </Typography>
        </Box>

        {/* TOP NODE – LISTEN */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translate(-50%, -30%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <IconButton sx={iconButtonSx} onClick={handleListen}>
            <Headphones sx={iconSx} />
          </IconButton>
          <Typography sx={{ mt: 0.5, fontSize: 18, fontFamily: "Lato", color: "#FFF" }}>
            Listen
          </Typography>
        </Box>

        {/* RIGHT NODE – LOOK */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            right: 0,
            transform: "translate(30%, -50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <IconButton sx={iconButtonSx} onClick={handleLook}>
            <Image sx={iconSx} />
          </IconButton>
          <Typography sx={{ mt: 0.5, fontSize: 18, fontFamily: "Lato", color: "#FFF" }}>
            Look
          </Typography>
        </Box>

        {/* BOTTOM NODE – UNDERSTAND */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translate(-50%, 30%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <IconButton sx={iconButtonSx} onClick={handleUnderstand}>
            <Hub sx={iconSx} />
          </IconButton>
          <Typography sx={{ mt: 0.5, fontSize: 18, fontFamily: "Lato", color: "#FFF" }}>
            Understand
          </Typography>
        </Box>

        {/* LEFT NODE – CHAT */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: 0,
            transform: "translate(-30%, -50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <IconButton sx={iconButtonSx} onClick={handleChat}>
            <Chat sx={iconSx} />
          </IconButton>
          <Typography sx={{ mt: 0.5, fontSize: 18, fontFamily: "Lato", color: "#FFF" }}>
            Chat
          </Typography>
        </Box>
      </Box>

      {/* BOTTOM-LEFT CHATTER GUIDE */}
      <Box
        sx={{
          position: "fixed",
          bottom: 36,
          left: 24,
          right: 24,
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          alignItems: "flex-start",
        }}
      >
        {chatStage === 0 && <ThinkingIndicator />}

        {chatStage === 1 && (
          <>
            <ChatBubbleRecent>Welcome to the Community Center!</ChatBubbleRecent>
            <ThinkingIndicator />
          </>
        )}

        {chatStage === 2 && (
          <>
            <ChatBubble>Welcome to the Community Center!</ChatBubble>
            <ChatBubbleRecent>Here you can explore Smot chanting.</ChatBubbleRecent>
            <ThinkingIndicator />
          </>
        )}

        {chatStage === 3 && (
          <>
            <ChatBubble>Welcome to the Community Center!</ChatBubble>
            <ChatBubble>Here you can explore Smot chanting.</ChatBubble>
            <ChatBubbleRecent>Tap an icon above to begin.</ChatBubbleRecent>
            <ThinkingIndicator />
          </>
        )}
      </Box>
    </Box>
    </>
  );
}
