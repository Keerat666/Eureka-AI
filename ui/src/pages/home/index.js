import React, { useState, useEffect } from 'react';
import SearchBar from '../../components/search/index'; // Assuming SearchBar is in a separate file
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles'; // Import for styling
import getTopics from '../../services/topics';
import SearchResults from '../../components/searchResults';
import CircularProgress from '@material-ui/core/CircularProgress'; // Import for loader
import { useNavigate } from 'react-router-dom';
import Speak from '../../components/speak';
import Listen from '../../components/listen';
import { Box, Container, List, ListItem, ListItemText } from '@material-ui/core';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding : "10px",
    marginTop : "10px"
  },
  heading: {
    marginBottom: 20,
    fontSize: '2.1rem', // Default font size
  },
  searchButton: {
    marginTop: 25, // Add some margin for spacing
  },
  trySearchingText: { // Class for styling "Try searching..."
    marginTop: 20, // Add some margin for spacing
    textAlign: 'initial', // Center align the text
    marginBottom : 10
  },
  loader: {
    marginTop: 25, // Center the loader
  },
  root: {
    margin: 2, // Use Material-UI spacing for margin
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
  },
  list: {
    padding: 0,
    margin: 0,
    listStyle: 'none', // Remove default list style
    marginBottom: 2, // Add spacing after list
  },
  listItem: {
    marginBottom: 2, // Add spacing between list items
  },
  listItemText: {
    fontSize: 8, // Set font size for list item text
  },
});

const Home = () => {
  const classes = useStyles(); // Get styles from makeStyles
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // State for loader visibility
  const navigate = useNavigate();

  const handleSearch = async (term) => {
    setIsLoading(true); // Show loader before fetching data
    setSearchResults([])
    const res = await getTopics(term);
    setSearchResults(res.results);
    setIsLoading(false); // Hide loader after fetching data
  };

  const cardListener = (id) => {
    navigate(`/chapters`, { state: { topic: searchResults[id].topic , description: searchResults[id].description } }); 
  };

  return (

    <div>
      <div style={{margin : 10}}>
  <div class="content">
  <Container maxWidth="md" className={classes.root}>
      <Typography variant="h6">
        A Personalized Learning Journey
      </Typography>
      <Box className={classes.content}>
        <Typography variant="body1">
          Dive into a world of knowledge tailored just for you! This innovative application unlocks a personalized learning experience, guiding you on your path to mastery.
        </Typography>
        <Typography variant="body1">Ready to embark on your personalized learning adventure? Try searching for any topic!</Typography>
      </Box>
    </Container>
  </div>

      </div>
    <div className={classes.container}> {/* Apply container styles */}
      <SearchBar onSearch={handleSearch} className={classes.searchBar} wrap="break-word" />
</div>
{isLoading && (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
    <CircularProgress size={40} className={classes.loader} />
  </div>
)}

      {searchResults.length > 0 && (
        <SearchResults searchResults={searchResults} cardListener={cardListener}></SearchResults>
      )}
</div>
  );
};

export default Home;
