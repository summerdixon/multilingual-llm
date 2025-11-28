import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, IconButton, Typography } from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import SyncAlt from "@mui/icons-material/SyncAlt";
import ChatBubble from "../components/ChatBubble";
import ChatBubbleRecent from "../components/ChatBubbleRecent";
import ThinkingIndicator from "../components/ThinkingIndicator";
import ChatButton from "../components/ChatButton";


import background from "../assets/cambodian_background.png";

type Language = "en" | "km";

export default function CambodiaLanding() {
    const navigate = useNavigate();

    const [language, setLanguage] = useState<Language>("en");

    const handleClick = () => {
        navigate("/cambodia/community");
    };

    type ChatStage = 0 | 1 | 2 | 3; 
    // 0 = just thinking
    // 1 = thinking + first message
    // 2 = both messages, no thinking

    const [chatStage, setChatStage] = useState<ChatStage>(0);

    useEffect(() => {
    const t1 = setTimeout(() => setChatStage(1), 1600);  // first message
    const t2 = setTimeout(() => setChatStage(2), 3200);  // second message
    const t3 = setTimeout(() => setChatStage(3), 4800);  // third message

    return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
    };
    }, []);

return (
    <Box className="landing-container">
    <img src={background} className="landing-bg" />
        <Box className="landing-center">
                <Typography
                    sx={{
                    color: "#FFFFFF",
                    WebkitTextStrokeWidth: "2px",
                    WebkitTextStrokeColor: "#FFFFFF",
                    fontFamily: '"Josefin Sans"',
                    fontSize: language === "km" ? "82px" : "96px",
                    fontStyle: "normal",
                    fontWeight: 200,
                    lineHeight: "72px",
                    letterSpacing: "-4.8px",
                    textAlign: "start",
                    ml: language === "km" ? "-4px" : "-8px",
                    }}
                >
                    {language === "km" ? "សួស្តី !" : "Hello!"}
                </Typography>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    flexShrink: 0,
                    gap: "24px",
                }}
            >
                <Typography
                    sx={{
                    color: "#FFF",
                    fontFamily: "Lato",
                    fontSize: "24px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "120%",
                    whiteSpace: "normal",
                    overflowWrap: "break-word",
                    wordBreak: "break-word",
                    textAlign: "start",
                    }}
                >
                    {language === "km"
                    ? "សូមស្វាគមន៍មកកាន់គេហទំព័រចំណេះដឹងកម្ពុជា។"
                    : "Welcome to the Cambodian Knowledge Portal."}
                </Typography>

                <Typography
                    sx={{
                    color: "#FFFFFF",
                    fontFamily: "Lato",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "120%",
                    whiteSpace: "normal",
                    overflowWrap: "break-word",
                    wordBreak: "break-word",
                    textAlign: "start",
                    }}
                >
                    {language === "km"
                    ? "ស្វែងយល់ពីសិល្បៈ តន្ត្រី និងប្រពៃណីខ្មែរ។"
                    : "Explore Khmer art, music, and tradition."}
                </Typography>
            </Box>

            <Box 
                sx={{ 
                    display: "flex", 
                    flexDirection: "row", 
                    gap: 1, 
                    justifyContent: "center"
                }}
            >
                <Button
                
                    variant="outlined"
                    onClick={() => setLanguage("en")}
                    sx={{
                        borderRadius: "6px",
                        border: language === "en" ? "1.5px solid #FFF" : "1px solid #FFF",
                        display: "flex",
                        padding: "7px 12px",
                        alignItems: "center",
                        gap: "8px",
                        backgroundColor: language === "en" ? "#FFFFFF40" : "transparent",
                        boxShadow: "none",
                        color: "#FFF",
                        textTransform: "none",
                        fontFamily: "Lato"
                    }}
                >
                    English
                </Button>
                <Box style={{ alignContent: "center" }}><SyncAlt style={{ color: "#FFFFFFB2" }}/></Box>
                <Button
                    variant="outlined"
                    onClick={() => setLanguage("km")}
                    sx={{
                        borderRadius: "6px",
                        border: language === "km" ? "1.5px solid #FFF" : "1px solid #FFF",
                        display: "flex",
                        padding: "7px 12px",
                        alignItems: "center",
                        gap: "8px",
                        backgroundColor: language === "km" ? "#FFFFFF40" : "transparent",
                        boxShadow: "none",
                        color: "#FFF",
                        textTransform: "none",
                        fontFamily: "Lato"
                    }}
                >
                    ខ្មែរ
                </Button>
            </Box>

            {/* Optional play button */}
            {/* <IconButton onClick={handleClick}>
            <PlayCircleOutlineIcon
                fontSize="large"
                className="pulse"
                style={{ color: "#FFFFFFB2", width: "64px", height: "64px" }}
            />
            </IconButton> */}
        </Box>
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
                <ChatBubbleRecent>Hi there! Let’s get started</ChatBubbleRecent>
                <ThinkingIndicator />
                </>
            )}

            {chatStage === 2 && (
                <>
                <ChatBubble>
                    {language === "en"
                    ? "Hi there! Let’s get started"
                    : "សួស្តី! ចូរចាប់ផ្តើម"}
                </ChatBubble>
                <ChatBubbleRecent>
                    {language === "en" ? "Choose a language" : "ជ្រើសរើសភាសា"}
                </ChatBubbleRecent>
                <ThinkingIndicator />
                </>
            )}

            {chatStage === 3 && (
                <>
                <ChatBubble>
                    {language === "en"
                    ? "Hi there! Let’s get started"
                    : "សួស្តី! ចូរចាប់ផ្តើម"}
                </ChatBubble>
                <ChatBubbleRecent>
                    {language === "en" ? "Choose a language" : "ជ្រើសរើសភាសា"}
                </ChatBubbleRecent>
                <ChatButton
                    label={language === "en" ? "Continue" : "បន្ត"}
                    onClick={handleClick}
                />
                <ThinkingIndicator />
                </>
            )}
        </Box>
    </Box>
);
}
