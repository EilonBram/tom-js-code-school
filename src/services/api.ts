
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
