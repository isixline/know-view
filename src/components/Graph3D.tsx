"use client";

import React, { useRef, useCallback, useEffect, useState } from "react";
import SpriteText from 'three-spritetext';
import * as THREE from 'three'
import dynamic from 'next/dynamic';
import { GraphData } from '@/types/graph';
import NodeDetails from "@/components/NodeDetails";

// 动态导入 ForceGraph3D，禁用 SSR
const ForceGraph3D = dynamic(() => import('react-force-graph-3d'), { ssr: false });

interface Props {
    fetchData: () => Promise<GraphData>;
    isTextNode?: boolean;
}

export default function Graph3D({ fetchData, isTextNode }: Props) {
    const fgRef = useRef<any>(null);
    const [graphData, setGraphData] = useState<GraphData>({
        nodes: [],
        links: [],
    });
    const [selectedNode, setSelectedNode] = useState<any>(null);


    useEffect(() => {
        fetchData()
            .then((data) => {
                setGraphData(data)
            })
    }, [fetchData]);

    const handleNodeClick = useCallback((node: { x?: number; y?: number; z?: number }) => {
        if (!fgRef.current) return;
        const distance = 120;
        const distRatio = 1 + distance / Math.hypot(node.x || 0, node.y || 0, node.z || 0);

        fgRef.current.cameraPosition(
            { x: (node.x || 0) * distRatio, y: (node.y || 0) * distRatio, z: (node.z || 0) * distRatio }, // new position
            node, // lookAt
            3000  // ms transition duration
        );

        setSelectedNode(node);
    }, []);

    const getNodeObject = useCallback((node: any) => {
        const isSelected = selectedNode && node.id === selectedNode.id;

        if (isTextNode) {
            const sprite = new SpriteText(node.name);
            sprite.color = node.color;
            sprite.material.opacity = isSelected ? 1.0 : 0.6;
            sprite.material.transparent = true;
            return sprite;
        } else {
            const geometry = new THREE.SphereGeometry(8); 
            const material = new THREE.MeshBasicMaterial({ color: node.color || 'gray' });
            material.transparent = true;
            material.opacity = isSelected ? 1 : 0.6;
            const mesh = new THREE.Mesh(geometry, material);
            return mesh;
        }
    }, [selectedNode, isTextNode]);

    // 获取数据
    useEffect(() => {
        fetchData()
            .then((data) => {
                setGraphData(data);
            });
    }, [fetchData]);

    return (
        <div style={{ width: "100%", height: "600px" }}>
            <ForceGraph3D
                ref={fgRef}
                graphData={graphData}
                nodeAutoColorBy="group"
                nodeThreeObject={getNodeObject}
                nodeLabel={(node) => `${node.name}`}
                linkDirectionalParticles={1}
                linkDirectionalParticleWidth={1}
                onNodeClick={handleNodeClick}
            />
            <NodeDetails node={selectedNode} open={!!selectedNode} />
        </div>
    );
}
