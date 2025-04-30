
import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { toast } from '@/components/ui/sonner';

// Define the shape of our context
interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  isMentor: boolean;
  studentCount: number;
  socketId: string | null;
}

// Create the context with default values
const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  isMentor: false,
  studentCount: 0,
  socketId: null,
});

// The server URL - for production, this would be your deployed backend
// For local testing, we'll use a simulated socket connection
const SERVER_URL = 'http://localhost:3001';

// Check if we're in simulation mode (no actual socket server)
const SIMULATION_MODE = true;

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isMentor, setIsMentor] = useState(false);
  const [studentCount, setStudentCount] = useState(0);
  const [socketId, setSocketId] = useState<string | null>(null);

  useEffect(() => {
    if (SIMULATION_MODE) {
      // Simulation mode - create a fake socket experience
      console.log('[Simulation] Creating simulated socket connection');
      setIsConnected(true);
      
      // Generate a random socket ID
      const simulatedSocketId = `simulated-${Math.random().toString(36).substring(2, 9)}`;
      setSocketId(simulatedSocketId);

      // Check localStorage to see if we're the first visitor (mentor)
      const existingMentor = localStorage.getItem('isMentor');
      if (!existingMentor) {
        // First visitor becomes mentor
        localStorage.setItem('isMentor', 'true');
        setIsMentor(true);
        console.log('[Simulation] Role assigned: mentor');
        toast.success("You are the mentor (view only)");
      } else {
        // Subsequent visitors are students
        setIsMentor(false);
        
        // Increment student count in localStorage
        const currentCount = parseInt(localStorage.getItem('studentCount') || '0');
        localStorage.setItem('studentCount', (currentCount + 1).toString());
        setStudentCount(currentCount + 1);
        
        console.log('[Simulation] Role assigned: student');
        toast.success("You are a student (editor)");
      }

      // No cleanup needed for simulation
      return () => {
        console.log('[Simulation] Disconnecting simulated socket');
        // Decrease student count if we're a student
        if (!isMentor) {
          const currentCount = parseInt(localStorage.getItem('studentCount') || '0');
          if (currentCount > 0) {
            localStorage.setItem('studentCount', (currentCount - 1).toString());
          }
        }
      };
    } else {
      // Real socket implementation
      const socketInstance = io(SERVER_URL);

      // Set up event listeners
      socketInstance.on('connect', () => {
        console.log('Connected to server');
        setIsConnected(true);
        setSocketId(socketInstance.id);
      });

      socketInstance.on('disconnect', () => {
        console.log('Disconnected from server');
        setIsConnected(false);
      });

      socketInstance.on('role_assigned', (role) => {
        console.log('Role assigned:', role);
        setIsMentor(role === 'mentor');
        if (role === 'mentor') {
          toast.success("You are the mentor (view only)");
        } else {
          toast.success("You are a student (editor)");
        }
      });

      socketInstance.on('student_count', (count) => {
        console.log('Student count:', count);
        setStudentCount(count);
      });

      setSocket(socketInstance);

      // Clean up on unmount
      return () => {
        socketInstance.disconnect();
      };
    }
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected, isMentor, studentCount, socketId }}>
      {children}
    </SocketContext.Provider>
  );
};

// Custom hook for using the socket context
export const useSocket = () => useContext(SocketContext);

// Helper functions for simulation mode
export const simulateJoinRoom = (roomId: string) => {
  console.log(`[Simulation] Joining room ${roomId}`);
  // Update student count in localStorage
  if (!localStorage.getItem('isMentor')) {
    const currentCount = parseInt(localStorage.getItem('studentCount') || '0');
    localStorage.setItem('studentCount', (currentCount + 1).toString());
  }
};

export const simulateLeaveRoom = (roomId: string) => {
  console.log(`[Simulation] Leaving room ${roomId}`);
  // Update student count in localStorage
  if (!localStorage.getItem('isMentor')) {
    const currentCount = parseInt(localStorage.getItem('studentCount') || '0');
    if (currentCount > 0) {
      localStorage.setItem('studentCount', (currentCount - 1).toString());
    }
  }
};

export const simulateCodeChange = (roomId: string, code: string) => {
  console.log(`[Simulation] Code changed in room ${roomId}`);
  // Store the latest code in localStorage so other "clients" can see it
  localStorage.setItem(`codeblock_${roomId}`, code);
  
  // Dispatch a custom event that other tabs can listen for
  const event = new CustomEvent('code_updated', { detail: { roomId, code } });
  window.dispatchEvent(event);
};
