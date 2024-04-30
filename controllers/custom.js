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
const extract = require('extract-json-from-string');

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
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
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
        { text: `Output in JSON format only.Do not use markdown.Do not use " symbol in the reply, if you have to use " use ' instead.You can use emojis.` },
        { text: "input: " + query },
        { text: 'output: {}' },
      ];
      
  
    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
      safetySettings,
    });

    try {

      const responseString = result.response.candidates[0].content.parts[0].text;

      const responseWithoutOutputPrefix = responseString.startsWith('output: ') ? responseString.slice(7).trim() : responseString.trim();
      let objects = extract(responseWithoutOutputPrefix);
      res.status(200).json(objects[0]); // Return parsed JSON object
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
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
  ];

  const parts = [
    {
      text: `Act as an experienced teacher who knows all about ${req.body.topic}. To give more context, ${req.body.description}. Now generate an array of objects with 5 chapters in which you can explain an overall summary about it. 
    
      Return a JSON object containing an array of objects, each representing a chapter. Each chapter object should have a "title" (string) and "content" (string) property. 
    
      The response should be a valid JSON string that can be parsed using JSON.parse in my Node.js backend.
    
      Here's an example format:
    
      {
        "results": [
          { "title": "Chapter 1 Title", "content": "Chapter 1 Content" },
          { "title": "Chapter 2 Title", "content": "Chapter 2 Content" },
          // ... and so on for remaining chapters
        ]
      }

      Output in JSON format only. 
      
      Do not use markdown.Do not use " symbol in the response, if you have to use " use ' instead.You can use emojis.
      `
    }
      ];

  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
    safetySettings,
  });

  
try{

  console.log(result)

  const response = result// Your response object from the API call

// Get the first element from the "candidates" array
const candidate = response.response.candidates[0];

// Extract the content (chapter information)
const content = candidate.content.parts[0].text;
// Remove leading and trailing code block markers
const cleanContent = content.replace(/^```json\n/, '').replace(/\n`$/, '').replace('```', '');

let objects = extract(cleanContent);
  res.status(200).json(objects[0])

}catch(error)
{
  res.status(500).json({"error" : error})

}


})

router.post('/init-chat',async (req,res)=>{
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
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
  ];

  let parts=[]


  if(req.body.type === "Initial")
  {
    parts = [
      {
        text: `You are an online teacher about the subject ${req.body.title}. The name of the chapter in that subject is ${req.body.chapterName}.You are teaching some one on one on text.
  
        The description of the chapter is ${req.body.description}
              
        Now act like ${req.body.character} and text in ${req.body.language} for teaching this chapter. Use any basic phrases or dialouges that ${req.body.character} uses in their lingo without fail. Mimic their style and chat to give a feel that ${req.body.character} itself is texting. Use their references of things that ${req.body.character} is known for to explain ${req.body.chapterName} of ${req.body.title}.
        
        Now start teaching this subject using text.
  
        Just return me a json in the form of {"reply" : "insert your actual reply here in ${req.body.language} "}
  
        Please only send the json and nothing else.Do not add anything in the reply value which gives me an error while doing a JSON.parse(). Keep the structure in such a way that on doing a JSON.parse() I can directly get the JSON.
        Output in JSON format only. 
        
        Do not use markdown.Do not use " symbol in the reply, if you have to use " use ' instead.You can use emojis.
        Do not add line breaks manually.The formatting should be such that the whole reply is one long string.
        `
        
      }
        ];
  }

  else

  {
     parts = [
      {
        text: `You are an online teacher about the subject ${req.body.title}. The name of the chapter in that subject is ${req.body.chapterName}.You are teaching some one on one on text.
  
        The description of the chapter is ${req.body.description}
              
        Now act like ${req.body.character} and reply to the latest message in ${req.body.language} for teaching this chapter. Use phrases or dialouges that ${req.body.character} uses in their lingo without fail. Mimic their style and chat to give a feel that ${req.body.character} itself is texting. Use their references of things that ${req.body.character} is known for to explain ${req.body.chapterName} of ${req.body.title}.
        
        Now reply to this latest message of the user : ${req.body.newMessage}

        Previous Message chain for context : ${req.body.messageChain}
  
        Just return me a json in the form of {"reply" : "insert your actual reply here in ${req.body.language} "}
  
        Please only send the json and nothing else.Do not add anything in the reply value which gives me an error while doing a JSON.parse(). Keep the structure in such a way that on doing a JSON.parse() I can directly get the JSON.
        Output in JSON format only. 
        
        Do not use markdown.Do not use " symbol in the reply, if you have to use " use ' instead.You can use emojis.
        Do not add line breaks manually.The formatting should be such that the whole reply is one long string.
        `
        
      }
        ];
  }
 



      console.log(parts)

  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
    safetySettings,
  });

  console.log("result",result)

try{

  const response = result// Your response object from the API call

  // Get the first element from the "candidates" array
  const candidate = response.response.candidates[0];
  console.log(candidate)
  // Extract the content (chapter information)
  const content = candidate.content?.parts[0].text;
  // Remove leading and trailing code block markers
  const cleanContent = content.replace(/^```json\n/, '').replace(/\n`$/, '').replace('```', '').replace("\\", "");;
  console.log("CC",cleanContent)
  try{
    console.log("trying to send a response")
    let objects = await extract(cleanContent);
    console.log("got hold of a json")
    console.log(objects)
    res.status(200).json(objects)
  }catch(error)
  {
    console.log(error)
  }


}catch(error)
{
  console.log(error)
   res.status(500).json({"error" : error, "result" : result})
  //res.status(500).json(response)


}


})

module.exports = router;
