"use client";

import React, { useRef, useCallback, useEffect, useState } from "react";
import SpriteText from 'three-spritetext';
import dynamic from 'next/dynamic';
import { GraphNode, GraphLink } from '@/types/graph';
import { getTechGraph } from "@/lib/api/graph";


// 动态导入 ForceGraph3D，禁用 SSR
const ForceGraph3D = dynamic(() => import('react-force-graph-3d'), { ssr: false });

export default function AutoLayoutForceGraph3D() {
    const fgRef = useRef<any>(null);
    const [graphData, setGraphData] = useState<{ nodes: GraphNode[]; links: GraphLink[] }>({
        nodes: [],
        links: [],
    });

    useEffect(() => {
        getTechGraph()
            .then((data) => {
                setGraphData(data)
            })
    }, []);

    const handleNodeClick = useCallback((node: { x?: number; y?: number; z?: number }) => {
        if (!fgRef.current) return;
        const distance = 80;
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
                graphData={graphData}
                nodeAutoColorBy="group"
                nodeThreeObject={(node: any) => {
                    const sprite = new SpriteText(node.name);
                    sprite.color = node.color;
                    sprite.textHeight = 8;
                    return sprite;
                }}
                nodeLabel={(node) => `${node.name}\n${node.text}`}
                linkDirectionalParticles={1}
                linkDirectionalParticleWidth={1}
                onNodeClick={handleNodeClick}
            />
        </div>
    );
}
