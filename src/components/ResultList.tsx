import React from 'react';
import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

interface Result {
  name: string;
  text: string;
}

interface ResultListProps {
  results: Result[];
  handleCopy: (text: string) => void;
}

const ResultList: React.FC<ResultListProps> = ({ results, handleCopy }) => {
  return (
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
  );
};

export default ResultList;