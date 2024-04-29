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

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh', // Ensures footer stays at bottom (optional)
  },
  heading: {
    marginBottom: 20,
    fontSize: '2.1rem', // Default font size
  },
  '@media (max-width: 600px)': { // Target screens less than 600px wide
    heading: {
      marginBottom: 20,
      fontSize: '1.8rem', // Smaller font size for mobile
    },
  },
  searchButton: {
    marginTop: 25, // Add some margin for spacing
  },
  trySearchingText: { // Class for styling "Try searching..."
    marginTop: 20, // Add some margin for spacing
    textAlign: 'center', // Center align the text
  },
  loader: {
    marginTop: 25, // Center the loader
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
    <div className={classes.container}> {/* Apply container styles */}
      <SearchBar onSearch={handleSearch} className={classes.searchBar} wrap="break-word" />

      <Typography variant="body2" className={classes.trySearchingText}> {/* Use body1 for body text */}
        Search for anything, like <strong>Recursion, Water Color Painting, Cricket...</strong>
      </Typography>

      {isLoading && (
        <CircularProgress size={40} className={classes.loader} /> // Show loader when isLoading is true
      )}

      {searchResults.length > 0 && (
        <SearchResults searchResults={searchResults} cardListener={cardListener}></SearchResults>
      )}
    </div>
  );
};

export default Home;
