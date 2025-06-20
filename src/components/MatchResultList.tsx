import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import { MatchedItem } from "@/types/matcher";

interface MatchResultListProps {
    results: MatchedItem[];
}

export default function MatchResultList({ results, }: MatchResultListProps) {

    return (
        <List
            dense
            sx={{
                maxHeight: "80vh",
                overflowY: "auto",
            }}
        >
            {results.map(({ name, text, score }) => (
                <ListItem key={name} divider>
                    <ListItemText
                        primary={`${name} (${score.toFixed(2)})`}
                        secondary={text}
                    />
                </ListItem>
            ))}
        </List>
    );
}
