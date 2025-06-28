import React from "react";
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
  copyRefCallback: (el: CopyButtonHandle | null) => void;
}

export default function MatchResultListItem({
  item,
  selected,
  onLocation,
  refCallback,
  copyRefCallback,
}: Props) {
  return (
    <ListItem
      divider
      component="li"
      ref={refCallback}
      sx={{ bgcolor: selected ? "action.selected" : "inherit" }}
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
                <IconButton edge="end" size="small" onClick={() => onLocation(item.name)}>
                  <LocationOnIcon fontSize="small" />
                </IconButton>
              )}
              <CopyButton text={item.name} ref={copyRefCallback} />
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
