# 🍝 La Bella Cucina - Fine Italian Dining Website

A stunning, fully-responsive single-page restaurant website built with **React** and **Tailwind CSS**. Featuring beautiful galleries, interactive menu, reservation system, and more.

## 🌟 Features

✨ **Modern Design** - Beautiful gradient-based UI with smooth animations  
🍽️ **Dynamic Menu** - 5 categories with 25+ Italian dishes  
📅 **Reservations** - Fully functional booking form with validation  
🎨 **Gallery** - 4 stunning galleries with 16 items (Ambiance, Cuisine, Desserts, Ingredients)  
⏰ **Live Countdown** - Real-time timer for chef's special  
📱 **Responsive** - Perfect on mobile, tablet, and desktop  
🎯 **Smooth Animations** - Fade-in, hover effects, smooth scrolling  
⭐ **Testimonials** - Customer reviews with ratings  

## 🚀 Quick Start

### Local Development

```bash
# 1. Navigate to project
cd c:\Users\Amit2\Desktop\flavours\Restaurant

# 2. Install dependencies (if not already done)
npm install

# 3. Start dev server
npm start

# 4. Open browser at http://localhost:3000
```

### Build for Production

```bash
npm run build
```

## 🌐 Deploy to Vercel (1 Click!)

### Option 1: GitHub Integration (Recommended)
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repository
5. Click "Deploy"
6. Done! 🎉

### Option 2: Vercel CLI
```bash
npm install -g vercel
vercel login
vercel
```

### Option 3: Git Push Auto-Deploy
- Push to GitHub main branch
- Automatic deployment triggered
- Preview URL created instantly

**See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for detailed instructions**

## 📁 Project Structure

```
Restaurant/
├── public/
│   └── index.html              # HTML entry + Tailwind config
├── src/
│   ├── App.jsx                 # Main React component
│   └── index.js                # React entry point
├── vercel.json                 # Vercel deployment config
├── package.json                # Dependencies
├── .vercelignore               # Files to ignore in deployment
├── .env.example                # Example env variables
├── VERCEL_DEPLOYMENT.md        # Deployment guide
├── README_SETUP.md             # Setup guide
└── BUILD_COMPLETE.md           # Feature documentation
```

## 🎯 Key Sections

### 1. Navigation
- Sticky navbar with smooth scroll
- Mobile hamburger menu
- Active section highlighting

### 2. Hero
- Full-screen gradient background
- Animated floating emojis
- Dual CTA buttons

### 3. About
- Restaurant story
- Chef profile
- Statistics cards

### 4. Menu
- 5 tabbed categories
- 25 authentic Italian dishes
- Price in ₹ (Indian Rupees)
- Popular badges

### 5. Chef's Special
- Weekly feature dish
- **Live countdown timer** (real-time)
- Special pricing

### 6. Gallery (Enhanced!)
- 4 category pages (Ambiance, Cuisine, Desserts, Ingredients)
- 16 beautiful items total
- Smooth hover animations
- Description reveals on hover

### 7. Testimonials
- 3-star review cards
- Customer names and locations
- 5-star ratings

### 8. Reservations
- Full booking form
- Email validation
- Success confirmation
- Opening hours & contact info

### 9. Footer
- Contact cards
- Social links
- Quick navigation

## 🎨 Design System

| Element | Value |
|---------|-------|
| Primary Color | Burgundy (#7B2D42) |
| Accent Color | Gold (#C9933A) |
| Font (Headers) | Playfair Display |
| Font (Body) | Inter |
| Border Radius | 12px cards, 8px buttons |

## 🔧 Tech Stack

- **Frontend**: React 18
- **Styling**: Tailwind CSS
- **Fonts**: Google Fonts
- **Deployment**: Vercel
- **State**: React Hooks (useState, useEffect)
- **Icons**: Unicode emojis + SVG

## 📊 Menu Data

### Antipasti (4 items)
- Bruschetta al Pomodoro (₹450)
- Carpaccio di Manzo (₹850)
- Burrata con Rucola (₹750)
- Frittura di Calamari (₹680)

### Pasta (5 items)
- Spaghetti Carbonara (₹890)
- Pappardelle al Ragù (₹950)
- Ravioli di Ricotta (₹820)
- Linguine alle Vongole (₹980)
- Tagliatelle al Tartufo ⭐ (₹1,200)

### Mains (4 items)
- Branzino al Forno (₹1,450)
- Costolette d'Agnello (₹1,650)
- Pollo alla Parmigiana (₹1,100)
- Filetto di Manzo ⭐ (₹1,850)

### Desserts (4 items)
- Tiramisù Classico ⭐ (₹480)
- Panna Cotta (₹420)
- Cannoli Siciliani (₹390)
- Gelato Artigianale (₹350)

### Drinks (5 items)
- Aperol Spritz (₹680)
- Negroni (₹720)
- Prosecco (₹580)
- San Pellegrino (₹220)
- Espresso Romano (₹180)

## 📱 Responsive Breakpoints

| Size | Width | Status |
|------|-------|--------|
| Mobile | 375px | ✅ Optimized |
| Tablet | 768px | ✅ Optimized |
| Desktop | 1280px | ✅ Optimized |

## ✨ Animations & Interactions

- ✅ Smooth scroll to sections
- ✅ Fade-in on scroll (IntersectionObserver)
- ✅ Hover lift effect on cards
- ✅ Gallery hover scale (1.03x)
- ✅ Menu tab transitions
- ✅ Live countdown timer (updates every second)
- ✅ Form validation
- ✅ Success confirmation message

## 🌍 Restaurant Info

**La Bella Cucina**
- Cuisine: Italian Fine Dining
- Location: Mumbai, India
- Phone: +91 98765 43210
- Email: hello@labellacucina.in
- Hours: Tue–Sun, 12pm–3pm & 7pm–11pm (Closed Mondays)

## 🚀 Deployment URLs

Once deployed to Vercel:
- **Production**: `https://la-bella-cucina-XXXXX.vercel.app`
- **Custom Domain**: Configure in Vercel dashboard
- **Preview URLs**: Auto-generated for pull requests

## 📝 Customization

### Change Restaurant Name
Edit `src/App.jsx` - search for "La Bella Cucina" and update

### Update Menu Items
Edit `menuData` object at top of `src/App.jsx`

### Modify Colors
Edit Tailwind theme in `public/index.html`

### Change Contact Info
Edit `src/App.jsx` footer section

### Add Images
Replace emojis/gradients in Gallery component

## 📦 Available Scripts

```bash
npm start           # Start dev server (localhost:3000)
npm run build       # Build for production
npm test            # Run tests
npm run eject       # Eject from Create React App (not recommended)
```

## 🛠️ Troubleshooting

| Issue | Solution |
|-------|----------|
| Blank page | Clear browser cache, check console for errors |
| Styling broken | Ensure Tailwind CDN loads in public/index.html |
| Forms not working | Check console for JavaScript errors |
| Slow load | Use production build, enable caching |

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [Vercel Documentation](https://vercel.com/docs)
- [Google Fonts](https://fonts.google.com)

## 📄 Files Reference

| File | Purpose |
|------|---------|
| `VERCEL_DEPLOYMENT.md` | Detailed Vercel deployment guide |
| `README_SETUP.md` | Complete setup and features guide |
| `BUILD_COMPLETE.md` | Build summary and delivery notes |
| `.env.example` | Example environment variables |
| `vercel.json` | Vercel deployment configuration |

## 🎉 Live Demo

See it live: [View Deployment Guide](./VERCEL_DEPLOYMENT.md)

## 📄 License

MIT License - feel free to use and modify

## 💝 Made with ❤️

Built with passion for **La Bella Cucina** - Authentic Italian Fine Dining in Mumbai

---

**Ready to deploy? Follow the [Vercel deployment guide](./VERCEL_DEPLOYMENT.md)** 🚀