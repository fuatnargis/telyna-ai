import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Plus, Mic, MoreVertical, Camera, Image, Trash2, Copy, Share, MessageCircle } from 'lucide-react';
import { geminiService } from '../../services/geminiService';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import type { Chat, Message } from '../../types';
import type { User } from '../../types';

interface ChatPageProps {
  chat: Chat;
  user?: User | null;
  onBack: () => void;
  onUpdateChat: (chat: Chat) => void;
}

export default function ChatPage({ chat, user, onBack, onUpdateChat }: ChatPageProps) {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showPlusMenu, setShowPlusMenu] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [pastChats, setPastChats] = useLocalStorage<Chat[]>('pastChats', []);
  const [isInitialized, setIsInitialized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  // Auto-scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

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
  }, [messages, chat, onUpdateChat, setPastChats]);

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

  // Get suggested questions based on country and purpose
  const getSuggestedQuestions = () => {
    const suggestions: { [key: string]: string[] } = {
      'Business Meeting': [
        `${chat.country}'de iş toplantısında el sıkışma nasıl yapılır?`,
        `${chat.country}'de iş yemeğinde dikkat edilmesi gerekenler neler?`,
        `${chat.country}'de iş ortaklarına hediye vermek uygun mu?`,
        `${chat.country}'de toplantılarda nasıl giyinmeliyim?`,
        `${chat.country}'de iş kartı nasıl verilir?`
      ],
      'Tourism': [
        `${chat.country}'de fotoğraf çekerken dikkat edilecekler neler?`,
        `${chat.country}'de bahşiş verme kuralları nasıl?`,
        `${chat.country}'de yerel halkla nasıl iletişim kurmalıyım?`,
        `${chat.country}'de turistik yerlerde nasıl davranmalıyım?`,
        `${chat.country}'de alışverişte pazarlık yapılır mı?`
      ],
      'Daily Life': [
        `${chat.country}'de komşularla nasıl ilişki kurmalıyım?`,
        `${chat.country}'de günlük alışverişte nelere dikkat etmeliyim?`,
        `${chat.country}'de toplu taşımada nasıl davranmalıyım?`,
        `${chat.country}'de sosyal etkinliklere nasıl katılmalıyım?`,
        `${chat.country}'de günlük selamlaşma nasıl yapılır?`
      ],
      'Emergency': [
        `${chat.country}'de acil durumda hangi numaraları aramalıyım?`,
        `${chat.country}'de hastaneye gittiğimde nasıl davranmalıyım?`,
        `${chat.country}'de polisle karşılaştığımda nelere dikkat etmeliyim?`,
        `${chat.country}'de acil durumda kimden yardım istemeliyim?`,
        `${chat.country}'de kaybolduğumda ne yapmalıyım?`
      ],
      'Education': [
        `${chat.country}'de öğretmenlerle nasıl iletişim kurmalıyım?`,
        `${chat.country}'de okul kuralları nasıl?`,
        `${chat.country}'de sınıf arkadaşlarımla nasıl kaynaşmalıyım?`,
        `${chat.country}'de eğitim sisteminde nelere dikkat etmeliyim?`,
        `${chat.country}'de ödev ve sınavlarda nasıl davranmalıyım?`
      ],
      'Healthcare': [
        `${chat.country}'de doktor randevusu nasıl alınır?`,
        `${chat.country}'de hastane ziyaretinde nasıl davranmalıyım?`,
        `${chat.country}'de sağlık sigortası nasıl çalışır?`,
        `${chat.country}'de eczaneden ilaç alırken nelere dikkat etmeliyim?`,
        `${chat.country}'de sağlık personeli ile nasıl iletişim kurmalıyım?`
      ],
      'Shopping': [
        `${chat.country}'de alışverişte pazarlık yapılır mı?`,
        `${chat.country}'de ödeme yöntemleri neler?`,
        `${chat.country}'de mağaza çalışanları ile nasıl iletişim kurmalıyım?`,
        `${chat.country}'de alışveriş saatleri nasıl?`,
        `${chat.country}'de iade ve değişim kuralları neler?`
      ],
      'Transportation': [
        `${chat.country}'de taksi kullanırken nelere dikkat etmeliyim?`,
        `${chat.country}'de toplu taşıma nasıl kullanılır?`,
        `${chat.country}'de araç kiralama kuralları neler?`,
        `${chat.country}'de trafik kuralları nasıl?`,
        `${chat.country}'de havaalanında nasıl davranmalıyım?`
      ],
      'Accommodation': [
        `${chat.country}'de otelde nasıl davranmalıyım?`,
        `${chat.country}'de ev sahibi ile nasıl iletişim kurmalıyım?`,
        `${chat.country}'de konaklama kuralları neler?`,
        `${chat.country}'de temizlik ve düzen konusunda nelere dikkat etmeliyim?`,
        `${chat.country}'de gürültü kuralları nasıl?`
      ]
    };

    return suggestions[chat.purpose] || suggestions['Tourism'];
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
    setShowSuggestions(false);
    // Auto send the suggestion
    setTimeout(() => {
      handleSendMessage();
    }, 100);
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
    setShowPlusMenu(false);
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

  const handleClearChat = () => {
    setMessages([]);
    setIsInitialized(false);
    setShowMenu(false);
  };

  const handleCopyChat = () => {
    const chatText = messages.map(msg => 
      `${msg.isUser ? 'You' : 'AI'}: ${msg.content}`
    ).join('\n');
    navigator.clipboard.writeText(chatText);
    alert('Chat copied to clipboard!');
    setShowMenu(false);
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
    setShowMenu(false);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    // Hide suggestions when user sends a message
    setShowSuggestions(false);

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage.trim(),
      isUser: true,
      timestamp: new Date()
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputMessage('');
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

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
      // Bold text: **text** -> <strong>text</strong>
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-yellow-200">$1</strong>')
      // Bullet points: • -> styled bullets
      .replace(/•\s/g, '<span class="inline-block w-2 h-2 bg-yellow-300 rounded-full mr-2 mt-2"></span>')
      // Line breaks
      .replace(/\n/g, '<br>')
      // Emojis - keep them as is
      .replace(/([\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}])/gu, '<span class="text-lg">$1</span>')
      // Remove excessive asterisks
      .replace(/\*+/g, '')
      // Clean up multiple spaces
      .replace(/\s+/g, ' ')
      .trim();
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
      <header className="sticky top-0 z-10 bg-slate-900/80 backdrop-blur-sm shadow-sm">
        <div className="flex items-center p-4">
          <button onClick={onBack} className="p-2 rounded-full hover:bg-slate-800/50 transition-all duration-200">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-3 ml-2">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg border-2 border-slate-500">
              {chat.country ? chat.country.charAt(0) : 'C'}
            </div>
            <div>
              <h1 className="text-xl font-bold">{chat.country || 'Chat'}</h1>
              <p className="text-sm text-slate-400">{chat.purpose || 'General'}</p>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="relative">
              <button 
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 rounded-full hover:bg-slate-800/50 transition-all duration-200"
              >
                <MoreVertical className="w-6 h-6" />
              </button>
              {showMenu && (
                <div className="absolute right-0 top-12 bg-slate-800/95 backdrop-blur-sm rounded-xl shadow-2xl py-2 w-48 z-50 border border-slate-700/50">
                  <button
                    onClick={handleCopyChat}
                    className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-slate-700/50 transition-colors duration-200"
                  >
                    <Copy className="w-4 h-4" />
                    Copy Chat
                  </button>
                  <button
                    onClick={handleShareChat}
                    className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-slate-700/50 transition-colors duration-200"
                  >
                    <Share className="w-4 h-4" />
                    Share Chat
                  </button>
                  <button
                    onClick={handleClearChat}
                    className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-red-500/10 text-red-400 transition-colors duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear Chat
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow space-y-6 p-4 sm:p-6 overflow-y-auto">
        {isLoading && messages.length === 0 && (
          <div className="flex justify-center items-center py-8">
            <div className="flex items-center gap-3 text-slate-400">
              <div className="w-6 h-6 animate-spin rounded-full border-2 border-slate-500 border-t-blue-500" />
              <span>Initializing your cultural guide...</span>
            </div>
          </div>
        )}
        
        {/* Suggested Questions */}
        {showSuggestions && messages.length > 0 && !isLoading && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-slate-400">
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm font-medium">Size özel soru önerileri:</span>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {getSuggestedQuestions().slice(0, 4).map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="text-left p-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/30 hover:from-blue-600/30 hover:to-purple-600/30 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 group-hover:bg-purple-400 transition-colors"></div>
                    <span className="text-blue-100/90 group-hover:text-white transition-colors text-sm leading-relaxed">
                      {suggestion}
                    </span>
                  </div>
                </button>
              ))}
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

      <footer className="sticky bottom-0 bg-slate-900/95 backdrop-blur-sm p-4 sm:p-6 border-t border-slate-700/50">
        <div className="flex items-center gap-2 rounded-2xl bg-slate-800/50 backdrop-blur-sm p-3 border border-slate-700/50">
          <div className="relative">
            <button 
              onClick={() => setShowPlusMenu(!showPlusMenu)}
              className="p-2 rounded-full text-slate-400 hover:bg-slate-700/50 transition-all duration-200"
            >
              <Plus className="w-6 h-6" />
            </button>
            {showPlusMenu && (
              <div className="absolute bottom-12 left-0 bg-slate-800/95 backdrop-blur-sm rounded-xl shadow-2xl py-2 w-48 z-50 border border-slate-700/50">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-slate-700/50 text-white transition-colors duration-200"
                >
                  <Image className="w-4 h-4" />
                  Upload Photo
                </button>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-slate-700/50 text-white transition-colors duration-200"
                >
                  <Camera className="w-4 h-4" />
                  Take Photo
                </button>
              </div>
            )}
          </div>
          <input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-grow bg-transparent focus:outline-none text-white placeholder-slate-400 text-base"
            placeholder="Type your message..."
            type="text"
          />
          <button 
            onClick={handleVoiceMessage}
            className={`p-2 rounded-full hover:bg-slate-700 ${
              isRecording ? 'text-red-500 animate-pulse' : 'text-slate-400'
            } transition-all duration-200`}
          >
            <Mic className={`w-6 h-6 ${isRecording ? 'animate-pulse' : ''}`} />
          </button>
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !inputMessage.trim()}
            className={`p-2 rounded-full hover:bg-slate-700 ${
              isLoading || !inputMessage.trim() 
                ? 'text-slate-500 cursor-not-allowed' 
                : 'text-orange-500'
            } transition-all duration-200`}
          >
            {isLoading ? (
              <div className="w-6 h-6 animate-spin rounded-full border-2 border-slate-500 border-t-orange-500" />
            ) : (
              <Send className="w-6 h-6" />
            )}
          </button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
        {isLoading && (
          <div className="text-center text-slate-400 text-sm mt-3 animate-pulse">
            AI is thinking...
          </div>
        )}
        {isRecording && (
          <div className="text-center text-red-400 text-sm mt-3 animate-pulse">
            🎤 Recording voice message...
          </div>
        )}
      </footer>
      
      {/* Click outside to close menus */}
      {(showMenu || showPlusMenu) && (
        <div 
          className="fixed inset-0 z-10" 
          onClick={() => {
            setShowMenu(false);
            setShowPlusMenu(false);
          }}
        />
      )}
    </div>
  );
}