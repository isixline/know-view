"use client";

import React, { useRef, useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import NodeDetails from "@/components/NodeDetails";
import { GraphData, GraphNode } from "@/types/graph";
import SearchBox from "@/components/SearchBox";
import TopLeftPanel from "./TopLeftPanel";
import MatchBox from "./MatchBox";
import { MatchedItem } from "@/types/matcher";

const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), { ssr: false });

interface Props {
    fetchData: () => Promise<GraphData>;
    matchData?: (query: string) => Promise<MatchedItem[]>;
}

export default function Graph2D({ fetchData, matchData }: Props) {
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

    const handleNodeClick = useCallback((node: any) => {
        if (!fgRef.current || !node) return;

        // 平移视图使节点居中
        fgRef.current.centerAt(node.x, node.y, 1000);
        fgRef.current.zoom(4, 1000);

        setSelectedNode(node);
    }, []);

    const handleSearch = (node: GraphNode) => {
        if (node) handleNodeClick(node);
    }

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
            <TopLeftPanel>
                <SearchBox
                    allNodes={graphData.nodes}
                    onSelectNode={handleSearch}
                />
                {matchData && (
                    <MatchBox matchData={matchData} />
                )}
            </TopLeftPanel>
        </div >
    );
}
