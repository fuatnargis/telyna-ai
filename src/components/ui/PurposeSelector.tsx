import { useState, useRef, useEffect } from 'react';
import { purposes } from '../../data/countries';
import { ChevronDown } from 'lucide-react';
import type { Purpose } from '../../types';

interface PurposeSelectorProps {
  value: Purpose | '';
  onChange: (purpose: Purpose) => void;
  layout?: 'grid' | 'dropdown';
  placeholder?: string;
  className?: string;
}

export default function PurposeSelector({
  value,
  onChange,
  layout = 'grid',
  placeholder = 'Select your purpose...',
  className = ''
}: PurposeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (purpose: Purpose) => {
    onChange(purpose);
    setIsOpen(false);
  };

  if (layout === 'dropdown') {
    return (
      <div className={`relative ${className}`} ref={dropdownRef}>
        <button
          type="button"
          className="flex justify-between items-center w-full px-4 py-2 text-left rounded-lg border border-gray-300 bg-white text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => setIsOpen(!isOpen)}
        >
          {value || placeholder}
          <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        {isOpen && (
          <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-60 overflow-auto">
            {purposes.map((purpose) => (
              <li
                key={purpose}
                onClick={() => handleSelect(purpose)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {purpose}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-2 gap-3 ${className}`}>
      {purposes.map((purpose) => (
        <label
          key={purpose}
          className={`flex items-center justify-center gap-2 rounded-xl p-4 text-base font-medium cursor-pointer transition-colors ${
            value === purpose
              ? 'bg-blue-500 text-white'
              : 'bg-gray-800 text-white hover:bg-gray-700'
          }`}
        >
          <input
            type="radio"
            name="purpose"
            value={purpose}
            checked={value === purpose}
            onChange={() => onChange(purpose)}
            className="sr-only"
          />
          <span>{purpose}</span>
        </label>
      ))}
    </div>
  );
}