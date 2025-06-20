import React from "react";
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
    return (
        <List
            dense
            sx={{
                maxHeight: "80vh",
                overflowY: "auto",
                bgcolor: "rgba(255, 255, 255, 0.5)",
                backdropFilter: "blur(8px)",
            }}
        >
            {results.map((item) => (
                <ListItem key={item.name} divider>
                    <ListItemText
                        primary={
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography variant="body2" fontWeight={500}>
                                    {item.name} ({item.score.toFixed(2)})
                                </Typography>
                                <div>
                                    {onLocation && <IconButton
                                        edge="end"
                                        size="small"
                                        onClick={() => onLocation(item.name)}
                                    >
                                        <LocationOnIcon fontSize="small" />
                                    </IconButton>
                                    }
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
