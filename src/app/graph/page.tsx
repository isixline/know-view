"use client";

import React, { useRef, useCallback } from "react";
import ForceGraph3D from "react-force-graph-3d";

const data = {
  nodes: [
    { id: "Valjean", group: 1 },
    { id: "Javert", group: 2 },
    { id: "Fantine", group: 1 },
    { id: "Cosette", group: 1 },
    { id: "Marius", group: 2 },
  ],
  links: [
    { source: "Valjean", target: "Javert" },
    { source: "Valjean", target: "Fantine" },
    { source: "Valjean", target: "Cosette" },
    { source: "Cosette", target: "Marius" },
  ],
};

export default function AutoLayoutForceGraph3D() {
  const fgRef = useRef<any>(null);

  const handleNodeClick = useCallback((node: { x?: number; y?: number; z?: number }) => {
    if (!fgRef.current) return;
    const distance = 40;
    const distRatio = 1 + distance / Math.hypot(node.x || 0, node.y || 0, node.z || 0);

    fgRef.current.cameraPosition(
      { x: (node.x || 0) * distRatio, y: (node.y || 0) * distRatio, z: (node.z || 0) * distRatio }, // new position
      node, // lookAt
      3000  // ms transition duration
    );
  }, []);

  return (
    <div style={{ width: "100%", height: "600px" }}>
      <ForceGraph3D
        ref={fgRef}
        graphData={data}
        nodeLabel="id"
        nodeAutoColorBy="group"
        onNodeClick={handleNodeClick}
      />
    </div>
  );
}
