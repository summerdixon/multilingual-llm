import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Box, Card, CardContent, Typography, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";

type ImageCluster = {
  cluster_id: number;
  label_en: string | null;
  label_km: string | null;
  keywords: string | null;
};

export default function CommunityCenter() {
  const [clusters, setClusters] = useState<ImageCluster[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchClusters() {
      const { data, error } = await supabase
        .from("smot_image_clusters")
        .select("cluster_id, label_en, label_km, keywords")
        .order("cluster_id", { ascending: true });

      if (error) {
        console.error("Error fetching clusters", error);
      } else {
        setClusters(data || []);
      }
      setLoading(false);
    }

    fetchClusters();
  }, []);

  if (loading) {
    return <Box p={2}>Loading topics…</Box>;
  }

  return (
    <Box p={2} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {clusters.map((cl) => {
        const keywords =
          cl.keywords?.split("|").filter((k) => k.trim().length > 0) ?? [];

        return (
          <Card
            key={cl.cluster_id}
            onClick={() => navigate(`/topics/${cl.cluster_id}`)}
            sx={{
              borderRadius: 3,
              boxShadow: 2,
              cursor: "pointer",
            }}
          >
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                Topic #{cl.cluster_id}
              </Typography>
              <Typography variant="h6">
                {cl.label_en || `Cluster ${cl.cluster_id}`}
              </Typography>
              {cl.label_km && (
                <Typography variant="body2" sx={{ mt: 0.5 }}>
                  {cl.label_km}
                </Typography>
              )}
              <Box sx={{ mt: 1.5, display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {keywords.slice(0, 5).map((kw) => (
                  <Chip key={kw} label={kw} size="small" />
                ))}
              </Box>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
}