# Dinesh Shaw — Portfolio

![Banner](https://github.com/dinezh256/portfolio/blob/main/public/preview.png)

Personal portfolio of [Dinesh Shaw](https://dineshshaw.in) — Frontend Engineer with 5+ years of experience in React.js, React Native, and Node.js.

## Live

→ [dineshshaw.in](https://dineshshaw.in)

## Features

- **Dual view modes** — A rich, animated default mode and a minimal reading mode (light/dark/system)
- **Zero-flash mode switching** — Both layouts are SSR'd simultaneously and toggled via CSS body classes to avoid flicker
- **Keyboard shortcuts** — `R` Rich · `M` Minimal (system) · `L` Light · `D` Dark
- **Blog with view counts** — Posts are markdown files loaded at build time via `getStaticProps`; view counts are fetched and incremented from an external API with a 5-min in-memory cache and 6-hour per-user throttle
- **Animated view count pill** — Uses `@chenglou/pretext` to measure rendered text width and smoothly transition the pill size without layout shift
- **Haptic feedback** — Navbar tab changes trigger haptics on supported devices via `web-haptics`
- **Dynamic sitemap** — Auto-generated at `/sitemap.xml`

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (Pages Router, Turbopack) |
| Language | JavaScript (React 19) |
| Styling | SCSS (`styles/globals.scss`) |
| Package Manager | pnpm |
| Typography | IBM Plex Sans (Google Fonts) + Acorn (local) |
| Markdown | `react-markdown` + `remark-gfm` + `react-syntax-highlighter` |
| Analytics | Google Analytics · Vercel Analytics · Vercel Speed Insights |
| Deployment | Vercel |

## Project Structure

```
portfolio/
├── pages/              # Next.js routes
│   ├── index.js        # Homepage — About & hero
│   ├── work.js         # Projects & work
│   ├── blogs/
│   │   ├── index.js    # Blog listing
│   │   └── [id].js     # Individual blog post (static)
│   ├── _app.js         # App shell & global providers
│   ├── _document.js    # Custom HTML document
│   └── sitemap.xml.js  # Dynamic sitemap
├── components/
│   ├── ...             # Rich mode components
│   └── minimal/        # Minimal mode variants
├── contexts/
│   └── global.js       # View mode state machine (GlobalContext)
├── api/
│   └── index.js        # Blog view count API (GET/POST + cache)
├── hooks/
│   └── useLocalStorage.js
├── utils/
│   └── index.js        # Static data — blogs, projects, timeline, skills, socials
├── markdown/           # Blog post content (.md files)
└── styles/
    └── globals.scss    # All styles
```

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/dinezh256/portfolio.git
   cd portfolio
   ```

2. **Install dependencies** (requires [pnpm](https://pnpm.io))

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

4. **Start the development server**

   ```bash
   pnpm run dev
   ```

   The server starts at [http://localhost:8008](http://localhost:8008) and opens in your browser automatically.

## Adding a Blog Post

1. Create a new `.md` file in `markdown/`
2. Add its metadata to the `blogsList` array in `utils/index.js`
3. The post will be statically generated at build time under `/blogs/:slug`

## License

[MIT](./LICENSE)
