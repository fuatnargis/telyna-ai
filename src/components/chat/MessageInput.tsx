import React, { useState, useRef } from 'react';
import { Send, Plus, Mic, Camera, Image } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  isRecording: boolean;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onVoiceMessage: () => void;
}

export default function MessageInput({
  onSendMessage,
  isLoading,
  isRecording,
  onFileUpload,
  onVoiceMessage,
}: MessageInputProps) {
  const [inputMessage, setInputMessage] = useState('');
  const [showPlusMenu, setShowPlusMenu] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    onSendMessage(inputMessage);
    setInputMessage('');
  };

  return (
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
          onClick={onVoiceMessage}
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
        onChange={onFileUpload}
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
  );
}