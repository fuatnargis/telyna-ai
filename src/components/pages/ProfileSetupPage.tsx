import React, { useState } from 'react';
import { countries } from '../../data/countries';
import { useAuth } from '../../hooks/useAuth';

interface ProfileSetupPageProps {
  onComplete: (profileData: Record<string, unknown>) => void;
}

export default function ProfileSetupPage({ onComplete }: ProfileSetupPageProps) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    gender: 'male',
    ageRange: '25-34',
    country: '',
    role: 'Software Engineer',
    industry: 'Technology'
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
    if (!formData.name || !formData.country) {
      alert('Lütfen tüm gerekli alanları doldurun');
      return;
    }
    onComplete({
      ...formData,
      isProfileComplete: true
    });
  };

  return (
    <div className="flex flex-col min-h-screen mx-auto max-w-md bg-slate-900">
      <main className="flex-grow p-6">
        <header className="mb-8 pt-12">
          <h1 className="text-3xl font-bold text-slate-50">Profile Setup</h1>
          <p className="text-slate-400 mt-2">Personalize your experience to get the best out of Telyna AI.</p>
        </header>
        
        <form onSubmit={handleSubmit} className="space-y-6 pb-24">
          <div className="bg-slate-800 rounded-xl p-5">
            <h2 className="text-lg font-semibold text-slate-50 mb-4">Personal Info</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1" htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-slate-700 border-transparent rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-50 placeholder-slate-400 h-12 px-4"
                  placeholder="Enter your name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Gender</label>
                <div className="grid grid-cols-3 gap-2">
                  {['male', 'female', 'other'].map((gender) => (
                    <label key={gender} className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value={gender}
                        checked={formData.gender === gender}
                        onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value }))}
                        className="sr-only"
                      />
                      <div className={`w-full text-center py-2 px-4 rounded-lg cursor-pointer transition-colors ${
                        formData.gender === gender 
                          ? 'bg-blue-500 text-white font-medium' 
                          : 'bg-slate-700 text-slate-300'
                      }`}>
                        {gender === 'male' ? 'Erkek' : gender === 'female' ? 'Kadın' : 'Diğer'}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1" htmlFor="age">Age Range</label>
                <select
                  id="age"
                  value={formData.ageRange}
                  onChange={(e) => setFormData(prev => ({ ...prev, ageRange: e.target.value }))}
                  className="w-full bg-slate-700 border-transparent rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-50 h-12 px-4"
                >
                  <option value="18-24">18-24</option>
                  <option value="25-34">25-34</option>
                  <option value="35-44">35-44</option>
                  <option value="45-55">45-55</option>
                  <option value="65+">65+</option>
                </select>
              </div>
              
              <div className="relative">
                <label className="block text-sm font-medium text-slate-300 mb-1" htmlFor="country-input">Current Country *</label>
                <input
                  type="text"
                  id="country-input"
                  value={formData.country}
                  onChange={(e) => handleCountrySearch(e.target.value)}
                  onFocus={() => setShowCountries(true)}
                  className="w-full bg-slate-700 border-transparent rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-50 mb-2 h-12 px-4"
                  placeholder="Type to search country..."
                  autoComplete="off"
                  required
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
            </div>
          </div>
          
          <div className="bg-slate-800 rounded-xl p-5">
            <h2 className="text-lg font-semibold text-slate-50 mb-4">Professional Profile</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1" htmlFor="role">Role</label>
                <select
                  id="role"
                  value={formData.role}
                  onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full bg-slate-700 border-transparent rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-50 h-12 px-4"
                >
                  {roles.map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1" htmlFor="industry">Industry</label>
                <select
                  id="industry"
                  value={formData.industry}
                  onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
                  className="w-full bg-slate-700 border-transparent rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-50 h-12 px-4"
                >
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </form>
      </main>
      
      <footer className="sticky bottom-0 bg-slate-900/80 backdrop-blur-sm p-4 w-full max-w-md mx-auto">
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-slate-50 font-bold py-4 px-4 rounded-xl shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-colors"
        >
          Continue
        </button>
      </footer>
    </div>
  );
}