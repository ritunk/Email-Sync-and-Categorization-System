import axios from "axios";

const API_BASE_URL = "http://localhost:5000";
export const fetchEmails = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/emails/sync-emails`);
    return response.data;
  } catch (error) {
    console.error("Error fetching emails:", error);
    throw error;
  }
};

export const searchEmails = async (query) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/emails/search`, {
      params: { query },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching emails:", error);
    throw error;
  }
};
