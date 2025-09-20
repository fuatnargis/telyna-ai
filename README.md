# 🌍 Telyna AI - Cultural Travel Assistant

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Firebase%20Hosting-blue)](https://your-firebase-url.web.app)
[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-Hosting%20%26%20Auth-orange)](https://firebase.google.com/)
[![AI](https://img.shields.io/badge/AI-Google%20Gemini-green)](https://ai.google.dev/)

A sophisticated multilingual AI-powered cultural travel assistant that helps users navigate cultural differences and provides personalized guidance for their travel purposes. Built with modern web technologies and AI integration.

## 🎯 **Application Purpose**

**Telyna AI** is designed to bridge cultural gaps for travelers by providing:

- **Cultural Guidance**: Real-time advice on local customs, etiquette, and traditions
- **Language Support**: 9 languages with automatic detection and response
- **Purpose-Specific Help**: Tailored advice for business, tourism, education, or other travel purposes
- **AI-Powered Insights**: Advanced cultural understanding through Google Gemini AI
- **Personalized Experience**: User profile-based recommendations and guidance

**Target Users**: Business travelers, tourists, students, expats, and anyone planning to visit a foreign country and wants to understand local culture better.

## ✨ Key Features

- 🌍 **Multi-language Support**: 9 languages (Turkish, English, Spanish, French, German, Arabic, Chinese, Japanese, Russian)
- 🤖 **Advanced AI Chat Bot**: Powered by Google Gemini AI with contextual understanding
- 🔥 **Firebase Integration**: Secure authentication and cloud hosting
- 📱 **Responsive Design**: Mobile-first approach with Tailwind CSS
- 💾 **Smart Data Persistence**: Local storage with chat history management
- 🎯 **Specialized AI**: Country and purpose-focused cultural guidance
- 🔒 **Security First**: XSS protection, input validation, and secure API handling
- ⚡ **Performance Optimized**: Fast loading with Vite build system

## 🛠️ Tech Stack

### Frontend
- **React 18.2.0** - Modern UI library with hooks
- **TypeScript 5.0** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework

### Backend & Services
- **Firebase Authentication** - Secure user management
- **Firebase Hosting** - Global CDN deployment
- **Google Gemini AI** - Advanced language model integration
- **Firestore** - NoSQL database (optional)

### Development
- **ESLint** - Code quality and consistency
- **Git** - Version control with GitHub
- **npm** - Package management
- **Security** - XSS protection, input validation

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Firebase project** (free tier available)
- **Google Gemini API key** (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd firebase2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Copy `.env.example` to `.env`
   - Fill in your Firebase and Gemini API credentials:
   ```env
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   VITE_GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Firebase Setup**
   - Create a Firebase project
   - Enable Authentication (Google Sign-In)
   - Add your domain to authorized domains
   - Configure Firebase hosting

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Build for production**
   ```bash
   npm run build
   ```

## Deployment

### Firebase Hosting

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**
   ```bash
   firebase login
   ```

3. **Initialize Firebase**
   ```bash
   firebase init hosting
   ```

4. **Deploy**
   ```bash
   firebase deploy --only hosting
   ```

## 📁 Project Structure

```
src/
├── components/
│   ├── chat/           # Chat interface components
│   │   ├── ChatHeader.tsx
│   │   ├── MessageList.tsx
│   │   └── MessageInput.tsx
│   ├── pages/          # Main application pages
│   │   ├── AuthPage.tsx
│   │   ├── ChatPage.tsx
│   │   └── WelcomePage.tsx
│   └── ui/             # Reusable UI components
├── hooks/              # Custom React hooks
│   ├── useAuth.ts      # Authentication logic
│   └── useLocalStorage.ts
├── services/           # API and external services
│   ├── firebaseConfig.ts
│   ├── authService.ts
│   └── geminiService.ts
├── types/              # TypeScript type definitions
└── data/               # Static data and constants
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_FIREBASE_API_KEY` | Firebase API key | Yes |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase auth domain | Yes |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID | Yes |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket | Yes |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID | Yes |
| `VITE_FIREBASE_APP_ID` | Firebase app ID | Yes |
| `VITE_GEMINI_API_KEY` | Google Gemini API key | Yes |

## 🔒 Security Features

- **XSS Protection**: HTML escaping and input validation
- **API Key Security**: Environment variables, no hardcoded secrets
- **Firebase Security Rules**: User-based access control
- **Input Sanitization**: Safe handling of user-generated content
- **Dependency Security**: Regular security audits and updates
- **Git Security**: `.env` files excluded from version control

### Security Best Practices
- Never commit `.env` files to version control
- Keep your API keys secure and rotate regularly
- Use environment variables for all sensitive data
- Implement proper input validation and sanitization

## 🎯 Key Achievements

- **Full-Stack Development**: Complete React + TypeScript application
- **AI Integration**: Advanced Google Gemini AI implementation
- **Multi-language Support**: 9 languages with automatic detection
- **Security Implementation**: XSS protection, input validation, secure API handling
- **Modern Development**: TypeScript, ESLint, Git workflow, responsive design
- **Cloud Deployment**: Firebase hosting with authentication
- **Performance**: Optimized build system with Vite

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

- **GitHub**: [@fuatnargis](https://github.com/fuatnargis)
- **Project Link**: [https://github.com/fuatnargis/telyna-ai](https://github.com/fuatnargis/telyna-ai)

## 🙏 Acknowledgments

- Google Gemini AI for advanced language capabilities
- Firebase for authentication and hosting services
- React and TypeScript communities for excellent documentation
- Tailwind CSS for utility-first styling approach
açıkla