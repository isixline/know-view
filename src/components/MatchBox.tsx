import React, { useState, useRef } from "react";
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
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async () => {
    setResults([]);
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    setLoading(true);
    try {
      const data = await matchData(trimmedQuery);
      setResults(data);
    } catch (err: any) {
      console.error("match error:", err);
      alert("match error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setQuery("");
    setResults([]);
  };

  const handleLocalKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      inputRef.current?.focus();
    }
    else if ((e.metaKey || e.ctrlKey) && e.key === "Backspace") {
      e.preventDefault();
      handleClear();
    }
  };


  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div
      ref={containerRef}
      tabIndex={0} // 允许聚焦以监听键盘
      onKeyDown={handleLocalKeyDown}
      style={{ outline: "none" }} // 可选：移除聚焦边框
    >
      <AutoGrowTextField
        label="Match"
        size="small"
        fullWidth
        multiline
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleInputKeyDown}
        inputRef={inputRef}
        autoComplete="off"
        slotProps={{
          input: {
            endAdornment: query && (
              <InputAdornment position="end">
                <IconButton size="small" onClick={handleClear}>
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
