"use client";

import React, { useRef, useCallback, useEffect, useState } from "react";
import dynamic from 'next/dynamic';

import { computeGraphWithCommunities, GraphNode, GraphLink, RawNode } from '@/utils/graphUtils';

// 动态导入 ForceGraph2D，禁用 SSR
const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), { ssr: false });

export default function AutoLayoutForceGraph2D() {
    const fgRef = useRef<any>(null);
    const [graphData, setGraphData] = useState<{ nodes: GraphNode[]; links: GraphLink[] }>({
        nodes: [],
        links: [],
    });

    useEffect(() => {
        fetch('http://127.0.0.1:5005/nodes/tech')
            .then((res) => res.json())
            .then((data: { nodes: RawNode[] }) => {
                const result = computeGraphWithCommunities(data.nodes);
                result.nodes.forEach(node => {
                    node.name = node.name.replace(/^🛠️ /, '');
                });
                setGraphData(result);
            })
            .catch((err) => {
                console.error('Error fetching nodes:', err);
            });
    }, []);

    const handleNodeClick = useCallback((node: any) => {
        if (!fgRef.current || !node) return;

        // 平移视图使节点居中
        fgRef.current.centerAt(node.x, node.y, 1000);
        fgRef.current.zoom(4, 1000); // 放大一些
    }, []);

    return (
        <div style={{ width: "100%", height: "600px" }}>
            <ForceGraph2D
                ref={fgRef}
                graphData={graphData}
                nodeAutoColorBy="group"
                nodeLabel={(node: any) => `${node.name}\n${node.text}`}
                onNodeClick={handleNodeClick}
                linkDirectionalParticles={2}
                linkDirectionalParticleWidth={1}
            />
        </div>
    );
}
