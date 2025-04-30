
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockCardProps {
  id: string;
  title: string;
  description: string;
  snippet: string;
}

const CodeBlockCard: React.FC<CodeBlockCardProps> = ({ id, title, description, snippet }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/codeblock/${id}`);
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500 mb-4">{description}</p>
        <div className="max-h-40 overflow-hidden rounded">
          <SyntaxHighlighter 
            language="javascript" 
            style={vscDarkPlus}
            className="text-sm"
          >
            {snippet}
          </SyntaxHighlighter>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleClick} className="w-full">Start Coding</Button>
      </CardFooter>
    </Card>
  );
};

export default CodeBlockCard;
