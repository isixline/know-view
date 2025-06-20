import React from "react";
import {
    List,
    ListItem,
    ListItemText,
    Box,
    Typography,
} from "@mui/material";
import { MatchedItem } from "@/types/matcher";
import CopyButton from "@/components/CopyButton";

interface MatchResultListProps {
    results: MatchedItem[];
}

export default function MatchResultList({ results }: MatchResultListProps) {
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
                        primary={
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography variant="body2" fontWeight={500}>
                                    {name} ({score.toFixed(2)})
                                </Typography>
                                <CopyButton text={name} />
                            </Box>
                        }
                        secondary={
                            <Typography variant="body2" color="text.secondary">
                                {text}
                            </Typography>
                        }
                    />
                </ListItem>
            ))}
        </List>
    );
}
