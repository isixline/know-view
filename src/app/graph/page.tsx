"use client";

import React, { useRef, useCallback, useEffect, useState } from "react";
import dynamic from 'next/dynamic';

// 动态导入 ForceGraph3D，禁用 SSR
const ForceGraph3D = dynamic(() => import('react-force-graph-3d'), { ssr: false });
interface RawNode {
    name: string;
    text: string;
    links: string[];
}

interface GraphNode {
    id: string;
    text: string;
}

interface GraphLink {
    source: string;
    target: string;
}

export default function AutoLayoutForceGraph3D() {
    const fgRef = useRef<any>(null);
    const [graphData, setGraphData] = useState<{ nodes: GraphNode[]; links: GraphLink[] }>({
        nodes: [],
        links: [],
    });

    useEffect(() => {
        fetch('http://127.0.0.1:5005/nodes')
            .then((res) => res.json())
            .then((data: { nodes: RawNode[] }) => {
                const nodes: GraphNode[] = data.nodes.map((node) => ({
                    id: node.name,
                    text: node.text,
                }));

                let links: GraphLink[] = [];
                data.nodes.forEach((node) => {
                    node.links.forEach((targetName) => {
                        links.push({ source: node.name, target: targetName });
                    });
                });

                links = links.filter(link =>
                    nodes.some(node => node.id === link.source) &&
                    nodes.some(node => node.id === link.target)
                );

                console.log('Fetched nodes:', nodes);
                console.log('Constructed links:', links);
                setGraphData({ nodes, links });
            })
            .catch((err) => {
                console.error('Error fetching nodes:', err);
            });
    }, []);

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
                graphData={graphData}
                nodeLabel="id"
                nodeAutoColorBy="group"
                onNodeClick={handleNodeClick}
            />
        </div>
    );
}
