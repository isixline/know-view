import React, { useState, useEffect, useRef } from "react";
import {
    List,
} from "@mui/material";
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
    const copyRefs = useRef<(any | null)[]>([]); // CopyButtonHandle

    // 监听键盘事件
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!results.length) return;

            if (e.key === "ArrowUp") {
                e.preventDefault();
                setSelectedIndex((prev) => Math.max(prev - 1, 0));
            } else if (e.key === "ArrowDown") {
                e.preventDefault();
                setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
            } else if (e.key === "Enter") {
                e.preventDefault();
                const selectedItem = results[selectedIndex];
                if (onLocation && selectedItem) {
                    onLocation(selectedItem.name);
                }
            } else if (
                (e.key === "c" || e.key === "C") &&
                (e.metaKey || e.ctrlKey)
            ) {
                e.preventDefault();
                copyRefs.current[selectedIndex]?.copy();
            }
        };

        const listEl = listRef.current;
        listEl?.addEventListener("keydown", handleKeyDown);
        return () => listEl?.removeEventListener("keydown", handleKeyDown);
    }, [results, selectedIndex, onLocation]);

    // 结果变化自动focus
    useEffect(() => {
        listRef.current?.focus();
    }, [results]);

    // 选中项滚动可见
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
                <MatchResultListItem
                    key={item.name}
                    item={item}
                    selected={index === selectedIndex}
                    onLocation={onLocation}
                    refCallback={(el) => { itemRefs.current[index] = el; }}
                    copyRefCallback={(el) => { copyRefs.current[index] = el; }}
                />
            ))}
        </List>
    );
}
