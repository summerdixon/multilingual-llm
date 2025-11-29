import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, MenuItem, Typography, Alert } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import Navbar from "../components/Navbar";
import { supabase } from "../lib/supabaseClient";

const TYPE_OPTIONS = [
  { value: "audio", label: "Audio" },
  { value: "image", label: "Image / Photo" },
  { value: "text", label: "Text / Story" },
  { value: "document", label: "Document / PDF" },
  { value: "video", label: "Video" },
  { value: "other", label: "Other" },
];

const COMMUNITY_OPTIONS = [
  { value: "cambodia", label: "Cambodia" },
  { value: "other", label: "Other / Global" },
];

export default function Contribute() {
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [community, setCommunity] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setFile(f);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!title.trim()) {
      setErrorMsg("Title is required.");
      return;
    }

    setSubmitting(true);

    try {
      let fileUrl: string | null = null;

      if (file) {
        const ext = file.name.split(".").pop() || "dat";
        const path = `uploads/${Date.now()}-${Math.random()
          .toString(36)
          .slice(2)}.${ext}`;

        const { error: uploadError } = await supabase.storage
          .from("contributions")
          .upload(path, file);

        if (uploadError) {
          console.error("Upload error:", uploadError);
          throw new Error("Could not upload file. Please try again.");
        }

        const {
          data: { publicUrl },
        } = supabase.storage.from("contributions").getPublicUrl(path);

        fileUrl = publicUrl;
      }

      // Call your backend API to create the DB record
      const res = await fetch("/api/contributions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          contributor_email: email || null,
          type: type || null,
          community: community || null,
          file_url: fileUrl,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Submission failed. Please try again.");
      }

      setSuccessMsg("Thank you! Your contribution has been submitted.");
      setTitle("");
      setEmail("");
      setType("");
      setCommunity("");
      setDescription("");
      setFile(null);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

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
            background: "linear-gradient(169deg, #FFD485 2.68%, #FFCC86 36.33%, #F5BB76 54.97%, #DFA288 91.78%, #C38F79 100%)",
        }}
    >
        <Box sx={{ maxWidth: 1000, mx: "auto", p: 3, pb: 6, mt: "48px" }}>
        <Button
            variant="outlined"
            onClick={() => navigate('/cambodia/community')}
            sx={{
                position: "absolute",
                borderRadius: "9999px",
                px: 2,
                py: 0.5,
                fontSize: 14,
                fontFamily: "Lato",
                textTransform: "none",
                color: "#FFFFFF",
                border: "1.5px solid #F18C6A",
                background: "#F18C6A",
                boxShadow: "0 0 0 1px rgba(0,0,0,0.05)",
                alignSelf: "center",
                height: "36px",
                mb: "16px",
                gap: "8px",
                zIndex: "999"
              }}
        >
            <ArrowBack/>
            Return to Community Center
        </Button>
          <Typography
            sx={{
              fontFamily: "Lato",
              fontSize: 28,
              fontWeight: 400,
              mb: 2,
              mt: 7
            }}
          >
            Contribute to the Archive
          </Typography>

          <Typography
            sx={{
              fontFamily: "Lato",
              fontSize: 16,
              mb: 3,
              maxWidth: 600,
            }}
          >
            Share stories, recordings, images, or documents that preserve
            cultural heritage. Your submission will be reviewed before it
            appears in the archive.
          </Typography>

          {errorMsg && (
            <Alert
              severity="error"
              sx={{ mb: 2, borderRadius: 2, backgroundColor: "#FFEBEE" }}
            >
              {errorMsg}
            </Alert>
          )}

          {successMsg && (
            <Alert
              severity="success"
              sx={{ mb: 2, borderRadius: 2, backgroundColor: "#E8F5E9" }}
            >
              {successMsg}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2.5,
              backgroundColor: "#FFFFFF50",
              borderRadius: 3,
              p: 3,
              backdropFilter: "blur(10px)",
            }}
          >
            <TextField
              label="Title*"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#FFFFFF",
                  borderRadius: "10px",
                  "& fieldset": {
                    border: "none",
                  },
                  "&:hover fieldset": {
                    border: "none",
                  },
                  "&.Mui-focused fieldset": {
                    border: "none",
                  },
                },
                "& .MuiInputBase-input": {
                  color: "#000000",
                  fontFamily: "Lato",
                  fontSize: "14px",
                },
              }}
              InputLabelProps={{
                sx: { color: "#00000070", fontFamily: "Lato", fontSize: "12px" },
              }}
              InputProps={{
                sx: {
                  color: "#fff",
                  backgroundColor: "#FFFFFF",
                  border: "none",
                  borderRadius: "10px"
                },
              }}
            />

            <TextField
              label="Email (optional)"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#FFFFFF",
                  borderRadius: "10px",
                  "& fieldset": {
                    border: "none",
                  },
                  "&:hover fieldset": {
                    border: "none",
                  },
                  "&.Mui-focused fieldset": {
                    border: "none",
                  },
                },
                "& .MuiInputBase-input": {
                  color: "#000000",
                  fontFamily: "Lato",
                  fontSize: "14px",
                },
              }}
              InputLabelProps={{ sx: { color: "#00000070", fontFamily: "Lato", fontSize: "12px"  } }}
              InputProps={{
                sx: {
                  color: "#fff",
                  backgroundColor: "#FFFFFF",
                  border: "none",
                  borderRadius: "10px"
                },
              }}
            />

            <Box
              sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" } }}
            >
              <TextField
                select
                label="Type (optional)"
                value={type}
                onChange={(e) => setType(e.target.value)}
                fullWidth
                size="small"
                sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#FFFFFF",
                      borderRadius: "10px",
                      "& fieldset": {
                        border: "none",
                      },
                      "&:hover fieldset": {
                        border: "none",
                      },
                      "&.Mui-focused fieldset": {
                        border: "none",
                      },
                    },
                    "& .MuiInputBase-input": {
                      color: "#000000",
                      fontFamily: "Lato",
                      fontSize: "14px",
                    },
                }}
                InputLabelProps={{ sx: { color: "#00000070", fontFamily: "Lato", fontSize: "12px"  } }}
                InputProps={{
                    sx: {
                    color: "#fff",
                    backgroundColor: "#FFFFFF",
                    border: "none",
                    borderRadius: "10px"
                    },
                }}
              >
                {TYPE_OPTIONS.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    <Typography
                        sx={{
                        position: "relative",
                        px: "12px",
                        py: "4px",
                        fontSize: 14,
                        lineHeight: 1,
                        fontFamily: "Lato",
                        whiteSpace: "nowrap",
                        }}
                    >
                    {opt.label}
                    </Typography>
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                select
                label="Community (optional)"
                value={community}
                onChange={(e) => setCommunity(e.target.value)}
                fullWidth
                size="small"
                sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#FFFFFF",
                      borderRadius: "10px",
                      "& fieldset": {
                        border: "none",
                      },
                      "&:hover fieldset": {
                        border: "none",
                      },
                      "&.Mui-focused fieldset": {
                        border: "none",
                      },
                    },
                    "& .MuiInputBase-input": {
                      color: "#000000",
                      fontFamily: "Lato",
                      fontSize: "14px",
                    },
                }}
                InputLabelProps={{ sx: { color: "#00000070", fontFamily: "Lato", fontSize: "12px"  } }}
                InputProps={{
                    sx: {
                    color: "#fff",
                    backgroundColor: "#FFFFFF",
                    border: "none",
                    borderRadius: "10px"
                    },
                }}
              >
                {COMMUNITY_OPTIONS.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    <Typography
                        sx={{
                        position: "relative",
                        px: "12px",
                        py: "4px",
                        fontSize: 14,
                        lineHeight: 1,
                        fontFamily: "Lato",
                        whiteSpace: "nowrap",
                        }}
                    >
                    {opt.label}
                    </Typography>
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            <TextField
              label="Description / Story (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              size="small"
              multiline
              minRows={3}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#FFFFFF",
                  borderRadius: "10px",
                  "& fieldset": {
                    border: "none",
                  },
                  "&:hover fieldset": {
                    border: "none",
                  },
                  "&.Mui-focused fieldset": {
                    border: "none",
                  },
                },
                "& .MuiInputBase-input": {
                  color: "#000000",
                  fontFamily: "Lato",
                  fontSize: "14px",
                },
              }}
              InputLabelProps={{ sx: { color: "#00000070", fontFamily: "Lato", fontSize: "12px"  } }}
              InputProps={{
                sx: {
                  color: "#fff",
                  backgroundColor: "#FFFFFF",
                  border: "none",
                  borderRadius: "10px"
                },
              }}
            />

            <Box>
              <Typography
                sx={{
                  fontFamily: "Lato",
                  fontSize: 14,
                  mb: 0.5,
                }}
              >
                Upload a file (optional)
              </Typography>
              <Button
                variant="outlined"
                component="label"
                sx={{
                  borderRadius: "9999px",
                  borderColor: "#fff",
                  color: "#fff",
                  textTransform: "none",
                  fontFamily: "Lato"
                }}
              >
                {file ? "Change file" : "Choose file"}
                <input
                  type="file"
                  hidden
                  onChange={handleFileChange}
                />
              </Button>
              {file && (
                <Typography
                  sx={{ mt: 0.5, fontSize: 12, fontFamily: "Lato" }}
                >
                  Selected: {file.name}
                </Typography>
              )}
            </Box>

            <Button
              type="submit"
              variant="contained"
              disabled={submitting}
              sx={{
                alignSelf: "flex-start",
                mt: 1,
                borderRadius: "9999px",
                textTransform: "none",
                px: 3,
                backgroundColor: "#F18C6A",
                boxShadow: "none",
                fontFamily: "Lato"
              }}
            >
              {submitting ? "Submitting..." : "Submit Contribution"}
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
