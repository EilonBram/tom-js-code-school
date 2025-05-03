// API service for handling code block data
import { codeBlocks } from '../mockServer/mockData';

// Define the CodeBlock type
export interface CodeBlock {
  id: string;
  title: string;
  description: string;
  initialCode: string;
  solution: string;
}

// Mock implementation that returns the data directly without HTTP requests
export const getCodeBlocks = async (): Promise<CodeBlock[]> => {
  // Simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(codeBlocks);
    }, 300);
  });
};

// Fetch a specific code block by ID
export const getCodeBlockById = async (id: string): Promise<CodeBlock> => {
  // Simulate network delay
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const codeBlock = codeBlocks.find(block => block.id === id);
      if (codeBlock) {
        resolve(codeBlock);
      } else {
        reject(new Error(`Code block with ID ${id} not found`));
      }
    }, 300);
  });
};

// For simulation purposes, we're keeping these functions to understand how the socket server works
// In a production environment, these would make actual API calls to the server
export const joinCodeSession = (codeBlockId: string, socketId: string) => {
  console.log(`User ${socketId} joining code session for block ${codeBlockId}`);
  // In a real implementation, this would call the server
};

export const leaveCodeSession = (codeBlockId: string, socketId: string) => {
  console.log(`User ${socketId} leaving code session for block ${codeBlockId}`);
  // In a real implementation, this would call the server
};
