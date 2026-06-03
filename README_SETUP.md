# La Bella Cucina - Restaurant Website

A modern, fully-responsive single-page restaurant website built with React and Tailwind CSS. Beautiful Italian fine dining experience showcasing La Bella Cucina in Mumbai, India.

## ✨ Features

- **Sticky Navigation** - Smooth scroll navigation with mobile hamburger menu
- **Hero Section** - Full-screen gradient background with animated floating emojis
- **About Section** - Restaurant story with chef quote and experience statistics
- **Dynamic Menu** - Tabbed menu interface with 5 categories and 25+ dishes
- **Chef's Special** - Weekly special banner with live countdown timer
- **Gallery** - Masonry-style image grid with hover effects
- **Testimonials** - Customer reviews with 5-star ratings
- **Reservation Form** - Fully validated booking form with success confirmation
- **Contact & Footer** - Complete contact information and social links
- **Responsive Design** - Optimized for mobile (375px), tablet (768px), and desktop (1280px)
- **Smooth Animations** - Fade-in on scroll, hover effects, and transitions throughout

## 🎨 Design System

- **Primary Color**: Deep Burgundy (#7B2D42)
- **Accent Color**: Gold/Amber (#C9933A)
- **Fonts**: Playfair Display (headings), Inter (body)
- **Border Radius**: 12px for cards, 8px for buttons
- **Shadows**: Warm-toned with gold accent

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   cd /path/to/Restaurant
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open in browser**
   - The app will automatically open at `http://localhost:3000`
   - If not, manually navigate to that URL

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 📁 Project Structure

```
Restaurant/
├── public/
│   └── index.html           # Main HTML file with Tailwind config
├── src/
│   ├── App.jsx              # Main React component (all sections)
│   └── index.js             # React entry point
├── package.json             # Dependencies and scripts
└── README.md               # This file
```

## 🧩 Component Structure

The entire website is built as a single, well-organized React component with the following sections:

- **Navbar** - Sticky navigation with mobile menu
- **HeroSection** - Full-screen intro with CTAs
- **AboutSection** - Restaurant story and stats
- **MenuSection** - Tabbed menu interface
- **SpecialsBanner** - Weekly special with countdown
- **GallerySection** - Visual showcase
- **TestimonialsSection** - Customer reviews
- **ReservationsSection** - Booking form
- **FooterSection** - Contact and footer

## 📊 Data

All data is hardcoded as JavaScript arrays at the top of App.jsx:

- **Menu**: 25 Italian dishes across 5 categories
- **Testimonials**: 3 customer reviews
- **Gallery**: 6 showcase items with gradients
- **Restaurant Info**: Name, contact, hours, location

## ✅ Features In Detail

### Reservations Form
- Email validation
- Phone number validation
- Date and time picker
- Guest count selector (1-10)
- Special requests textarea
- Success confirmation with 3-second display
- Form auto-resets after submission

### Menu Tabs
- Antipasti (4 dishes)
- Pasta (5 dishes)
- Mains (4 dishes)
- Desserts (4 dishes)
- Drinks (5 dishes)
- "Most Popular" badges on selected items
- Smooth tab transition animation

### Countdown Timer
- Live timer updating every second
- Shows Days, Hours, Minutes, Seconds
- Gold-colored display units

### Responsive Mobile Menu
- Hamburger toggle on screens < 768px
- Slide-in drawer with all navigation links
- Auto-closes on link click

### Animations
- Fade-in on scroll (IntersectionObserver)
- Card hover lift effect (translateY)
- Gallery hover scale (1.03)
- Floating emojis in hero section
- Smooth scroll behavior

## 🎯 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🛠️ Technologies Used

- **React 18** - UI framework
- **Tailwind CSS** - Utility-first styling
- **Google Fonts** - Playfair Display & Inter
- **JavaScript ES6+** - Modern JavaScript
- **IntersectionObserver API** - Scroll animations

## 📝 Customization

### Change Restaurant Details
Edit these values in `src/App.jsx`:
- Restaurant name (header/footer)
- Contact information
- Opening hours
- Location

### Update Menu Items
Edit the `menuData` object at the top of App.jsx with your own dishes, descriptions, and prices.

### Modify Colors
The design system colors are defined in `public/index.html` Tailwind config. Update:
- `burgundy` - Primary color
- `gold` - Accent color
- `dark-bg` - Dark background
- `light-bg` - Light background

### Add Real Images
Replace emoji-based galleries with actual images by modifying the Gallery component.

## 🚢 Deployment

### Deploy to Vercel (Recommended)
1. Push to GitHub
2. Connect repository to Vercel
3. Vercel auto-deploys on push

### Deploy to Netlify
1. Run `npm run build`
2. Drag & drop the `build` folder to Netlify

### Deploy to Any Server
1. Run `npm run build`
2. Copy `build` folder contents to web server
3. Configure server to serve `index.html` for all routes

## 📞 Contact Information

**La Bella Cucina**
- Phone: +91 98765 43210
- Email: hello@labellacucina.in
- Location: Mumbai, India
- Hours: Tue–Sun, 12pm–3pm & 7pm–11pm

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Credits

Built with ❤️ for La Bella Cucina - Authentic Italian Fine Dining in Mumbai

---

**Ready to serve! 🍝**
