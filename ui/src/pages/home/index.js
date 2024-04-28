import React, { useState } from 'react';
import SearchBar from '../../components/search/index'; // Assuming SearchBar is in a separate file
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles'; // Import for styling
import getTopics from '../../services/topics';
import SearchResults from '../../components/searchResults';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80vh', // Ensures footer stays at bottom (optional)
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
});

const Home = () => {
  const classes = useStyles(); // Get styles from makeStyles
  const [searchResults, setSearchResults] = useState([]);

  
  const handleSearch = async(term) => {
    const res = await getTopics(term)
    setSearchResults(res.results);
  };

  const cardListener =(id)=>{

    alert(id)
  }

  return (
    <div className={classes.container}> {/* Apply container styles */}
      <Typography variant="h3" className={classes.heading}>
        Learn Anything.
      </Typography>

      <SearchBar onSearch={handleSearch} className={classes.searchBar} wrap="break-word" />

      <Typography variant="body2" className={classes.trySearchingText}> {/* Use body1 for body text */}
      Search for anything, like <strong>Recursion, Water Color Painting, Cricket...</strong>
      </Typography>

      {searchResults.length > 0 && (
        <SearchResults searchResults={searchResults} cardListener={cardListener}></SearchResults>
      )}
    </div>
  );
};

export default Home;
