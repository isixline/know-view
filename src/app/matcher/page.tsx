'use client';

import React, { useState } from 'react';
import { Box } from '@mui/material';
import CopySnackbar from '@/components/CopySnackbar';
import LoadingIndicator from '@/components/LoadingIndicator';
import ResultList from '@/components/ResultList';
import SearchBar from '@/components/SearchBar';
import { matchIdea } from '@/lib/api/matcher';
import { MatchedItem } from '@/types/matcher';

export default function Page() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<MatchedItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [copiedText, setCopiedText] = useState('');

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const matchedItems = await matchIdea(query);
      setResults(matchedItems);
    } catch (error) {
      alert('search error: ' + error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedText(text);
      setSnackbarOpen(true);
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
      <SearchBar query={query} setQuery={setQuery} handleSearch={handleSearch} loading={loading} />
      {loading && <LoadingIndicator />}
      <ResultList results={results} handleCopy={handleCopy} />
      <CopySnackbar open={snackbarOpen} message={`已复制 "${copiedText}" 到剪贴板`} onClose={handleCloseSnackbar} />
    </Box>
  );
}