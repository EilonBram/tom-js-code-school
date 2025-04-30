
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCodeBlockById } from '../services/api';
import CodeBlock from '../components/CodeBlock';
import { useSocket } from '../context/SocketContext';
import { toast } from "@/components/ui/sonner";

interface CodeBlockData {
  id: string;
  title: string;
  initialCode: string;
  solution: string;
  description: string;
}

const CodeBlockPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { socket } = useSocket();
  const [codeBlockData, setCodeBlockData] = useState<CodeBlockData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      navigate('/');
      return;
    }

    const fetchCodeBlock = async () => {
      try {
        const data = await getCodeBlockById(id);
        setCodeBlockData(data);
        setLoading(false);
      } catch (error) {
        console.error(`Failed to fetch code block with ID ${id}:`, error);
        toast.error("Failed to load code block. Returning to lobby.");
        navigate('/');
      }
    };

    fetchCodeBlock();
  }, [id, navigate]);

  useEffect(() => {
    if (!socket || !id) return;

    // Listen for when mentor leaves
    socket.on('mentor_left', () => {
      toast.error("The mentor has left the session");
      navigate('/');
    });

    return () => {
      socket.off('mentor_left');
    };
  }, [socket, id, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!codeBlockData) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Code block not found</h2>
        <button 
          onClick={() => navigate('/')}
          className="bg-primary text-white py-2 px-4 rounded hover:bg-opacity-90"
        >
          Return to Lobby
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">{codeBlockData.title}</h1>
        <p className="text-muted-foreground">{codeBlockData.description}</p>
      </header>
      
      <CodeBlock codeBlockData={codeBlockData} />
      
      <div className="mt-8 text-center">
        <button
          onClick={() => navigate('/')}
          className="text-primary hover:underline"
        >
          Back to Lobby
        </button>
      </div>
    </div>
  );
};

export default CodeBlockPage;
