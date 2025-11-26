import { ComposableMap, Geographies, Geography } from "@vnedyalk0v/react19-simple-maps";
import { Box } from "@mui/material";
import { geoCentroid } from "d3-geo";

const geoUrl = "https://unpkg.com/world-atlas@2/countries-110m.json";

export default function Home() {
  return (
    <Box className="map-box">
        <ComposableMap
            projection="geoEqualEarth"
            projectionConfig={{ scale: 1000, center: [98, 11] as any /* Cambodia approx center [longitude, latitude] */}}
            style={{ width: "100%", height: "100%" }}
        >
            <Geographies geography={geoUrl}>
            {({ geographies }) => {
                const others = geographies.filter((geo) => {
                const props = geo.properties as any;
                const name = props.name;
                return name !== "Cambodia";
                });

                const cambodia = geographies.filter((geo) => {
                const props = geo.properties as any;
                const name = props.name;
                return name === "Cambodia";
                });

                return (
                <>
                    {/* 1. Draw all other countries first */}
                    {others.map((geo) => (
                    <Geography
                        key={geo.rsmKey}
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

                    {/* 2. Draw Cambodia on top with special styling */}
                    {cambodia.map((geo) => (
                    <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onClick={() => {
                        console.log("Clicked Cambodia");
                        // navigate("/country/cambodia");
                        }}
                        style={{
                            default: {
                                fill: "#c6d8de",
                                stroke: "#98b1b9",
                                strokeWidth: 1,
                                outline: "none",
                                filter: "drop-shadow(0 0 2px rgba(0,0,0,0.25))",
                                cursor: "pointer",
                            },
                            hover: {
                                fill: "#c6d8de",
                                stroke: "#98b1b9",
                                strokeWidth: 2,
                                outline: "none",
                                filter: "drop-shadow(0 0 4px rgba(0,0,0,0.3))",
                                cursor: "pointer",
                            },
                            pressed: {
                                fill: "#c6d8de",
                                stroke: "#98b1b9",
                                strokeWidth: 2.2,
                                outline: "none",
                                filter: "drop-shadow(0 0 4px rgba(0,0,0,0.35))",
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