# What's Your Christmas Vibe? - Setup Guide

## Overview
A magical Christmas-themed interactive web application that helps users discover their Christmas personality through a fun quiz and share wishes on a public wall.

## Features
- Personalized name entry with persistent greeting
- Interactive 6-question Christmas personality quiz
- Cinematic result reveal with animations
- Four Christmas vibes: Cozy, Party, Nostalgic, and Quiet Christmas
- Christmas wishes wall with public/private options
- Snowfall animation throughout the app
- Background music with mute toggle
- Share functionality for results
- Full responsive design
- Smooth animations using Framer Motion

## Tech Stack
- React 18 with TypeScript
- Tailwind CSS for styling
- Framer Motion for animations
- Lucide React for icons
- Supabase for database (wishes storage)
- Vite for build tooling

## Installation

1. Install dependencies:
```bash
npm install
```

2. The Supabase database is already configured with the following table:
   - `christmas_wishes` - stores user wishes with public/private visibility

## Adding Christmas Music (Optional)

To enable background music:

1. Add a Christmas music file named `christmas-music.mp3` to the `public` folder
2. The music will auto-play at low volume (20%) when users visit the site
3. Users can mute/unmute the music using the toggle button in the top-right corner

Recommended music sources:
- Use royalty-free Christmas music from sites like:
  - Pixabay Music
  - Free Music Archive
  - YouTube Audio Library (download and convert to MP3)

If you don't add a music file, the app will work perfectly fine without it.

## Running the App

Development mode:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## How It Works

1. **Name Entry**: Users enter their name, which is saved in localStorage
2. **Quiz Flow**: 6 questions with 4 options each, tracking answers
3. **Result Computation**: Cinematic loading screen with animated messages
4. **Result Display**: Shows the dominant Christmas vibe with description
5. **Wish Making**: Users can create a wish and choose to make it public
6. **Wishes Wall**: Displays all public wishes with interactive animations

## Features in Detail

### Persistent Greeting
- User's name is stored in localStorage
- Greeting appears at the top of all screens after name entry
- Format: "Merry Christmas, [Name] 🎄"

### Quiz Mechanics
- Each option maps to one of four Christmas vibes
- The vibe with the most selections wins
- Progress indicator shows current question
- Smooth transitions between questions

### Result Loader
- Three sequential animated messages
- Progress bar animation
- Background gradient
- Lasts approximately 4.5 seconds

### Wishes Wall
- All public wishes displayed as cards
- Random spotlight feature every 10 seconds
- Hover plays a jingle sound
- Click animates a heart
- Fully responsive grid layout

### Animations
- Snowfall effect on all screens
- Smooth page transitions
- Button hover effects
- Card entrance animations
- Spotlight animations

## Color Palette
- Red: Primary festive color
- Green: Secondary festive color
- Yellow/Gold: Accents and highlights
- White: Text and snow
- Gradients: Red-to-green for buttons and backgrounds

## Database Schema

### christmas_wishes table
- `id`: UUID primary key
- `wish_text`: Text (max 200 characters at app level)
- `is_public`: Boolean (default false)
- `created_at`: Timestamp with timezone

### Row Level Security
- Anyone can insert wishes (anonymous)
- Only public wishes are visible to all users
- No updates or deletes allowed

## Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive design
- Tested on iOS and Android devices

## Performance
- Optimized animations with Framer Motion
- Lazy-loaded components
- Efficient re-renders with React hooks
- Small bundle size with Vite

## Accessibility
- Semantic HTML
- Keyboard navigation support
- ARIA labels on buttons
- Good color contrast ratios
- Screen reader friendly

## Future Enhancements
- Multiple language support
- More quiz questions
- Additional Christmas vibes
- Wish reactions (likes/hearts)
- Filter wishes by date
- Admin moderation panel

## Troubleshooting

**Music not playing:**
- Ensure `christmas-music.mp3` exists in the `public` folder
- Check browser autoplay policies (some browsers block autoplay)
- User must interact with page for music to start in some browsers

**Wishes not saving:**
- Check Supabase connection in `.env` file
- Verify RLS policies are enabled
- Check browser console for errors

**Animations laggy:**
- Close other tabs to free up browser resources
- Reduce number of snowflakes in `Snowfall.tsx` if needed
- Check browser hardware acceleration is enabled

## License
This is a demonstration project. Feel free to use and modify as needed.

## Credits
Built with React, TypeScript, Tailwind CSS, Framer Motion, and Supabase.
