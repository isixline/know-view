"use client";

import React, { useMemo } from "react";
import { Autocomplete, TextField } from "@mui/material";
import Fuse from "fuse.js";
import { GraphNode } from "@/types/graph";

interface SearchBoxProps {
  allNodes: GraphNode[];
  onSelectNode: (node: GraphNode) => void;
  match?: (query: string, nodes: GraphNode[]) => GraphNode[];
}

export default function SearchBox({ allNodes, onSelectNode, match }: SearchBoxProps) {
  // 设置 fuse 实例
  const fuse = useMemo(() => {
    return new Fuse(allNodes, {
      keys: ["name", "text"],
      threshold: 0.4,
    });
  }, [allNodes]);

  // 自定义 filterOptions：根据 match() 或 fuse 匹配
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
        if (value) onSelectNode(value);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Search" size="small" fullWidth />
      )}
      renderOption={(props, option) => (
        <li {...props}>
          <div>
            <strong>{option.name}</strong>
            <br />
            <span style={{ fontSize: 12, color: "#666" }}>
              {option.text.length > 100 ? option.text.slice(0, 100) + "..." : option.text}
            </span>
          </div>
        </li>
      )}
      sx={{
        width: 300,
        position: "absolute",
        top: 20,
        left: 20,
        zIndex: 1000,
      }}
      autoHighlight
      disableClearable
      size="small"
    />
  );
}
