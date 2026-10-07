'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { client } from '@/sanity/client';
import { urlFor } from '@/sanity/image';
import { MENU_ITEMS, MenuItem } from '@/data/menuData';
import { Coffee, ShoppingBag, Plus, Minus, Send, MapPin, Clock, Phone } from 'lucide-react';

export default function CafeLandingPage() {
  const [items, setItems] = useState<MenuItem[]>(MENU_ITEMS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cart, setCart] = useState<{ item: MenuItem; qty: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    async function loadMenu() {
      try {
        const data = await client.fetch('*[_type == "menuItem"] | order(_createdAt desc)');
        if (Array.isArray(data) && data.length > 0) {
          const live: MenuItem[] = data.map((d: any) => ({
            id: d._id,
            name: d.name,
            category: (d.category?.toLowerCase() === 'pastry' || d.category?.toLowerCase() === 'artisan pastry') ? 'pastry' : (d.category?.toLowerCase() || 'coffee'),
            price: d.price || 0,
            description: d.description || '',
            badge: d.badge,
            image: d.image ? urlFor(d.image).width(600).url() : MENU_ITEMS[0].image,
          }));
          setItems([...live, ...MENU_ITEMS]);
        }
      } catch (e) {
        console.error('Sanity fetch error:', e);
      }
    }
    loadMenu();
  }, []);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
      const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [items, selectedCategory, searchQuery]);

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
  
  let msg = '☕ *New Cafe Order*\n\n';
  cart.forEach((x) => {
    msg += `• ${x.item.name} x${x.qty} - ₹${x.item.price * x.qty}\n`;
  });
  msg += `\n*Total: ₹${total}*\n\nPlease confirm my pickup order!`;

  // encodeURIComponent safely converts &, newlines, and emojis
  const encodedText = encodeURIComponent(msg);
  window.open(`https://wa.me/${cafePhoneNumber}?text=${encodedText}`, '_blank');
};

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2D241E] font-sans antialiased">
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#EAE3D9] px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Coffee className="w-6 h-6 text-[#9A6B43]" />
            <span className="text-2xl font-bold tracking-tight">Velvet & Bean</span>
          </div>

          <div className="flex items-center gap-4">
            <a href="#menu" className="hidden sm:inline-block text-sm font-medium hover:text-[#9A6B43] transition">Menu</a>
            <a href="#location" className="hidden sm:inline-block text-sm font-medium hover:text-[#9A6B43] transition">Visit Us</a>
            <a href="/studio" className="text-xs font-semibold text-[#9A6B43] border border-[#9A6B43] px-3 py-1 rounded-full hover:bg-[#9A6B43] hover:text-white transition">
              Admin CMS
            </a>
            
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 bg-[#2D241E] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#43362C] transition shadow-sm"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Bag</span>
              {totalCount > 0 && (
                <span className="bg-[#9A6B43] text-white text-xs px-2 py-0.5 rounded-full font-bold">
                  {totalCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <section className="relative px-6 py-16 lg:py-24 max-w-5xl mx-auto text-center">
        <span className="text-xs uppercase tracking-widest text-[#9A6B43] font-semibold bg-[#F0E8DC] px-3 py-1 rounded-full">
          Artisanal Coffee & Daily Bakehouse
        </span>
        <h1 className="mt-6 text-4xl sm:text-6xl font-bold text-[#2D241E] leading-tight">
          Crafted Coffee, <br /> Freshly Baked Moments.
        </h1>
        <p className="mt-4 text-base sm:text-lg text-[#6B5E55] max-w-2xl mx-auto">
          Single-origin roasts, wild-fermented sourdough, and a cozy neighborhood atmosphere.
        </p>
      </section>

      <section id="menu" className="px-6 py-16 bg-white border-y border-[#EAE3D9]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <h2 className="text-3xl font-bold">Today's Offerings</h2>
              <p className="text-[#6B5E55] text-sm mt-1">Tap any item to add to your quick-pickup bag.</p>
            </div>
            <div className="w-full md:w-64">
              <input 
                type="text"
                placeholder="Search food or coffee..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-[#EAE3D9] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#9A6B43]"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
            {['all', 'coffee', 'pastry', 'brunch', 'cold-brew'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={"px-5 py-2 rounded-full text-sm font-medium capitalize whitespace-nowrap transition " + (selectedCategory === cat ? "bg-[#2D241E] text-white" : "bg-[#FAF7F2] text-[#6B5E55] hover:bg-[#F0E8DC]")}
              >
                {cat.replace('-', ' ')}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => (
              <div key={item.id} className="group border border-[#EAE3D9] rounded-2xl overflow-hidden bg-[#FAF7F2] hover:shadow-lg transition flex flex-col justify-between">
                <div className="relative h-48 w-full overflow-hidden bg-stone-100">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                  {item.badge && (
                    <span className="absolute top-3 left-3 bg-[#2D241E]/80 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-full font-medium">
                      {item.badge}
                    </span>
                  )}
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-lg">{item.name}</h3>
                      <span className="font-bold text-[#9A6B43]">₹{item.price}</span>
                    </div>
                    <p className="text-xs text-[#6B5E55] leading-relaxed mb-4">{item.description}</p>
                  </div>
                  <button
                    onClick={() => addToCart(item)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-white border border-[#D1C5B4] rounded-xl text-sm font-medium hover:bg-[#2D241E] hover:text-white transition"
                  >
                    <Plus className="w-4 h-4" /> Add to Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="location" className="px-6 py-16 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Visit Our Beloved Cafe </h2>
            <div className="flex items-start gap-3 text-sm text-[#6B5E55]">
              <MapPin className="w-5 h-5 text-[#9A6B43] mt-0.5 flex-shrink-0" />
              <span>Shop 4,MUKTAI APPRATMENT,OPPOSITE TO ASHISH GARDEN,KOTHRUD, PUNE-411038 MH</span>
            </div>
            <div className="flex items-start gap-3 text-sm text-[#6B5E55]">
              <Clock className="w-5 h-5 text-[#9A6B43] mt-0.5 flex-shrink-0" />
              <span>Mon – Sun: 10:00 AM – 11:00 PM</span>
            </div>
            <div className="flex items-start gap-3 text-sm text-[#6B5E55]">
              <Phone className="w-5 h-5 text-[#9A6B43] mt-0.5 flex-shrink-0" />
              <span>+91 7447379014 </span>
            </div>
          </div>
          <div className="h-64 rounded-2xl overflow-hidden border border-[#EAE3D9]">
            <iframe 
              title="Cafe Location"
              src="https://maps.google.com/maps?q=Ashish%20Garden%2C%20DP%20Road%2C%20Kothrud%2C%20Pune%2C%20Maharashtra%20411038&t=&z=16&ie=UTF8&iwloc=&output=embed" 
              className="w-full h-full border-0"
            />
          </div>
        </div>
      </section>

      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white h-full flex flex-col p-6 shadow-2xl justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b">
                <h2 className="font-bold text-xl flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5" /> Your Pickup Order
                </h2>
                <button onClick={() => setIsCartOpen(false)} className="text-stone-400 hover:text-black font-semibold text-lg">✕</button>
              </div>

              <div className="overflow-y-auto max-h-[60vh] py-4 space-y-4">
                {cart.length === 0 ? (
                  <p className="text-center py-16 text-stone-400 text-sm">Your bag is currently empty.</p>
                ) : (
                  cart.map((x) => (
                    <div key={x.item.id} className="flex items-center justify-between border-b pb-3 text-sm">
                      <div>
                        <p className="font-medium">{x.item.name}</p>
                        <p className="text-xs text-stone-500">₹{x.item.price} each</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQuantity(x.item.id, -1)} className="p-1 border rounded hover:bg-stone-100"><Minus className="w-3 h-3" /></button>
                        <span className="font-semibold text-xs px-1">{x.qty}</span>
                        <button onClick={() => updateQuantity(x.item.id, 1)} className="p-1 border rounded hover:bg-stone-100"><Plus className="w-3 h-3" /></button>
                        <span className="font-bold w-12 text-right">₹{x.item.price * x.qty}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {cart.length > 0 && (
              <div className="border-t pt-4 space-y-4">
                <div className="flex justify-between font-bold text-base">
                  <span>Subtotal</span>
                  <span>₹{total}</span>
                </div>
                <button onClick={orderWhatsApp} className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 rounded-xl font-medium shadow-md">
                  <Send className="w-4 h-4" /> Send Order via WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
