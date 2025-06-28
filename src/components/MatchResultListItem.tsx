"use client";

import React, { useRef, useEffect } from "react";
import {
    ListItem,
    ListItemText,
    Box,
    Typography,
    IconButton,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CopyButton, { CopyButtonHandle } from "./CopyButton";
import { MatchedItem } from "@/types/matcher";

interface Props {
    item: MatchedItem;
    selected: boolean;
    onLocation?: (name: string) => void;
    refCallback: (el: HTMLLIElement | null) => void;
}

export default function MatchResultListItem({
    item,
    selected,
    onLocation,
    refCallback,
}: Props) {
    const copyRef = useRef<CopyButtonHandle>(null);
    const liRef = useRef<HTMLLIElement>(null);

    useEffect(() => {
        if (!selected) return;

        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Enter") {
                e.preventDefault();
                onLocation?.(item.name);
            } else if (
                (e.key === "c" || e.key === "C") &&
                (e.metaKey || e.ctrlKey)
            ) {
                e.preventDefault();
                copyRef.current?.copy();
            }
        };

        liRef.current?.addEventListener("keydown", handleKey);
        return () => liRef.current?.removeEventListener("keydown", handleKey);
    }, [selected, item.name, onLocation]);

    useEffect(() => {
        if (selected) {
            liRef.current?.focus(); // 让选中项获得键盘焦点
        }
    }, [selected]);


    return (
        <ListItem
            divider
            component="li"
            tabIndex={-1} // 确保可以被 focus
            ref={(el) => {
                refCallback(el);
                liRef.current = el;
            }}
            sx={{ bgcolor: selected ? "action.selected" : "inherit", outline: "none" }}
            data-selected={selected}
        >
            <ListItemText
                primary={
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="body2" fontWeight={500}>
                            {item.name} ({item.score.toFixed(2)})
                        </Typography>
                        <div>
                            {onLocation && (
                                <IconButton
                                    edge="end"
                                    size="small"
                                    onClick={() => onLocation(item.name)}
                                >
                                    <LocationOnIcon fontSize="small" />
                                </IconButton>
                            )}
                            <CopyButton ref={copyRef} text={item.name} />
                        </div>
                    </Box>
                }
                secondary={
                    <Typography variant="body2" color="text.secondary">
                        {item.text}
                    </Typography>
                }
            />
        </ListItem>
    );
}
