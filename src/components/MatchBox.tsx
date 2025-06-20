import React, { useState } from "react";
import { TextField } from "@mui/material";
import { MatchedItem } from "@/types/matcher";
import LoadingIndicator from "@/components/LoadingIndicator";
import MatchResultList from "@/components/MatchResultList";
import CollapsibleSection from "@/components/CollapsibleSection";

interface MatchBoxProps {
  matchData: (query: string) => Promise<MatchedItem[]>;
}

export default function MatchBox({ matchData }: MatchBoxProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<MatchedItem[]>([]);
  const [loading, setLoading] = useState(false);

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
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

      {results.length > 0 && (
        <CollapsibleSection>
          <MatchResultList results={results} />
        </CollapsibleSection>
      )}
    </div>
  );
}
