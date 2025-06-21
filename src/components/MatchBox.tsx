import React, { useState } from "react";
import { IconButton, InputAdornment } from "@mui/material";
import { MatchedItem } from "@/types/matcher";
import LoadingIndicator from "@/components/LoadingIndicator";
import MatchResultList from "@/components/MatchResultList";
import CollapsibleSection from "@/components/CollapsibleSection";
import ClearIcon from "@mui/icons-material/Clear";
import AutoGrowTextField from "@/components/AutoGrowTextField";

interface MatchBoxProps {
  matchData: (query: string) => Promise<MatchedItem[]>;
  onLocation?: (name: string) => void;
}

export default function MatchBox({ matchData, onLocation }: MatchBoxProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<MatchedItem[]>([]);
  const [loading, setLoading] = useState(false);

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

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
          console.error("match error:", err);
          alert("match error: " + err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleClear = () => {
    setQuery("");
    setResults([]);
  }

  return (
    <div>
      <AutoGrowTextField
        label="Match"
        size="small"
        fullWidth
        multiline
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        autoComplete="off"
        slotProps={{
          input: {
            endAdornment: query && (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={handleClear}
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />

      {loading && <LoadingIndicator />}

      {results.length > 0 && (
        <CollapsibleSection>
          <MatchResultList results={results} onLocation={onLocation} />
        </CollapsibleSection>
      )}
    </div>
  );
}
