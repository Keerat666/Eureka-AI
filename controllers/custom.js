const express = require('express');
const router = express.Router();
const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");

// Replace 'YOUR_GEMINI_API_KEY' with your actual Gemini API key
const API_KEY = process.env.GeminiKey;
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
        { text: "input: djbfjdsnfkdnf" },
        { text: 'output: {"results": []' },
        { text: "input: kpoervfkls dvlk023i20" },
        { text: 'output: {"results": []' },
        { text: "input: dhinchak babu" },
        { text: 'output: {"results": []' },
        { text: 'Output in JSON format only. Do not use markdown.' },
        { text: "input: " + query },
        { text: 'output: {}' },
      ];
      
  
    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
      safetySettings,
    });

    const responseString = result.response.candidates[0].content.parts[0].text;

    const responseWithoutOutputPrefix = responseString.startsWith('output: ') ? responseString.slice(7) : responseString;

    try {
      const responseObject = JSON.parse(responseWithoutOutputPrefix);
      res.status(200).json(responseObject); // Return parsed JSON object
    } catch (error) {
      console.error('Error parsing response:', error);
      // Handle parsing error (e.g., return an error message)
      res.status(500).json({ message: 'Internal server error' });
    }
  } catch (error) {
    console.error("Error fetching data from Gemini:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post('/chapters',async (req,res)=>{
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
    {
      text: `Act as an experienced teacher who knows all about ${req.body.topic}. To give more context, ${req.body.description}. Now generate an array of objects with 5 chapters in which you can explain an overall summary about it. 
    
      Return a JSON object containing an array of objects, each representing a chapter. Each chapter object should have a "title" (string) and "content" (string) property. 
    
      The response should be a valid JSON string that can be parsed using JSON.parse in your Node.js backend.
    
      Here's an example format:
    
      {
        "results": [
          { "title": "Chapter 1 Title", "content": "Chapter 1 Content" },
          { "title": "Chapter 2 Title", "content": "Chapter 2 Content" },
          // ... and so on for remaining chapters
        ]
      }

      Output in JSON format only. Do not use markdown.
      `
    }
      ];

  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
    safetySettings,
  });

  console.log(result)

  const response = result// Your response object from the API call

// Get the first element from the "candidates" array
const candidate = response.response.candidates[0];

// Extract the content (chapter information)
const content = candidate.content.parts[0].text;
// Remove leading and trailing code block markers
const cleanContent = content.replace(/^```json\n/, '').replace(/\n`$/, '').replace('```', '');

try{
  const chapters = JSON.parse(cleanContent);
  res.status(200).json(chapters)

}catch(error)
{
  res.status(500).json({"error" : error})

}


})

router.post('/chat',async (req,res)=>{
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
    {
      text: `You are to teach about ${req.body.title}. The name of the chapter is ${req.body.chapterName}.

      The description is ${req.body.description}
      
      Just be limited to the above given information and if the user asks for more information tell them to go the next chapter.
      
      Now act like ${req.body.character} and teach me in ${req.body.language} this chapter. Feel free to use any basic phrases or dialouges that ${req.body.character} uses in their work. Also feel free to copy their style to give a feel that ${req.body.character} itself is texting.
      
      Just return me a json in the form of {"reply" : "insert your actual reply here in ${req.body.language} "}

      Please only send the json and nothing else.
      Output in JSON format only. Do not use markdown.

      `
      
    }
      ];

  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
    safetySettings,
  });

  console.log(result)

  const response = result// Your response object from the API call

// Get the first element from the "candidates" array
const candidate = response.response.candidates[0];

// Extract the content (chapter information)
const content = candidate.content.parts[0].text;
// Remove leading and trailing code block markers
const cleanContent = content.replace(/^```json\n/, '').replace(/\n`$/, '').replace('```', '').replace("\\", "");;
console.log(cleanContent)
try{
  const chapters = JSON.parse(cleanContent);
  res.status(200).json(chapters)

}catch(error)
{
  // res.status(500).json({"error" : error})
  res.status(500).json(response)


}


})

module.exports = router;
