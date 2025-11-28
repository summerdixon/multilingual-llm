import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import { fetchListenItems, getAudioUrl, type ListenItem } from "../api/smot";

export default function Listen() {
  const [items, setItems] = useState<ListenItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchListenItems()
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching listen items:", err);
        setError("Could not load audio right now.");
        setLoading(false);
      });
  }, []);

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

        <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
            <Typography
            sx={{
                fontFamily: 'Lato',
                fontSize: 28,
                fontWeight: 400,
                mb: 2,
            }}
            >
            Listen to Smot chanting
            </Typography>

            {loading && (
            <Typography sx={{ mt: 2 }}>Loading audio…</Typography>
            )}

            {error && (
            <Typography sx={{ mt: 2, color: "#fecaca" }}>{error}</Typography>
            )}

            {!loading && !error && items.length === 0 && (
            <Typography sx={{ mt: 2 }}>
                No audio items found yet.
            </Typography>
            )}

            {!loading &&
            !error &&
            items.map((item) => {
                const url = getAudioUrl(item);
                if (!url) return null;

                return (
                    <Box key={item.audio_id} sx={{ mb: 3 }}>
                    <Typography sx={{ fontWeight: 600, mb: 1 }}>
                        {item.file_name ?? `Audio ${item.audio_id}`}
                    </Typography>
                
                    <Box
                        component="audio"
                        controls
                        src={url}
                        sx={{
                        width: "100%",
                        borderRadius: 2,
                        color: "rgba(255,255,255,0.1)",
                        "&::-webkit-media-controls-panel": {
                            backgroundColor: "rgba(255,255,255,0.1)",
                        },
                        }}
                    />
                    </Box>
                );
                })}
        </Box>
        </Box>
    </>
  );
}
