import { useNavigate } from "react-router-dom";
import { Box, IconButton, Typography } from "@mui/material";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

import background from "../assets/cambodian_background.png";

export default function CambodiaLanding() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/cambodia/community");
      };

    return (
        <Box className="landing-container">
            <img src={background} className="landing-bg"/>
            <Box className="landing-center">
                <Box style={{ display: "flex", flexDirection: "row" }}>
                    <Typography
                        sx={{
                            color: "#AF522C",
                            WebkitTextStrokeWidth: "1px",
                            WebkitTextStrokeColor: "#AF522C",
                            fontFamily: '"Josefin Sans"',
                            fontSize: "48px",
                            fontStyle: "normal",
                            fontWeight: 200,
                            lineHeight: "72px",
                            letterSpacing: "-4px",
                        }}
                    >
                        សួស្តី&nbsp;
                    </Typography>
                    <Typography 
                        sx={{
                            color: "#AF522C4D",
                            WebkitTextStrokeWidth: "2px",
                            WebkitTextStrokeColor: "#AF522C4D",
                            fontFamily: '"Josefin Sans"',
                            fontSize: "48px",
                            fontStyle: "normal",
                            fontWeight: 350,
                            lineHeight: "72px",
                            letterSpacing: "-4px",
                          }}
                    >
                        / Hello!
                    </Typography>
                </Box>
                <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    flexShrink: 0,
                }}
                >
                    <Typography
                        sx={{
                            color: "#FFF",
                            fontFamily: "Lato",
                            fontSize: "12px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "20px",
                            whiteSpace: "normal",
                            overflowWrap: "break-word",
                            wordBreak: "break-word",
                            textAlign: "center"
                        }}
                    >
                        យើង​ជា​បណ្ដុំ​សិល្បករ ប្រវត្តិវិទូ កសិករ និង​ជា​ច្រើន​ទៀត​ដែល​រក្សា​ទុក 
                        និង​បន្ថែម​ចំណេះដឹង​របស់​យើង​ដើម្បី​ថែរក្សា​វប្បធម៌​ខ្មែរ និង​ខ្មែរ។
                    </Typography>
                    <br></br>
                    <Typography
                    sx={{
                            color: "#FFFFFFB2",
                            fontFamily: "Lato",
                            fontSize: "12px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "20px",
                            whiteSpace: "normal",
                            overflowWrap: "break-word",
                            wordBreak: "break-word",
                            textAlign: "center"
                        }}
                    >
                        We are a collective of artists, historians, farmers, and more storing and 
                        adding our knowledge to preserve Cambodian and Khmer culture.
                    </Typography>
                </Box>
                <IconButton onClick={handleClick}>
                    <PlayCircleOutlineIcon fontSize="large" className="pulse"
                        style={{ color: "#FFFFFFB2", width: "64px", height: "64px" }}
                    />
                </IconButton>
            </Box>
        </Box>
    );
}