// This is a mock server implementation for demonstration purposes
// In a real application, this would be a separate Node.js server

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Mock database
const codeBlocks = [
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

// API Routes
app.get('/api/codeblocks', (req, res) => {
  res.json(codeBlocks);
});

app.get('/api/codeblocks/:id', (req, res) => {
  const codeBlock = codeBlocks.find(block => block.id === req.params.id);
  if (!codeBlock) {
    return res.status(404).json({ message: 'Code block not found' });
  }
  res.json(codeBlock);
});

// Socket.io rooms and their mentors
const rooms = {};

// Socket.io logic
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join_room', (roomId) => {
    socket.join(roomId);
    
    // If room doesn't exist yet or has no mentor, this user becomes the mentor
    if (!rooms[roomId] || !rooms[roomId].mentor) {
      rooms[roomId] = { mentor: socket.id, students: [] };
      socket.emit('role_assigned', 'mentor');
      console.log(`User ${socket.id} assigned as mentor in room ${roomId}`);
    } else {
      // Otherwise, this user is a student
      rooms[roomId].students.push(socket.id);
      socket.emit('role_assigned', 'student');
      console.log(`User ${socket.id} assigned as student in room ${roomId}`);
    }
    
    // Emit student count to all users in the room
    const studentCount = rooms[roomId]?.students.length || 0;
    io.to(roomId).emit('student_count', studentCount);
  });

  socket.on('leave_room', (roomId) => {
    if (!roomId || !rooms[roomId]) return;
    
    // Check if this user is the mentor
    if (rooms[roomId].mentor === socket.id) {
      console.log(`Mentor ${socket.id} left room ${roomId}`);
      
      // Notify all students that mentor has left
      io.to(roomId).emit('mentor_left');
      
      // Clean up the room
      delete rooms[roomId];
    } else {
      // Remove student from the room
      if (rooms[roomId].students) {
        rooms[roomId].students = rooms[roomId].students.filter(id => id !== socket.id);
        
        // Update student count
        io.to(roomId).emit('student_count', rooms[roomId].students.length);
      }
    }
    
    socket.leave(roomId);
  });

  socket.on('code_change', ({ room, code }) => {
    // Forward the code change to everyone else in the room
    socket.to(room).emit('code_updated', code);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    
    // Check all rooms for this socket
    Object.keys(rooms).forEach(roomId => {
      const room = rooms[roomId];
      
      // If this socket is the mentor of a room
      if (room.mentor === socket.id) {
        console.log(`Mentor ${socket.id} disconnected from room ${roomId}`);
        
        // Notify all students in the room
        io.to(roomId).emit('mentor_left');
        
        // Clean up the room
        delete rooms[roomId];
      } else if (room.students && room.students.includes(socket.id)) {
        // Remove student from the room
        room.students = room.students.filter(id => id !== socket.id);
        
        // Update student count
        io.to(roomId).emit('student_count', room.students.length);
      }
    });
  });
});

// Start server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
