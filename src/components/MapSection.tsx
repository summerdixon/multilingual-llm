import { ComposableMap, Geographies, Geography } from "@vnedyalk0v/react19-simple-maps";
import { Box, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";

const geoUrl = "https://unpkg.com/world-atlas@2/countries-110m.json";

export default function MapSection() {
  const navigate = useNavigate();

  const handleCambodiaClick = () => {
    navigate("/cambodia");
  };

  return (
    <Box sx={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{
          scale: 1500,
          center: [104, 11] as any,
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) => {
            const others = geographies.filter((geo) => {
              const props = geo.properties as any;
              const name = props.name || props.NAME || props.ADMIN;
              return name !== "Cambodia";
            });

            const cambodia = geographies.filter((geo) => {
              const props = geo.properties as any;
              const name = props.name || props.NAME || props.ADMIN;
              return name === "Cambodia";
            });

            return (
              <>
                {others.map((geo, index) => (
                  <Geography
                    key={geo.id ?? `other-${index}`}
                    geography={geo}
                    style={{
                      default: {
                        fill: "#e5e7eb",
                        stroke: "#C7C7C7",
                        strokeWidth: 1,
                        outline: "none",
                      },
                    }}
                  />
                ))}

                {cambodia.map((geo, index) => (
                  <Geography
                    key={geo.id ?? `kh-${index}`}
                    geography={geo}
                    className="pulse"
                    onClick={handleCambodiaClick}
                    style={{
                      default: {
                        fill: "#F5BB76",
                        stroke: "#F18C6A",
                        strokeWidth: 1,
                        outline: "none",
                        cursor: "pointer",
                      },
                      hover: {
                        fill: "#F5BB76",
                        stroke: "#F18C6A",
                        strokeWidth: 1.2,
                        outline: "none",
                        cursor: "pointer",
                      },
                    }}
                  />
                ))}
              </>
            );
          }}
        </Geographies>
      </ComposableMap>

      <Box
        sx={{
          position: "absolute",
          top: "37%",
          left: "40%",
          transform: "translateX(-10%)",
          zIndex: 10,
        }}
      >
        <Chip
          label="Cambodia / កម្ពុជា"
          sx={{
            backgroundColor: "#F18C6A",
            color: "#fff",
            fontSize: 12,
            fontFamily: "Lato",
          }}
        />
      </Box>
        <Chip
            label="Click on a highlighted country to continue"
            sx={{
                position: "absolute",
                top: 24,
                left: "50%",
                transform: "translateX(-50%)",
                background: "#FFF",
                borderRadius: "12px",
                px: 3,
                py: 1.5,
                fontSize: "14px",
                fontFamily: "Lato",
                color: "#374151",
                zIndex: 20,
                textAlign: "center",
            }}
        />
        <Chip
            label="ចុចលើប្រទេសដែលបានបន្លិចដើម្បីបន្ត"
            sx={{
                position: "absolute",
                top: 64,
                left: "50%",
                transform: "translateX(-50%)",
                background: "#FFF",
                borderRadius: "12px",
                px: 3,
                py: 1.5,
                fontSize: "14px",
                fontFamily: "Lato",
                color: "#374151",
                zIndex: 20,
                textAlign: "center",
            }}
        />
    </Box>
  );
}
