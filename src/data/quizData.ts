import { QuizQuestion, VibeResult } from '../types';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "How do you spend Christmas morning?",
    options: [
      { text: "Sleeping in under cozy blankets", emoji: "🛌", vibe: "Cozy Christmas" },
      { text: "Opening gifts with loud excitement", emoji: "🎁", vibe: "Party Christmas" },
      { text: "Watching classic Christmas movies", emoji: "📺", vibe: "Nostalgic Christmas" },
      { text: "Taking a peaceful morning walk", emoji: "🚶", vibe: "Quiet Christmas" },
    ],
  },
  {
    id: 2,
    question: "Pick your favorite Christmas food:",
    options: [
      { text: "Hot cocoa and cookies", emoji: "🍪", vibe: "Cozy Christmas" },
      { text: "Big festive feast with everyone", emoji: "🍗", vibe: "Party Christmas" },
      { text: "Grandma's traditional recipe", emoji: "🥧", vibe: "Nostalgic Christmas" },
      { text: "Simple homemade meal", emoji: "🍲", vibe: "Quiet Christmas" },
    ],
  },
  {
    id: 3,
    question: "Your ideal Christmas music?",
    options: [
      { text: "Soft acoustic carols", emoji: "🎸", vibe: "Cozy Christmas" },
      { text: "Upbeat party classics", emoji: "🎉", vibe: "Party Christmas" },
      { text: "Old-school Christmas hits", emoji: "📻", vibe: "Nostalgic Christmas" },
      { text: "Instrumental melodies", emoji: "🎹", vibe: "Quiet Christmas" },
    ],
  },
  {
    id: 4,
    question: "What's your perfect Christmas night?",
    options: [
      { text: "Cuddled by the fireplace", emoji: "🔥", vibe: "Cozy Christmas" },
      { text: "Dancing at a holiday party", emoji: "💃", vibe: "Party Christmas" },
      { text: "Looking at old photo albums", emoji: "📸", vibe: "Nostalgic Christmas" },
      { text: "Stargazing in peaceful silence", emoji: "⭐", vibe: "Quiet Christmas" },
    ],
  },
  {
    id: 5,
    question: "Who do you prefer spending Christmas with?",
    options: [
      { text: "Close family, small gathering", emoji: "👨‍👩‍👧", vibe: "Cozy Christmas" },
      { text: "Everyone! The more the merrier", emoji: "🎊", vibe: "Party Christmas" },
      { text: "Old friends and loved ones", emoji: "💝", vibe: "Nostalgic Christmas" },
      { text: "Just me or one special person", emoji: "🕊️", vibe: "Quiet Christmas" },
    ],
  },
  {
    id: 6,
    question: "Your Christmas decoration style?",
    options: [
      { text: "Warm lights and soft textures", emoji: "✨", vibe: "Cozy Christmas" },
      { text: "Bold, bright and colorful", emoji: "🌈", vibe: "Party Christmas" },
      { text: "Classic and traditional", emoji: "🎄", vibe: "Nostalgic Christmas" },
      { text: "Minimal and elegant", emoji: "❄️", vibe: "Quiet Christmas" },
    ],
  },
];

export const vibeResults: Record<string, VibeResult> = {
  'Cozy Christmas': {
    vibe: 'Cozy Christmas',
    icon: '🎅',
    description:
      "You love warmth, quiet moments, and the comfort of home during Christmas. For you, it's all about soft blankets, hot cocoa, and the glow of twinkling lights. Christmas is your sanctuary of peace and love.",
  },
  'Party Christmas': {
    vibe: 'Party Christmas',
    icon: '🎄',
    description:
      "You're the life of every holiday party! Christmas means celebration, laughter, music, and togetherness. You thrive on energy, festive gatherings, and making memories with everyone around you.",
  },
  'Nostalgic Christmas': {
    vibe: 'Nostalgic Christmas',
    icon: '🎶',
    description:
      "Christmas takes you back in time. You cherish traditions, old memories, classic songs, and the magic you felt as a child. For you, the holidays are a beautiful reminder of simpler, golden days.",
  },
  'Quiet Christmas': {
    vibe: 'Quiet Christmas',
    icon: '❄️',
    description:
      "You find beauty in stillness. Christmas for you is about reflection, peaceful moments, and quiet wonder. You appreciate the season's serenity and prefer intimate, meaningful experiences over the hustle.",
  },
};
