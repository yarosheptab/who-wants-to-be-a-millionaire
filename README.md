# 🎮 Who Wants to Be a Millionaire Game

A modern, interactive web-based implementation of the classic "Who Wants to Be a Millionaire" game built with Next.js, React, and TypeScript.

## 🌟 Features

- **Interactive Gameplay**: Full game experience with questions, multiple choice answers, and lifelines
- **Progress Tracking**: Visual progress indicator showing current question level and prize money
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Modern UI**: Clean, intuitive interface with smooth animations
- **TypeScript**: Fully typed for better development experience
- **Accessibility**: Built with accessibility in mind

## 🚀 Live Demo

[Play the game online](https://who-wants-to-be-a-millionaire-nu.vercel.app/)

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** or **yarn** or **pnpm** package manager

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yarosheptab/who-wants-to-be-a-millionaire.git
   cd who-wants-to-be-a-millionaire
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

## 🎯 Running the Application

### Development Mode

To run the application in development mode with hot reload:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to start playing!

### Production Build

To create a production build:

```bash
npm run build
# or
yarn build
# or
pnpm build
```

To start the production server:

```bash
npm start
# or
yarn start
# or
pnpm start
```

## 🧪 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run type-check` - Run TypeScript type checking

## 📁 Project Structure

```
src/
├── app/                 # Next.js app directory
├── components/          # React components
│   ├── error-boundary/  # Error handling
│   ├── finish-screen/   # Game completion screen
│   ├── game/           # Main game components
│   ├── start-screen/   # Game start screen
│   └── ui/             # Reusable UI components
├── config/             # Game configuration
├── hooks/              # Custom React hooks
├── interfaces/         # TypeScript interfaces
└── lib/               # Utility functions
```

## 🎮 How to Play

1. **Start the Game**: Click "Start Game" on the main screen
2. **Answer Questions**: Choose from four or more single-choice answers (could be more than one correct answer)
3. **Progress**: Each correct answer moves you to the next level
6. **Win**: Reach the final question to become a millionaire!

## 🛠️ Technology Stack

- **Framework**: Next.js 15.4.5
- **Language**: TypeScript
- **UI Library**: React 19.1.0
- **Styling**: CSS Modules
- **Linting**: ESLint with Airbnb config
- **Code Quality**: Husky for git hooks

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the classic "Who Wants to Be a Millionaire" TV show
- Built with modern web technologies for the best user experience

---

**Enjoy playing! 🎉**
