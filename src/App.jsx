import React, { useState, useEffect, useRef } from 'react';

// MENU DATA
const menuData = {
  Antipasti: [
    { name: 'Bruschetta al Pomodoro', description: 'Crispy bread with fresh tomatoes and basil', price: 450, emoji: '🍅', popular: false },
    { name: 'Carpaccio di Manzo', description: 'Thin-sliced raw beef with lemon and capers', price: 850, emoji: '🥩', popular: false },
    { name: 'Burrata con Rucola', description: 'Creamy burrata cheese with rocket salad', price: 750, emoji: '🧀', popular: false },
    { name: 'Frittura di Calamari', description: 'Golden-fried squid rings with lemon', price: 680, emoji: '🦑', popular: false },
  ],
  Pasta: [
    { name: 'Spaghetti Carbonara', description: 'Creamy Roman pasta with pancetta and egg', price: 890, emoji: '🍝', popular: false },
    { name: 'Pappardelle al Ragù', description: 'Wide ribbon pasta with slow-cooked meat sauce', price: 950, emoji: '🍝', popular: false },
    { name: 'Ravioli di Ricotta', description: 'Handmade ravioli filled with ricotta and spinach', price: 820, emoji: '🥟', popular: false },
    { name: 'Linguine alle Vongole', description: 'Fresh clams in white wine and garlic sauce', price: 980, emoji: '🦪', popular: false },
    { name: 'Tagliatelle al Tartufo', description: 'Egg pasta ribbons with black truffle cream', price: 1200, emoji: '🍄', popular: true },
  ],
  Mains: [
    { name: 'Branzino al Forno', description: 'Whole sea bass roasted with herbs and lemon', price: 1450, emoji: '🐟', popular: false },
    { name: 'Costolette d\'Agnello', description: 'Grilled lamb chops with rosemary and garlic', price: 1650, emoji: '🍖', popular: false },
    { name: 'Pollo alla Parmigiana', description: 'Breaded chicken with tomato and mozzarella', price: 1100, emoji: '🍗', popular: false },
    { name: 'Filetto di Manzo', description: 'Prime beef tenderloin with red wine reduction', price: 1850, emoji: '🥩', popular: true },
  ],
  Desserts: [
    { name: 'Tiramisù Classico', description: 'Layers of mascarpone cream and espresso', price: 480, emoji: '🍰', popular: true },
    { name: 'Panna Cotta', description: 'Silky vanilla panna cotta with berry compote', price: 420, emoji: '🍮', popular: false },
    { name: 'Cannoli Siciliani', description: 'Crispy pastry shells filled with ricotta cream', price: 390, emoji: '🥐', popular: false },
    { name: 'Gelato Artigianale', description: 'Artisanal Italian ice cream, selection of flavors', price: 350, emoji: '🍦', popular: false },
  ],
  Drinks: [
    { name: 'Aperol Spritz', description: 'Classic aperitif with Prosecco and soda', price: 680, emoji: '🍹', popular: false },
    { name: 'Negroni', description: 'Bold Italian cocktail with gin, Campari, vermouth', price: 720, emoji: '🥃', popular: false },
    { name: 'Prosecco', description: 'Crisp Italian sparkling wine', price: 580, emoji: '🍾', popular: false },
    { name: 'San Pellegrino', description: 'Refreshing Italian sparkling water', price: 220, emoji: '💧', popular: false },
    { name: 'Espresso Romano', description: 'Traditional Italian espresso with lemon zest', price: 180, emoji: '☕', popular: false },
  ],
};

// TESTIMONIALS DATA
const testimonials = [
  {
    text: 'The pasta was absolutely divine. Best Italian outside of Rome, no exaggeration.',
    author: 'Rahul M.',
    location: 'Worli',
    rating: 5,
  },
  {
    text: 'We celebrated our anniversary here. The ambiance, the food, the service — all flawless.',
    author: 'Sneha & Arjun K.',
    location: 'Juhu',
    rating: 5,
  },
  {
    text: "Chef Marco's carbonara changed my life. I've been back four times this month.",
    author: 'Zara T.',
    location: 'Bandra',
    rating: 5,
  },
];

// GALLERY DATA - ORGANIZED BY CATEGORIES
const galleryData = {
  Ambiance: [
    { id: 1, title: 'Candlelit Elegance', emoji: '🕯️', gradient: 'from-red-900 via-red-800 to-burgundy', description: 'Intimate dining experience with soft candlelight and elegant décor', highlights: ['Romantic', 'Sophisticated', 'Intimate'] },
    { id: 2, title: 'Open Kitchen View', emoji: '👨‍🍳', gradient: 'from-orange-900 via-orange-700 to-red-700', description: 'Watch our chefs craft culinary masterpieces in real-time', highlights: ['Interactive', 'Live Cooking', 'Theatrical'] },
    { id: 3, title: 'Wine Wall', emoji: '🍷', gradient: 'from-purple-900 via-red-800 to-burgundy', description: 'Curated selection of finest Italian wines', highlights: ['Premium', 'Curated', 'Extensive'] },
    { id: 4, title: 'Private Dining', emoji: '👥', gradient: 'from-burgundy via-red-900 to-red-800', description: 'Exclusive private rooms for special occasions', highlights: ['Exclusive', 'Private', 'Special'] },
  ],
  Cuisine: [
    { id: 5, title: 'Handmade Pasta', emoji: '🍝', gradient: 'from-orange-700 via-yellow-600 to-orange-500', description: 'Fresh pasta made daily in our kitchen', highlights: ['Artisanal', 'Fresh', 'Traditional'] },
    { id: 6, title: 'Seafood Specialties', emoji: '🦐', gradient: 'from-blue-800 via-teal-700 to-blue-600', description: 'Premium seafood sourced daily', highlights: ['Fresh', 'Premium', 'Sourced'] },
    { id: 7, title: 'Meat Perfection', emoji: '🥩', gradient: 'from-amber-900 via-red-800 to-orange-700', description: 'Grilled to perfection, aged to taste', highlights: ['Grilled', 'Aged', 'Prime'] },
    { id: 8, title: 'Creamy Risottos', emoji: '🍚', gradient: 'from-yellow-700 via-orange-600 to-yellow-500', description: 'Silky risottos with seasonal ingredients', highlights: ['Creamy', 'Seasonal', 'Rich'] },
  ],
  Desserts: [
    { id: 9, title: 'Tiramisù Masters', emoji: '🍰', gradient: 'from-amber-700 via-yellow-600 to-amber-500', description: 'Classic Italian dessert, made fresh daily', highlights: ['Classic', 'Fresh', 'Indulgent'] },
    { id: 10, title: 'Gelato Artistry', emoji: '🍦', gradient: 'from-pink-600 via-rose-500 to-pink-400', description: 'Handmade artisanal gelato in seasonal flavors', highlights: ['Artisanal', 'Handmade', 'Seasonal'] },
    { id: 11, title: 'Chocolate Dreams', emoji: '🍫', gradient: 'from-amber-900 via-brown-800 to-amber-700', description: 'Rich chocolate confections and pralines', highlights: ['Rich', 'Decadent', 'Handcrafted'] },
    { id: 12, title: 'Fruit Tarts', emoji: '🍓', gradient: 'from-red-600 via-pink-500 to-red-400', description: 'Seasonal fresh fruit tarts with pastry cream', highlights: ['Fresh', 'Seasonal', 'Elegant'] },
  ],
  Ingredients: [
    { id: 13, title: 'Farm Fresh Produce', emoji: '🥬', gradient: 'from-green-700 via-emerald-600 to-green-500', description: 'Locally sourced vegetables and herbs daily', highlights: ['Local', 'Fresh', 'Organic'] },
    { id: 14, title: 'Italian Imports', emoji: '🫒', gradient: 'from-yellow-800 via-yellow-700 to-amber-600', description: 'Premium olive oils and specialty items from Italy', highlights: ['Premium', 'Imported', 'Authentic'] },
    { id: 15, title: 'Fresh Herbs', emoji: '🌿', gradient: 'from-green-600 via-lime-500 to-green-500', description: 'Daily fresh herbs from our garden', highlights: ['Fresh', 'Organic', 'Garden'] },
    { id: 16, title: 'Spice Selection', emoji: '🌶️', gradient: 'from-red-700 via-orange-600 to-yellow-500', description: 'Authentic Italian spices and seasonings', highlights: ['Authentic', 'Premium', 'Curated'] },
  ],
};

// COUNTDOWN TIMER COMPONENT
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 32,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        seconds -= 1;

        if (seconds < 0) {
          seconds = 59;
          minutes -= 1;
        }
        if (minutes < 0) {
          minutes = 59;
          hours -= 1;
        }
        if (hours < 0) {
          hours = 23;
          days -= 1;
        }
        if (days < 0) {
          days = 0;
          hours = 0;
          minutes = 0;
          seconds = 0;
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeUnit = ({ value, label }) => (
    <div className="flex flex-col items-center">
      <div className="bg-gold text-dark-bg font-playfair text-2xl font-bold w-16 h-16 flex items-center justify-center rounded-lg">
        {String(value).padStart(2, '0')}
      </div>
      <p className="text-sm text-gold mt-2 uppercase">{label}</p>
    </div>
  );

  return (
    <div className="flex gap-4 justify-center">
      <TimeUnit value={timeLeft.days} label="Days" />
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <TimeUnit value={timeLeft.minutes} label="Mins" />
      <TimeUnit value={timeLeft.seconds} label="Secs" />
    </div>
  );
}

// NAVBAR COMPONENT
function Navbar({ activeSection, setActiveSection, mobileMenuOpen, setMobileMenuOpen }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = ['home', 'menu', 'about', 'gallery', 'testimonials', 'reservations'];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'nav-blur' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* LOGO */}
          <div className="font-playfair text-2xl font-bold text-burgundy">
            La Bella
            <span className="text-gold ml-2">Cucina</span>
          </div>

          {/* DESKTOP NAV LINKS */}
          <div className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => scrollToSection(link)}
                className={`capitalize text-sm font-medium transition-colors ${
                  activeSection === link ? 'text-gold' : 'text-dark-bg hover:text-gold'
                }`}
              >
                {link}
              </button>
            ))}
          </div>

          {/* RESERVE BUTTON (Desktop) */}
          <button
            onClick={() => scrollToSection('reservations')}
            className="hidden md:block bg-gold text-dark-bg px-6 py-2 rounded-lg font-medium text-sm hover:bg-opacity-90 transition-all"
          >
            Reserve a Table
          </button>

          {/* MOBILE MENU TOGGLE */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-dark-bg hover:text-gold transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 bg-light-bg rounded-lg border border-burgundy border-opacity-10">
            <div className="flex flex-col gap-4 p-4">
              {navLinks.map((link) => (
                <button
                  key={link}
                  onClick={() => scrollToSection(link)}
                  className={`capitalize text-left text-sm font-medium transition-colors ${
                    activeSection === link ? 'text-gold' : 'text-dark-bg hover:text-gold'
                  }`}
                >
                  {link}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('reservations')}
                className="bg-gold text-dark-bg px-4 py-2 rounded-lg font-medium text-sm hover:bg-opacity-90 transition-all w-full"
              >
                Reserve a Table
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// HERO SECTION
function HeroSection() {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* GRADIENT BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-b from-burgundy via-burgundy to-dark-bg opacity-90"></div>

      {/* FLOATING EMOJIS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-4xl animate-float opacity-20">🍝</div>
        <div className="absolute top-32 right-20 text-5xl animate-float opacity-20" style={{ animationDelay: '1s' }}>🍷</div>
        <div className="absolute bottom-32 left-1/4 text-4xl animate-float opacity-20" style={{ animationDelay: '2s' }}>🫒</div>
        <div className="absolute bottom-20 right-1/3 text-5xl animate-float opacity-20" style={{ animationDelay: '3s' }}>🍋</div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 text-center max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* FLOATING BADGE */}
        <div className="inline-block mb-8 px-6 py-2 bg-gold bg-opacity-10 border border-gold border-opacity-30 rounded-full">
          <p className="text-gold font-inter text-sm font-medium">Est. 2018 · Fine Dining</p>
        </div>

        {/* HEADLINE */}
        <h1 className="font-playfair text-5xl sm:text-6xl md:text-7xl font-bold text-light-bg mb-6 leading-tight">
          An Evening Worth
          <span className="block text-gold">Remembering</span>
        </h1>

        {/* SUBHEADLINE */}
        <p className="text-light-bg text-lg sm:text-xl md:text-2xl mb-12 opacity-90 font-inter">
          Handcrafted Italian cuisine in the heart of Mumbai
        </p>

        {/* CTA BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#menu" className="bg-gold text-dark-bg px-8 py-3 rounded-lg font-medium text-base hover:bg-opacity-90 transition-all inline-block">
            View Our Menu
          </a>
          <a href="#reservations" className="border-2 border-light-bg text-light-bg px-8 py-3 rounded-lg font-medium text-base hover:bg-light-bg hover:text-dark-bg transition-all inline-block">
            Make a Reservation
          </a>
        </div>
      </div>
    </section>
  );
}

// ABOUT SECTION
function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { number: '15+', label: 'Years of Excellence' },
    { number: '200+', label: 'Signature Dishes' },
    { number: '50,000+', label: 'Happy Guests' },
  ];

  return (
    <section id="about" ref={sectionRef} className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-light-bg">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-center mb-16 text-dark-bg">
          Crafted with Passion,
          <span className="block text-burgundy">Served with Love</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* LEFT: TEXT */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <p className="text-dark-bg text-lg leading-relaxed mb-6 font-inter">
              La Bella Cucina was born from a simple dream: to bring the authentic taste of Italy to the vibrant streets of Mumbai. Founded in 2018, our restaurant celebrates the art of traditional Italian cooking with locally-sourced ingredients and time-honored techniques.
            </p>
            <p className="text-dark-bg text-lg leading-relaxed mb-6 font-inter">
              Our kitchen is led by Chef Marco Rossi, a Michelin-starred chef from Tuscany who brings over 25 years of culinary expertise. Every dish tells a story, every flavor carries a memory of the Italian countryside.
            </p>
            <p className="text-dark-bg text-lg leading-relaxed font-inter">
              We believe that dining is more than just eating—it's an experience. From the moment you step into our elegant space to the last sip of espresso, we're committed to crafting evenings you'll never forget.
            </p>
          </div>

          {/* RIGHT: CHEF QUOTE CARD */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="bg-white border-l-4 border-gold rounded-lg p-8 shadow-lg">
              <p className="text-6xl text-gold opacity-20 leading-none mb-4">"</p>
              <p className="text-dark-bg text-lg italic mb-6 font-inter">
                "Food is not just fuel. It is emotion, it is memory, it is love served on a plate. At La Bella Cucina, we cook with our hearts."
              </p>
              <p className="text-burgundy font-playfair text-lg font-bold">Chef Marco Rossi</p>
              <p className="text-gold text-sm mt-2">Culinary Director · Tuscany, Italy</p>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`text-center p-8 bg-white rounded-lg border border-burgundy border-opacity-10 transition-all duration-1000 transform ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              <p className="text-4xl md:text-5xl font-playfair font-bold text-gold mb-2">{stat.number}</p>
              <p className="text-dark-bg font-medium text-sm uppercase">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// MENU SECTION
function MenuSection() {
  const [activeTab, setActiveTab] = useState('Pasta');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const currentMenuItems = menuData[activeTab];

  return (
    <section id="menu" ref={sectionRef} className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-dark-bg">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-center mb-12 text-light-bg">
          <span className="gold-underline">Our Menu</span>
        </h2>

        {/* TABS */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12">
          {Object.keys(menuData).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 sm:px-6 py-2 rounded-lg font-medium transition-all text-sm sm:text-base ${
                activeTab === tab
                  ? 'bg-gold text-dark-bg'
                  : 'bg-dark-bg border border-gold border-opacity-30 text-light-bg hover:border-gold'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* MENU ITEMS GRID */}
        <div className="grid md:grid-cols-2 gap-8">
          {currentMenuItems.map((item, idx) => (
            <div
              key={idx}
              className={`bg-gradient-to-br from-burgundy to-dark-bg border border-gold border-opacity-20 rounded-lg p-6 transition-all duration-500 card-hover ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="text-3xl">{item.emoji}</div>
                {item.popular && (
                  <span className="bg-gold text-dark-bg px-2 py-1 rounded text-xs font-bold uppercase">Most Popular</span>
                )}
              </div>
              <h3 className="text-light-bg font-playfair text-lg font-bold mb-1">{item.name}</h3>
              <p className="text-light-bg text-opacity-70 text-sm font-inter mb-4">{item.description}</p>
              <p className="text-gold font-playfair text-xl font-bold">₹{item.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// SPECIALS BANNER
function SpecialsBanner() {
  return (
    <section className="bg-gradient-to-r from-burgundy via-burgundy to-dark-bg py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-gold text-sm font-medium uppercase mb-2">Exclusive Offer</p>
        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-light-bg mb-6">
          Chef's Special This Week
        </h2>

        <div className="bg-dark-bg bg-opacity-50 rounded-lg p-8 mb-8 border border-gold border-opacity-20">
          <p className="text-light-bg text-3xl font-playfair font-bold mb-2">Agnolotti di Tartufo Nero</p>
          <p className="text-light-bg text-opacity-80 mb-4 font-inter">Handmade pasta parcels filled with black truffle, mascarpone, and sage brown butter sauce</p>
          <p className="text-gold text-3xl font-playfair font-bold">₹1,450 per plate</p>
        </div>

        <p className="text-light-bg mb-6 font-inter">Offer expires in:</p>
        <CountdownTimer />

        <button className="mt-8 bg-gold text-dark-bg px-8 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all">
          Order Now
        </button>
      </div>
    </section>
  );
}

// GALLERY SECTION
function GallerySection() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('Ambiance');
  const sectionRef = useRef(null);
  const categories = Object.keys(galleryData);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const currentItems = galleryData[currentCategory];

  return (
    <section id="gallery" ref={sectionRef} className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-light-bg">
      <div className="max-w-7xl mx-auto">
        {/* HEADING */}
        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-center mb-4 text-dark-bg">
          A Feast for
          <span className="block text-burgundy">the Eyes</span>
        </h2>
        <p className="text-center text-dark-bg text-opacity-60 mb-12 font-inter max-w-2xl mx-auto">
          Explore our restaurant's beautiful spaces, authentic cuisine, and premium ingredients
        </p>

        {/* CATEGORY TABS */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setCurrentCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all text-sm sm:text-base border-2 ${
                currentCategory === category
                  ? 'bg-burgundy text-light-bg border-burgundy'
                  : 'border-burgundy text-burgundy hover:bg-burgundy hover:bg-opacity-10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* GALLERY GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {currentItems.map((item, idx) => (
            <div
              key={item.id}
              className={`group relative rounded-xl overflow-hidden transition-all duration-700 shadow-lg hover:shadow-2xl transform ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
              style={{ transitionDelay: `${idx * 120}ms` }}
            >
              {/* CARD BACKGROUND */}
              <div
                className={`bg-gradient-to-br ${item.gradient} h-96 relative overflow-hidden flex flex-col justify-between p-8`}
              >
                {/* TOP SECTION - EMOJI AND ICON */}
                <div className="flex justify-between items-start">
                  <div className="text-6xl drop-shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                    {item.emoji}
                  </div>
                  <div className="text-light-bg text-opacity-40">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1z" />
                    </svg>
                  </div>
                </div>

                {/* MIDDLE SECTION - HIDDEN ON NORMAL, VISIBLE ON HOVER */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

                {/* BOTTOM SECTION */}
                <div className="relative z-10">
                  {/* TITLE */}
                  <h3 className="text-2xl md:text-3xl font-playfair font-bold text-light-bg mb-2">
                    {item.title}
                  </h3>

                  {/* DESCRIPTION - HIDDEN ON SMALL SCREENS, VISIBLE ON HOVER */}
                  <p className="text-light-bg text-opacity-0 group-hover:text-opacity-90 transition-all duration-300 text-sm mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  {/* HIGHLIGHTS BADGES */}
                  <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    {item.highlights.map((highlight, i) => (
                      <span
                        key={i}
                        className="inline-block px-3 py-1 bg-light-bg bg-opacity-20 border border-light-bg border-opacity-40 text-light-bg text-xs font-medium rounded-full backdrop-blur-sm"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                {/* DECORATIVE CORNER ACCENT */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-light-bg bg-opacity-10 rounded-full transform translate-x-1/3 -translate-y-1/3 group-hover:scale-150 transition-transform duration-500"></div>
              </div>

              {/* BOTTOM INFO BAR */}
              <div className="bg-gradient-to-r from-dark-bg to-burgundy px-8 py-4">
                <div className="flex items-center justify-between">
                  <p className="text-light-bg text-xs uppercase font-semibold tracking-wider">
                    {currentCategory}
                  </p>
                  <div className="text-light-bg text-opacity-60 group-hover:text-opacity-100 transition-all">
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* PAGE INDICATOR */}
        <div className="text-center mt-12">
          <p className="text-dark-bg text-opacity-60 font-inter text-sm">
            {currentItems.length} items in <span className="font-bold text-burgundy">{currentCategory}</span>
          </p>
        </div>
      </div>
    </section>
  );
}

// TESTIMONIALS SECTION
function TestimonialsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="testimonials" ref={sectionRef} className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-dark-bg">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-center mb-16 text-light-bg">
          What Our
          <span className="block text-gold">Guests Say</span>
        </h2>

        {/* TESTIMONIALS GRID */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className={`relative bg-gradient-to-br from-burgundy to-dark-bg border border-gold border-opacity-20 rounded-lg p-8 transition-all duration-700 card-hover ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              <div className="testimonial-quote">"</div>

              {/* RATING */}
              <div className="mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-gold text-lg">★</span>
                ))}
              </div>

              {/* TEXT */}
              <p className="text-light-bg mb-6 font-inter leading-relaxed italic">"{testimonial.text}"</p>

              {/* AUTHOR */}
              <p className="text-gold font-playfair text-lg font-bold">{testimonial.author}</p>
              <p className="text-light-bg text-opacity-60 text-sm">{testimonial.location}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// RESERVATIONS SECTION
function ReservationsSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    requests: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.phone && formData.date && formData.time) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          date: '',
          time: '',
          guests: '2',
          requests: '',
        });
      }, 3000);
    }
  };

  return (
    <section id="reservations" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-light-bg">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-center mb-16 text-dark-bg">
          Reserve Your Table
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* FORM */}
          <div>
            {submitted ? (
              <div className="bg-gold bg-opacity-10 border-2 border-gold rounded-lg p-8 text-center h-full flex flex-col justify-center">
                <p className="text-5xl mb-4">🎉</p>
                <h3 className="text-2xl font-playfair font-bold text-burgundy mb-2">Reservation Confirmed!</h3>
                <p className="text-dark-bg font-inter">We'll see you soon at La Bella Cucina. Thank you for choosing us!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-dark-bg font-medium mb-2 text-sm">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Raj Patel"
                    className="w-full px-4 py-2 border border-burgundy border-opacity-20 rounded-lg focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-inter"
                    required
                  />
                </div>

                <div>
                  <label className="block text-dark-bg font-medium mb-2 text-sm">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="raj@example.com"
                    className="w-full px-4 py-2 border border-burgundy border-opacity-20 rounded-lg focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-inter"
                    required
                  />
                </div>

                <div>
                  <label className="block text-dark-bg font-medium mb-2 text-sm">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2 border border-burgundy border-opacity-20 rounded-lg focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-inter"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-dark-bg font-medium mb-2 text-sm">Date *</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-burgundy border-opacity-20 rounded-lg focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-inter"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-dark-bg font-medium mb-2 text-sm">Time *</label>
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-burgundy border-opacity-20 rounded-lg focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-inter"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-dark-bg font-medium mb-2 text-sm">Number of Guests</label>
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-burgundy border-opacity-20 rounded-lg focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-inter"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-dark-bg font-medium mb-2 text-sm">Special Requests</label>
                  <textarea
                    name="requests"
                    value={formData.requests}
                    onChange={handleChange}
                    placeholder="Celebration? Dietary preferences?"
                    rows="3"
                    className="w-full px-4 py-2 border border-burgundy border-opacity-20 rounded-lg focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-inter resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gold text-dark-bg px-6 py-3 rounded-lg font-bold text-base hover:bg-opacity-90 transition-all"
                >
                  Reserve My Table
                </button>
              </form>
            )}
          </div>

          {/* INFO PANEL */}
          <div className="space-y-8">
            <div className="bg-white border-l-4 border-gold rounded-lg p-6">
              <h3 className="font-playfair text-xl font-bold text-dark-bg mb-4">Opening Hours</h3>
              <div className="space-y-2 font-inter text-dark-bg text-opacity-80">
                <div className="flex justify-between">
                  <span>Tuesday – Sunday:</span>
                  <span className="font-bold text-dark-bg">12:00 PM – 3:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span></span>
                  <span className="font-bold text-dark-bg">7:00 PM – 11:00 PM</span>
                </div>
                <div className="flex justify-between pt-4 border-t border-burgundy border-opacity-20">
                  <span>Monday:</span>
                  <span className="font-bold text-burgundy">Closed</span>
                </div>
              </div>
            </div>

            <div className="bg-white border-l-4 border-gold rounded-lg p-6">
              <h3 className="font-playfair text-xl font-bold text-dark-bg mb-4">Location</h3>
              <p className="font-inter text-dark-bg text-opacity-80 leading-relaxed">
                Mumbai, India
                <br />
                <br />
                <span className="text-dark-bg font-medium">Phone:</span>
                <br />
                +91 98765 43210
                <br />
                <br />
                <span className="text-dark-bg font-medium">Email:</span>
                <br />
                hello@labellacucina.in
              </p>
            </div>

            <div className="bg-burgundy bg-opacity-5 border-l-4 border-burgundy rounded-lg p-6">
              <h3 className="font-playfair text-lg font-bold text-dark-bg mb-3">Cancellation Policy</h3>
              <p className="font-inter text-dark-bg text-opacity-80 text-sm leading-relaxed">
                We request a minimum 24-hour notice for cancellations. Cancellations made within 24 hours may be subject to a charge.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// CONTACT + FOOTER SECTION
function FooterSection() {
  return (
    <section className="bg-dark-bg border-t border-gold border-opacity-20">
      {/* CONTACT CARDS */}
      <div className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* PHONE */}
            <div className="text-center">
              <p className="text-3xl mb-4">📞</p>
              <h3 className="font-playfair text-xl font-bold text-light-bg mb-2">Call Us</h3>
              <a href="tel:+919876543210" className="text-gold hover:text-light-bg transition-colors font-inter">
                +91 98765 43210
              </a>
            </div>

            {/* EMAIL */}
            <div className="text-center">
              <p className="text-3xl mb-4">✉️</p>
              <h3 className="font-playfair text-xl font-bold text-light-bg mb-2">Email Us</h3>
              <a href="mailto:hello@labellacucina.in" className="text-gold hover:text-light-bg transition-colors font-inter">
                hello@labellacucina.in
              </a>
            </div>

            {/* ADDRESS */}
            <div className="text-center">
              <p className="text-3xl mb-4">📍</p>
              <h3 className="font-playfair text-xl font-bold text-light-bg mb-2">Visit Us</h3>
              <p className="text-gold font-inter">Mumbai, India</p>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="border-t border-gold border-opacity-10 px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* BRAND */}
            <div>
              <p className="font-playfair text-xl font-bold text-light-bg mb-2">
                La Bella
                <span className="text-gold ml-2">Cucina</span>
              </p>
              <p className="text-light-bg text-opacity-60 text-sm font-inter">
                Authentic flavors, unforgettable evenings
              </p>
            </div>

            {/* QUICK LINKS */}
            <div>
              <h4 className="font-bold text-light-bg mb-4 text-sm uppercase">Quick Links</h4>
              <ul className="space-y-2 text-light-bg text-opacity-60 text-sm font-inter">
                <li><a href="#home" className="hover:text-gold transition-colors">Home</a></li>
                <li><a href="#menu" className="hover:text-gold transition-colors">Menu</a></li>
                <li><a href="#about" className="hover:text-gold transition-colors">About</a></li>
              </ul>
            </div>

            {/* MORE LINKS */}
            <div>
              <h4 className="font-bold text-light-bg mb-4 text-sm uppercase">More</h4>
              <ul className="space-y-2 text-light-bg text-opacity-60 text-sm font-inter">
                <li><a href="#gallery" className="hover:text-gold transition-colors">Gallery</a></li>
                <li><a href="#reservations" className="hover:text-gold transition-colors">Reserve</a></li>
                <li><a href="#testimonials" className="hover:text-gold transition-colors">Reviews</a></li>
              </ul>
            </div>

            {/* SOCIAL */}
            <div>
              <h4 className="font-bold text-light-bg mb-4 text-sm uppercase">Follow Us</h4>
              <div className="flex gap-4">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-light-bg transition-colors text-2xl">📷</a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-light-bg transition-colors text-2xl">👍</a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-light-bg transition-colors text-2xl">⭐</a>
              </div>
            </div>
          </div>

          {/* DIVIDER */}
          <div className="border-t border-gold border-opacity-10 pt-8">
            <p className="text-center text-light-bg text-opacity-60 text-sm font-inter">
              Made with ❤️ in Mumbai • &copy; 2024 La Bella Cucina. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// MAIN APP
export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-light-bg">
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <HeroSection />
      <AboutSection />
      <MenuSection />
      <SpecialsBanner />
      <GallerySection />
      <TestimonialsSection />
      <ReservationsSection />
      <FooterSection />
    </div>
  );
}
