import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, IconButton, Typography } from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import SyncAlt from "@mui/icons-material/SyncAlt";

import background from "../assets/cambodian_background.png";

type Language = "en" | "km";

export default function CambodiaLanding() {
const navigate = useNavigate();

const [language, setLanguage] = useState<Language>("en");

const handleClick = () => {
    navigate("/cambodia/community");
};

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
                        border: "1px solid #FFF",
                        display: "flex",
                        padding: "7px 12px",
                        alignItems: "center",
                        gap: "8px",
                        backgroundColor: language === "en" ? "#FFFFFF50" : "transparent",
                        boxShadow: "none",
                        color: "#FFF",
                        textTransform: "none"
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
                        border: "1px solid #FFF",
                        display: "flex",
                        padding: "7px 12px",
                        alignItems: "center",
                        gap: "8px",
                        backgroundColor: language === "km" ? "#FFFFFF50" : "transparent",
                        boxShadow: "none",
                        color: "#FFF",
                        textTransform: "none"
                    }}
                >
                    Khmer
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
    </Box>
);
}
