import { useState, useEffect } from 'react';
import { geminiService } from '../../services/geminiService';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import type { Chat, Message } from '../../types';
import type { User } from '../../types';

// Yeni alt bileşenleri import et
import ChatHeader from '../chat/ChatHeader';
import MessageList from '../chat/MessageList';
import MessageInput from '../chat/MessageInput';
import SuggestedQuestions from '../chat/SuggestedQuestions';

interface ChatPageProps {
  chat: Chat;
  user?: User | null;
  onBack: () => void;
  onUpdateChat: (chat: Chat) => void;
}

export default function ChatPage({ chat, user, onBack, onUpdateChat }: ChatPageProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [, setPastChats] = useLocalStorage<Chat[]>('pastChats', []);
  const [isInitialized, setIsInitialized] = useState(false);

  // Helper function to ensure timestamps are Date objects
  const ensureDateTimestamps = (messages: Message[]): Message[] => {
    if (!Array.isArray(messages)) return [];
    
    return messages.map(message => {
      try {
        return {
          ...message,
          timestamp: message.timestamp instanceof Date 
            ? message.timestamp 
            : new Date(message.timestamp || Date.now())
        };
      } catch (error) {
        console.warn('Invalid timestamp, using current time:', error);
        return {
          ...message,
          timestamp: new Date()
        };
      }
    });
  };

  // Initialize messages from chat
  useEffect(() => {
    if (chat && chat.messages) {
      const safeMessages = ensureDateTimestamps(chat.messages);
      setMessages(safeMessages);
    } else {
      setMessages([]);
    }
  }, [chat.id]); // Only re-run when chat ID changes

  // Update chat in localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0 && chat) {
      const updatedChat = { ...chat, messages };
      onUpdateChat(updatedChat);
      
      // Update in pastChats localStorage
      setPastChats(prev => {
        const existingIndex = prev.findIndex(c => c.id === chat.id);
        if (existingIndex >= 0) {
          const updated = [...prev];
          updated[existingIndex] = updatedChat;
          return updated;
        } else {
          return [updatedChat, ...prev];
        }
      });
      
      // Show suggestions after first AI response
      if (messages.length >= 2 && !showSuggestions) {
        setShowSuggestions(true);
      }
    }
  }, [messages, chat, onUpdateChat, setPastChats, showSuggestions]);

  // Initialize chat with welcome message
  useEffect(() => {
    const initializeChat = async () => {
      if (isInitialized || !chat || messages.length > 0) return;
      
      try {
        setIsLoading(true);
        setIsInitialized(true);
        
        const context = {
          country: chat.country,
          purpose: chat.purpose,
          userProfile: user ? {
            name: user.name,
            email: user.email,
            role: user.role,
            industry: user.industry,
            country: user.country,
            ageRange: user.ageRange,
            gender: user.gender,
            isPremium: false // Bu bilgiyi user objesinden alabilirsiniz
          } : undefined
        };

        const welcomeContent = geminiService.generateWelcomeMessage(context);
        
        const initialMessage: Message = {
          id: Date.now().toString(),
          content: welcomeContent,
          isUser: false,
          timestamp: new Date()
        };
        
        setMessages([initialMessage]);
      } catch (error) {
        console.error('Failed to generate welcome message:', error);
        
        // Fallback message
        const fallbackMessage: Message = {
          id: Date.now().toString(),
          content: `Hello! I'm your ${chat.country} ${chat.purpose} Assistant. How can I help you today? 😊`,
          isUser: false,
          timestamp: new Date()
        };
        setMessages([fallbackMessage]);
      } finally {
        setIsLoading(false);
      }
    };

    initializeChat();
  }, [chat, user, messages.length, isInitialized]);

  const handleClearChat = () => {
    setMessages([]);
    setIsInitialized(false);
  };

  const handleCopyChat = () => {
    const chatText = messages.map(msg => 
      `${msg.isUser ? 'You' : 'AI'}: ${msg.content}`
    ).join('\n');
    navigator.clipboard.writeText(chatText);
    alert('Chat copied to clipboard!');
  };

  const handleShareChat = () => {
    if (navigator.share) {
      navigator.share({
        title: `${chat.country} - ${chat.purpose} Chat`,
        text: `Cultural guidance chat about ${chat.purpose} in ${chat.country}`,
        url: window.location.href
      });
    } else {
      alert('Share feature not supported on this device');
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const imageMessage: Message = {
        id: Date.now().toString(),
        content: `[Image uploaded: ${file.name}]`,
        isUser: true,
        timestamp: new Date()
      };
      
      const newMessages = [...messages, imageMessage];
      setMessages(newMessages);
      
      // Send AI response about image analysis
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: "I can see you've shared an image! While I can't analyze images yet, I'm here to help with any cultural questions you have about it. Feel free to describe what you'd like to know! 📸",
          isUser: false,
          timestamp: new Date()
        };
        const finalMessages = [...newMessages, aiResponse];
        setMessages(finalMessages);
      }, 1000);
    }
  };

  const handleVoiceMessage = () => {
    if (!isRecording) {
      setIsRecording(true);
      // Simulate voice recording
      setTimeout(() => {
        setIsRecording(false);
        const voiceMessage: Message = {
          id: Date.now().toString(),
          content: "🎤 Voice message recorded (Voice-to-text feature coming soon!)",
          isUser: true,
          timestamp: new Date()
        };
        
        const newMessages = [...messages, voiceMessage];
        setMessages(newMessages);
        
        // AI response
        setTimeout(() => {
          const aiResponse: Message = {
            id: (Date.now() + 1).toString(),
            content: "I heard your voice message! Voice recognition is coming soon. For now, please type your question and I'll be happy to help! 🎧",
            isUser: false,
            timestamp: new Date()
          };
          const finalMessages = [...newMessages, aiResponse];
          setMessages(finalMessages);
        }, 1000);
      }, 2000);
    }
  };

  const handleSendMessage = async (messageContent: string) => {
    if (!messageContent.trim() || isLoading) return;

    // Hide suggestions when user sends a message
    setShowSuggestions(false);

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageContent.trim(),
      isUser: true,
      timestamp: new Date()
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    // setInputMessage(''); // MessageInput artık kendi state'ini yönetiyor
    setIsLoading(true);

    try {
      // Prepare context for AI
      const context = {
        country: chat.country,
        purpose: chat.purpose,
        userProfile: user ? {
          name: user.name,
          email: user.email,
          role: user.role,
          industry: user.industry,
          country: user.country,
          ageRange: user.ageRange,
          gender: user.gender,
          isPremium: false // Bu bilgiyi user objesinden alabilirsiniz
        } : undefined
      };

      // Prepare chat history (exclude the current user message)
      const chatHistory = messages.map(msg => ({
        role: msg.isUser ? 'user' as const : 'assistant' as const,
        content: msg.content
      }));

      // Get AI response
      const aiResponse = await geminiService.generateCulturalResponse(
        userMessage.content,
        context,
        chatHistory
      );

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        isUser: false,
        timestamp: new Date()
      };

      const finalMessages = [...newMessages, aiMessage];
      setMessages(finalMessages);

    } catch (error) {
      console.error('Failed to get AI response:', error);
      
      // Show error message to user
      let errorContent = "I'm sorry, I'm having trouble connecting right now. Please check your internet connection and try again. 🔄";
      
      // Check if it's a quota exceeded error
      if (error instanceof Error && error.message.includes('quota')) {
        errorContent = "🚫 API quota exceeded. Please check your Gemini API usage limits and billing details. You can continue tomorrow when the quota resets, or upgrade your plan for more requests.";
      } else if (error instanceof Error && error.message.includes('429')) {
        errorContent = "⏰ Too many requests. Please wait a moment before trying again.";
      } else if (error instanceof Error) {
        errorContent = `❌ ${error.message}`;
      }
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: errorContent,
        isUser: false,
        timestamp: new Date()
      };

      const finalMessages = [...newMessages, errorMessage];
      setMessages(finalMessages);
    } finally {
      setIsLoading(false);
    }
  };

  if (!chat) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-900 text-white">
        <p>Loading chat...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <ChatHeader
        country={chat.country}
        purpose={chat.purpose}
        onBack={onBack}
        onClearChat={handleClearChat}
        onCopyChat={handleCopyChat}
        onShareChat={handleShareChat}
      />

      <MessageList
        messages={messages}
        isLoadingInitial={isLoading && messages.length === 0}
      />
      
      {showSuggestions && messages.length > 0 && !isLoading && (
        <div className="px-4 sm:px-6 pb-4">
          <SuggestedQuestions
            chatPurpose={chat.purpose}
            onSelectSuggestion={handleSuggestionClick}
          />
        </div>
      )}

      <MessageInput
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
        isRecording={isRecording}
        onFileUpload={handleFileUpload}
        onVoiceMessage={handleVoiceMessage}
      />
    </div>
  );
}