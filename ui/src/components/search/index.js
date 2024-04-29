import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles'; // Import for styling
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', // Center horizontally on all devices
    width: '100%', // Take full width on mobile, adjust as needed on desktop
    maxWidth: '500px', // Optional max width for larger screens
  },
  textField: {
    marginRight: '10px',
    fontSize: '0.8rem', // Adjust font size as needed for mobile
  },
});

const SearchBar = ({ onSearch }) => {
  const classes = useStyles(); // Get styles from makeStyles
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {

    console.log(event.target.value)
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className={classes.searchBar}>
      <TextField
        id="outlined-search"
        type="search"
        placeholder='Enter any topic'
        variant="outlined"
        value={searchTerm}
        onChange={handleChange}
        fullWidth // Ensures TextField fills remaining space
        className={classes.textField}
      />
<IconButton onClick={handleSearch} style={{ backgroundColor: '#cccccc' }}>
  <SearchIcon style={{ color: '#3f51b5' }} className={classes.searchIcon} /> {/* Set icon color here */}
</IconButton>
    </div>
  );
};

export default SearchBar;
