import { useState, useEffect, useRef } from 'react';
import { geminiService } from '../../services/geminiService';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import type { Chat, Message } from '../../types';
import type { User } from '../../types';

// Yeni alt bileşenleri import et
import ChatHeader from '../chat/ChatHeader';
import MessageList from '../chat/MessageList';
import MessageInput from '../chat/MessageInput';

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
  const [, setPastChats] = useLocalStorage<Chat[]>('pastChats', []);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Use ref to store the callback to prevent infinite loops
  const onUpdateChatRef = useRef(onUpdateChat);
  onUpdateChatRef.current = onUpdateChat;

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
    console.log('ChatPage: Initializing messages from chat:', {
      chatId: chat?.id,
      hasMessages: !!chat?.messages,
      messageCount: chat?.messages?.length || 0
    });
    
    if (chat && chat.messages && chat.messages.length > 0) {
      const safeMessages = ensureDateTimestamps(chat.messages);
      console.log('ChatPage: Loading existing messages:', safeMessages.length);
      setMessages(safeMessages);
    } else {
      console.log('ChatPage: No existing messages, starting fresh');
      setMessages([]);
    }
  }, [chat]); // Re-run when chat changes

  // Update chat in localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0 && chat) {
      const updatedChat = { ...chat, messages };
      
      console.log('ChatPage: Saving chat to localStorage:', {
        chatId: chat.id,
        messageCount: messages.length,
        lastMessage: messages[messages.length - 1]?.content?.substring(0, 50) + '...'
      });
      
      // Update in pastChats localStorage
      setPastChats(prev => {
        const existingIndex = prev.findIndex(c => c.id === chat.id);
        if (existingIndex >= 0) {
          const updated = [...prev];
          updated[existingIndex] = updatedChat;
          console.log('ChatPage: Updated existing chat in localStorage');
          return updated;
        } else {
          console.log('ChatPage: Added new chat to localStorage');
          return [updatedChat, ...prev];
        }
      });
      
      // Update parent component using ref to prevent infinite loops
      onUpdateChatRef.current(updatedChat);
    }
  }, [messages.length]); // Only depend on messages.length to prevent infinite loops

  // Initialize chat with welcome message (only for new chats)
  useEffect(() => {
    const initializeChat = async () => {
      console.log('ChatPage: initializeChat called', { 
        isInitialized, 
        chatId: chat?.id,
        hasExistingMessages: chat?.messages?.length > 0
      });
      
      // Don't initialize if already initialized or if chat has existing messages
      if (isInitialized || !chat || (chat.messages && chat.messages.length > 0)) {
        console.log('ChatPage: Skipping initialization - already initialized or has existing messages');
        return;
      }
      
      try {
        console.log('ChatPage: Starting chat initialization for new chat');
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

        console.log('ChatPage: Generating welcome message with context:', context);
        const welcomeContent = geminiService.generateWelcomeMessage(context);
        console.log('ChatPage: Generated welcome content:', welcomeContent);
        
        const initialMessage: Message = {
          id: Date.now().toString(),
          content: welcomeContent,
          isUser: false,
          timestamp: new Date()
        };
        
        console.log('ChatPage: Setting initial message:', initialMessage);
        setMessages([initialMessage]);
      } catch (error) {
        console.error('ChatPage: Failed to generate welcome message:', error);
        
        // Fallback message
        const fallbackMessage: Message = {
          id: Date.now().toString(),
          content: `Hello! I'm your ${chat.country} ${chat.purpose} Assistant. How can I help you today? 😊`,
          isUser: false,
          timestamp: new Date()
        };
        console.log('ChatPage: Using fallback message:', fallbackMessage);
        setMessages([fallbackMessage]);
      } finally {
        console.log('ChatPage: Chat initialization complete');
        setIsLoading(false);
      }
    };

    initializeChat();
  }, [chat?.id, user?.id, isInitialized]); // Use specific IDs instead of full objects

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

    console.log('ChatPage: handleSendMessage called with:', messageContent);

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageContent.trim(),
      isUser: true,
      timestamp: new Date()
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      console.log('ChatPage: Preparing context and chat history');
      
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

      // Prepare chat history (use the current messages, not the new ones)
      const chatHistory = messages.map(msg => ({
        role: msg.isUser ? 'user' as const : 'assistant' as const,
        content: msg.content
      }));

      console.log('ChatPage: Calling geminiService.generateCulturalResponse');
      
      // Get AI response
      const aiResponse = await geminiService.generateCulturalResponse(
        userMessage.content,
        context,
        chatHistory
      );

      console.log('ChatPage: Received AI response:', aiResponse);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        isUser: false,
        timestamp: new Date()
      };

      const finalMessages = [...newMessages, aiMessage];
      setMessages(finalMessages);

    } catch (error) {
      console.error('ChatPage: Failed to get AI response:', error);
      
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
      console.log('ChatPage: handleSendMessage completed, setting isLoading to false');
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