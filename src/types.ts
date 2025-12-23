export type ChristmasVibe =
  | 'Cozy Christmas'
  | 'Party Christmas'
  | 'Nostalgic Christmas'
  | 'Quiet Christmas';

export interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
}

export interface QuizOption {
  text: string;
  emoji: string;
  vibe: ChristmasVibe;
}

export interface QuizState {
  currentQuestion: number;
  answers: ChristmasVibe[];
}

export interface VibeResult {
  vibe: ChristmasVibe;
  icon: string;
  description: string;
}

export interface ChristmasWish {
  id: string;
  wish_text: string;
  is_public: boolean;
  created_at: string;
}
