import { useEffect, useState } from "react";
import {
Box,
Typography,
Card,
CardMedia,
CardContent,
IconButton,
Dialog,
DialogContent,
} from "@mui/material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import CloseIcon from "@mui/icons-material/Close";
import Navbar from "../components/Navbar";
import { fetchLookItems, getImageUrl, type LookItem } from "../api/smot";

export default function Look() {
const [items, setItems] = useState<LookItem[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

const [openModal, setOpenModal] = useState(false);
const [activeItem, setActiveItem] = useState<LookItem | null>(null);

useEffect(() => {
    fetchLookItems()
    .then((data) => {
        setItems(data);
        setLoading(false);
    })
    .catch((err) => {
        console.error("Error fetching look items:", err);
        setError("Could not load images right now.");
        setLoading(false);
    });
}, []);

const handleOpenModal = (item: LookItem) => {
    setActiveItem(item);
    setOpenModal(true);
};

const handleCloseModal = () => {
    setOpenModal(false);
    setActiveItem(null);
};

return (
    <>
        <Navbar/>
        <Box
        sx={{
        minHeight: "100vh",
        maxHeight: "100vh",
        overflowY: "auto",
        color: "#fff",
        }}
        style={{
        background:
            "linear-gradient(170deg, #FFD992 2.66%, #FDCF91 42.08%, #F5C68E 66.15%, #D7A189 114.84%, #C59B8A 144.98%)",
        }}
    >

        <Box sx={{ maxWidth: 1100, mx: "auto", p: 3, pb: 6 }}>
            <Typography
            sx={{
                fontFamily: "Lato",
                fontSize: 28,
                fontWeight: 400,
                mb: 2,
            }}
            >
            Look at Smot chants and descriptions
            </Typography>

            {loading && <Typography sx={{
                        fontWeight: 600,
                        fontSize: 14,
                        fontFamily: "Lato",
                        color: "#FFFFFF",
                      }}>Loading images…</Typography>}

            {error && (
            <Typography sx={{
                fontWeight: 600,
                fontSize: 14,
                fontFamily: "Lato",
                color: "#FFFFFF",
              }}>{error}</Typography>
            )}

            {!loading && !error && items.length === 0 && (
            <Typography sx={{
                fontWeight: 600,
                fontSize: 14,
                fontFamily: "Lato",
                color: "#FFFFFF",
              }}>No images found yet.</Typography>
            )}

            {/* GALLERY GRID */}
            {!loading && !error && items.length > 0 && (
            <Box
                sx={{
                mt: 3,
                display: "grid",
                gap: 2,
                gridTemplateColumns: "repeat(2, 1fr)", // 2 per row
                }}
            >
                {items.map((item) => {
                const url = getImageUrl(item.file_name);
                const typeLabel = item.section_type
                    ? item.section_type.charAt(0).toUpperCase() + item.section_type.slice(1)
                    : null;

                return (
                    <Card
                    key={item.image_id}
                    sx={{
                        borderRadius: 2,
                        overflow: "hidden",
                        backgroundColor: "transparent",
                        boxShadow: "none",
                        paddingBottom: "12px",
                        height: "170px"
                    }}
                    >
                    {/* IMAGE + FULLSCREEN ICON */}
                    <Box sx={{ position: "relative" }}>
                        <CardMedia
                        component="img"
                        src={url}
                        alt={item.title_en ?? item.title_km ?? item.file_name}
                        sx={{
                            display: "block",
                            width: "100%",
                            objectFit: "cover",
                        }}
                        />                    
                    </Box>

                    {/* CAPTION */}
                    <CardContent
                        sx={{
                        py: 1.5,
                        px: 1.5,
                        backgroundColor: "#FFFFFF30",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between"
                        }}
                    >
                        <Typography
                        sx={{
                            fontFamily: "Lato",
                            fontSize: 14,
                            color: "#FFFFFF",
                            alignSelf: "center"
                        }}
                        >
                        {typeLabel}
                        </Typography>

                        <IconButton
                        aria-label="View fullscreen"
                        onClick={() => handleOpenModal(item)}
                        sx={{
                            position: "static",
                            border: "1px solid",
                            borderColor: "#FFF",
                            color: "#fff",
                        }}
                        >
                        <FullscreenIcon fontSize="small" />
                        </IconButton>
                    </CardContent>
                    </Card>
                );
                })}
            </Box>
            )}
        </Box>

        {/* FULLSCREEN MODAL */}
        <Dialog
            open={openModal}
            onClose={handleCloseModal}
            maxWidth="lg"
            fullWidth
            PaperProps={{
            sx: {
                backgroundColor: "#F18C6A",
                borderRadius: 3
            },
            }}
        >
            <DialogContent
            sx={{
                position: "relative",
                p: 2,
            }}
            >
            {activeItem && (
            <Typography
                sx={{
                fontFamily: "Lato",
                fontSize: 14,
                fontWeight: 600,
                color: "#FFF",
                mb: 0.5,
                textAlign: "center"
                }}
            >
                {activeItem.title_en || activeItem.title_km || activeItem.file_name}
            </Typography>
            )}
            <IconButton
                aria-label="Close"
                onClick={handleCloseModal}
                sx={{
                position: "absolute",
                top: 8,
                right: 8,
                color: "#fff",
                border: "1px solid",
                borderColor: "#FFF",
                }}
            >
                <CloseIcon fontSize="small"/>
            </IconButton>

            {activeItem && (
                <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 2,
                }}
                >
                <img
                    src={getImageUrl(
                    activeItem.file_name,
                    )}
                    alt={
                    activeItem.title_en ??
                    activeItem.title_km ??
                    activeItem.file_name
                    }
                    style={{
                    maxWidth: "100%",
                    maxHeight: "80vh",
                    objectFit: "contain",
                    borderRadius: 8,
                    }}
                />
                </Box>
            )}
            </DialogContent>
        </Dialog>
        </Box>
    </>
);
}
