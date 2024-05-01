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
import chatAPI from '../../services/chat';
import { useNavigate } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import { Grid } from '@material-ui/core';

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
  }
});

const ChatBox = ({ messages, typing, characterName, topic }) => {
  return (
    <div className="chat-history">
      <Typography variant="h4">
        Chat with {characterName} about {topic}
      </Typography>

      <div className="chat-container">
        {messages.map((message) => (
          <Grid container key={message.id} spacing={2} style={{ marginTop: 10 }}>
            <Grid item xs={12} sm={3} md={2}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar
                  alt={message.sender}
                  src={message.image}
                  style={{ width: 40, height: 40, marginRight: 10 }}
                />
                <Typography variant="body2" style={{ fontSize: 16 }}>
                  {message.sender}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={9} md={10}>
              <Typography variant="body2" style={{ fontSize: 18 }}>
                {message.text}
              </Typography>
            </Grid>
          </Grid>
        ))}
      </div>

      {typing === true ? (
        <Typography variant="body1" style={{ textAlign: 'initial', marginTop: 5 }}>
          {characterName} is typing...
        </Typography>
      ) : (
        <></>
      )}
    </div>
  );
};




const ChapterList = ({ chapters, onChapterTrigger, index }) => {
    const classes = useStyles();

    const [width, setWidth] = useState(window.innerWidth);

function handleWindowSizeChange() {
  setWidth(window.innerWidth);
}
useEffect(() => {
  window.addEventListener('resize', handleWindowSizeChange);
  return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
  }
}, []);

const isMobile = width <= 768;

    return (
      <List className={classes.chapterList}>
        {chapters.map((chapter, i) => (
          <ListItem
            button
            key={chapter.title}
            onClick={() => onChapterTrigger(i)}
            style={{ backgroundColor: index === i ? '#6374F1' : '' }}
          >


            <ListItemText primary={!isMobile ? chapter.title : "Module "+(i+1)} />
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
  const topic = location.state?.topic; // Access data using optional chaining

  const [index, setIndex] = useState(ind);

  const character = location.state?.character;
  const [newMessage, setNewMessage] = useState("");

  const [userMessage, setUserMessage] = useState(false);

  const [disableNewMessage, setDisableNewMessage] = useState(true);
  const navigate = useNavigate();

  const [width, setWidth] = useState(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
        window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);
  
  const isMobile = width <= 768;

  
  const handleChapterTrigger = (chapterId) => {
    // Handle chapter trigger logic here (e.g., update messages or state)
    setIndex(chapterId)
    switchToNewChapter(chapterId)
  };

  useEffect(()=>{
    if(userMessage)
    {
      handleResponse()
      setUserMessage(false)
      setNewMessage('')
    }
  },[userMessage])

  useEffect(()=>{

    const fetchData = async () => {
      const response = await init();
      const message = {
        id: Date.now(),
        sender: character.name,
        text: response.reply,
        image : character.imageUrl
      };
      setMessages(messages.concat(message))
      
      //setMessages([...messages, message]);
    };
  
    fetchData();


  },[index])

  const init =async ()=>{

   return await geminiReply("Initial")

  }

  const handleResponse=async ()=>{

    const reply = await geminiReply("Chat")
    console.log(reply.reply)
    const message1 = {
        id: Date.now(), // Example: Generate unique ID for each message
        sender: character.name,
        text: reply.reply,
        image : character.imageUrl
      };
  
    //setMessages([...messages, message]); 
    console.log(messages)
    console.log(message1)

    setMessages(messages.concat(message1)) 
  }

  const switchToNewChapter =async (id)=>{

    setIndex(id)
    const message = {
      id: Date.now(), // Example: Generate unique ID for each message
      sender: 'System',
      text: `Switching to ${chapters[id].title} `,
      image : "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg"
    };

    setMessages(messages.concat(message))  
  }

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return; // Prevent sending empty messages

    const message = {
      id: Date.now(), // Example: Generate unique ID for each message
      sender: 'You',
      text: newMessage,
      image : "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg"
    };

    //setMessages([...messages, message]);  
    setMessages(messages.concat(message))  
    setUserMessage(true)
  };

  const handleFinish =()=>{
    navigate(`/`); 

  }

  const handleExport =()=>{
    alert("This feature will be available soon.")
  }

  const handleClear =()=>{
    setMessages([])
  }

  const geminiReply=async(type)=>{

    setDisableNewMessage(true)
    let message = newMessage;  
    if(type!=="Initial")
    {
      message = messages.map(message => `${message.sender}: ${message.text}`).join("\n");
      console.log(message)

    }


    const response = await chatAPI(topic,chapters[index].title,chapters[index].content,character.name,"english",newMessage,type,message)
    setDisableNewMessage(false)
    return response;
  }

return (
  <div className={classes.container}>
    <ChapterList chapters={chapters} onChapterTrigger={handleChapterTrigger} index={index} />
    <Divider orientation="vertical" />
    <div className={classes.chatBox}>
      <ChatBox messages={messages} typing={disableNewMessage} characterName={character.name} topic={topic} />
      <TextField
        className={classes.messageInput}
        label="Type your message..."
        multiline
        fullWidth
        value={newMessage}
        onChange={(event) => setNewMessage(event.target.value)}
        onKeyPress={(event) => { if (event.key === 'Enter') handleSendMessage(); }}
        disabled={disableNewMessage}
        style={{ marginTop: 5 }}
      />
      <Button disabled={disableNewMessage} variant="contained" color="primary" onClick={handleSendMessage} style={{ backgroundColor: '#4350af', color: 'white' }}>
        Send
      </Button>

      {isMobile ? ( // Render buttons in a stack on mobile
        <>
          <Button variant="contained" disabled={disableNewMessage} onClick={handleClear} style={{ marginTop: 20 }}>
            Clear Chat
          </Button>
          <Button variant="contained" disabled={disableNewMessage} onClick={handleExport} style={{ backgroundColor: '#5bc0be', color: 'white', marginTop: 20 }}>
            Export Chat
          </Button>
          <Button variant="contained" color="secondary" onClick={handleFinish} style={{ marginTop: 20 }}>
            Finish
          </Button>
        </>
      ) : ( // Render buttons in a grid on desktop
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
          <Button variant="contained" disabled={disableNewMessage} onClick={handleClear} style={{ marginTop: 20, marginBottom: 20, marginRight: 20 }}>
            Clear Chat
          </Button>
          <Button variant="contained" disabled={disableNewMessage} onClick={handleExport} style={{ backgroundColor: '#5bc0be', color: 'white', margin: 20 }}>
            Export Chat
          </Button>
          <Button variant="contained" color="secondary" onClick={handleFinish} style={{ margin: 20 }}>
            Finish
          </Button>
        </div>
      )}
    </div>
  </div>
);

};

export default ChatComponent;
