# Telyna AI - Cultural Travel Assistant

A multilingual AI-powered cultural travel assistant that helps users navigate cultural differences and provides personalized guidance for their travel purposes.

## Features

- 🌍 **Multi-language Support**: 9 languages (Turkish, English, Spanish, French, German, Arabic, Chinese, Japanese, Russian)
- 🤖 **AI Chat Bot**: Powered by Google Gemini AI
- 🔥 **Firebase Integration**: Authentication and hosting
- 📱 **Responsive Design**: Mobile-friendly interface
- 💾 **Local Storage**: Chat history persistence
- 🎯 **Specialized AI**: Country and purpose-focused cultural guidance

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS
- **AI**: Google Gemini AI
- **Backend**: Firebase (Authentication, Hosting)
- **State Management**: React Hooks + Local Storage

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase project
- Google Gemini API key

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

## Project Structure

```
src/
├── components/
│   ├── chat/           # Chat components
│   ├── pages/          # Page components
│   └── ui/             # UI components
├── hooks/              # Custom React hooks
├── services/           # API services
├── types/              # TypeScript types
└── data/               # Static data
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

## Security Notes

- Never commit `.env` files to version control
- Keep your API keys secure
- Use environment variables for all sensitive data
- Regularly rotate your API keys

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue in the GitHub repository.
