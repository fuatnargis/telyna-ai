import React, { useState } from 'react';
import { ArrowLeft, Search, MessageCircle, Book, Settings, Info, Mail, Phone, Globe, FileText, Star, Zap } from 'lucide-react';

interface HelpSupportPageProps {
  onBack: () => void;
}

export default function HelpSupportPage({ onBack }: HelpSupportPageProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const faqItems = [
    {
      question: "How do I start a cultural conversation?",
      answer: "Select your destination country and purpose, then click 'Start Cultural Journey' to begin your personalized cultural guidance session."
    },
    {
      question: "Can I use CultureWise AI offline?",
      answer: "Currently, CultureWise AI requires an internet connection to provide real-time cultural insights and AI-powered responses."
    },
    {
      question: "How accurate is the cultural information?",
      answer: "Our AI is trained on extensive cultural databases and is regularly updated. However, cultural norms can vary by region and context."
    },
    {
      question: "Can I save my conversations?",
      answer: "Yes! All your conversations are automatically saved and can be accessed from your chat history on the home page."
    },
    {
      question: "Is my personal data secure?",
      answer: "Absolutely. We use industry-standard encryption and never share your personal information without your explicit consent."
    }
  ];

  const filteredFAQs = faqItems.filter(item =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <header className="relative z-20 sticky top-0 bg-slate-900/80 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center justify-between p-6">
          <button 
            onClick={onBack}
            className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 border border-white/20"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Help & Support
          </h1>
          <div className="w-12"></div>
        </div>
      </header>

      <main className="relative z-20 px-6 py-8 space-y-8">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search help articles..."
            className="w-full rounded-2xl bg-white/10 backdrop-blur-xl py-4 pl-12 pr-4 text-white placeholder-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-white/20"
          />
        </div>

        {/* Quick Actions */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Quick Help</h2>
              <p className="text-blue-200/80">Get instant assistance</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            <button className="group bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 text-left">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white group-hover:text-blue-200 transition-colors">Browse Frequently Asked Questions</h3>
                  <p className="text-blue-200/80 text-sm">Find quick answers to common questions</p>
                </div>
                <ArrowLeft className="w-5 h-5 text-white/60 rotate-180 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            <button className="group bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 text-left">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white group-hover:text-blue-200 transition-colors">Contact Support Team</h3>
                  <p className="text-blue-200/80 text-sm">Email us for personal assistance</p>
                </div>
                <ArrowLeft className="w-5 h-5 text-white/60 rotate-180 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            <button className="group bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 text-left">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white group-hover:text-blue-200 transition-colors">Technical Troubleshooting</h3>
                  <p className="text-blue-200/80 text-sm">Fix common technical problems</p>
                </div>
                <ArrowLeft className="w-5 h-5 text-white/60 rotate-180 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>
        </section>

        {/* FAQ Section */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Book className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Frequently Asked Questions</h2>
              <p className="text-blue-200/80">Common questions and answers</p>
            </div>
          </div>
          
          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => (
              <details key={index} className="group bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden">
                <summary className="p-6 cursor-pointer hover:bg-white/10 transition-colors">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-200 transition-colors">
                      {faq.question}
                    </h3>
                    <ArrowLeft className="w-5 h-5 text-white/60 rotate-90 group-open:rotate-180 transition-transform" />
                  </div>
                </summary>
                <div className="px-6 pb-6 border-t border-white/10">
                  <p className="text-blue-200/90 leading-relaxed mt-4">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Contact Information */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Contact Information</h2>
              <p className="text-blue-200/80">Get in touch with us</p>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center gap-4">
                <Mail className="w-6 h-6 text-blue-400" />
                <div>
                  <h3 className="text-lg font-semibold text-white">Email Support</h3>
                  <p className="text-blue-200/80">support@culturewise.ai</p>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center gap-4">
                <Globe className="w-6 h-6 text-green-400" />
                <div>
                  <h3 className="text-lg font-semibold text-white">Website</h3>
                  <p className="text-blue-200/80">www.culturewise.ai</p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center gap-4">
                <Star className="w-6 h-6 text-yellow-400" />
                <div>
                  <h3 className="text-lg font-semibold text-white">Rate Our App</h3>
                  <p className="text-blue-200/80">Help us improve with your feedback</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* App Information */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Info className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">App Information</h2>
              <p className="text-blue-200/80">Version and legal information</p>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto shadow-2xl">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Telyna AI</h3>
                <p className="text-blue-200/80 mb-4">Version 1.0.0</p>
                <p className="text-blue-200/90 leading-relaxed">
                  Your personal guide to understanding and navigating cultural differences. 
                  Our AI-powered platform provides real-time insights and advice to help you 
                  communicate effectively across cultures.
                </p>
              </div>
              <div className="flex justify-center gap-4 pt-4">
                <button className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20 hover:bg-white/20 transition-colors">
                  <FileText className="w-4 h-4 inline mr-2" />
                  Privacy Policy
                </button>
                <button className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20 hover:bg-white/20 transition-colors">
                  <FileText className="w-4 h-4 inline mr-2" />
                  Terms of Service
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}