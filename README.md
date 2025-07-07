# Top 20 Media Explorer

A React/Next.js application that displays the top 20 albums, audiobooks, and podcasts from the Apple iTunes Store with search and filtering capabilities.

## Features

- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🔍 **Real-time Search**: Search across all media types simultaneously
- 🎛️ **Filtering**: Filter content by media type (albums, audiobooks, podcasts)
- ♿ **Accessible**: Built with accessibility in mind using Radix UI components
- 🎨 **Modern UI**: Clean interface built with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 15.2.4
- **Styling**: Tailwind CSS 3.4.17
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
   cd zitad-player
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
src/
├── app/
│   ├── page.tsx          # Main page component
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/
│   ├── MediaGrid.tsx     # Grid layout for media items
│   ├── SearchBar.tsx     # Search input component
│   ├── FilterTabs.tsx    # Media type filter tabs
│   └── MediaCard.tsx     # Individual media item card
├── lib/
│   ├── api.ts           # iTunes API integration
│   └── types.ts         # TypeScript type definitions
└── hooks/
    └── useMedia.ts      # Custom hook for media data
```

## Accessibility Features

- Semantic HTML structure
- Keyboard navigation support
- ARIA attributes for screen readers
- Sufficient color contrast
- Focus indicators

## Performance Considerations

- Debounced search to reduce API calls
- Responsive images
- Efficient state management
- Optimized bundle size

## Future Enhancements

- [ ] User authentication with ZITADEL Cloud
- [ ] Favorites/wishlist functionality
- [ ] Advanced filtering options
- [ ] Pagination or infinite scroll
- [ ] Offline support
- [ ] Better error handling

## Contributing

This is a proof of concept project. Feel free to submit issues or pull requests.

## License

MIT License
