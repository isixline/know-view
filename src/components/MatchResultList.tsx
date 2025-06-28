import React, { useState, useEffect, useRef } from "react";
import { List } from "@mui/material";
import { MatchedItem } from "@/types/matcher";
import MatchResultListItem from "@/components/MatchResultListItem";

interface MatchResultListProps {
    results: MatchedItem[];
    onLocation?: (name: string) => void;
}

export default function MatchResultList({ results, onLocation }: MatchResultListProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const listRef = useRef<HTMLUListElement>(null);
    const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!results.length) return;

            if (e.key === "ArrowUp") {
                e.preventDefault();
                setSelectedIndex((prev) => Math.max(prev - 1, 0));
            } else if (e.key === "ArrowDown") {
                e.preventDefault();
                setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
            }
        };

        const listEl = listRef.current;
        listEl?.addEventListener("keydown", handleKeyDown);
        return () => listEl?.removeEventListener("keydown", handleKeyDown);
    }, [results]);

    useEffect(() => {
        listRef.current?.focus();
    }, [results]);

    useEffect(() => {
        itemRefs.current[selectedIndex]?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
        });
    }, [selectedIndex]);

    return (
        <List
            dense
            ref={listRef}
            tabIndex={0}
            sx={{
                maxHeight: "75vh",
                overflowY: "auto",
                bgcolor: "white",
                outline: "none",
            }}
        >
            {results.map((item, index) => (
                <MatchResultListItem
                    key={item.name}
                    item={item}
                    selected={index === selectedIndex}
                    onLocation={onLocation}
                    refCallback={(el) => {
                        itemRefs.current[index] = el;
                    }}
                />
            ))}
        </List>
    );
}
