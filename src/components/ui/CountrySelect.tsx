import React, { useState, useRef, useEffect } from 'react';
import { countries } from '../../data/countries';

interface CountrySelectProps {
  value: string;
  onChange: (country: string) => void;
  placeholder?: string;
  className?: string;
}

export default function CountrySelect({ value, onChange, placeholder = "Type to search country...", className = "" }: CountrySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current && !inputRef.current.contains(event.target as Node) &&
        listRef.current && !listRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onChange(inputValue);
    
    if (inputValue.trim() === '') {
      setFilteredCountries(countries);
      setIsOpen(true);
    } else {
      const filtered = countries.filter(country =>
        country.toLowerCase().startsWith(inputValue.toLowerCase())
      );
      setFilteredCountries(filtered);
      setIsOpen(filtered.length > 0);
    }
  };

  const handleCountrySelect = (country: string) => {
    onChange(country);
    setIsOpen(false);
  };

  const handleFocus = () => {
    setFilteredCountries(countries);
    setIsOpen(true);
  };

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleInputChange}
        onFocus={handleFocus}
        placeholder={placeholder}
        className={`w-full rounded-xl border-none h-12 pl-4 pr-10 text-base focus:ring-2 focus:ring-inset focus:ring-white ${className}`}
        autoComplete="off"
      />
      {isOpen && (
        <ul
          ref={listRef}
          className="absolute z-[9999] w-full bg-white rounded-xl shadow-2xl mt-1 max-h-60 overflow-auto border border-gray-200 backdrop-blur-sm"
        >
          {filteredCountries.map((country) => (
            <li
              key={country}
              onClick={() => handleCountrySelect(country)}
              className="px-4 py-3 cursor-pointer hover:bg-blue-50 text-gray-800 border-b border-gray-100 last:border-b-0 transition-colors duration-150"
            >
              {country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}