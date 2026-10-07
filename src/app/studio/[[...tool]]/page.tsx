'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { client } from '@/sanity/client';
import { urlFor } from '@/sanity/image';
import { MENU_ITEMS, MenuItem } from '@/data/menuData';
import { 
  Coffee, 
  ShoppingBag, 
  MapPin, 
  Clock, 
  Phone, 
  Plus, 
  Minus, 
  Send 
} from 'lucide-react';

interface CartItem extends MenuItem {
  quantity: number;
}

export default function CafeLandingPage() {
  const [items, setItems] = useState<MenuItem[]>(MENU_ITEMS);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Fetch live menu from Headless CMS (Sanity)
  useEffect(() => {
    async function fetchMenu() {
      try {
        const query = `*[_type == "menuItem" && isAvailable != false] | order(_createdAt desc)`;
        const liveData = await client.fetch(query);
        
        if (liveData && liveData.length > 0) {
          const formattedItems: MenuItem[] = liveData.map((d: any) => ({
            id: d._id,
            name: d.name,
            category: d.category,
            price: d.price,
            description: d.description || '',
            badge: d.badge || undefined,
            image: d.image ? urlFor(d.image).width(600).url() : '/placeholder.jpg',
          }));
          setItems(formattedItems);
        }
      } catch (err) {
        console.warn('Sanity fetch fallback to local data:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchMenu();
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [items, selectedCategory, searchQuery]);

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) => 
      prev.map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean) as CartItem[]
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;
    const cafePhoneNumber = '919876543210'; 

    let message = `*☕ New Order from Website*%0A%0A`;
    cart.forEach((item) => {
      message += `• ${item.name} x${item.quantity} - ₹${item.price * item.quantity}%0A`;
    });
    message += `%0A*Total Amount:* ₹${cartTotal}%0A%0APlease confirm my order!`;

    window.open(`https://wa.me/${cafePhoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2D241E] font-sans antialiased">
      {/* NAVBAR */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#EAE3D9] px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Coffee className="w-6 h-6 text-[#9A6B43]" />
            <span className="text-2xl font-bold tracking-tight">Velvet & Bean</span>
          </div>

          <div className="flex items-center gap-4">
            <a href="#menu" className="hidden sm:inline-block text-sm font-medium hover:text-[#9A6B43] transition">
              Menu
            </a>
            <a href="#location" className="hidden sm:inline-block text-sm font-medium hover:text-[#9A6B43] transition">
              Visit Us
            </a>
            <a href="/studio" className="hidden sm:inline-block text-xs font-semibold text-[#9A6B43] border border-[#9A6B43] px-2.5 py-1 rounded-full hover:bg-[#9A6B43] hover:text-white transition">
              Admin CMS
            </a>
            
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 bg-[#2D241E] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#43362C] transition shadow-sm"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Bag</span>
              {totalItemsCount > 0 && (
                <span className="bg-[#9A6B43] text-white text-xs px-2 py-0.5 rounded-full font-bold">
                  {totalItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative px-6 py-20 lg:py-28 max-w-6xl mx-auto text-center">
        <span className="text-xs uppercase tracking-widest text-[#9A6B43] font-semibold bg-[#F0E8DC] px-3 py-1 rounded-full">
          Artisanal Coffee & Daily Bakehouse
        </span>
        <h1 className="mt-6 text-4xl sm:text-6xl font-bold text-[#2D241E] leading-tight">
          Crafted Coffee, <br /> Freshly Baked Moments.
        </h1>
        <p className="mt-4 text-base sm:text-lg text-[#6B5E55] max-w-2xl mx-auto">
          Single-origin roasts, wild-fermented sourdough, and a cozy neighborhood atmosphere made for quiet mornings and heartfelt conversations.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a 
            href="#menu" 
            className="bg-[#9A6B43] hover:bg-[#835833] text-white font-medium px-6 py-3 rounded-full transition shadow-md"
          >
            Explore Today's Menu
          </a>
          <a 
            href="#location" 
            className="border border-[#D1C5B4] hover:bg-[#F0E8DC] text-[#2D241E] font-medium px-6 py-3 rounded-full transition"
          >
            Find Our Location
          </a>
        </div>
      </section>

      {/* MENU */}
      <section id="menu" className="px-6 py-16 bg-white border-y border-[#EAE3D9]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-3xl font-bold">Today's Offerings</h2>
                {loading && <span className="text-xs text-[#9A6B43] animate-pulse">Updating live...</span>}
              </div>
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

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
            {['all', 'coffee', 'cold-brew', 'pastry', 'brunch'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium capitalize whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? 'bg-[#2D241E] text-white'
                    : 'bg-[#FAF7F2] text-[#6B5E55] hover:bg-[#F0E8DC]'
                }`}
              >
                {cat.replace('-', ' ')}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div 
                key={item.id} 
                className="group border border-[#EAE3D9] rounded-2xl overflow-hidden bg-[#FAF7F2] hover:shadow-lg transition duration-200 flex flex-col justify-between"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
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

      {/* LOCATION */}
      <section id="location" className="px-6 py-16 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Visit Our Sanctuary</h2>
            <p className="text-[#6B5E55] leading-relaxed">
              Tucked away right in your neighborhood. Ample indoor natural light, high-speed Wi-Fi, and outdoor patio seating available.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#9A6B43] mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm">Location</p>
                  <p className="text-sm text-[#6B5E55]">Shop 4, Lane 5, Main High Street, Pune, MH</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#9A6B43] mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm">Operating Hours</p>
                  <p className="text-sm text-[#6B5E55]">Mon – Fri: 7:30 AM – 10:00 PM</p>
                  <p className="text-sm text-[#6B5E55]">Sat – Sun: 8:00 AM – 11:00 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#9A6B43] mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm">Reservations & Queries</p>
                  <p className="text-sm text-[#6B5E55]">+91 98765 43210</p>
                </div>
              </div>
            </div>
          </div>

          <div className="h-72 rounded-2xl overflow-hidden border border-[#EAE3D9] bg-stone-200">
            <iframe 
              title="Cafe Location Map"
              src="https://maps.google.com/maps?q=Pune&t=&z=13&ie=UTF8&iwloc=&output=embed" 
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* CART DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white h-full flex flex-col p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b">
              <h2 className="font-bold text-xl flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" /> Your Pickup Order
              </h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-gray-400 hover:text-black font-semibold text-lg"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-16 text-stone-400">
                  <p>Your bag is currently empty.</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between border-b pb-3">
                    <div>
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-stone-500">₹{item.price} each</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center border rounded-lg overflow-hidden">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)} 
                          className="px-2 py-1 hover:bg-stone-100"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)} 
                          className="px-2 py-1 hover:bg-stone-100"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="font-bold text-sm w-14 text-right">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t pt-4 space-y-4">
                <div className="flex items-center justify-between text-base font-bold">
                  <span>Subtotal</span>
                  <span>₹{cartTotal}</span>
                </div>
                
                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white py-3 rounded-xl font-medium transition shadow-md"
                >
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