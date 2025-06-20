"use client";

import React, { useState } from "react";
import { Paper, Typography, IconButton, Collapse } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import CopyButton from "@/components/CopyButton";
import { GraphNode } from "@/types/graph";
import LinksSection from "@/components/LinksSection";

interface NodeDetailsProps {
    node: GraphNode;
    open: boolean;
}

export default function NodeDetails({ node, open }: NodeDetailsProps) {
    const [collapsed, setCollapsed] = useState(false);

    if (!node || !open) return null;

    const toggleCollapse = () => setCollapsed(!collapsed);

    return (
        <Paper
            elevation={3}
            style={{
                position: "absolute",
                top: 16,
                right: 16,
                padding: collapsed ? 4 : 32,
                width: collapsed ? 36 : 320,
                overflow: "hidden",
                userSelect: "text",
                boxSizing: "border-box",
            }}
        >

            {/* 折叠标题行 */}
            <div style={{ display: "flex", alignItems: "center" }}>
                {!collapsed && (
                    <>
                        <Typography variant="subtitle1" style={{ flex: 1, fontWeight: 500 }}>
                            {node.name}
                        </Typography>
                        <CopyButton text={node.name} tooltip="Copy name" />
                    </>
                )}
                <IconButton onClick={toggleCollapse} size="small">
                    {collapsed ? <ExpandMoreIcon fontSize="small" /> : <ExpandLessIcon fontSize="small" />}
                </IconButton>
            </div>
            {/* 折叠内容区 */}
            <Collapse in={!collapsed}>
                <pre
                    style={{
                        fontSize: 12,
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                        overflowY: "auto",
                        margin: 0,
                        paddingTop: 16,
                        maxHeight: "60vh",
                    }}
                >
                    {node.text}
                </pre>
                {node.links && <LinksSection links={node.links} />}
            </Collapse>
        </Paper>
    );
}
