// MapChart.tsx
import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "@vnedyalk0v/react19-simple-maps";
import { Box } from "@mui/material";

const geoUrl = "https://unpkg.com/world-atlas@2/countries-110m.json";

export default function Home() {
  const [tooltipContent, setTooltipContent] = useState<string | null>(null);

  return (
    <Box style={{ width: "100vw", height: "100vh" }}>
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{ scale: 150 }}
        width={1000}
        height={600}
        style={{ width: "100%", height: "100%" }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const name =
                geo.properties.NAME ||
                geo.properties.name ||
                geo.id ||
                "Unknown";
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => setTooltipContent(name)}
                  onMouseLeave={() => setTooltipContent(null)}
                  style={{
                    default: { fill: "#D6D6DA", outline: "none" },
                    hover: { fill: "#F53", outline: "none", cursor: "pointer" },
                    pressed: { fill: "#E42", outline: "none" },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>

      <Box style={{ position: "absolute", top: 10, left: 10 }}>
        {tooltipContent ?? "Hover over a country"}
      </Box>
    </Box>
  );
}
