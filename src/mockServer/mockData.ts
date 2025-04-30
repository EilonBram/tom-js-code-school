
// Mock data for code blocks
export const codeBlocks = [
  {
    id: '1',
    title: 'Async/Await Example',
    description: 'Practice implementing async/await with Promises',
    initialCode: `// Complete the function to fetch data from an API using async/await
async function fetchUserData(userId) {
  // Your code here
}

// Usage
fetchUserData(123)
  .then(user => console.log(user))
  .catch(error => console.error('Error fetching user:', error));`,
    solution: `// Complete the function to fetch data from an API using async/await
async function fetchUserData(userId) {
  try {
    const response = await fetch(\`https://api.example.com/users/\${userId}\`);
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    return await response.json();
  } catch (error) {
    throw new Error(\`Error fetching user \${userId}: \${error.message}\`);
  }
}

// Usage
fetchUserData(123)
  .then(user => console.log(user))
  .catch(error => console.error('Error fetching user:', error));`
  },
  {
    id: '2',
    title: 'Array Methods',
    description: 'Practice using map, filter, and reduce',
    initialCode: `// Complete the functions below using array methods
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 1. Create a new array with each number doubled
function doubleNumbers(arr) {
  // Your code here
}

// 2. Filter out all odd numbers
function filterEvenNumbers(arr) {
  // Your code here
}

// 3. Sum all numbers using reduce
function sumNumbers(arr) {
  // Your code here
}`,
    solution: `// Complete the functions below using array methods
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 1. Create a new array with each number doubled
function doubleNumbers(arr) {
  return arr.map(num => num * 2);
}

// 2. Filter out all odd numbers
function filterEvenNumbers(arr) {
  return arr.filter(num => num % 2 === 0);
}

// 3. Sum all numbers using reduce
function sumNumbers(arr) {
  return arr.reduce((sum, num) => sum + num, 0);
}`
  },
  {
    id: '3',
    title: 'Closure Challenge',
    description: 'Implement a counter using closures',
    initialCode: `// Create a counter function using closures
function createCounter() {
  // Your code here
}

// Usage
const counter = createCounter();
console.log(counter.increment()); // Should output 1
console.log(counter.increment()); // Should output 2
console.log(counter.decrement()); // Should output 1
console.log(counter.getValue()); // Should output 1`,
    solution: `// Create a counter function using closures
function createCounter() {
  let count = 0;
  
  return {
    increment: function() {
      count++;
      return count;
    },
    decrement: function() {
      count--;
      return count;
    },
    getValue: function() {
      return count;
    }
  };
}

// Usage
const counter = createCounter();
console.log(counter.increment()); // Should output 1
console.log(counter.increment()); // Should output 2
console.log(counter.decrement()); // Should output 1
console.log(counter.getValue()); // Should output 1`
  },
  {
    id: '4',
    title: 'Promises Challenge',
    description: 'Chain multiple promises together',
    initialCode: `// Chain these promises together to process the data
function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => resolve([1, 2, 3, 4, 5]), 1000);
  });
}

// Your code here - chain promises to:
// 1. Fetch the data
// 2. Multiply each number by 2
// 3. Filter out numbers greater than 5
// 4. Log the final result`,
    solution: `// Chain these promises together to process the data
function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => resolve([1, 2, 3, 4, 5]), 1000);
  });
}

fetchData()
  .then(numbers => {
    console.log("Original data:", numbers);
    return numbers.map(num => num * 2);
  })
  .then(multiplied => {
    console.log("After multiplication:", multiplied);
    return multiplied.filter(num => num <= 5);
  })
  .then(filtered => {
    console.log("Final result:", filtered);
  })
  .catch(error => {
    console.error("An error occurred:", error);
  });`
  }
];
