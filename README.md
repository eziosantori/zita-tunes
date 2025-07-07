# zTunes Media Explorer

A React/Next.js application that displays the top 20 albums, audiobooks, and podcasts from the Apple iTunes Store with search and filtering capabilities.

## Features

- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🔍 **Real-time Search**: Search across all media types simultaneously
- 🎛️ **Filtering**: Filter content by media type (albums, audiobooks, podcasts)
- ♿ **Accessible**: Built with accessibility in mind using Radix UI components
- 🎨 **Modern UI**: Clean interface built with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 15.2.4
- **Styling**: Tailwind CSS 4.x + shadcn-ui
- **Components**: Radix UI
- **Language**: TypeScript
- **API**: iTunes Search API

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm/yarn

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd zita-tunes
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Run the development server:

   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm test` - Run tests

### Performance Audit with Lighthouse

To run a comprehensive performance audit:

1. Build the project for production:

   ```bash
   pnpm build
   ```

2. Start the production server:

   ```bash
   pnpm start
   ```

3. Open a **private/incognito browser window** and navigate to `http://localhost:3000`

4. Run Lighthouse audit:
   - Press `F12` to open DevTools
   - Go to the "Lighthouse" tab
   - Select all categories (Performance, Accessibility, Best Practices, SEO)
   - Click "Analyze page load"

_Note: Use a private session to avoid browser extensions affecting the audit results._

## Usage

1. **Browse Content**: The app displays top 20 items for each media type by default
2. **Search**: Use the search bar to find specific content across all media types
3. **Filter**: Use the filter tabs to show only specific media types
4. **Responsive**: The layout adapts to different screen sizes

## API Integration

The app uses the iTunes Search API to fetch data:

- Albums: `https://itunes.apple.com/search?term=*&media=music&entity=album&limit=20`
- Audiobooks: `https://itunes.apple.com/search?term=*&media=audiobook&limit=20`
- Podcasts: `https://itunes.apple.com/search?term=*&media=podcast&limit=20`

## Project Structure

```
app/
├── actions.ts            # Server actions
├── favicon.ico          # App favicon
├── globals.css          # Global styles
├── layout.tsx           # Root layout
├── page.tsx             # Main page component
└── favorites/
    └── page.tsx         # Favorites page
components/
├── ui/                  # shadcn-ui components
│   ├── badge.tsx
│   ├── button.tsx
│   ├── carousel.tsx
│   ├── input.tsx
│   └── sonner.tsx
├── HomeSection.tsx      # Home section wrapper
├── FavoriteButton/      # Favorite button components
│   ├── ClearFavorites.tsx
│   └── index.tsx
├── FavoritesList/       # Favorites list components
│   ├── FavButtons.tsx
│   └── index.tsx
├── Filters/             # Filter components
│   ├── CategoriesFilter.tsx
│   └── index.tsx
├── Media/               # Media display components
│   ├── MediaCard.tsx
│   └── MediaSection.tsx
├── NavButtons/          # Navigation components
│   ├── BadgeCount.tsx
│   ├── index.tsx
│   └── SignInButton.tsx
└── SearchBar/           # Search components
    ├── index.tsx
    └── SearchBarWrapper.tsx
hooks/
├── useDebounce.ts       # Debounce hook
├── useFavorite.ts       # Favorite management hook
└── useHydration.ts      # Hydration hook
lib/
└── utils.ts             # Utility functions
services/
└── itunes-api.ts        # iTunes API integration
store/
├── favorites-store.ts   # Favorites state management
└── media-store.ts       # Media state management
types/
└── media.ts             # TypeScript type definitions
```

## Accessibility Features

- Semantic HTML structure
- Keyboard navigation support
- ARIA attributes for screen readers
- Sufficient color contrast
- Focus indicators

## Performance Considerations

- Debounced search to reduce API calls
- Home page ssr for most of the content
- Responsive images
- Efficient state management
- Optimized bundle size (lazy loading)

## Future Enhancements

- [ ] User authentication with ZITADEL Cloud
- [x] Favorites/wishlist functionality
- [x] Advanced filtering options
- [ ] Pagination or infinite scroll
- [ ] Offline support
- [ ] Better error handling

## Contributing

This is a proof of concept project. Feel free to submit issues or pull requests.

## License

MIT License
