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
  Lock
} from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'All Items' },
  { id: 'coffee', label: 'Hot Brews' },
  { id: 'cold-beverages', label: 'Cold Sips & Shakes' },
  { id: 'breakfast', label: 'Egg & Sourdough' },
  { id: 'bites', label: 'Bites & Salads' },
  { id: 'sandwiches', label: 'Sandwiches & Toasts' },
  { id: 'pasta', label: 'Pasta' },
  { id: 'burgers', label: 'Burgers' },
  { id: 'desserts', label: 'Desserts' },
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
            image: d.image ? urlFor(d.image).width(700).url() : MENU_ITEMS[0].image,
          }));
          setItems([...live, ...MENU_ITEMS]);
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
    msg += '------------------------------\n';
    cart.forEach((x) => {
      msg += `• ${x.item.name} (x${x.qty}) — ₹${x.item.price * x.qty}\n`;
    });
    msg += '------------------------------\n';
    msg += `*Total Amount:* ₹${total}\n\n`;
    msg += '📍 *Pickup Location:* Muktai Apartment, opp. Ashish Garden, Kothrud\n';
    msg += 'Please confirm my order!';
    window.open(`https://wa.me/${cafePhoneNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#241A15] antialiased selection:bg-[#E8D8C8]">
      {/* Top Banner */}
      <div className="bg-[#241A15] text-[#D8C7B5] text-xs py-2 px-4 text-center tracking-wider font-light flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#C99E75]" />
        <span>Freshly roasted beans & morning sourdough baked daily in Kothrud</span>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#ECE3D8] transition-all">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#ECE3D8] flex items-center justify-center border border-[#DFD4C6]">
              <Coffee className="w-5 h-5 text-[#885830]" />
            </div>
            <div>
              <span className="font-serif text-2xl font-semibold tracking-tight text-[#241A15] block leading-none">
                Velvet &amp; Bean
              </span>
              <span className="text-[10px] tracking-widest uppercase text-[#9B7B63] font-mono">
                Artisanal Roastery &amp; Bakes
              </span>
            </div>
          </div>

          <nav className="flex items-center gap-5">
            <a href="#menu" className="hidden md:inline-block text-sm text-[#5C483A] hover:text-[#241A15] font-medium transition">
              Menu
            </a>
            <a href="#location" className="hidden md:inline-block text-sm text-[#5C483A] hover:text-[#241A15] font-medium transition">
              Find Us
            </a>

            {/* Secret / Authorized Admin Studio Access */}
            {isAdmin ? (
              <a 
                href="/studio"
                className="text-xs font-semibold text-[#885830] border border-[#885830] px-3.5 py-1.5 rounded-full hover:bg-[#885830] hover:text-[#FDFBF7] transition"
              >
                Studio CMS
              </a>
            ) : (
              <button 
                onClick={handleAdminAuth}
                className="text-[11px] text-[#A08A79] hover:text-[#5C483A] transition flex items-center gap-1 px-2 py-1"
                title="Staff login"
              >
                <Lock className="w-3 h-3" /> Staff
              </button>
            )}

            {/* Bag Button */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2.5 bg-[#241A15] hover:bg-[#3D2C22] text-[#FDFBF7] px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition shadow-sm hover:shadow"
            >
              <ShoppingBag className="w-4 h-4 text-[#C99E75]" />
              <span>Bag</span>
              {totalCount > 0 && (
                <span className="ml-1 bg-[#C99E75] text-[#241A15] text-[11px] font-bold px-2 py-0.2 rounded-full">
                  {totalCount}
                </span>
              )}
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 pt-16 pb-16 md:pt-20 md:pb-20 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-[#F1E9DF] border border-[#E3D6C8] px-4 py-1.5 rounded-full mb-6">
          <span className="w-2 h-2 rounded-full bg-[#885830] animate-pulse"></span>
          <span className="text-[11px] uppercase tracking-widest text-[#734E2F] font-semibold">
            Specialty Coffee &amp; French Bakes
          </span>
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-[#241A15] leading-[1.1] tracking-tight">
          Where slow craft <br />
          <span className="italic font-light text-[#885830]">meets quiet mornings.</span>
        </h1>

        <p className="mt-5 text-base sm:text-lg text-[#6E5848] max-w-2xl mx-auto font-light leading-relaxed">
          Pour-overs steeped with care, wild-fermented sourdough, hand-laminated focaccia, and bistro specialties.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a 
            href="#menu" 
            className="inline-flex items-center gap-2 bg-[#241A15] text-[#FDFBF7] px-7 py-3.5 rounded-full text-sm font-medium hover:bg-[#3D2C22] transition shadow-sm"
          >
            Explore Menu <ArrowRight className="w-4 h-4 text-[#C99E75]" />
          </a>
          <a 
            href="#location" 
            className="inline-flex items-center gap-2 bg-transparent text-[#241A15] border border-[#D5C6B5] hover:border-[#241A15] px-7 py-3.5 rounded-full text-sm font-medium transition"
          >
            Visit Our Space
          </a>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-16 px-6 bg-white border-y border-[#ECE3D8]">
        <div className="max-w-6xl mx-auto">
          {/* Header & Search */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <span className="text-[11px] uppercase tracking-widest text-[#9B7B63] font-semibold block mb-1">
                Artisanal Kitchen &amp; Bar
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#241A15]">
                Our Offerings
              </h2>
            </div>

            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-[#9B7B63] absolute left-4 top-1/2 -translate-y-1/2" />
              <input 
                type="text"
                placeholder="Search food or coffee..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-full border border-[#DFD4C6] bg-[#FDFBF7] text-sm text-[#241A15] placeholder-[#A08A79] focus:outline-none focus:ring-2 focus:ring-[#885830]/30 transition"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-14 no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-[#241A15] text-[#FDFBF7] shadow-sm'
                    : 'bg-[#F7F2EC] text-[#6E5848] hover:bg-[#EDE3D7]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grouped Categorized Sections */}
          <div className="space-y-16">
            {groupedCategories.map((group) => (
              <div key={group.id} className="space-y-6">
                <div className="flex items-center gap-4 pb-3 border-b border-[#ECE3D8]">
                  <h3 className="font-serif text-2xl font-normal text-[#241A15]">
                    {group.label}
                  </h3>
                  <span className="text-xs text-[#9B7B63] font-mono">
                    ({group.items.length} {group.items.length === 1 ? 'item' : 'items'})
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                  {group.items.map((item) => (
                    <div 
                      key={item.id} 
                      className="group bg-[#FDFBF7] border border-[#ECE3D8] rounded-2xl overflow-hidden hover:border-[#D5C6B5] hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                    >
                      <div>
                        <div className="relative h-52 w-full overflow-hidden bg-[#EFE9E0]">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                          />
                          {item.badge && (
                            <span className="absolute top-3.5 left-3.5 bg-[#241A15]/85 backdrop-blur-md text-[#EFE9E0] text-[10px] uppercase font-semibold tracking-wider px-3 py-1 rounded-full">
                              {item.badge}
                            </span>
                          )}
                        </div>

                        <div className="p-5">
                          <div className="flex items-baseline justify-between gap-2 mb-2">
                            <h4 className="font-serif text-lg font-normal text-[#241A15] group-hover:text-[#885830] transition leading-snug">
                              {item.name}
                            </h4>
                            <span className="font-mono text-base font-semibold text-[#241A15] whitespace-nowrap">
                              ₹{item.price}
                            </span>
                          </div>
                          <p className="text-xs text-[#7A6453] leading-relaxed line-clamp-2 font-light">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      <div className="px-5 pb-5 pt-0">
                        <button
                          onClick={() => addToCart(item)}
                          className="w-full flex items-center justify-center gap-2 py-2.5 bg-white border border-[#DFD4C6] hover:bg-[#241A15] hover:text-[#FDFBF7] hover:border-[#241A15] rounded-xl text-xs font-semibold tracking-wide uppercase transition-all duration-200"
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
              <div className="py-20 text-center">
                <p className="text-[#8A7565] text-sm">No dishes match your search query.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="py-20 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div>
              <span className="text-[11px] uppercase tracking-widest text-[#9B7B63] font-semibold block mb-1">
                Neighborhood Bistro &amp; Café
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#241A15]">
                Visit Us in Kothrud
              </h2>
            </div>

            <p className="text-[#6E5848] text-sm leading-relaxed font-light">
              Muktai Apartment, opposite Ashish Garden in Kothrud. Drop in for quiet mornings, afternoon coffees, or pick up your pre-orders.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#EFE9E0] flex items-center justify-center flex-shrink-0 text-[#885830]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#241A15] uppercase tracking-wider">Address</p>
                  <p className="text-sm text-[#6E5848]">Muktai Apartment, opposite Ashish Garden, Kothrud, Pune - 411038</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#EFE9E0] flex items-center justify-center flex-shrink-0 text-[#885830]">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#241A15] uppercase tracking-wider">Hours</p>
                  <p className="text-sm text-[#6E5848]">Monday – Sunday: 8:00 AM – 11:00 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#EFE9E0] flex items-center justify-center flex-shrink-0 text-[#885830]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#241A15] uppercase tracking-wider">Phone</p>
                  <a href="tel:+917447379014" className="text-sm text-[#885830] hover:underline font-medium">
                    +91 7447379014
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="h-80 lg:h-96 rounded-2xl overflow-hidden border border-[#ECE3D8] shadow-sm bg-[#EFE9E0]">
            <iframe 
              title="Velvet & Bean Location"
              src="https://maps.google.com/maps?q=Ashish%20Garden%2C%20DP%20Road%2C%20Kothrud%2C%20Pune%2C%20Maharashtra%20411038&t=&z=16&ie=UTF8&iwloc=&output=embed" 
              className="w-full h-full border-0"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* Bag / Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-[#241A15]/50 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-[#FDFBF7] h-full flex flex-col p-6 sm:p-8 shadow-2xl justify-between border-l border-[#ECE3D8]">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-[#ECE3D8]">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-5 h-5 text-[#885830]" />
                  <h2 className="font-serif text-2xl font-normal text-[#241A15]">Your Bag</h2>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)} 
                  className="p-1 rounded-full text-[#7A6453] hover:text-[#241A15] hover:bg-[#EFE9E0] transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="overflow-y-auto max-h-[60vh] py-6 space-y-4 no-scrollbar">
                {cart.length === 0 ? (
                  <div className="py-20 text-center space-y-2">
                    <p className="font-serif text-lg text-[#241A15]">Your bag is empty</p>
                    <p className="text-xs text-[#8A7565]">Select freshly prepared dishes or brews from the menu.</p>
                  </div>
                ) : (
                  cart.map((x) => (
                    <div key={x.item.id} className="flex items-center justify-between border-b border-[#ECE3D8] pb-4">
                      <div>
                        <p className="font-medium text-sm text-[#241A15]">{x.item.name}</p>
                        <p className="text-xs text-[#8A7565] mt-0.5">₹{x.item.price} each</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-[#DFD4C6] rounded-lg bg-white overflow-hidden">
                          <button 
                            onClick={() => updateQuantity(x.item.id, -1)} 
                            className="p-1.5 hover:bg-[#EFE9E0] text-[#5C483A] transition"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-semibold px-2 text-[#241A15]">{x.qty}</span>
                          <button 
                            onClick={() => updateQuantity(x.item.id, 1)} 
                            className="p-1.5 hover:bg-[#EFE9E0] text-[#5C483A] transition"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="font-mono text-sm font-semibold w-14 text-right text-[#241A15]">
                          ₹{x.item.price * x.qty}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {cart.length > 0 && (
              <div className="border-t border-[#ECE3D8] pt-6 space-y-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm font-light text-[#6E5848]">Estimated Total</span>
                  <span className="font-mono text-2xl font-semibold text-[#241A15]">₹{total}</span>
                </div>
                <button 
                  onClick={orderWhatsApp} 
                  className="w-full flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white py-3.5 rounded-full text-xs uppercase font-semibold tracking-wider transition shadow-md"
                >
                  <Send className="w-4 h-4" /> Order via WhatsApp Pickup
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#241A15] text-[#D8C7B5] py-12 px-6 border-t border-[#3D2C22]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <p className="font-serif text-xl font-normal text-[#FDFBF7]">Velvet &amp; Bean</p>
            <p className="text-xs text-[#9B7B63] mt-1">Artisanal Coffee &amp; Bistro • Pune</p>
          </div>
          <div className="flex items-center gap-6 text-xs text-[#9B7B63]">
            <span>Muktai Apt, opp. Ashish Garden</span>
            <span>•</span>
            <a href="tel:+917447379014" className="hover:text-[#FDFBF7] transition">+91 7447379014</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
