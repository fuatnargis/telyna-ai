import React, { useState } from 'react';
import { countries } from '../../data/countries';
import type { User } from '../../types';

interface EditProfilePageProps {
  user: User;
  onSave: (updatedData: Partial<User>) => void;
  onBack: () => void;
}

export default function EditProfilePage({ user, onSave, onBack }: EditProfilePageProps) {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    gender: user.gender,
    ageRange: user.ageRange,
    country: user.country,
    role: user.role,
    industry: user.industry
  });
  const [showCountries, setShowCountries] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState(countries);

  const roles = [
    'Software Engineer', 'Designer', 'Product Manager', 'Marketer', 'Doctor', 'Nurse',
    'Teacher', 'Professor', 'Lawyer', 'Accountant', 'Architect', 'Civil Engineer',
    'Mechanical Engineer', 'Electrical Engineer', 'Pharmacist', 'Dentist', 'Chef',
    'Police Officer', 'Firefighter', 'Journalist', 'Photographer', 'Pilot',
    'Flight Attendant', 'Scientist', 'Biologist', 'Chemist', 'Physicist',
    'Psychologist', 'Social Worker', 'Veterinarian', 'Farmer', 'Plumber',
    'Electrician', 'Mechanic', 'Driver', 'Salesperson', 'Receptionist',
    'Waiter', 'Barista', 'Artist', 'Musician', 'Actor', 'Writer', 'Translator',
    'IT Specialist', 'Data Analyst', 'Business Analyst', 'Consultant',
    'HR Specialist', 'Project Manager'
  ];

  const industries = [
    'Technology', 'Healthcare', 'Education', 'Finance', 'Construction',
    'Manufacturing', 'Retail', 'Hospitality', 'Transportation', 'Media',
    'Entertainment', 'Legal', 'Government', 'Real Estate', 'Telecommunications',
    'Energy', 'Agriculture', 'Automotive', 'Food & Beverage', 'Pharmaceutical',
    'Insurance', 'Consulting', 'Nonprofit', 'Sports', 'Fashion', 'Tourism',
    'Logistics', 'Mining', 'Utilities', 'Environmental'
  ];

  const handleCountrySearch = (value: string) => {
    setFormData(prev => ({ ...prev, country: value }));
    if (value.trim() === '') {
      setFilteredCountries(countries);
    } else {
      const filtered = countries.filter(country =>
        country.toLowerCase().startsWith(value.toLowerCase())
      );
      setFilteredCountries(filtered);
    }
    setShowCountries(true);
  };

  const handleCountrySelect = (country: string) => {
    setFormData(prev => ({ ...prev, country }));
    setShowCountries(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-900">
      <header className="sticky top-0 z-10 bg-slate-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <button onClick={onBack} className="text-slate-100 p-2 -ml-2">
              <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24">
                <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
              </svg>
            </button>
            <h1 className="text-lg font-bold text-slate-100">Edit Profile</h1>
            <div className="w-8"></div>
          </div>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="h-24 w-24 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">
                {getInitials(formData.name)}
              </div>
              <button className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-500 rounded-full p-2">
                <svg className="text-white w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm-2.206 2.206-8.5 8.5a.5.5 0 0 0 0 .707l.5.5a.5.5 0 0 0 .707 0L12.5 4.5l-1.852-1.853zM15 12.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1 0-1h13a.5.5 0 0 1 .5.5z"></path>
                </svg>
              </button>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1" htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full bg-slate-700 border border-slate-700 text-slate-100 rounded-lg p-4 h-14 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full bg-slate-700 border border-slate-700 text-slate-100 rounded-lg p-4 h-14 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1" htmlFor="gender">Gender</label>
              <select
                id="gender"
                value={formData.gender}
                onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value }))}
                className="w-full bg-slate-700 border border-slate-700 text-slate-100 rounded-lg p-4 h-14 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1" htmlFor="age-range">Age Range</label>
              <select
                id="age-range"
                value={formData.ageRange}
                onChange={(e) => setFormData(prev => ({ ...prev, ageRange: e.target.value }))}
                className="w-full bg-slate-700 border border-slate-700 text-slate-100 rounded-lg p-4 h-14 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              >
                <option value="18-24">18-24</option>
                <option value="25-34">25-34</option>
                <option value="35-44">35-44</option>
                <option value="45-54">45-54</option>
                <option value="55+">55+</option>
              </select>
            </div>
            
            <div className="relative">
              <label className="block text-sm font-medium text-slate-400 mb-1" htmlFor="country">Current Country</label>
              <input
                id="country"
                type="text"
                value={formData.country}
                onChange={(e) => handleCountrySearch(e.target.value)}
                onFocus={() => setShowCountries(true)}
                className="w-full bg-slate-700 border border-slate-700 text-slate-100 rounded-lg p-4 h-14 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                placeholder="Type to search country..."
                autoComplete="off"
              />
              {showCountries && (
                <ul className="absolute z-10 w-full bg-slate-700 rounded-lg max-h-60 overflow-y-auto border border-slate-600 mt-1">
                  {filteredCountries.map((country) => (
                    <li
                      key={country}
                      onClick={() => handleCountrySelect(country)}
                      className="px-4 py-2 hover:bg-slate-600 cursor-pointer text-slate-50"
                    >
                      {country}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1" htmlFor="role">Role</label>
              <select
                id="role"
                value={formData.role}
                onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                className="w-full bg-slate-700 border border-slate-700 text-slate-100 rounded-lg p-4 h-14 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              >
                {roles.map((role) => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1" htmlFor="industry">Industry</label>
              <select
                id="industry"
                value={formData.industry}
                onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
                className="w-full bg-slate-700 border border-slate-700 text-slate-100 rounded-lg p-4 h-14 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              >
                {industries.map((industry) => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
            </div>
          </form>
        </div>
      </main>
      
      <footer className="sticky bottom-0 bg-slate-900/80 backdrop-blur-sm py-4">
        <div className="container mx-auto px-4">
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200"
          >
            Save Changes
          </button>
        </div>
      </footer>
    </div>
  );
}