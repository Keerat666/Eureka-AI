import axios from "axios"; // Assuming axios is installed

const baseUrl = "https://voxmachina.onrender.com";


  const getCharacters = async () => {

    try {
      const config = {
        method: "get",
        url: `${baseUrl}/celebs/all?tableName=celebrities`,
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios(config);
      return response.data; // Access data from response
    } catch (error) {
      console.error("Error fetching topics:", error);
      throw new Error("Failed to get topics"); // Re-throw a more informative error
    }
  };

export default getCharacters;
