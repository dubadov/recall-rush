# Recall Rush

A pressure-based word recall practice game that uses real-time video recording, speech recognition, and AI-generated vocabulary to help improve word fluency under pressure.

## Game Modes

- **Speed Recall** - Say the target word in a sentence before time runs out
- **Word Bomb** - Defuse the bomb by speaking the word (timer shrinks each round, 3 lives)
- **Synonym Sprint** - Rapid-fire: given a common word, say a sophisticated synonym

## Tech Stack

- Pure HTML5/CSS3/JavaScript (no frameworks)
- Web Speech API for instant real-time word detection
- Groq API (FREE) for AI-generated vocabulary
- Web Audio API for programmatic sound effects
- LocalStorage for progress persistence

## Quick Start

1. Open `index.html` in Chrome or Edge (or use a local server)
2. Optionally enter your free Groq API key from [console.groq.com](https://console.groq.com)
3. Select a game mode and start practicing!

## Cost

**$0/month** - Everything is free. Speech recognition runs in-browser, vocabulary falls back to built-in word bank without an API key.
