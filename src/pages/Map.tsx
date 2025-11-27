import { ComposableMap, Geographies, Geography } from "@vnedyalk0v/react19-simple-maps";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const geoUrl = "https://unpkg.com/world-atlas@2/countries-110m.json";

export default function Home() {
  const navigate = useNavigate();

  const handleCambodiaClick = () => {
    navigate("/cambodia");
  };

  return (
    <Box
      className="map-box"
      sx={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}
    >
      {/* MAP */}
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{
          scale: 1000,
          center: [100, 11] as any, // center Cambodia
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
                {/* other countries */}
                {others.map((geo, index) => (
                  <Geography
                    key={geo.id ?? `other-${index}`}
                    geography={geo}
                    style={{
                      default: {
                        fill: "#e5e7eb",
                        stroke: "#d1d5db",
                        strokeWidth: 0.75,
                        outline: "none",
                      },
                      hover: {
                        fill: "#e5e7eb",
                        stroke: "#d1d5db",
                        strokeWidth: 0.75,
                        outline: "none",
                      },
                      pressed: {
                        fill: "#e5e7eb",
                        stroke: "#d1d5db",
                        strokeWidth: 0.75,
                        outline: "none",
                      },
                    }}
                  />
                ))}

                {/* Cambodia with pulsing class */}
                {cambodia.map((geo, index) => (
                  <Geography
                    key={geo.id ?? `kh-${index}`}
                    geography={geo}
                    className="pulse"
                    onClick={handleCambodiaClick}
                    style={{
                      default: {
                        fill: "#E6AC73",
                        stroke: "#AF522C",
                        strokeWidth: 1,
                        outline: "none",
                        cursor: "default",
                      },
                      hover: {
                        fill: "#E6AC73",
                        stroke: "#AF522C",
                        strokeWidth: 1,
                        outline: "none",
                        cursor:  "default",
                      },
                      pressed: {
                        fill: "#E6AC73",
                        stroke: "#AF522C",
                        strokeWidth: 1,
                        outline: "none",
                      },
                    }}
                  />
                ))}
              </>
            );
          }}
        </Geographies>
      </ComposableMap>
    </Box>
  );
}
