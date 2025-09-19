import { MessageCircle } from 'lucide-react';
import type { Purpose } from '../../types';

interface SuggestedQuestionsProps {
  chatPurpose: Purpose;
  onSelectSuggestion: (suggestion: string) => void;
}

export default function SuggestedQuestions({ chatPurpose, onSelectSuggestion }: SuggestedQuestionsProps) {
  const getSuggestedQuestions = () => {
    const suggestions: { [key: string]: string[] } = {
      'Business Meeting': [
        `What are the key etiquette rules for a first business meeting in ${chatPurpose}?`,
        `How should I dress for business meetings in ${chatPurpose}?`,
        `Is gift-giving appropriate in business in ${chatPurpose}?`,
        `How to exchange business cards in ${chatPurpose}?`
      ],
      'Tourism': [
        `What are the photography etiquette rules in ${chatPurpose}?`,
        `How do tipping customs work in ${chatPurpose}?`,
        `How should I interact with locals in ${chatPurpose}?`,
        `What are the cultural norms for visiting tourist sites in ${chatPurpose}?`
      ],
      'Daily Life': [
        `How to build relationships with neighbors in ${chatPurpose}?`,
        `What should I know about daily shopping in ${chatPurpose}?`,
        `How to behave on public transport in ${chatPurpose}?`,
        `How to participate in social events in ${chatPurpose}?`
      ],
      'Emergency': [
        `What emergency numbers should I call in ${chatPurpose}?`,
        `How to behave when visiting a hospital in ${chatPurpose}?`,
        `What to do if I encounter the police in ${chatPurpose}?`,
        `Who should I ask for help in an emergency in ${chatPurpose}?`
      ],
      'Education': [
        `How to communicate with teachers in ${chatPurpose}?`,
        `What are the school rules in ${chatPurpose}?`,
        `How to socialize with classmates in ${chatPurpose}?`,
        `What should I know about the education system in ${chatPurpose}?`
      ],
      'Healthcare': [
        `How to make a doctor's appointment in ${chatPurpose}?`,
        `How to behave during a hospital visit in ${chatPurpose}?`,
        `How does health insurance work in ${chatPurpose}?`,
        `What to consider when buying medicine in ${chatPurpose}?`
      ],
      'Shopping': [
        `Is bargaining common when shopping in ${chatPurpose}?`,
        `What are the common payment methods in ${chatPurpose}?`,
        `How to interact with shop assistants in ${chatPurpose}?`,
        `What are the typical shopping hours in ${chatPurpose}?`
      ],
      'Transportation': [
        `What should I know about using taxis in ${chatPurpose}?`,
        `How to use public transportation in ${chatPurpose}?`,
        `What are the car rental rules in ${chatPurpose}?`,
        `What are the traffic rules in ${chatPurpose}?`
      ],
      'Accommodation': [
        `How to behave in a hotel in ${chatPurpose}?`,
        `How to communicate with a host in ${chatPurpose}?`,
        `What are the accommodation rules in ${chatPurpose}?`,
        `What to consider regarding cleanliness and order in ${chatPurpose}?`
      ]
    };

    return suggestions[chatPurpose] || suggestions['Tourism'];
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 text-slate-400">
        <MessageCircle className="w-5 h-5" />
        <span className="text-sm font-medium">Suggested questions for you:</span>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {getSuggestedQuestions().slice(0, 4).map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSelectSuggestion(suggestion)}
            className="text-left p-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/30 hover:from-blue-600/30 hover:to-purple-600/30 transition-all duration-300 group"
          >
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 group-hover:bg-purple-400 transition-colors"></div>
              <span className="text-blue-100/90 group-hover:text-white transition-colors text-sm leading-relaxed">
                {suggestion}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}