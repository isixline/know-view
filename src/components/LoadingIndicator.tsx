import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const LoadingIndicator: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2, mt: 2 }}>
      <CircularProgress />
    </Box>
  );
};

export default LoadingIndicator;