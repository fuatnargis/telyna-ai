import { useState } from 'react';
import { ArrowLeft, MoreVertical, Copy, Share, Trash2 } from 'lucide-react';

interface ChatHeaderProps {
  country: string;
  purpose: string;
  onBack: () => void;
  onClearChat: () => void;
  onCopyChat: () => void;
  onShareChat: () => void;
}

export default function ChatHeader({
  country,
  purpose,
  onBack,
  onClearChat,
  onCopyChat,
  onShareChat,
}: ChatHeaderProps) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="sticky top-0 z-10 bg-slate-900/80 backdrop-blur-sm shadow-sm">
      <div className="flex items-center p-4">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-slate-800/50 transition-all duration-200">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-3 ml-2">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg border-2 border-slate-500">
            {country ? country.charAt(0) : 'C'}
          </div>
          <div>
            <h1 className="text-xl font-bold">{country || 'Chat'}</h1>
            <p className="text-sm text-slate-400">{purpose || 'General'}</p>
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
                  onClick={onCopyChat}
                  className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-slate-700/50 transition-colors duration-200"
                >
                  <Copy className="w-4 h-4" />
                  Copy Chat
                </button>
                <button
                  onClick={onShareChat}
                  className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-slate-700/50 transition-colors duration-200"
                >
                  <Share className="w-4 h-4" />
                  Share Chat
                </button>
                <button
                  onClick={onClearChat}
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
      {showMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowMenu(false)}
        />
      )}
    </header>
  );
}