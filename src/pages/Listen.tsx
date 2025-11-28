import { useEffect, useState } from "react";
import { Box, Card, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import { fetchListenItems, getAudioUrl, getSemanticName, type ListenItem } from "../api/smot";

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
      <Navbar />
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
        <Box sx={{ maxWidth: 1000, mx: "auto", p: 3, pb: 6 }}>
          <Typography
            sx={{
              fontFamily: "Lato",
              fontSize: 28,
              fontWeight: 400,
              mb: 2,
            }}
          >
            Listen to Smot chanting
          </Typography>

          {loading && <Typography sx={{ mt: 2 }}>Loading audio…</Typography>}

          {error && (
            <Typography sx={{ mt: 2, color: "#fecaca" }}>{error}</Typography>
          )}

          {!loading && !error && items.length === 0 && (
            <Typography sx={{ mt: 2 }}>No audio items found yet.</Typography>
          )}

          {/* GRID OF CARDS */}
          {!loading && !error && items.length > 0 && (
            <Box
              sx={{
                mt: 3,
                display: "grid",
                gap: 2,
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "1fr",
                  md: "repeat(2, 1fr)"
                },
              }}
            >
              {items.map((item) => {
                const url = getAudioUrl(item);
                const name = getSemanticName(item);
                if (!url) return null;

                return (
                  <Card
                    key={item.audio_id}
                    sx={{
                      borderRadius: 3,
                      overflow: "hidden",
                      backgroundColor: "#FFFFFF30",
                      boxShadow: "none",
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: 14,
                        fontFamily: "Lato",
                        color: "#FFFFFF",
                      }}
                    >
                      {name}
                    </Typography>

                    <Box
                      component="audio"
                      controls
                      src={url}
                      sx={{
                        width: "100%",
                        borderRadius: 1,
                        "&::-webkit-media-controls-panel": {
                          backgroundColor: "rgba(255,255,255,0.7)",
                        },
                      }}
                    />
                  </Card>
                );
              })}
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}
