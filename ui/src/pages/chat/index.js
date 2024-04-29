import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import { useLocation } from 'react-router-dom';
import { characters } from 'shortid';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100vh', // Adjust height as needed
  },
  chapterList: {
    width: '20%',
    padding: 10,
  },
  chatBox: {
    width: '80%',
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    height : '85%'
  },
  chatHistory: {
    flex: 1, // Allow chat history to grow
    overflowY: 'scroll', // Enable scrolling for chat history
  },
  messageInput: {
    marginTop: 0,
  },
});

const ChatBox = ({ messages }) => {
  const classes = useStyles();
  const location = useLocation();
  const chapters = location.state?.chapters; // Access data using optional chaining
  const index = location.state?.index;
  const character = location.state?.character;

  console.log(chapters)
  console.log(index)
  console.log(character)

  return (
    <div className={classes.chatHistory}>
      {messages.map((message) => (
        <div key={message.id}>
          <Typography variant="body2" color={message.sender === 'User' ? 'primary' : 'textSecondary'}>
            {message.sender}: {message.text}
          </Typography>
        </div>
      ))}
    </div>
  );
};

const ChapterList = ({ chapters, onChapterTrigger, index }) => {
    const classes = useStyles();
    return (
      <List className={classes.chapterList}>
        {chapters.map((chapter, i) => (
          <ListItem
            button
            key={chapter.title}
            onClick={() => onChapterTrigger(i)}
            style={{ backgroundColor: index === i ? 'green' : '' }}
          >
            <ListItemText primary={chapter.title} />
          </ListItem>
        ))}
      </List>
    );
  };
  

const ChatComponent = () => {
  const classes = useStyles();
  const [messages, setMessages] = useState([]);
  const location = useLocation();
  const chapters = location.state?.chapters; // Access data using optional chaining
  let ind = location.state?.index;

  const [index, setIndex] = useState(ind);

  const character = location.state?.character;
  const [newMessage, setNewMessage] = useState("");

  const handleChapterTrigger = (chapterId) => {
    // Handle chapter trigger logic here (e.g., update messages or state)
    alert(`Chapter triggered: ${chapterId}`);
    setIndex(chapterId)
    switchToNewChapter(chapterId)
  };

  useEffect(()=>{

    alert("Hello")
    //simulate an API call here to Gemini
    
    const message = {
        id: Date.now(), // Example: Generate unique ID for each message
        sender: character.name,
        text: `This is SRK here. Welcome to your lesson for ${chapters[index].title}`,
      };
  
    setMessages([...messages, message]);   


  },[])

  const handleResponse=()=>{

    const message = {
        id: Date.now(), // Example: Generate unique ID for each message
        sender: character.name,
        text: `Yes I hear you.`,
      };
  
    setMessages([...messages, message]);   
  }

  const switchToNewChapter =(id)=>{

    const message = {
        id: Date.now(), // Example: Generate unique ID for each message
        sender: character.name,
        text: `This is SRK here. Welcome to your lesson for ${chapters[id].title}`,
      };
  
    setMessages([...messages, message]);   

  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return; // Prevent sending empty messages

    const message = {
      id: Date.now(), // Example: Generate unique ID for each message
      sender: 'User',
      text: newMessage,
    };

    setMessages([...messages, message]);    
    setNewMessage(''); // Clear input after sending
    handleResponse()
  };

  const handleFinish =()=>{
    alert("Navigate to Homepage")
  }

  return (
    <div className={classes.container}>
      <ChapterList chapters={chapters} onChapterTrigger={handleChapterTrigger} index={index} />
      <Divider orientation="vertical" />
      <div className={classes.chatBox}>
        <ChatBox messages={messages} />
        <TextField
          className={classes.messageInput}
          label="Type your message..."
          multiline
          fullWidth
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
          onKeyPress={(event) => { if (event.key === 'Enter') handleSendMessage(); }}
        />
        <Button variant="contained" color="primary" onClick={handleSendMessage} >
          Send
        </Button>

        <Button variant="contained" color="danger" onClick={handleFinish} style={{marginTop : 20}}>
          Finish
        </Button>
      </div>
    </div>
  );
};

export default ChatComponent;
