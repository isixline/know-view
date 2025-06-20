import React, { useState } from "react";
import { TextField, List, ListItem, ListItemText, Typography } from "@mui/material";
import { MatchedItem } from "@/types/matcher";
import LoadingIndicator from "@/components/LoadingIndicator";

interface MatchBoxProps {
  matchData: (query: string) => Promise<MatchedItem[]>;
}

export default function MatchBox({ matchData }: MatchBoxProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<MatchedItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setError(null);
      setResults([]);

      const trimmedQuery = query.trim();
      if (!trimmedQuery) {
        return;
      }

      setLoading(true);

      matchData(trimmedQuery)
        .then((data) => {
          setResults(data);
        })
        .catch((err) => {
          console.error("Search error:", err);
          setError("Failed to fetch results");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <div>
      <TextField
        label="Match"
        size="small"
        fullWidth
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {loading && <LoadingIndicator />}

      {error && (
        <Typography variant="body2" color="error" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}
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
    </div>
  );
}
