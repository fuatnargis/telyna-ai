import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;


export interface ChatContext {
  country: string;
  purpose: string;
  userProfile?: {
    name: string;
    email: string;
    role: string;
    industry: string;
    country: string;
    ageRange: string;
    gender: string;
    isPremium?: boolean;
  };
}

export class GeminiService {
  private genAI: GoogleGenerativeAI | null = null;
  private model: GenerativeModel | null = null;
  private isInitialized: boolean = false;
  private detectedLanguage: string = 'en'; // Default to English

  constructor() {
    this.initialize();
  }

  private initialize() {
    if (!API_KEY || API_KEY === 'your_gemini_api_key_here') {
      console.error('VITE_GEMINI_API_KEY is not set in environment variables');
      console.error('Please add your Gemini API key to the .env file');
      return;
    }

    if (API_KEY.length < 30) {
      console.error('VITE_GEMINI_API_KEY appears to be invalid (too short)');
      console.error('Gemini API keys should be around 39 characters long');
      return;
    }

    try {
      console.log('Initializing Gemini with API key:', API_KEY.substring(0, 8) + '...' + API_KEY.substring(API_KEY.length - 4));
      this.genAI = new GoogleGenerativeAI(API_KEY);
      this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash-8b' });
      this.isInitialized = true;
      console.log('Gemini initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Gemini:', error);
      this.isInitialized = false;
    }
  }

  // Detect language from user message
  private detectLanguage(text: string): string {
    // Turkish detection
    const turkishWords = ['merhaba', 'selam', 'nasıl', 'nerede', 'ne', 'bu', 'şu', 'o', 'ben', 'sen', 'biz', 'siz', 'onlar', 'var', 'yok', 'iyi', 'kötü', 'güzel', 'çok', 'az', 'büyük', 'küçük', 'evet', 'hayır', 'teşekkür', 'lütfen', 'özür', 'pardon'];
    const turkishChars = /[çğıöşüÇĞIİÖŞÜ]/;
    
    // Spanish detection
    const spanishWords = ['hola', 'como', 'donde', 'que', 'este', 'ese', 'yo', 'tu', 'nosotros', 'vosotros', 'ellos', 'si', 'no', 'bueno', 'malo', 'bonito', 'mucho', 'poco', 'grande', 'pequeño', 'gracias', 'por favor', 'perdón'];
    
    // French detection
    const frenchWords = ['bonjour', 'salut', 'comment', 'où', 'que', 'ce', 'cette', 'je', 'tu', 'nous', 'vous', 'ils', 'oui', 'non', 'bon', 'mauvais', 'beau', 'beaucoup', 'peu', 'grand', 'petit', 'merci', 's\'il vous plaît', 'pardon'];
    
    // German detection
    const germanWords = ['hallo', 'wie', 'wo', 'was', 'dieser', 'diese', 'ich', 'du', 'wir', 'ihr', 'sie', 'ja', 'nein', 'gut', 'schlecht', 'schön', 'viel', 'wenig', 'groß', 'klein', 'danke', 'bitte', 'entschuldigung'];
    
    // Arabic detection
    const arabicChars = /[\u0600-\u06FF]/;
    
    // Chinese detection
    const chineseChars = /[\u4e00-\u9fff]/;
    
    // Japanese detection
    const japaneseChars = /[\u3040-\u309f\u30a0-\u30ff]/;
    
    // Russian detection
    const russianChars = /[\u0400-\u04FF]/;

    const lowerText = text.toLowerCase();
    
    // Check for specific language patterns
    if (turkishChars.test(text) || turkishWords.some(word => lowerText.includes(word))) {
      return 'tr';
    }
    if (arabicChars.test(text)) {
      return 'ar';
    }
    if (chineseChars.test(text)) {
      return 'zh';
    }
    if (japaneseChars.test(text)) {
      return 'ja';
    }
    if (russianChars.test(text)) {
      return 'ru';
    }
    if (spanishWords.some(word => lowerText.includes(word))) {
      return 'es';
    }
    if (frenchWords.some(word => lowerText.includes(word))) {
      return 'fr';
    }
    if (germanWords.some(word => lowerText.includes(word))) {
      return 'de';
    }
    
    return 'en'; // Default to English
  }

  // Get language name for system prompt
  private getLanguageName(code: string): string {
    const languages: { [key: string]: string } = {
      'tr': 'Turkish',
      'en': 'English',
      'es': 'Spanish',
      'fr': 'French',
      'de': 'German',
      'ar': 'Arabic',
      'zh': 'Chinese',
      'ja': 'Japanese',
      'ru': 'Russian'
    };
    return languages[code] || 'English';
  }

  async generateCulturalResponse(
    message: string, 
    context: ChatContext, 
    chatHistory: Array<{role: 'user' | 'assistant', content: string}> = []
  ): Promise<string> {
    try {
      if (!this.isInitialized || !this.model) {
        throw new Error('Gemini service is not properly initialized. Please check your API key configuration.');
      }

      // Detect language from user message
      this.detectedLanguage = this.detectLanguage(message);

      console.log('Sending request to Gemini API...');
      console.log('API Key status:', API_KEY ? 'Present' : 'Missing');
      console.log('Model initialized:', !!this.model);
      console.log('Detected language:', this.detectedLanguage);

      // Create system prompt for cultural guidance
      const systemPrompt = this.createSystemPrompt(context);
      
      // Build contents array with proper conversation structure
      const contents = [];
      
      // Add system prompt as initial user message
      contents.push({
        role: 'user',
        parts: [{ text: systemPrompt }]
      });
      
      // Add chat history
      chatHistory.forEach(msg => {
        contents.push({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content }]
        });
      });
      
      // Add current user message
      contents.push({
        role: 'user',
        parts: [{ text: message }]
      });
      
      const result = await this.model.generateContent({
        contents: contents,
        generationConfig: {
          temperature: 0.4,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 300,
        }
      });
      
      const response = await result.response;
      
      console.log('Received response from Gemini API');
      return response.text();
    } catch (error) {
      console.error('Gemini API Error Details:', error);
      
      if (error instanceof Error) {
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
        
        if (error.message.includes('API_KEY_INVALID')) {
          throw new Error('Invalid API key. Please check your VITE_GEMINI_API_KEY in the .env file.');
        }
        if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
          throw new Error('Network error. Please check your internet connection and try again.');
        }
        if (error.message.includes('quota')) {
          throw new Error('API quota exceeded. Please check your Gemini API usage limits.');
        }
        if (error.message.includes('CORS')) {
          throw new Error('CORS error. Try refreshing the page or restarting the dev server.');
        }
      }
      
      throw new Error(`AI service error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private createSystemPrompt(context: ChatContext): string {
    const { country, purpose, userProfile } = context;
    const languageName = this.getLanguageName(this.detectedLanguage);
    
    // Kullanıcı profil bilgilerini detaylı şekilde hazırla
    const profileInfo = userProfile ? `
USER PROFILE:
- Name: ${userProfile.name}
- Email: ${userProfile.email}
- Age Range: ${userProfile.ageRange}
- Gender: ${userProfile.gender}
- Country: ${userProfile.country}
- Role: ${userProfile.role}
- Industry: ${userProfile.industry}
- Subscription: ${userProfile.isPremium ? 'Premium Member' : 'Free Member'}

Use this profile information to:
1. Address the user by name when appropriate
2. Use age and gender appropriate language
3. Give examples specific to their profession and industry
4. Make comparisons between their country and target country
5. Provide ${userProfile.isPremium ? 'detailed and comprehensive' : 'basic level'} information
` : '';

    return `You are Telyna AI, a specialized cultural assistant for ${country} focused on ${purpose}. You are an expert in ${country} culture, traditions, etiquette, and local customs specifically for ${purpose} purposes. Your primary role is to provide detailed, accurate cultural guidance.

CRITICAL LANGUAGE RULE: 
- The user is communicating in ${languageName}
- You MUST respond ONLY in ${languageName} language
- NEVER mix languages in your response
- ALL text, examples, and explanations must be in ${languageName}
- If you don't know how to say something in ${languageName}, use simple words in ${languageName}

CONTEXT:
- Target Country: ${country}
- Purpose: ${purpose}
- User Language: ${languageName}
${profileInfo}

RESPONSE GUIDELINES:
- MANDATORY: Respond ONLY in ${languageName} language - NO exceptions
- NEVER use English words or phrases if user is writing in another language
- NEVER mix languages in the same response
${userProfile ? `- Address the user as ${userProfile.name} when appropriate` : ''}
- PRIMARY FOCUS: Always prioritize ${country} cultural guidance for ${purpose}
- If the question is directly related to ${country} or ${purpose}, provide comprehensive cultural guidance
- If the question is general but can be connected to ${country} culture, make that connection
- If the question is completely unrelated to ${country} or ${purpose}, politely redirect: "I'm specialized in ${country} culture for ${purpose}. Let me help you with something related to your ${purpose} in ${country} instead!"
- Be EMPATHETIC and understanding of cultural challenges
${userProfile ? `- Provide examples relevant to ${userProfile.role} profession and ${userProfile.industry} industry when possible` : ''}
${userProfile ? `- Make comparisons between ${userProfile.country} and ${country} when helpful` : ''}
${userProfile && userProfile.isPremium ? '- Provide detailed, comprehensive advice as a premium member' : '- Provide helpful advice'}
- Be CONVERSATIONAL and natural
- Use friendly, supportive tone with appropriate emojis
- Give RELIABLE, accurate cultural information
- If unsure about something, acknowledge it honestly
- Use emojis strategically to convey meaning
- Format important points with **bold** for emphasis
- Use bullet points (•) for lists when helpful
- Write in natural, conversational tone
- Be helpful and engaging

REMEMBER: 
- ABSOLUTE RULE: Use ONLY ${languageName} language in your entire response
- NO English words if user writes in Turkish, Spanish, etc.
- NO mixing of languages under any circumstances
- Your MAIN PURPOSE is to help with ${purpose.toLowerCase()} in ${country}
- Stay focused on ${country} cultural guidance
- If users ask unrelated questions, gently guide them back to ${country} cultural topics
- Show empathy and be genuinely helpful within your cultural expertise

Your expertise is ${country} culture for ${purpose} - stay focused on this while being helpful and engaging.`;
  }

  generateWelcomeMessage(context: ChatContext): string {
    const { country, purpose, userProfile } = context;
    
    // Kullanıcı profil bilgilerine göre kişiselleştirilmiş karşılama mesajı
    const personalizedGreeting = userProfile ? {
      name: userProfile.name,
      profession: `${userProfile.role} olarak ${userProfile.industry} sektöründe`,
      location: userProfile.country,
      premium: userProfile.isPremium ? ' Premium üyemiz' : '',
      ageGender: `${userProfile.ageRange} yaş aralığında ${userProfile.gender === 'male' ? 'erkek' : userProfile.gender === 'female' ? 'kadın' : 'kişi'}`
    } : null;

    // Welcome messages in different languages
    const welcomeMessages: { [key: string]: { greeting: string; intro: string; purpose: string; closing: string } } = {
      'tr': {
        greeting: personalizedGreeting ? 
          `Merhaba ${personalizedGreeting.name}! 👋${personalizedGreeting.premium} ${personalizedGreeting.location}'den ${personalizedGreeting.profession} çalıştığınızı görüyorum. ${personalizedGreeting.ageGender} olarak ${country}'ye ${purpose} amaçlı seyahatinizde size özel rehberlik yapacağım.` : 
          'Merhaba! 👋',
        main: `${country} ${purpose} konusunda uzman asistanınızım. ${personalizedGreeting ? `${personalizedGreeting.name}, sizin ${userProfile?.role} mesleğinize ve ${userProfile?.country} - ${country} kültürel farklılıklarına özel` : 'Kültürel farklılıkları anlamanızda ve harika bir izlenim bırakmanızda'} size yardımcı olmak için buradayım!`,
        question: personalizedGreeting && userProfile?.isPremium ? 
          `Premium üyemiz olarak, ${country}'de ${purpose} için hangi kültürel konularda yardıma ihtiyacınız var? Size özel rehberlik sunacağım! ✨` :
          `${country}'de ${purpose} için hangi kültürel konularda yardıma ihtiyacınız var? Size özel rehberlik sunacağım! 😊`
      },
      'es': {
        greeting: personalizedGreeting ? 
          `¡Hola ${personalizedGreeting.name}! 👋${personalizedGreeting.premium} Veo que trabajas ${personalizedGreeting.profession} en ${personalizedGreeting.location}.` : 
          '¡Hola! 👋',
        main: `Soy tu Asistente especializado de ${country} para ${purpose}. ${personalizedGreeting ? `${personalizedGreeting.name}, te ayudaré con consejos específicos para tu profesión de ${userProfile?.role}` : 'Estoy aquí para ayudarte a navegar las diferencias culturales'} y causar una gran impresión!`,
        question: personalizedGreeting && userProfile?.isPremium ? 
          `Como miembro Premium, ¿en qué aspectos culturales de ${country} para ${purpose} necesitas ayuda? ¡Te proporcionaré orientación especializada! ✨` :
          `¿En qué aspectos culturales de ${country} para ${purpose} necesitas ayuda? ¡Te proporcionaré orientación especializada! 😊`
      },
      'fr': {
        greeting: personalizedGreeting ? 
          `Bonjour ${personalizedGreeting.name}! 👋${personalizedGreeting.premium} Je vois que vous travaillez ${personalizedGreeting.profession} en ${personalizedGreeting.location}.` : 
          'Bonjour! 👋',
        main: `Je suis votre Assistant spécialisé ${country} pour ${purpose}. ${personalizedGreeting ? `${personalizedGreeting.name}, je vous aiderai avec des conseils spécifiques à votre profession de ${userProfile?.role}` : 'Je suis là pour vous aider à naviguer les différences culturelles'} et faire une excellente impression!`,
        question: personalizedGreeting && userProfile?.isPremium ? 
          `En tant que membre Premium, dans quels aspects culturels de ${country} pour ${purpose} avez-vous besoin d'aide? Je vous fournirai des conseils spécialisés! ✨` :
          `Dans quels aspects culturels de ${country} pour ${purpose} avez-vous besoin d'aide? Je vous fournirai des conseils spécialisés! 😊`
      },
      'de': {
        greeting: personalizedGreeting ? 
          `Hallo ${personalizedGreeting.name}! 👋${personalizedGreeting.premium} Ich sehe, Sie arbeiten ${personalizedGreeting.profession} in ${personalizedGreeting.location}.` : 
          'Hallo! 👋',
        main: `Ich bin Ihr spezialisierter ${country} ${purpose} Assistent. ${personalizedGreeting ? `${personalizedGreeting.name}, ich helfe Ihnen mit spezifischen Ratschlägen für Ihren Beruf als ${userProfile?.role}` : 'Ich bin hier, um Ihnen zu helfen, kulturelle Unterschiede zu verstehen'} und einen großartigen Eindruck zu hinterlassen!`,
        question: personalizedGreeting && userProfile?.isPremium ? 
          `Als Premium-Mitglied, bei welchen kulturellen Aspekten von ${country} für ${purpose} benötigen Sie Hilfe? Ich gebe Ihnen spezialisierte Beratung! ✨` :
          `Bei welchen kulturellen Aspekten von ${country} für ${purpose} benötigen Sie Hilfe? Ich gebe Ihnen spezialisierte Beratung! 😊`
      },
      'ar': {
        greeting: personalizedGreeting ? 
          `مرحبا ${personalizedGreeting.name}! 👋${personalizedGreeting.premium} أرى أنك تعمل ${personalizedGreeting.profession} في ${personalizedGreeting.location}.` : 
          'مرحبا! 👋',
        main: `أنا مساعدك المتخصص لـ ${purpose} في ${country}. ${personalizedGreeting ? `${personalizedGreeting.name}، سأساعدك بنصائح خاصة لمهنتك كـ ${userProfile?.role}` : 'أنا هنا لمساعدتك في فهم الاختلافات الثقافية'} وترك انطباع رائع!`,
        question: personalizedGreeting && userProfile?.isPremium ? 
          `كعضو مميز، في أي جوانب ثقافية من ${country} لـ ${purpose} تحتاج مساعدة؟ سأقدم لك إرشادات متخصصة! ✨` :
          `في أي جوانب ثقافية من ${country} لـ ${purpose} تحتاج مساعدة؟ سأقدم لك إرشادات متخصصة! 😊`
      },
      'zh': {
        greeting: personalizedGreeting ? 
          `你好 ${personalizedGreeting.name}! 👋${personalizedGreeting.premium} 我看到你在${personalizedGreeting.location}从事${personalizedGreeting.profession}工作。` : 
          '你好! 👋',
        main: `我是你的专业${country}${purpose}助手。${personalizedGreeting ? `${personalizedGreeting.name}，我会为你的${userProfile?.role}职业提供专门建议` : '我在这里帮助你了解文化差异'}并留下良好印象！`,
        question: personalizedGreeting && userProfile?.isPremium ? 
          `作为高级会员，你在${country}的${purpose}方面需要哪些文化指导？我会为你提供专业建议！✨` :
          `你在${country}的${purpose}方面需要哪些文化指导？我会为你提供专业建议！😊`
      },
      'ja': {
        greeting: personalizedGreeting ? 
          `こんにちは${personalizedGreeting.name}さん！👋${personalizedGreeting.premium} ${personalizedGreeting.location}で${personalizedGreeting.profession}をされているのですね。` : 
          'こんにちは！👋',
        main: `私はあなたの専門${country}${purpose}アシスタントです。${personalizedGreeting ? `${personalizedGreeting.name}さん、あなたの${userProfile?.role}のお仕事に特化したアドバイス` : '文化の違いを理解し、素晴らしい印象を与えるお手伝い'}をします！`,
        question: personalizedGreeting && userProfile?.isPremium ? 
          `プレミアム会員として、${country}の${purpose}でどの文化的な面でお手伝いが必要ですか？専門的なアドバイスを提供します！✨` :
          `${country}の${purpose}でどの文化的な面でお手伝いが必要ですか？専門的なアドバイスを提供します！😊`
      },
      'ru': {
        greeting: personalizedGreeting ? 
          `Привет ${personalizedGreeting.name}! 👋${personalizedGreeting.premium} Я вижу, что вы работаете ${personalizedGreeting.profession} в ${personalizedGreeting.location}.` : 
          'Привет! 👋',
        main: `Я ваш специализированный помощник по ${purpose} в ${country}. ${personalizedGreeting ? `${personalizedGreeting.name}, я помогу вам с советами, специфичными для вашей профессии ${userProfile?.role}` : 'Я здесь, чтобы помочь вам понять культурные различия'} и произвести отличное впечатление!`,
        question: personalizedGreeting && userProfile?.isPremium ? 
          `Как премиум-участник, в каких культурных аспектах ${country} для ${purpose} вам нужна помощь? Я предоставлю специализированные советы! ✨` :
          `В каких культурных аспектах ${country} для ${purpose} вам нужна помощь? Я предоставлю специализированные советы! 😊`
      }
    };
    
    const messages = welcomeMessages[this.detectedLanguage] || welcomeMessages['en'] || {
      greeting: personalizedGreeting ? 
        `Hello ${personalizedGreeting.name}! 👋${personalizedGreeting.premium} I see you work ${personalizedGreeting.profession} in ${personalizedGreeting.location}.` : 
        'Hello! 👋',
      main: `I'm your specialized ${country} ${purpose} Assistant. ${personalizedGreeting ? `${personalizedGreeting.name}, I'll help you with advice specific to your ${userProfile?.role} profession` : 'Ready to help you navigate cultural differences'}!`,
      question: personalizedGreeting && userProfile?.isPremium ? 
        `As a Premium member, what cultural aspects of ${country} for ${purpose} do you need help with? I'll provide specialized guidance! ✨` :
        `What cultural aspects of ${country} for ${purpose} do you need help with? I'll provide specialized guidance! 😊`
    };
    
    return `${messages.greeting} ${messages.main} ${messages.question}`;
  }
}

export const geminiService = new GeminiService();