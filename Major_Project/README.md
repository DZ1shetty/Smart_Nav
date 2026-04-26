# Smart Navigation System (SNSFSE) 🚀

A high-performance, interactive floor-plan navigation system designed for the APJ Block. Built with a focus on speed, aesthetics, and user experience.

![Project Status](https://img.shields.io/badge/Status-Live-emerald?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Tech-React%20%7C%20Vite%20%7C%20Tailwind-blue?style=for-the-badge)

## ✨ Core Features

### 🖥️ High-End Navigation
- **Interactive SVG Floor Plans**: Dynamic maps from Basement to 5th floor with precise room scaling and positioning.
- **Intent-Aware Search System**: A "Command Center" search engine that uses fuzzy logic and super-normalization to find rooms and faculty instantly.
- **Bidirectional Mapping**: Find rooms by searching for faculty names, or find faculty by searching for room numbers.

### 🛠️ Architect Mode (Admin Tools)
- **Live Editing**: Drag and drop rooms to update the layout in real-time.
- **Boundary Control**: Adjust the building bulge and main dimensions directly in the browser.
- **Persistent Layouts**: All changes are versioned and saved to local storage, ensuring your custom layout stays locked forever.

### 🎨 Premium UI/UX
- **Cyber-Industrial Aesthetic**: Glassmorphism, scanline effects, and glowing accents for a modern feel.
- **Motion Orchestration**: Powered by Framer Motion for buttery-smooth transitions and micro-animations.
- **Mobile Responsive**: Fully optimized for touch-screen devices and on-the-go navigation.

## 🚀 Tech Stack

- **Framework**: [React.js](https://reactjs.org/) (Vite)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: [React Router v6](https://reactrouter.com/)

## 📦 Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/DZ1shetty/Smart_Nav.git
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## 📂 Project Structure

- `src/components/`: Core UI components (FloorPlan, SearchSystem, etc.)
- `src/data/`: Static floor data and the Search Engine logic.
- `src/hooks/`: Custom React hooks for history management and layout persistence.
- `public/apj-block-images/`: High-resolution imagery for rooms and faculty.

## 📝 License

This project is developed as part of a Major Project (SNSFSE). All rights reserved.
