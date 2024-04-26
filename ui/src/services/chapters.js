import axios from "axios"; // Assuming axios is installed

const baseUrl = "https://voxmachina.onrender.com";


  const getChapters = async (topic,description) => {

    console.log(topic)
    console.log(description)
    try {
      const data = JSON.stringify({ topic,description }); // Stringify the object
      const config = {
        method: "post",
        url: `${baseUrl}/controller/chapters`,
        headers: {
          "Content-Type": "application/json",
        },
        data
      };

      const response = await axios(config);
      return response.data; // Access data from response
    } catch (error) {
      console.error("Error fetching topics:", error);
      throw new Error("Failed to get topics"); // Re-throw a more informative error
    }
  };

export default getChapters;
