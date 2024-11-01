import axios from "axios";

export const fetchTurfs = async () => {
  try {
    const response = await axios.get("http://localhost:8080/turf/get"); 
    return response.data;
  } catch (error) {
    console.error("Error fetching turfs:", error);
    throw error;
  }
};

export const fetchTurfById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8080/turf/get/${id}`); 
    return response.data;
  } catch (error) {
    console.error(`Error fetching turf with id ${id}:`, error);
    throw error;
  }
};
