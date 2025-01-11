'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

const INITIAL_MESSAGE: Message = {
  role: 'assistant',
  content: "Hello! I'm Eliza, your DeFi AI assistant. How can I help you today? 🤖",
  timestamp: new Date()
};

const DEFAI_ADDRESS = '5LGyBHMMPwzMunxhcBMn6ZWAuqoHUQmcFiboTJidFURP';
const DEFAI_RESPONSE = `DeFAI (${DEFAI_ADDRESS}) is a decentralized finance token that powers the Eliza Finance ecosystem. It serves as the governance token for the protocol and enables holders to participate in key decisions regarding the platform's development and future direction. The token implements advanced AI mechanisms for automated market making and liquidity provision.`;

export function ChatTerminal() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      let responseContent;
      
      // Check if message contains the DeFAI address
      if (input.includes(DEFAI_ADDRESS)) {
        responseContent = DEFAI_RESPONSE;
      } else {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: input })
        });
        const data = await response.json();
        responseContent = data.response;
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: responseContent,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mb-8 border border-gray-800 rounded-lg overflow-hidden bg-black">
      <div className="bg-gray-900 px-4 py-2 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="ml-2 text-sm text-gray-400">DeFAI Terminal</span>
        </div>
      </div>
      
      <div className="h-[300px] overflow-y-auto p-4 font-mono text-sm">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-2 ${msg.role === 'assistant' ? 'text-green-400' : 'text-gray-300'}`}>
            <span className="text-gray-500">{`[${msg.timestamp.toLocaleTimeString()}] `}</span>
            <span className="text-gray-500">{msg.role === 'assistant' ? 'eliza>' : 'user>'}</span>{' '}
            {msg.content}
          </div>
        ))}
        {isLoading && (
          <div className="text-green-400">
            <span className="text-gray-500">eliza&gt;</span> ▋
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="border-t border-gray-800 p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-gray-900 text-gray-300 px-3 py-2 rounded border border-gray-700 focus:outline-none focus:border-gray-600"
            placeholder="Type your message..."
          />
          <Button 
            type="submit"
            className="bg-gray-800 hover:bg-gray-700 text-gray-300"
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  );
} 