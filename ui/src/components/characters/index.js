import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles'; // Import for styling
import getCharacters from '../../services/characters';
import Typography from '@mui/material/Typography';
import { Grid } from '@material-ui/core'; // Import Grid component
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
  container: {
    padding: 20, // Add padding for better spacing
  },
  teacherCard: {
    display: 'flex',
    alignItems: 'center',
    padding: 10, // Add padding within teacher cards
    borderRadius: 4, // Add rounded corners for a softer look
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
    marginBottom: 10, // Add spacing between cards
  },
  avatar: {
    marginRight: 10, // Adjust margin for spacing
    width: 80, // Increase avatar width
    height: 80, // Increase avatar height
  },
  teacherInfo: {
    flex: 1, // Allow text content to grow and fill remaining space
  },
  voiceStyle: {
    fontSize: '.8rem', // Adjust font size for voice style description (optional)
    color: '#888', // Use a lighter color for less emphasis
  },
  proceedButton: {
    marginTop: 20,
    display: 'block', // Ensure button displays on a new line
    marginLeft: 'auto',
    marginRight: 'auto', // Center the button horizontally
  },
  radioSelected: {
    color: 'green', // Example: Change color to green when selected
  },
});

const CharacterList = ({ }) => {
  const classes = useStyles();
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const location = useLocation();
  const chapters = location.state?.chapters; // Access data using optional chaining
  const index = location.state?.index;
  const topic = location.state?.topic;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCharacters = async () => {
      const response = await getCharacters(); // Replace with your API call
      setCharacters(response.results || []); // Assuming data is in response.data
    };

    fetchCharacters();
  }, []);

  const handleRadioChange = (event) => {
    setSelectedCharacter(parseInt(event.target.value)); // Convert value to integer
  };

  const initiate =()=>{

    const character = characters.find(item => item.id === selectedCharacter)
    const chosenChapterTitle = chapters[index].title

    alert(character.name + " will teach the chapter "+chosenChapterTitle)
    navigate(`/learn`, { state: { chapters: chapters , index: index , character : character, topic : topic} }); 

  }

  return (
    <div className={classes.container}>
      <Typography variant="h5" component="div" style={{ textAlign: 'center' }}>
        Choose Your Teacher
      </Typography>
      <Grid container spacing={2}>
        {characters.map((character) => (
          <Grid item xs={12} key={character.id}>
            <div className={classes.teacherCard}>
              <Avatar
                alt={character.name}
                src={character.imageUrl}
                className={classes.avatar}
              />
              <div className={classes.teacherInfo}>
                <Typography variant="body1">{character.name}</Typography>
                <Typography variant="body2" className={classes.voiceStyle}>
                  {character.voiceStyle}
                </Typography>
                <RadioGroup value={selectedCharacter} onChange={handleRadioChange}>
                  <FormControlLabel value={character.id.toString()} control={<Radio />} label="Choose" checked ={selectedCharacter === character.id }/>
                </RadioGroup>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
      <Button variant="contained" color="primary" disabled={!selectedCharacter} className={classes.proceedButton} onClick={() => initiate()}>
        Proceed
      </Button>
    </div>
  );
};

export default CharacterList;
