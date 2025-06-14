'use client';

import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  CircularProgress,
} from '@mui/material';

interface InspirationResult {
  name: string;
  score: number;
  text: string;
}

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<InspirationResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    setResults([]);

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
      setResults(data.results || []);
    } catch (err: any) {
      setError(err.message || '搜索失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        灵感搜索
      </Typography>

      <TextField
        fullWidth
        label="请输入关键词"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        sx={{ mt: 2, mb: 2 }}
      >
        搜索
      </Button>

      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}

      <List>
        {results.map((item) => (
          <ListItem key={item.name} alignItems="flex-start" divider>
            <ListItemText
              primary={item.text.replace(/^- /g, '').replace(/\n- /g, '\n')}
              secondary={`相似度评分：${item.score.toFixed(2)} | ID: ${item.name}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
