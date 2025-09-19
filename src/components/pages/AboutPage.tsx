import React from 'react';
import { ArrowLeft, Globe, Users, Shield, Zap, Heart, Star, Award, Target, Lightbulb } from 'lucide-react';

interface AboutPageProps {
  onBack: () => void;
}

export default function AboutPage({ onBack }: AboutPageProps) {
  const features = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: "195+ Countries",
      description: "Comprehensive cultural guidance for every destination worldwide",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "AI-Powered",
      description: "Advanced artificial intelligence trained on extensive cultural databases",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Personalized",
      description: "Tailored advice based on your profile, purpose, and destination",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Private",
      description: "Your conversations and data are protected with industry-standard encryption",
      color: "from-green-500 to-teal-500"
    }
  ];

  const stats = [
    { number: "1M+", label: "Cultural Interactions", icon: <Heart className="w-6 h-6" /> },
    { number: "195+", label: "Countries Covered", icon: <Globe className="w-6 h-6" /> },
    { number: "50+", label: "Languages Supported", icon: <Users className="w-6 h-6" /> },
    { number: "99.9%", label: "Uptime Reliability", icon: <Zap className="w-6 h-6" /> }
  ];

  const team = [
    {
      name: "Dr. Sarah Chen",
      role: "Cultural Anthropologist",
      description: "Leading expert in cross-cultural communication with 15+ years of research experience.",
      avatar: "SC"
    },
    {
      name: "Marcus Rodriguez",
      role: "AI Research Director",
      description: "Former Google AI researcher specializing in natural language processing and cultural context.",
      avatar: "MR"
    },
    {
      name: "Aisha Patel",
      role: "Product Design Lead",
      description: "Award-winning UX designer focused on creating inclusive and accessible digital experiences.",
      avatar: "AP"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
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
            About Telyna AI
          </h1>
          <div className="w-12"></div>
        </div>
      </header>

      <main className="relative z-20 px-6 py-8 space-y-12">
        {/* Hero Section */}
        <section className="text-center">
          <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl border-4 border-white/20">
            <Globe className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-4">
            Telyna AI
          </h2>
          <p className="text-xl text-blue-200/90 leading-relaxed max-w-2xl mx-auto mb-6">
            Your personal guide to understanding and navigating cultural differences with confidence and respect.
          </p>
          <div className="flex items-center justify-center gap-2 text-blue-200/80">
            <span className="text-lg font-semibold">Version 1.0.0</span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm">Latest</span>
          </div>
        </section>

        {/* Mission Statement */}
        <section>
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Our Mission</h3>
                <p className="text-blue-200/80">Breaking down cultural barriers worldwide</p>
              </div>
            </div>
            <p className="text-blue-100/90 text-lg leading-relaxed">
              We believe that understanding different cultures is key to building a more connected and empathetic world. 
              CultureWise AI empowers individuals and organizations to navigate cultural differences with confidence, 
              fostering meaningful relationships and successful international collaborations.
            </p>
          </div>
        </section>

        {/* Key Features */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Key Features</h3>
              <p className="text-blue-200/80">What makes CultureWise AI special</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold text-white mb-2 group-hover:text-blue-200 transition-colors">
                  {feature.title}
                </h4>
                <p className="text-blue-200/80 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Statistics */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">By the Numbers</h3>
              <p className="text-blue-200/80">Our impact in numbers</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 text-center hover:bg-white/15 transition-all duration-300 group">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-white mb-2 group-hover:text-blue-200 transition-colors">
                  {stat.number}
                </div>
                <div className="text-blue-200/80 text-sm font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Meet Our Team</h3>
              <p className="text-blue-200/80">The experts behind CultureWise AI</p>
            </div>
          </div>
          
          <div className="space-y-6">
            {team.map((member, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform">
                    {member.avatar}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-white mb-1 group-hover:text-blue-200 transition-colors">
                      {member.name}
                    </h4>
                    <p className="text-blue-300 font-medium mb-3">{member.role}</p>
                    <p className="text-blue-200/80 leading-relaxed">{member.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Vision Section */}
        <section>
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Our Vision</h3>
                <p className="text-blue-200/80">Building bridges across cultures</p>
              </div>
            </div>
            <p className="text-blue-100/90 text-lg leading-relaxed mb-6">
              We envision a world where cultural differences are celebrated rather than feared, where every interaction across cultures is an opportunity for learning and growth. Through AI-powered cultural intelligence, we're making this vision a reality, one conversation at a time.
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                <span className="text-sm font-medium text-white">Global Understanding</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                <span className="text-sm font-medium text-white">Cultural Respect</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                <span className="text-sm font-medium text-white">Inclusive Technology</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                <span className="text-sm font-medium text-white">Meaningful Connections</span>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section>
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Get in Touch</h3>
            <p className="text-blue-200/80 mb-6 leading-relaxed">
              Have questions, feedback, or want to learn more about Telyna AI? 
              We'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                Contact Support
              </button>
              <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300">
                Visit Website
              </button>
            </div>
          </div>
        </section>

        {/* Copyright */}
        <section className="text-center">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <p className="text-blue-200/60 text-sm">
              © 2024 Telyna AI. All rights reserved. Made with ❤️ for global understanding.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}