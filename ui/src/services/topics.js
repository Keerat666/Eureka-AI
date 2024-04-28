import axios from "axios"; // Assuming axios is installed

const baseUrl = "https://voxmachina.onrender.com";


  const getTopics = async (query) => {

    console.log(query)
    try {
      const data = JSON.stringify({ query }); // Stringify the object
      const config = {
        method: "post",
        url: `${baseUrl}/controller/topics`,
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

export default getTopics;
