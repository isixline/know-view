import React from 'react';
import Snackbar from '@mui/material/Snackbar';

interface CopySnackbarProps {
  open: boolean;
  message: string;
  onClose: () => void;
}

const CopySnackbar: React.FC<CopySnackbarProps> = ({ open, message, onClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={2000}
      onClose={onClose}
      message={message}
    />
  );
};

export default CopySnackbar;