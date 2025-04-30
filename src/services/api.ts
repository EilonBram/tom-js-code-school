
// API service for handling code block data

// The base URL for our API
const API_URL = 'http://localhost:3001/api';

// Fetch all code blocks for the lobby
export const getCodeBlocks = async () => {
  try {
    const response = await fetch(`${API_URL}/codeblocks`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching code blocks:', error);
    throw error;
  }
};

// Fetch a specific code block by ID
export const getCodeBlockById = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/codeblocks/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching code block with ID ${id}:`, error);
    throw error;
  }
};
