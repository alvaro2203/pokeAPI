# PokeAPI Web Application

A modern, responsive web application built with [Next.js](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/) to explore the Pokémon world using the [PokeAPI](https://pokeapi.co/).

## 🚀 Key Features

- **Pokémon List**: Browse through a paginated list of Pokémon.
- **Detailed Cards**: View Pokémon details including types and dynamic sprites.
- **Smart Sprite Selection**: Includes a robust utility to automatically find the best available sprite (Official Artwork > Dream World > Default > Fallback), ensuring no broken images.
- **Responsive Design**: Optimized for all device sizes with a clean, modern UI.
- **Context-Based State**: Efficient state management using React Context.

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Language**: TypeScript

## 📦 Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm, yarn, or pnpm

### Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/yourusername/pokeapi.git
    cd pokeapi
    ```

2.  Install dependencies:

    ```bash
    npm install
    # or
    pnpm install
    ```

3.  Run the development server:

    ```bash
    npm run dev
    # or
    pnpm dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

- `app/`: Next.js App Router pages and layouts.
- `components/`: Reusable UI components (PokemonCard, Badge, etc.).
- `hooks/`: Custom React hooks (usePokemons, etc.).
- `interfaces/`: TypeScript definitions for API responses and internal types.
- `lib/`: Utility constants and helper functions.
- `services/`: API integration services.

## 🧩 Key Utilities

### Sprite Extraction (`interfaces/sprites.ts`)

The application handles the complexity of PokeAPI's sprite structure using a cleaner utility `getAvailableSprite`. This function:

1.  Prioritizes high-quality "Official Artwork".
2.  Falls back to "Dream World" vector images.
3.  Falls back to the standard front default sprite.
4.  Performs a deep recursive search if standard paths fail.
5.  Returns a safe placeholder if no sprite is found.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
