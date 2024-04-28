import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@material-ui/core/Button';

const SearchResults = ({ searchResults, cardListener }) => {
  return (
<>

<Typography variant="h5" component="div" sx={{marginTop : 4}}>
          Search Results
        </Typography>
        <List dense={false}>
          {searchResults.map((item,index) => (

<Card sx={{ minWidth: 275, margin : 2 }}>
<CardContent>

            <ListItem key={item.topic}>
              <ListItemText
                primary={<Typography variant="body1">{item.topic}</Typography>}
                secondary={<Typography variant="body2">{item.description}</Typography>}
              />
            </ListItem>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
    <Button variant="contained" color="primary" onClick={() => cardListener(index)}>
      Start Teaching
    </Button>
  </div>
            </CardContent>
            </Card>
          ))}
        </List>

</>

  );
};

export default SearchResults;
