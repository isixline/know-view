import React, { useState, useEffect, useRef } from "react";
import {
    List,
    ListItem,
    ListItemText,
    Box,
    Typography,
    IconButton,
} from "@mui/material";
import { MatchedItem } from "@/types/matcher";
import CopyButton from "@/components/CopyButton";
import LocationOnIcon from '@mui/icons-material/LocationOn';

interface MatchResultListProps {
    results: MatchedItem[];
    onLocation?: (name: string) => void;
}

export default function MatchResultList({ results, onLocation }: MatchResultListProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const listRef = useRef<HTMLUListElement>(null);
    const itemRefs = useRef<(HTMLLIElement | null)[]>([]); // for scrollIntoView

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!results.length) return;

            if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex(prev => Math.max(prev - 1, 0));
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
            } else if (e.key === 'Enter') {
                e.preventDefault();
                const selectedItem = results[selectedIndex];
                if (onLocation && selectedItem) {
                    onLocation(selectedItem.name);
                }
            } else if (
                (e.key === 'c' || e.key === 'C') &&
                (e.metaKey || e.ctrlKey) // Command(Mac) 或 Ctrl(Win)
            ) {
                e.preventDefault();
                const selectedItem = results[selectedIndex];
                if (selectedItem) {
                    // 复制选中项的 name 到剪贴板
                    navigator.clipboard.writeText(selectedItem.name)
                        .then(() => {
                            console.log('Copied to clipboard:', selectedItem.name);
                        })
                        .catch(err => {
                            console.error('Failed to copy: ', err);
                        });
                }
            }
        };

        const listEl = listRef.current;
        listEl?.addEventListener('keydown', handleKeyDown);
        return () => listEl?.removeEventListener('keydown', handleKeyDown);
    }, [results, selectedIndex, onLocation]);

    useEffect(() => {
        const listEl = listRef.current;
        listEl?.focus();
    }, [results]);

    useEffect(() => {
        const currentItem = itemRefs.current[selectedIndex];
        currentItem?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, [selectedIndex]);

    return (
        <List
            dense
            ref={listRef}
            tabIndex={0}
            sx={{
                maxHeight: "75vh",
                overflowY: "auto",
                bgcolor: "rgba(255, 255, 255)",
                outline: "none",
            }}
        >
            {results.map((item, index) => (
                <ListItem
                    key={item.name}
                    divider
                    component="li"
                    ref={(el: HTMLLIElement | null) => {
                        itemRefs.current[index] = el;
                    }}
                    sx={{
                        bgcolor: index === selectedIndex ? 'action.selected' : 'inherit',
                    }}
                    data-selected={index === selectedIndex}
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
                                    <CopyButton text={item.name} />
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
            ))}
        </List>
    );
}
