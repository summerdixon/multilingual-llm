import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material";

type Cluster = {
  cluster_id: number;
  label_en: string | null;
  label_km: string | null;
  keywords: string | null;
};

type ImageRow = {
  image_id: string;
  title_en: string | null;
  title_km: string | null;
  file_name: string | null;
};

export default function CommunityCenterDetail() {
  const { clusterId } = useParams();
  const [cluster, setCluster] = useState<Cluster | null>(null);
  const [images, setImages] = useState<ImageRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!clusterId) return;

    async function fetchData() {
      setLoading(true);

      // 1. cluster info
      const { data: clusterData, error: clusterError } = await supabase
        .from("smot_image_clusters")
        .select("cluster_id, label_en, label_km, keywords")
        .eq("cluster_id", Number(clusterId))
        .single();

      if (clusterError) {
        console.error("Error fetching cluster", clusterError);
      } else {
        setCluster(clusterData);
      }

      // 2. get image_ids from members table
      const { data: memberData, error: memberError } = await supabase
        .from("smot_image_cluster_members")
        .select("image_id")
        .eq("cluster_id", Number(clusterId));

      if (memberError) {
        console.error("Error fetching members", memberError);
        setLoading(false);
        return;
      }

      const imageIds = (memberData || []).map((m) => m.image_id);
      if (imageIds.length === 0) {
        setImages([]);
        setLoading(false);
        return;
      }

      // 3. fetch images
      const { data: imagesData, error: imagesError } = await supabase
        .from("smot_images")
        .select("image_id, title_en, title_km, file_name")
        .in("image_id", imageIds);

      if (imagesError) {
        console.error("Error fetching images", imagesError);
      } else {
        // optional: sort by file_name or page number
        setImages(imagesData || []);
      }

      setLoading(false);
    }

    fetchData();
  }, [clusterId]);

  if (loading) {
    return <Box p={2}>Loading topic…</Box>;
  }

  if (!cluster) {
    return <Box p={2}>Topic not found.</Box>;
  }

  const keywords =
    cluster.keywords?.split("|").filter((k) => k.trim().length > 0) ?? [];

  return (
    <Box p={2} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {/* Header */}
      <Box>
        <Typography variant="subtitle2" color="text.secondary">
          Topic #{cluster.cluster_id}
        </Typography>
        <Typography variant="h5">
          {cluster.label_en || `Cluster ${cluster.cluster_id}`}
        </Typography>
        {cluster.label_km && (
          <Typography variant="body1" sx={{ mt: 0.5 }}>
            {cluster.label_km}
          </Typography>
        )}
        {keywords.length > 0 && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            Keywords: {keywords.join(", ")}
          </Typography>
        )}
      </Box>

      {/* Images in this cluster */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        {images.map((img) => (
          <Card key={img.image_id} sx={{ borderRadius: 3, boxShadow: 1 }}>
            {/* If you have a URL in your table, use that in CardMedia */}
            {/* <CardMedia
              component="img"
              height="140"
              image={img.image_url}
              alt={img.title_en || img.title_km || img.file_name || ""}
            /> */}
            <CardContent>
              <Typography variant="subtitle1">
                {img.title_en || img.file_name || img.image_id}
              </Typography>
              {img.title_km && (
                <Typography variant="body2">{img.title_km}</Typography>
              )}
              {/* You could add page number or section_type here if you have them */}
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}