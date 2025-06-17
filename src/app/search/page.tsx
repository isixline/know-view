'use client';

import React, { useState } from 'react';
import { Box } from '@mui/material';
import CopySnackbar from '@/components/CopySnackbar';
import LoadingIndicator from '@/components/LoadingIndicator';
import ResultList from '@/components/ResultList';
import SearchBar from '@/components/SearchBar';
import { Result } from '@/types';

export default function Page() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [copiedText, setCopiedText] = useState('');

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('http://127.0.0.1:5005/search/idea', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });
      if (!res.ok) throw new Error('请求失败');
      const data = await res.json();
      setResults(data.results);
    } catch (error) {
      console.error('搜索请求出错:', error);
      alert('搜索失败，请检查服务是否启动或网络是否正常');
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