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

export function ChatTerminal() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setMessages([INITIAL_MESSAGE]);
  }, []);

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
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: input,
          history: messages.map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        })
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Failed to get response:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      }]);
    } finally {
      setIsTyping(false);
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
        {isTyping && (
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