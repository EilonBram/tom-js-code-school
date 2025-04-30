
import React, { useEffect, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useSocket } from '../context/SocketContext';
import { toast } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CodeBlockProps {
  codeBlockData: {
    id: string;
    title: string;
    initialCode: string;
    solution: string;
  };
}

const CodeBlock: React.FC<CodeBlockProps> = ({ codeBlockData }) => {
  const { socket, isMentor, studentCount } = useSocket();
  const [code, setCode] = useState(codeBlockData.initialCode);
  const [solved, setSolved] = useState(false);
  
  useEffect(() => {
    if (!socket) return;
    
    // Join the room for this code block
    socket.emit('join_room', codeBlockData.id);
    
    // Listen for code changes from other clients
    socket.on('code_updated', (updatedCode: string) => {
      setCode(updatedCode);
      checkSolution(updatedCode);
    });
    
    // Listen for mentor leaving
    socket.on('mentor_left', () => {
      toast.error("The mentor has left the session");
      // Redirect to lobby
      window.location.href = '/';
    });
    
    // Clean up
    return () => {
      socket.off('code_updated');
      socket.off('mentor_left');
      socket.emit('leave_room', codeBlockData.id);
    };
  }, [socket, codeBlockData.id]);
  
  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCode(newCode);
    
    // Emit code change event
    socket?.emit('code_change', {
      room: codeBlockData.id,
      code: newCode
    });
    
    checkSolution(newCode);
  };
  
  const checkSolution = (code: string) => {
    // Compare with the solution
    if (code.trim() === codeBlockData.solution.trim()) {
      setSolved(true);
      toast.success("Congratulations! You've solved the code block!");
    } else {
      setSolved(false);
    }
  };
  
  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold">{codeBlockData.title}</CardTitle>
        <div className="flex items-center space-x-2">
          <Badge variant="outline">{isMentor ? "Mentor (Read-only)" : "Student"}</Badge>
          <Badge>{studentCount} {studentCount === 1 ? "Student" : "Students"} Online</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {isMentor ? (
            <SyntaxHighlighter 
              language="javascript" 
              style={vscDarkPlus}
              className="rounded-md"
            >
              {code}
            </SyntaxHighlighter>
          ) : (
            <div className="flex flex-col space-y-4">
              <textarea
                className="font-mono w-full h-80 p-4 bg-black text-white rounded-md"
                value={code}
                onChange={handleCodeChange}
              />
              <Button onClick={() => checkSolution(code)}>Check Solution</Button>
            </div>
          )}
          {solved && (
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-70 rounded-md">
              <div className="text-9xl animate-bounce">😃</div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CodeBlock;
