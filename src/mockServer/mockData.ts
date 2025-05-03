
// Mock data for code blocks
export const codeBlocks = [
    {
        id: '1',
        title: 'Hello World Function',
        description: 'Create a simple function that returns "Hello World"',
        initialCode: `// Create a function that returns the string "Hello World"
    function sayHello() {
      // Your code here
    }
    
    // Test the function
    console.log(sayHello());`,
        solution: `// Create a function that returns the string "Hello World"
    function sayHello() {
      return "Hello World";
    }
    
    // Test the function
    console.log(sayHello());`
      },
      {
        id: '2',
        title: 'Sum Two Numbers',
        description: 'Write a function that adds two numbers together',
        initialCode: `// Write a function that returns the sum of two numbers
    function addNumbers(a, b) {
      // Your code here
    }
    
    // Test with different numbers
    console.log(addNumbers(5, 3));
    console.log(addNumbers(10, 20));`,
        solution: `// Write a function that returns the sum of two numbers
    function addNumbers(a, b) {
      return a + b;
    }
    
    // Test with different numbers
    console.log(addNumbers(5, 3));
    console.log(addNumbers(10, 20));`
      },
      {
        id: '3',
        title: 'Check Even Number',
        description: 'Create a function that checks if a number is even',
        initialCode: `// Write a function that returns true if a number is even
    // and false if it's odd
    function isEven(number) {
      // Your code here
    }
    
    // Test with different numbers
    console.log(isEven(4));  // Should return true
    console.log(isEven(7));  // Should return false`,
        solution: `// Write a function that returns true if a number is even
    // and false if it's odd
    function isEven(number) {
      return number % 2 === 0;
    }
    
    // Test with different numbers
    console.log(isEven(4));  // Should return true
    console.log(isEven(7));  // Should return false`
      },
      {
        id: '4',
        title: 'Reverse a String',
        description: 'Write a function that reverses a string',
        initialCode: `// Create a function that reverses a string
    function reverseString(str) {
      // Your code here
    }
    
    // Test with different strings
    console.log(reverseString("hello"));  // Should return "olleh"
    console.log(reverseString("JavaScript"));  // Should return "tpircSavaJ"`,
        solution: `// Create a function that reverses a string
    function reverseString(str) {
      return str.split("").reverse().join("");
    }
    
    // Test with different strings
    console.log(reverseString("hello"));  // Should return "olleh"
    console.log(reverseString("JavaScript"));  // Should return "tpircSavaJ"`
      }
    ];