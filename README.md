# Michael Photography Portfolio

A stunning dark-themed photography portfolio website showcasing portrait and underwater photography.

## 🌐 Live Site
**Repo:** https://github.com/tinglingding-agent-athena/michael-photography

## Features

- **Modern Stack**: Built with Astro + Tailwind CSS
- **Dark Theme**: Elegant dark design perfect for photography
- **Two Categories**: Portrait and Underwater galleries (from Instagram)
- **Responsive**: Works beautifully on all devices
- **Fast**: Static site generation for optimal performance

## Pages

- **Home** (`/`) - Hero section with featured work and CTAs
- **Portrait** (`/portrait`) - Portrait photography gallery (12 images)
- **Underwater** (`/underwater`) - Underwater photography gallery (12 images)  
- **Contact** (`/contact`) - Contact form and information

## Instagram Integration

The site includes an Instagram fetcher script. To sync with real Instagram posts:

### Option 1: Use the fetch script
```bash
# Get Instagram Basic Display token from developers.facebook.com
export INSTAGRAM_TOKEN=your_token_here
cd michael-photography
node scripts/fetch-instagram.js
```

### Option 2: Manual update
Edit `src/data/instagram.js` with your URLs.

## Getting photo Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Customization

- Update placeholder images in `src/data/instagram.js`
- Modify contact information in `src/pages/contact.astro`
- Adjust colors in `src/layouts/Layout.astro`

## Tech Stack

- [Astro](https://astro.build) - Modern static site builder
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- [Unsplash](https://unsplash.com) - Placeholder images

## License

MIT License
