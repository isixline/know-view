"use client";

import React, { useRef, useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";

import NodeDetails from "@/components/NodeDetails";
import { getTechGraph } from "@/lib/api/graph";

const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), { ssr: false });

export default function AutoLayoutForceGraph2D() {
    const fgRef = useRef<any>(null);
    const [graphData, setGraphData] = useState<{ nodes: any[]; links: any[] }>({
        nodes: [],
        links: [],
    });
    const [selectedNode, setSelectedNode] = useState<any>(null);

    useEffect(() => {
        getTechGraph()
            .then((data) => {
                setGraphData(data)
            })
    }, []);

    const handleNodeClick = useCallback((node: any) => {
        if (!fgRef.current || !node) return;

        setSelectedNode(node);
        // 平移视图使节点居中
        fgRef.current.centerAt(node.x, node.y, 1000);
        fgRef.current.zoom(4, 1000);
    }, []);

    return (
        <div style={{ width: "100%", height: "600px", position: "relative" }}>
            <ForceGraph2D
                ref={fgRef}
                graphData={graphData}
                nodeAutoColorBy="group"
                nodeLabel={(node: any) => `${node.name}`}
                onNodeClick={handleNodeClick}
                linkDirectionalParticles={2}
                linkDirectionalParticleWidth={1}
            />

            <NodeDetails node={selectedNode} open={!!selectedNode} />
        </div>
    );
}
