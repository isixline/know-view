"use client";

import React, { useMemo } from "react";
import { Autocomplete, TextField } from "@mui/material";
import Fuse from "fuse.js";
import { GraphNode } from "@/types/graph";
import { truncateText } from "@/utils/textUtils";

interface SearchBoxProps {
    allNodes: GraphNode[];
    onSelect: (node: GraphNode) => void;
    match?: (query: string, nodes: GraphNode[]) => GraphNode[];
}

export default function SearchBox({ allNodes, onSelect, match }: SearchBoxProps) {
    // 设置 fuse 实例
    const fuse = useMemo(() => {
        return new Fuse(allNodes, {
            keys: ["name", "text"],
            threshold: 0.4,
        });
    }, [allNodes]);

    const filterOptions = (options: GraphNode[], { inputValue }: { inputValue: string }) => {
        const trimmed = inputValue.trim();
        if (!trimmed) return [];

        if (match) {
            return match(trimmed, allNodes);
        }

        return fuse.search(trimmed).map((res) => res.item);
    };

    return (
        <Autocomplete
            options={allNodes}
            filterOptions={filterOptions}
            getOptionLabel={(option) => option.name}
            onChange={(_, value) => {
                if (value) onSelect(value);
            }}
            renderInput={(params) => (
                <TextField {...params} label="Search" size="small" fullWidth />
            )}
            renderOption={(props, option) => (
                <li {...props} key={option.id}>
                    <div>
                        <strong>{option.name}</strong>
                        <br />
                        <span style={{ fontSize: 12, color: "#666" }}>
                            {truncateText(option.text, 100)}
                        </span>
                    </div>
                </li>
            )}
            autoHighlight
            disableClearable
            size="small"
        />
    );
}
