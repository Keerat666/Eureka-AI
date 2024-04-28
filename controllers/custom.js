const express = require('express');
const router = express.Router();
const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");

// Replace 'YOUR_GEMINI_API_KEY' with your actual Gemini API key
const API_KEY = 'AIzaSyAFOt7wdjgK-ejsbP8s33caF78-yAJRQSw';
const MODEL_NAME = "gemini-1.5-pro-latest";

router.post('/topics', async (req, res) => {
  const query = req.body.query;
  try {

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  
    const generationConfig = {
      temperature: 1,
      topK: 0,
      topP: 0.95,
      maxOutputTokens: 8192,
    };
  
    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];
  
    const parts = [
        { text: 'output: {"results": [{"topic": "Cricket", "description": "The sports"}, {"topic": "Cricket", "description": "The Insect"}]}' },
        { text: 'output: {"results": [{"topic": "Leonardo Da Vinci", "description": "The Legendary Renaissance Person"}, {"topic": "The Da Vinci Code - Book", "description": "The thriller book by Dan Brown"}, {"topic": "The Da Vinci Code - Movie", "description": "The thriller movie starring Tom Hanks."}]}' },
        { text: 'output: {"results": [{"topic": "Cookie", "description": "The baked food item"}, {"topic": "Captain James Cook", "description": "The British explorer"}, {"topic": "Tim Cook", "description": "The Apple CEO."}]}' },
        { text: 'output: {"results": [{"topic": "Chicago Bulls", "description": "NBA Team based in Chicago"}, {"topic": "Bulls", "description": "Plural of Bull - The male of cattle"}]}' },
        { text: 'output: {"results": [{"topic": "Bollywood", "description": "The Hindi-language film industry based in Mumbai, India"}]}' },
        { text: 'output: {"results": [{"topic": "Hollywood", "description": "The American film industry based in Hollywood, Los Angeles"}]}' },
        { text: 'output: {"results": [{"topic": "Tollywood", "description": "The Telugu language film industry based in Hyderabad, India."}]}' },
        { text: 'output: {"results": [{"topic": "Painting", "description": "The art or process of applying pigment to a surface"}, {"topic": "Painting", "description": "A picture produced by painting"}]}' },
        { text: "input: " + query },
        { text: 'output: {}' },
      ];
      
  
    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
      safetySettings,
    });

    const responseString = result.response.candidates[0].content.parts[0].text;
    res.status(200).json(responseString); // Return parsed JSON object

  } catch (error) {
    console.error("Error fetching data from Gemini:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
