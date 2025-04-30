
import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

// Define the shape of our context
interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  isMentor: boolean;
  studentCount: number;
}

// Create the context with default values
const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  isMentor: false,
  studentCount: 0,
});

// The server URL - for production, this would be your deployed backend
const SERVER_URL = 'http://localhost:3001';

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isMentor, setIsMentor] = useState(false);
  const [studentCount, setStudentCount] = useState(0);

  useEffect(() => {
    // Initialize socket connection
    const socketInstance = io(SERVER_URL);

    // Set up event listeners
    socketInstance.on('connect', () => {
      console.log('Connected to server');
      setIsConnected(true);
    });

    socketInstance.on('disconnect', () => {
      console.log('Disconnected from server');
      setIsConnected(false);
    });

    socketInstance.on('role_assigned', (role) => {
      console.log('Role assigned:', role);
      setIsMentor(role === 'mentor');
    });

    socketInstance.on('student_count', (count) => {
      console.log('Student count:', count);
      setStudentCount(count);
    });

    // Clean up on unmount
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected, isMentor, studentCount }}>
      {children}
    </SocketContext.Provider>
  );
};

// Custom hook for using the socket context
export const useSocket = () => useContext(SocketContext);
