'use client';

import React, { useState } from 'react';
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Snackbar,
  CircularProgress,
  Box,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

interface Result {
  name: string;
  score: number;
  text: string;
}

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [copiedText, setCopiedText] = useState('');

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('http://127.0.0.1:5005/search/inspiration', {
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

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <CircularProgress />
        </Box>
      )}

      <List>
        {results.map((item) => (
          <ListItem
            key={item.name}
            secondaryAction={
              <IconButton edge="end" aria-label="copy" onClick={() => handleCopy(item.name)}>
                <ContentCopyIcon />
              </IconButton>
            }
          >
            <ListItemText primary={item.name} secondary={item.text} />
          </ListItem>
        ))}
      </List>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        message={`已复制 "${copiedText}" 到剪贴板`}
      />
    </Box>
  );
}
