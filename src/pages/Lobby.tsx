
import React, { useEffect, useState } from 'react';
import { getCodeBlocks } from '../services/api';
import CodeBlockCard from '../components/CodeBlockCard';
import { useToast } from "@/components/ui/use-toast";

interface CodeBlock {
  id: string;
  title: string;
  description: string;
  initialCode: string;
  solution: string;
}

const Lobby: React.FC = () => {
  const [codeBlocks, setCodeBlocks] = useState<CodeBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchCodeBlocks = async () => {
      try {
        const data = await getCodeBlocks();
        setCodeBlocks(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch code blocks:', error);
        toast({
          title: "Error",
          description: "Failed to load code blocks. Please try again later.",
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    fetchCodeBlocks();
  }, [toast]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">Choose Code Block</h1>
        <p className="text-muted-foreground">Select a coding challenge to begin your practice session</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {codeBlocks.map((block) => (
          <CodeBlockCard
            key={block.id}
            id={block.id}
            title={block.title}
            description={block.description}
            snippet={block.initialCode.substring(0, 150) + '...'}
          />
        ))}
      </div>
    </div>
  );
};

export default Lobby;
