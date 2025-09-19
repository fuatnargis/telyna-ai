import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { purposes } from '../../data/countries';
import { ChevronDown } from 'lucide-react';
import type { Purpose } from '../../types';

interface PurposeSelectorProps {
  value: Purpose | '';
  onChange: (purpose: Purpose) => void;
  layout?: 'grid' | 'list' | 'dropdown';
  placeholder?: string;
  className?: string;
}

export default function PurposeSelector({ 
  value, 
  onChange, 
  layout = 'list', 
  placeholder = "Select your purpose...",
  className = ""
}: PurposeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current && !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePurposeSelect = (purpose: Purpose) => {
    onChange(purpose);
    setIsOpen(false);
  };

  if (layout === 'dropdown') {
    return (
      <div className="relative">
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full rounded-xl border-none h-12 pl-4 pr-10 text-base focus:ring-2 focus:ring-inset focus:ring-white text-left flex items-center justify-between ${className}`}
        >
          <span className={value ? 'text-slate-800' : 'text-slate-500'}>
            {value || placeholder}
          </span>
          <ChevronDown className={`w-5 h-5 text-slate-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        {isOpen && (
          <div
            ref={dropdownRef}
            className="absolute z-[1000] w-full bg-white rounded-xl shadow-2xl mt-1 max-h-60 overflow-auto border border-gray-200 backdrop-blur-sm"
          >
            {purposes.map((purpose) => (
              <button
                key={purpose}
                onClick={() => handlePurposeSelect(purpose)}
                className="w-full px-4 py-3 text-left cursor-pointer hover:bg-blue-50 text-gray-800 border-b border-gray-100 last:border-b-0 transition-colors duration-150"
              >
                {purpose}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  const gridClass = layout === 'grid' ? 'grid grid-cols-2 gap-3' : 'space-y-3';

  return (
    <div className={gridClass}>
      {purposes.map((purpose) => (
        <label
          key={purpose}
          className={`flex items-center gap-4 rounded-xl p-4 text-base font-medium cursor-pointer transition-all ${
            layout === 'grid' 
              ? 'justify-center bg-gray-800 text-white hover:bg-gray-700' 
              : 'bg-slate-50 text-slate-800 has-[:checked]:ring-2 has-[:checked]:ring-white hover:bg-slate-100'
          }`}
        >
          <input
            type="radio"
            name="purpose"
            value={purpose}
            checked={value === purpose}
            onChange={(e) => onChange(e.target.value as Purpose)}
            className={`form-radio h-5 w-5 ${
              layout === 'grid' 
                ? 'text-blue-500' 
                : 'text-blue-600 focus:ring-offset-0 focus:ring-2 focus:ring-blue-500 border-gray-400'
            }`}
          />
          <span>{purpose}</span>
        </label>
      ))}
    </div>
  );
}