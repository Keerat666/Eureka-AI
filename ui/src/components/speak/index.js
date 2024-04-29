import React, { useState, useEffect } from 'react';
import { useTextToVoice } from "react-speakup";

const Speak = () => {
    const { speak, pause, resume, ref, setVoice, voices } = useTextToVoice();
    const [inputText, setInputText] = useState('Hola Amigo'); // State for user input
    const handleSpeak = () => {

      alert(inputText)
      speak(inputText); // Speak the text from the input field
    };
    return (
      <div>
         <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} /> {/* Input field */}
      <button onClick={handleSpeak}>Speak</button>
        <button onClick={pause}>Pause</button>
        <button onClick={resume}>Resume</button>
        <select
          onChange={(event) =>
            setVoice(event.target.value)
          }
        >
          {voices.map((voice) => (
            <option key={voice}>{voice}</option>
          ))}
        </select>
        <div>
          <h1 ref={ref}>{inputText}</h1>
        </div>
      </div>
    );
 
};
export default Speak;