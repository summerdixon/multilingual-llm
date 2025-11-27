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
                <Typography className="landing-heading">
                    Welcome Page
                </Typography>
                <Typography className="landing-subtitle">
                    Purpose Statement / Who Are We
                </Typography>
                <IconButton onClick={handleClick}>
                    <PlayCircleOutlineIcon fontSize="large" style={{ color: "#FFF" }}/>
                </IconButton>
            </Box>
        </Box>
    );
}