export interface MenuItem {
  id: string;
  name: string;
  category: 'coffee' | 'pastry' | 'brunch' | 'cold-brew';
  price: number;
  description: string;
  image: string;
  badge?: string;
}

export const MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'Artisan Pistachio Latte',
    category: 'coffee',
    price: 240,
    description: 'Double shot espresso, velvety oat milk, roasted pistachio cream.',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=600&q=80',
    badge: 'Bestseller',
  },
  {
    id: '2',
    name: 'Almond Butter Croissant',
    category: 'pastry',
    price: 180,
    description: 'Twice-baked butter croissant filled with almond frangipane.',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80',
    badge: 'Fresh Daily',
  },
  {
    id: '3',
    name: 'Avocado & Poached Egg Toast',
    category: 'brunch',
    price: 290,
    description: 'Toasted sourdough, Hass avocado mash, chili flakes, organic poached egg.',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '4',
    name: 'Nitro Cascara Cold Brew',
    category: 'cold-brew',
    price: 220,
    description: 'Steeped for 18 hours, infused with nitrogen for a creamy stout head.',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80',
    badge: 'Signature',
  },
  {
    id: '5',
    name: 'Vanilla Bean Basque Cheesecake',
    category: 'pastry',
    price: 260,
    description: 'Caramelized crust with an ultra-creamy custard center.',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '6',
    name: 'Truffle Mushroom Melt',
    category: 'brunch',
    price: 320,
    description: 'Sauteed wild mushrooms, aged cheddar, and white truffle oil on sourdough.',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80',
  },
];
