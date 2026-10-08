'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { client } from '@/sanity/client';
import { urlFor } from '@/sanity/image';
import { MENU_ITEMS, MenuItem } from '@/data/menuData';
import { 
  Coffee, 
  ShoppingBag, 
  Plus, 
  Minus, 
  Send, 
  MapPin, 
  Clock, 
  Phone, 
  Sparkles, 
  ArrowRight,
  Search,
  X,
  Lock,
  Heart,
  Compass,
  Check
} from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'Complete Collection' },
  { id: 'coffee', label: 'Hot Brews & Espresso' },
  { id: 'cold-beverages', label: 'Cold Brews & Shakes' },
  { id: 'breakfast', label: 'Artisanal Eggs & Sourdough' },
  { id: 'bites', label: 'Petit Portions & Greens' },
  { id: 'sandwiches', label: 'Warm Focaccia & Toasts' },
  { id: 'pasta', label: 'Rustic Hand-Crafted Pasta' },
  { id: 'burgers', label: 'Bistro Brioche Burgers' },
  { id: 'desserts', label: 'Patisserie & Dolce' },
];

const ALLOWED_ADMIN_EMAILS = [
  'admin@velvetandbean.com',
  'legitfire11@gmail.com'
];

export default function CafeLandingPage() {
  const [items, setItems] = useState<MenuItem[]>(MENU_ITEMS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cart, setCart] = useState<{ item: MenuItem; qty: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('vb_admin_session') === 'true') {
      setIsAdmin(true);
    }
  }, []);

  useEffect(() => {
    async function loadMenu() {
      try {
        const data = await client.fetch('*[_type == "menuItem"] | order(_createdAt desc)');
        if (Array.isArray(data) && data.length > 0) {
          const live: MenuItem[] = data.map((d: any) => ({
            id: d._id,
            name: d.name,
            category: d.category?.toLowerCase() || 'coffee',
            price: d.price || 0,
            description: d.description || '',
            badge: d.badge,
            image: d.image 
              ? urlFor(d.image).width(800).url() 
              : (MENU_ITEMS.find((m) => m.name.toLowerCase() === d.name?.toLowerCase())?.image || MENU_ITEMS[0].image),
          }));
          const liveNames = new Set(live.map(x => x.name.toLowerCase()));
          const extraDefaults = MENU_ITEMS.filter(x => !liveNames.has(x.name.toLowerCase()));
          setItems([...live, ...extraDefaults]);
        }
      } catch (e) {
        console.error('Sanity fetch error:', e);
      }
    }
    loadMenu();
  }, []);

  const handleAdminAuth = () => {
    const email = prompt('Enter staff authorized email:');
    if (!email) return;
    const clean = email.trim().toLowerCase();
    if (ALLOWED_ADMIN_EMAILS.includes(clean) || clean.includes('@')) {
      localStorage.setItem('vb_admin_session', 'true');
      setIsAdmin(true);
      window.location.href = '/studio';
    } else {
      alert('Unauthorized access.');
    }
  };

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchSearch;
    });
  }, [items, searchQuery]);

  const groupedCategories = useMemo(() => {
    const list = selectedCategory === 'all' 
      ? CATEGORIES.filter(c => c.id !== 'all')
      : CATEGORIES.filter(c => c.id === selectedCategory);

    return list.map(cat => ({
      ...cat,
      items: filteredItems.filter(item => item.category === cat.id)
    })).filter(cat => cat.items.length > 0);
  }, [selectedCategory, filteredItems]);

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const exist = prev.find((x) => x.item.id === item.id);
      if (exist) return prev.map((x) => x.item.id === item.id ? { ...x, qty: x.qty + 1 } : x);
      return [...prev, { item, qty: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev.map((x) => {
        if (x.item.id === id) {
          const next = x.qty + delta;
          return next > 0 ? { ...x, qty: next } : null;
        }
        return x;
      }).filter(Boolean) as { item: MenuItem; qty: number }[]
    );
  };

  const total = cart.reduce((sum, x) => sum + x.item.price * x.qty, 0);
  const totalCount = cart.reduce((sum, x) => sum + x.qty, 0);

  const orderWhatsApp = () => {
    if (cart.length === 0) return;
    const cafePhoneNumber = '917447379014';
    let msg = '☕ *New Order from Velvet & Bean*\n';
    msg += '──────────────────────────\n';
    cart.forEach((x) => {
      msg += `• ${x.item.name} (x${x.qty}) — ₹${x.item.price * x.qty}\n`;
    });
    msg += '──────────────────────────\n';
    msg += `*Subtotal:* ₹${total}\n\n`;
    msg += '📍 *Pickup Point:* Muktai Apartment, opp. Ashish Garden, Kothrud\n';
    msg += 'Please confirm my order!';
    window.open(`https://wa.me/${cafePhoneNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#221B16] font-sans antialiased selection:bg-[#E8DCCF]">
      
      {/* Editorial Announcement Bar */}
      <div className="bg-[#1C1612] text-[#D4C3B3] text-[11px] py-2 px-6 tracking-widest uppercase font-medium flex items-center justify-center gap-3 border-b border-[#2D231D]">
        <Sparkles className="w-3.5 h-3.5 text-[#C59B6D]" />
        <span>Artisanal Single-Origin Roastery • Fresh Bakes Daily in Kothrud, Pune</span>
        <Sparkles className="w-3.5 h-3.5 text-[#C59B6D]" />
      </div>

      {/* Main Glassmorphic Navigation */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E8DFD3] transition-all">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-24 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#EFE7DC] border border-[#DECFBE] flex items-center justify-center shadow-inner">
              <Coffee className="w-5 h-5 text-[#7E4F28]" />
            </div>
            <div>
              <span className="font-serif text-2xl lg:text-3xl font-semibold tracking-tight text-[#1C1612] block leading-none">
                Velvet &amp; Bean
              </span>
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#967C69] font-medium mt-1 block">
                Bakehouse &bull; Coffee Bar
              </span>
            </div>
          </div>

          <nav className="flex items-center gap-6">
            <a href="#menu" className="hidden md:inline-block text-xs uppercase tracking-widest text-[#6B5748] hover:text-[#1C1612] font-semibold transition">
              Menu
            </a>
            <a href="#about" className="hidden md:inline-block text-xs uppercase tracking-widest text-[#6B5748] hover:text-[#1C1612] font-semibold transition">
              Heritage
            </a>
            <a href="#location" className="hidden md:inline-block text-xs uppercase tracking-widest text-[#6B5748] hover:text-[#1C1612] font-semibold transition">
              Find Us
            </a>

            {/* Discreet Staff Trigger */}
            {isAdmin ? (
              <a 
                href="/studio"
                className="text-xs font-semibold text-[#7E4F28] border border-[#7E4F28] px-4 py-2 rounded-full hover:bg-[#7E4F28] hover:text-[#FAF7F2] transition tracking-wider uppercase text-[11px]"
              >
                Studio CMS
              </a>
            ) : (
              <button 
                onClick={handleAdminAuth}
                className="text-[11px] text-[#A89687] hover:text-[#6B5748] transition flex items-center gap-1.5 px-2 py-1"
                title="Staff login"
              >
                <Lock className="w-3 h-3" /> Staff
              </button>
            )}

            {/* Bag Drawer Trigger */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2.5 bg-[#1C1612] hover:bg-[#34271F] text-[#FAF7F2] px-6 py-3 rounded-full text-xs font-semibold tracking-widest uppercase transition-all shadow-sm hover:shadow-md active:scale-95"
            >
              <ShoppingBag className="w-4 h-4 text-[#C59B6D]" />
              <span>Bag</span>
              {totalCount > 0 && (
                <span className="ml-1 bg-[#C59B6D] text-[#1C1612] text-[11px] font-bold px-2 py-0.5 rounded-full">
                  {totalCount}
                </span>
              )}
            </button>
          </nav>
        </div>
      </header>

      {/* Atmospheric Editorial Hero */}
      <section className="relative px-6 pt-16 pb-20 md:pt-28 md:pb-32 max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-2.5 bg-[#EFE7DC]/80 border border-[#DECFBE] px-5 py-2 rounded-full mb-8 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#7E4F28] animate-ping"></span>
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#6B5748] font-bold">
            Slow Extraction &bull; Wild-Fermented Daily
          </span>
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl md:text-8xl font-normal text-[#1C1612] leading-[1.08] tracking-tight max-w-4xl mx-auto">
          Quiet luxury in every <br />
          <span className="italic font-light text-[#7E4F28]">sip &amp; crumb.</span>
        </h1>

        <p className="mt-8 text-base sm:text-xl text-[#6B5748] max-w-2xl mx-auto font-light leading-relaxed">
          Single-estate pour overs, slow butter-laminated pastries, and peaceful afternoons nestled in Kothrud, Pune.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a 
            href="#menu" 
            className="inline-flex items-center gap-3 bg-[#1C1612] hover:bg-[#34271F] text-[#FAF7F2] px-8 py-4 rounded-full text-xs uppercase tracking-widest font-semibold transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            Explore Today&apos;s Menu <ArrowRight className="w-4 h-4 text-[#C59B6D]" />
          </a>
          <a 
            href="#location" 
            className="inline-flex items-center gap-2 bg-transparent text-[#1C1612] border border-[#DECFBE] hover:border-[#1C1612] px-8 py-4 rounded-full text-xs uppercase tracking-widest font-semibold transition"
          >
            Location &bull; Hours
          </a>
        </div>

        {/* Ambient Brand Badges */}
        <div className="mt-20 pt-12 border-t border-[#E8DFD3] grid grid-cols-2 md:grid-cols-4 gap-8 text-left">
          <div className="space-y-1.5 border-l border-[#DECFBE] pl-5">
            <p className="font-serif text-xl font-normal text-[#1C1612]">100% Arabica</p>
            <p className="text-xs text-[#8A7768] font-light">Direct-trade micro lot beans</p>
          </div>
          <div className="space-y-1.5 border-l border-[#DECFBE] pl-5">
            <p className="font-serif text-xl font-normal text-[#1C1612]">Pure Butter Bakes</p>
            <p className="text-xs text-[#8A7768] font-light">Natural 36-hour fermentation</p>
          </div>
          <div className="space-y-1.5 border-l border-[#DECFBE] pl-5">
            <p className="font-serif text-xl font-normal text-[#1C1612]">Peaceful Space</p>
            <p className="text-xs text-[#8A7768] font-light">Sunlit corners &amp; quiet desks</p>
          </div>
          <div className="space-y-1.5 border-l border-[#DECFBE] pl-5">
            <p className="font-serif text-xl font-normal text-[#1C1612]">WhatsApp Pickup</p>
            <p className="text-xs text-[#8A7768] font-light">Packaged fresh for your arrival</p>
          </div>
        </div>
      </section>

      {/* Editorial Menu Showcase */}
      
      {/* Brand Heritage & Story Section */}
      <section id="about" className="py-24 px-6 lg:px-12 bg-[#F4ECE2] border-b border-[#E8DFD3]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Story Visual Grid */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#DECFBE] aspect-4/3">
                <img 
                  src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1200&q=80" 
                  alt="Velvet & Bean Artisanal Coffee Craft" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="hidden sm:block absolute -bottom-8 -right-8 w-60 h-60 rounded-3xl overflow-hidden shadow-2xl border-4 border-[#FAF7F2]">
                <img 
                  src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80" 
                  alt="Wild Fermented Sourdough Bakes" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Narrative Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-[#EAE0D3] border border-[#DECFBE] px-4 py-1.5 rounded-full">
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#7E4F28] font-bold">
                  Our Roots &bull; Est. Kothrud
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#1C1612] leading-tight">
                Born from an obsession with the slow, deliberate craft.
              </h2>

              <p className="text-[#6B5748] text-sm sm:text-base leading-relaxed font-light">
                Velvet &amp; Bean started with a simple belief: morning rituals should never be rushed. Tucked away opposite Ashish Garden in Kothrud, our kitchen balances small-batch micro-lot coffee roasting with time-honored European baking techniques.
              </p>

              <div className="space-y-4 pt-4 border-t border-[#DECFBE]/60">
                <div className="flex gap-4">
                  <span className="font-mono text-sm font-bold text-[#7E4F28]">01 /</span>
                  <div>
                    <h4 className="font-serif text-lg text-[#1C1612] font-semibold">Single-Origin Arabica</h4>
                    <p className="text-xs text-[#7A6656] font-light mt-0.5 leading-relaxed">
                      Sourced directly from estates across Chikmagalur and the Western Ghats, roasted in small batches to preserve complex florals and cocoa notes.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="font-mono text-sm font-bold text-[#7E4F28]">02 /</span>
                  <div>
                    <h4 className="font-serif text-lg text-[#1C1612] font-semibold">36-Hour Sourdough Fermentation</h4>
                    <p className="text-xs text-[#7A6656] font-light mt-0.5 leading-relaxed">
                      Every loaf, brioche bun, and focaccia slice is naturally leavened without industrial improvers, yielding open crumbs and deep flavor.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="font-mono text-sm font-bold text-[#7E4F28]">03 /</span>
                  <div>
                    <h4 className="font-serif text-lg text-[#1C1612] font-semibold">Community Sanctuary</h4>
                    <p className="text-xs text-[#7A6656] font-light mt-0.5 leading-relaxed">
                      A quiet, sunlight-drenched corner designed for quiet reading, remote deep work, and unhurried conversations over pour-overs.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section id="menu" className="py-24 px-6 lg:px-12 bg-white border-y border-[#E8DFD3]">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Heading & Interactive Search */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#967C69] font-bold block mb-2">
                Handcrafted Table Offerings
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#1C1612] tracking-tight">
                Curated Menu
              </h2>
            </div>

            <div className="relative w-full lg:w-80">
              <Search className="w-4 h-4 text-[#967C69] absolute left-5 top-1/2 -translate-y-1/2" />
              <input 
                type="text"
                placeholder="Search coffee, toasts, desserts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-5 py-3 rounded-full border border-[#DECFBE] bg-[#FAF7F2] text-sm text-[#1C1612] placeholder-[#A89687] focus:outline-none focus:ring-2 focus:ring-[#7E4F28]/25 transition"
              />
            </div>
          </div>

          {/* Minimalist Pill Filter Bar */}
          <div className="flex items-center gap-3 overflow-x-auto pb-6 mb-16 no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-3 rounded-full text-xs font-semibold tracking-wider transition whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-[#1C1612] text-[#FAF7F2] shadow-sm'
                    : 'bg-[#F4ECE2] text-[#6B5748] hover:bg-[#EAE0D3]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grouped Category Sections */}
          <div className="space-y-20">
            {groupedCategories.map((group) => (
              <div key={group.id} className="space-y-8">
                
                {/* Section Header Line */}
                <div className="flex items-center justify-between pb-4 border-b border-[#E8DFD3]">
                  <div className="flex items-baseline gap-3">
                    <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#1C1612]">
                      {group.label}
                    </h3>
                    <span className="text-xs text-[#967C69] font-mono tracking-wider">
                      &bull; {group.items.length} {group.items.length === 1 ? 'item' : 'selections'}
                    </span>
                  </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {group.items.map((item) => (
                    <div 
                      key={item.id} 
                      className="group bg-[#FAF7F2] border border-[#E8DFD3] rounded-3xl overflow-hidden hover:border-[#D5C6B5] hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                    >
                      <div>
                        {/* Aspect Ratio Controlled Image */}
                        <div className="relative h-60 w-full overflow-hidden bg-[#EAE0D3]">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                          />
                          {item.badge && (
                            <span className="absolute top-4 left-4 bg-[#1C1612]/80 backdrop-blur-md text-[#FAF7F2] text-[10px] uppercase font-bold tracking-widest px-3.5 py-1.5 rounded-full shadow-xs">
                              {item.badge}
                            </span>
                          )}
                        </div>

                        {/* Card Meta Content */}
                        <div className="p-6">
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <h4 className="font-serif text-xl font-normal text-[#1C1612] group-hover:text-[#7E4F28] transition leading-snug">
                              {item.name}
                            </h4>
                            <span className="font-mono text-base font-semibold text-[#1C1612] bg-[#EFE7DC] px-2.5 py-1 rounded-md whitespace-nowrap">
                              ₹{item.price}
                            </span>
                          </div>
                          <p className="text-xs text-[#7A6656] leading-relaxed line-clamp-2 font-light mt-1">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      {/* Card Action */}
                      <div className="px-6 pb-6 pt-0">
                        <button
                          onClick={() => addToCart(item)}
                          className="w-full flex items-center justify-center gap-2 py-3 bg-white border border-[#DECFBE] hover:bg-[#1C1612] hover:text-[#FAF7F2] hover:border-[#1C1612] rounded-2xl text-xs font-semibold tracking-wider uppercase transition-all duration-200 shadow-2xs"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add to Order
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {groupedCategories.length === 0 && (
              <div className="py-24 text-center space-y-3">
                <p className="font-serif text-2xl text-[#1C1612]">No culinary items match your search</p>
                <p className="text-xs text-[#8A7768]">Try searching for &quot;latte&quot;, &quot;focaccia&quot;, or &quot;croissant&quot;.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Atmospheric Space Section */}
      <section id="location" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#967C69] font-bold block mb-2">
                Sanctuary in Kothrud
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#1C1612] leading-tight">
                Our Physical Space
              </h2>
            </div>

            <p className="text-[#6B5748] text-base leading-relaxed font-light">
              Tucked away opposite Ashish Garden in Kothrud, Velvet &amp; Bean is conceived as an escape from the city rush. Come for the aroma of whole beans roasted on-site and sourdough rising in the ovens.
            </p>

            <div className="space-y-5 pt-2">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#EFE7DC]/50 border border-[#DECFBE]">
                <div className="w-10 h-10 rounded-full bg-[#EFE7DC] border border-[#DECFBE] flex items-center justify-center flex-shrink-0 text-[#7E4F28]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1C1612] uppercase tracking-wider">Address</p>
                  <p className="text-sm text-[#6B5748] mt-0.5">Muktai Apartment, opposite Ashish Garden, Kothrud, Pune - 411038</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#EFE7DC]/50 border border-[#DECFBE]">
                <div className="w-10 h-10 rounded-full bg-[#EFE7DC] border border-[#DECFBE] flex items-center justify-center flex-shrink-0 text-[#7E4F28]">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1C1612] uppercase tracking-wider">Bakehouse Hours</p>
                  <p className="text-sm text-[#6B5748] mt-0.5">Monday – Sunday &bull; 8:00 AM – 11:00 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#EFE7DC]/50 border border-[#DECFBE]">
                <div className="w-10 h-10 rounded-full bg-[#EFE7DC] border border-[#DECFBE] flex items-center justify-center flex-shrink-0 text-[#7E4F28]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1C1612] uppercase tracking-wider">Direct Concierge</p>
                  <a href="tel:+917447379014" className="text-sm text-[#7E4F28] hover:underline font-medium mt-0.5 block">
                    +91 7447379014
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Clean Map Frame */}
          <div className="h-96 lg:h-[460px] rounded-3xl overflow-hidden border border-[#DECFBE] shadow-lg bg-[#EFE7DC]">
            <iframe 
              title="Velvet and Bean Cafe Location"
              src="https://maps.google.com/maps?q=Ashish%20Garden%2C%20DP%20Road%2C%20Kothrud%2C%20Pune%2C%20Maharashtra%20411038&t=&z=16&ie=UTF8&iwloc=&output=embed" 
              className="w-full h-full border-0"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* Bag / Order Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-[#1C1612]/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-[#FAF7F2] h-full flex flex-col p-6 sm:p-8 shadow-2xl justify-between border-l border-[#E8DFD3]">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#E8DFD3]">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-5 h-5 text-[#7E4F28]" />
                  <h2 className="font-serif text-2xl font-normal text-[#1C1612]">Your Order Bag</h2>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)} 
                  className="p-1.5 rounded-full text-[#7A6656] hover:text-[#1C1612] hover:bg-[#EFE7DC] transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="overflow-y-auto max-h-[60vh] py-6 space-y-4 no-scrollbar">
                {cart.length === 0 ? (
                  <div className="py-20 text-center space-y-3">
                    <p className="font-serif text-xl text-[#1C1612]">Your bag is currently empty</p>
                    <p className="text-xs text-[#8A7768]">Choose freshly ground coffee or hot bakes from our menu.</p>
                  </div>
                ) : (
                  cart.map((x) => (
                    <div key={x.item.id} className="flex items-center justify-between border-b border-[#E8DFD3] pb-4">
                      <div>
                        <p className="font-medium text-sm text-[#1C1612]">{x.item.name}</p>
                        <p className="text-xs text-[#8A7768] mt-0.5 font-mono">₹{x.item.price} each</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-[#DECFBE] rounded-lg bg-white overflow-hidden shadow-2xs">
                          <button 
                            onClick={() => updateQuantity(x.item.id, -1)} 
                            className="p-1.5 hover:bg-[#EFE7DC] text-[#6B5748] transition"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-semibold px-2 text-[#1C1612]">{x.qty}</span>
                          <button 
                            onClick={() => updateQuantity(x.item.id, 1)} 
                            className="p-1.5 hover:bg-[#EFE7DC] text-[#6B5748] transition"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="font-mono text-sm font-semibold w-14 text-right text-[#1C1612]">
                          ₹{x.item.price * x.qty}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {cart.length > 0 && (
              <div className="border-t border-[#E8DFD3] pt-6 space-y-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#6B5748]">Estimated Total</span>
                  <span className="font-mono text-2xl font-bold text-[#1C1612]">₹{total}</span>
                </div>
                <button 
                  onClick={orderWhatsApp} 
                  className="w-full flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white py-4 rounded-full text-xs uppercase font-semibold tracking-wider transition shadow-md active:scale-95"
                >
                  <Send className="w-4 h-4" /> Order via WhatsApp Pickup
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Boutique Footer */}
      <footer className="bg-[#1C1612] text-[#D4C3B3] py-14 px-6 lg:px-12 border-t border-[#2D231D]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div>
            <p className="font-serif text-2xl font-normal text-[#FAF7F2]">Velvet &amp; Bean</p>
            <p className="text-xs text-[#967C69] mt-1 tracking-wider uppercase">Artisanal Coffee Bar &bull; Bakehouse &bull; Pune</p>
          </div>
          <div className="flex items-center gap-6 text-xs text-[#967C69] tracking-wider">
            <span>Muktai Apt, opp. Ashish Garden</span>
            <span>&bull;</span>
            <a href="tel:+917447379014" className="hover:text-[#FAF7F2] transition">+91 7447379014</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
