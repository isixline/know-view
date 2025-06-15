import React from 'react';
import { TextField, Box, Button } from '@mui/material';

export interface SearchBarProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  loading?: boolean;
  handleSearch: () => Promise<void>;
}

const SearchBar: React.FC<SearchBarProps> = ({ query, setQuery, loading, handleSearch }) => {
  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
      <TextField
        fullWidth
        label="请输入搜索关键词"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
      />
      <Button variant="contained" onClick={handleSearch} disabled={loading}>
        搜索
      </Button>
    </Box>
  );
};

export default SearchBar;