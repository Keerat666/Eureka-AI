# Eureka AI
An AI that teaches you any topic using popular celebrities. 

## Inspiration

Once upon a time there was a company called Frontrow where courses were taught by celebrities but sadly it shut down.

Eureka AI takes that concept and blasts it into the future! Chat with virtual AI versions of your favourite icons! Ever wanted to pick SRK about Bollywood, or get the download on Apple's innovative culture from Steve Jobs? 

Eureka AI lets you learn from the best, right from your couch, absolutely free. So ditch the boring and embrace the extraordinary – Eureka AI, where learning meets the A-list!

## What it does

Eureka AI personalizes the learning experience by letting you chat with iconic figures on any topic that sparks your curiosity, all for free. Be ready to unlock your potential through engaging conversations with the best minds, real or imagined.

We currently have a few celebrities based AI that you can chat with. Some of them are Snoop Dogg, SRK, T Swift, Hermoine and many more. I have added some fun characters like Groot and Yoda too to have some fun.

## Getting Started

To get started with Eureka AI, follow these simple steps:

1. Clone the repository:
   ```shell
   git clone https://github.com/Keerat666/Vox-Machina.git

2. Install dependencies:
```
cd Vox-Machina
npm install
```
3. Start the backend:
```
npm start
```

4. Start the UI
```
cd ui
npm start
```

5. Create a .env file with the following contents :

```
password=TiDb secret key
GeminiKey=Actual Gemini Key
```
6. If you want to run the API's locally in the UI then do the following change : 
```
  Inside ui/src/service.js change the Base URL to the local link. For me it was like localhost:3008
```


## How I built it

I built it using the Gemini AI. Gemini AI plays a very big role in the application. The rest part of it is handled by Node JS and React. I am also using a Database called TiDb to store the celebrities that Eureka is offering.

## Challenges I ran into

I have previously also done some projects where prompt engineering was involved. But in here it was my first time using Gemini AI. One big challenge that I ran into was to make sure that I get a valid JSON from Gemini on each call. I have managed to make the response from Gemini a bit stable.  

Second problem that I faced was to integrate voice in my application. I even found a service called play.ht which allows voice cloning but I was unable to integrate it into my application. If I was able to do that, it would have been even more cooler.

## Accomplishments that I am proud of

Getting Gemini to behave as the celebrity was a really cool moment for me. Even now I am having a lot of fun to see how accurately Gemini mimics a celebrity and holds up a conversation.

## What I learned

My Prompt Engineering skills have definitely gotten better. My experience with Gemini was also a nice one, especially the AI studio.

## What's next for Eureka AI

I have a vision that Eureka AI can use some touch of voice to give a more immersive experience to the user. Like imagine having an actual conversation about a topic with a virtual version of you favourite celeb on the topic of your choice.

A deployed version of Eureka AI can be found at : https://voxmachina.onrender.com

