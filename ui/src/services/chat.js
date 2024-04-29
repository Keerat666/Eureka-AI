import axios from "axios"; // Assuming axios is installed

const baseUrl = "http://localhost:8009";


  const chatAPI = async (title,chapterName,description,character,language,newMessage) => {

    try {
      const data = JSON.stringify({ title,chapterName,description,character,language,newMessage }); // Stringify the object
      const config = {
        method: "post",
        url: `${baseUrl}/controller/chat`,
        headers: {
          "Content-Type": "application/json",
        },
        data
      };

      const response = await axios(config);
      return response.data[0]; // Access data from response
    } catch (error) {
      console.error("Error fetching topics:", error);
      throw new Error("Failed to get topics"); // Re-throw a more informative error
    }
  };

export default chatAPI;
