# DRNoticias 🇩🇴

A personalized news aggregator for the Dominican Republic, built with Next.js, Tailwind CSS, and shadcn/ui.

## Features

- 📰 Top headlines from Dominican Republic sources
- 🗂️ Browse by category (Politics, Sports, Business, Technology)
- 🔍 Search articles
- 💾 Save articles for later
- 😊 Sentiment indicator (Positive / Neutral / Negative)
- 📱 Responsive design

## Tech Stack

- [Next.js 16](https://nextjs.org/) — React framework
- [Tailwind CSS](https://tailwindcss.com/) — Styling
- [shadcn/ui](https://ui.shadcn.com/) — UI components
- [World News API](https://worldnewsapi.com/) — News data
- [Docker](https://www.docker.com/) — Containerization

## Getting Started

### Prerequisites
- Node.js 20+
- A [World News API](https://worldnewsapi.com/) key

### Installation

1. Clone the repo
```bash
   git https://github.com/PedroSantanaDev/dr-news.git
   cd dr-news
```

2. Install dependencies
```bash
   npm install
```

3. Create a `.env.local` file in the root:

4. Run the development server
```bash
   npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Docker

Build and run with Docker:

```bash
docker build -t dr-news . --build-arg NEXT_PUBLIC_NEWS_API_KEY=your_key_here
docker run -p 3000:3000 dr-news
```

## Project Structure

```
dr-news/
  app/
    article/[id]/
      page.tsx              # Article detail page
    category/[slug]/
      page.tsx              # Category page
    login
      page.tsx              # Login page
    register
      page.tsx              # Registration page
    Saved
      page.tsx              # Saved articles for user
    favicon.ico
    globals.css
    layout.tsx              # Root layout (Navbar + Footer)
    page.tsx                # Home page
  components/
    ui/                     # shadcn/ui components
    ArticleCard.tsx         # Article card component
    Footer.tsx              # Footer component
    Navbar.tsx              # Navbar component
  lib/
    api.ts                  # World News API calls
    mockData.ts             # Mock data for development
    utils.ts                # Helper functions
  public/                   # Static assets
  .dockerignore
  .env.local                # Environment variables (not committed)
  Dockerfile
  next.config.ts
  package.json
  tsconfig.json
```

## License

Apache-2.0 license