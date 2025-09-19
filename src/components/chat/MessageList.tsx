import React, { useRef, useEffect } from 'react';
import type { Message } from '../../types';

interface MessageListProps {
  messages: Message[];
  isLoadingInitial: boolean;
}

export default function MessageList({ messages, isLoadingInitial }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const formatTime = (timestamp: any): string => {
    try {
      const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
      if (isNaN(date.getTime())) {
        return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      }
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (error) {
      console.warn('Error formatting time:', error);
      return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  };

  const formatAIMessage = (content: string): string => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-yellow-200">$1</strong>')
      .replace(/•\s/g, '<span class="inline-block w-2 h-2 bg-yellow-300 rounded-full mr-2 mt-2"></span>')
      .replace(/\n/g, '<br>')
      .replace(/([\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}])/gu, '<span class="text-lg">$1</span>')
      .replace(/\*+/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  };

  return (
    <main className="flex-grow space-y-6 p-4 sm:p-6 overflow-y-auto">
      {isLoadingInitial && messages.length === 0 && (
        <div className="flex justify-center items-center py-8">
          <div className="flex items-center gap-3 text-slate-400">
            <div className="w-6 h-6 animate-spin rounded-full border-2 border-slate-500 border-t-blue-500" />
            <span>Initializing your cultural guide...</span>
          </div>
        </div>
      )}

      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-xs sm:max-w-md rounded-2xl p-4 shadow-lg ${
              message.isUser
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
            }`}
          >
            <div className="text-base leading-relaxed font-medium">
              {message.isUser ? (
                <p>{message.content}</p>
              ) : (
                <div
                  className="ai-message prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: formatAIMessage(message.content)
                  }}
                />
              )}
            </div>
            <div className="text-xs opacity-70 mt-2">
              {formatTime(message.timestamp)}
            </div>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </main>
  );
}