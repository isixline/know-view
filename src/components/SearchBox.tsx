"use client";

import React, { useState, useMemo } from "react";
import {
    TextField,
    Paper,
    List,
    ListItem,
    ListItemText,
    ClickAwayListener,
} from "@mui/material";
import Fuse from "fuse.js";
import { GraphNode } from "@/types/graph";

interface SearchBoxProps {
    allNodes: GraphNode[];
    onSelectNode: (node: GraphNode) => void;
    match?: (query: string, nodes: GraphNode[]) => GraphNode[];
}

export default function SearchBox({
    allNodes,
    onSelectNode,
    match,
}: SearchBoxProps) {
    const [query, setQuery] = useState("");
    const [focused, setFocused] = useState(false);

    // 默认 Fuse 匹配器，只在未传入 match 时使用
    const fuse = useMemo(() => {
        return new Fuse(allNodes, {
            keys: ["name"],
            threshold: 0.4,
        });
    }, [allNodes]);

    // 判断使用哪种匹配方式
    const results = useMemo(() => {
        const trimmed = query.trim();
        if (!trimmed) return [];

        if (match) {
            return match(trimmed, allNodes);
        } else {
            return fuse.search(trimmed).map((r) => r.item);
        }
    }, [query, match, allNodes, fuse]);

    const handleSelect = (node: GraphNode) => {
        setQuery(node.name);
        setFocused(false);
        onSelectNode(node);
    };

    return (
        <ClickAwayListener onClickAway={() => setFocused(false)}>
            <div
                style={{
                    position: "absolute",
                    top: 20,
                    left: 20,
                    zIndex: 1000,
                    width: 300,
                }}
            >
                <TextField
                    label="Search"
                    variant="outlined"
                    fullWidth
                    size="small"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setFocused(true)}
                />
                {focused && results.length > 0 && (
                    <Paper style={{ maxHeight: 240, overflow: "auto" }}>
                        <List dense>
                            {results.map((node) => (
                                <ListItem
                                    component="button"
                                    key={node.id}
                                    onClick={() => handleSelect(node)}
                                >
                                    <ListItemText
                                        primary={node.name}
                                        secondary={
                                            node.text.length > 100 ? node.text.slice(0, 100) + "..." : node.text
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                )}
            </div>
        </ClickAwayListener>
    );
}
