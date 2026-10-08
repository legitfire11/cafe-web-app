export interface MenuItem {
  id: string;
  name: string;
  category: 'coffee' | 'cold-beverages' | 'breakfast' | 'bites' | 'sandwiches' | 'pasta' | 'burgers' | 'desserts';
  price: number;
  description: string;
  image: string;
  badge?: string;
}

export const MENU_ITEMS: MenuItem[] = [
  // --- HOT BREWS & COFFEE ---
  {
    id: 'hot-1',
    name: 'Espresso',
    category: 'coffee',
    price: 120,
    description: 'Intense, aromatic double shot of single-origin roasted Arabica.',
    image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?auto=format&fit=crop&w=800&q=80',
    badge: 'Single Origin'
  },
  {
    id: 'hot-2',
    name: 'Cappuccino',
    category: 'coffee',
    price: 180,
    description: 'Velvety espresso balanced with equal parts steamed milk and microfoam.',
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80',
    badge: 'House Favorite'
  },
  {
    id: 'hot-3',
    name: 'Café Americano',
    category: 'coffee',
    price: 190,
    description: 'Rich espresso shots topped with hot mineral water for a smooth, deep profile.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'hot-4',
    name: 'Café Mocha',
    category: 'coffee',
    price: 190,
    description: 'Rich espresso blended with dark artisanal cocoa and velvety steamed milk.',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'hot-5',
    name: 'Hot Chocolate',
    category: 'coffee',
    price: 250,
    description: 'Decadent Belgian molten chocolate whisked with rich whole milk.',
    image: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=800&q=80',
    badge: 'Belgian Cocoa'
  },
  {
    id: 'hot-6',
    name: 'Pistachio Affogato',
    category: 'coffee',
    price: 250,
    description: 'Creamy pistachio gelato drowned in a hot shot of bold espresso.',
    image: 'https://images.unsplash.com/photo-1592663527359-cf6642f54cff?auto=format&fit=crop&w=800&q=80',
    badge: 'Chef Signature'
  },
  {
    id: 'hot-7',
    name: 'Café Viennois',
    category: 'coffee',
    price: 220,
    description: 'Traditional light brew topped with a generous swirl of whipped chantilly cream.',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'hot-8',
    name: 'Matcha Latte',
    category: 'coffee',
    price: 230,
    description: 'Ceremonial grade stone-ground Japanese green tea with warm oat milk.',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'hot-9',
    name: 'Organic Green Tea',
    category: 'coffee',
    price: 120,
    description: 'Steeped delicate whole-leaf green tea rich in antioxidants.',
    image: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?auto=format&fit=crop&w=800&q=80'
  },

  // --- COLD BREWS, MILKSHAKES & SIPS ---
  {
    id: 'cold-1',
    name: 'Iced Latte',
    category: 'cold-beverages',
    price: 190,
    description: 'Chilled milk over cracked ice layered with bold fresh espresso.',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cold-2',
    name: 'Iced Mocha',
    category: 'cold-beverages',
    price: 210,
    description: 'Chilled chocolate ganache, double espresso, and milk over ice.',
    image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cold-3',
    name: 'Iced Americano',
    category: 'cold-beverages',
    price: 180,
    description: 'Crisp cold mineral water poured over double espresso and rocks.',
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cold-4',
    name: 'Café Frappuccino',
    category: 'cold-beverages',
    price: 200,
    description: 'Blended espresso shake crowned with whipped cream and caramel drizzle.',
    image: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cold-5',
    name: 'Vietnamese Iced Coffee',
    category: 'cold-beverages',
    price: 220,
    description: 'Dark French roast slow-dripped over thick sweet condensed milk.',
    image: 'https://images.unsplash.com/photo-1587080413959-06b859fb107d?auto=format&fit=crop&w=800&q=80',
    badge: 'Popular'
  },
  {
    id: 'cold-6',
    name: 'Signature Cold Coffee (Espresso Blend)',
    category: 'cold-beverages',
    price: 220,
    description: 'Thick, creamy café-style blended cold brew topped with cocoa dust.',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cold-7',
    name: 'Cookie Nutella Milkshake',
    category: 'cold-beverages',
    price: 250,
    description: 'Rich hazelnut Nutella shake blended with crushed dark cookies.',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',
    badge: 'Sweet Tooth'
  },
  {
    id: 'cold-8',
    name: 'Salted Caramel Milkshake',
    category: 'cold-beverages',
    price: 240,
    description: 'Buttery caramel blended with Himalayan pink salt and vanilla bean cream.',
    image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cold-9',
    name: 'Mixed Berry Milkshake',
    category: 'cold-beverages',
    price: 240,
    description: 'Fresh blueberry, raspberry, and strawberry puree whipped with ice cream.',
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cold-10',
    name: 'Virgin Mojito',
    category: 'cold-beverages',
    price: 200,
    description: 'Muddled fresh garden mint, Persian lime, and sparkling soda on crushed ice.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cold-11',
    name: 'Blue Lagoon Sparkling Soda',
    category: 'cold-beverages',
    price: 180,
    description: 'Electric blue curaçao syrup infused with lemon fizz and citrus wheel.',
    image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cold-12',
    name: 'Peach Iced Tea',
    category: 'cold-beverages',
    price: 179,
    description: 'Black Ceylon tea brewed fresh with aromatic yellow peach nectar.',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80'
  },

  // --- EGG PREPARATIONS (SERVED WITH SOURDOUGH) ---
  {
    id: 'egg-1',
    name: 'Classic Omelette with Sourdough',
    category: 'breakfast',
    price: 150,
    description: 'Fluffy country-style eggs folded with butter, served alongside toasted sourdough.',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'egg-2',
    name: 'Sunny Side-Up with Sourdough',
    category: 'breakfast',
    price: 150,
    description: 'Two golden runny yolks pan-crisped with herbs, served with rustic sourdough.',
    image: 'https://images.unsplash.com/photo-1582169296194-e4d644c48063?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'egg-3',
    name: 'Creamy Scrambled Egg with Sourdough',
    category: 'breakfast',
    price: 150,
    description: 'Slow-folded soft curd scrambled eggs with French butter and chives.',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80',
    badge: 'Morning Classic'
  },

  // --- PETIT PORTIONS & SALADS ---
  {
    id: 'bites-1',
    name: 'Potato Wedges (Peri-Peri / Cheese)',
    category: 'bites',
    price: 140,
    description: 'Crispy skin-on roasted potato wedges tossed in hot peri-peri or warm cheddar sauce.',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'bites-2',
    name: 'French Fries (Normal / Cheese)',
    category: 'bites',
    price: 140,
    description: 'Golden, crispy shoestring potatoes salted to perfection with dip.',
    image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'bites-3',
    name: 'Crispy Chicken Popcorn',
    category: 'bites',
    price: 260,
    description: 'Bite-sized spiced buttermilk fried chicken served with garlic aioli.',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80',
    badge: 'Non-Veg'
  },
  {
    id: 'bites-4',
    name: 'Gooey Mozzarella Sticks',
    category: 'bites',
    price: 260,
    description: 'Crumb-fried mozzarella logs with stringy cheese pull and marinara dip.',
    image: 'https://images.unsplash.com/photo-1531749668029-2db88e4276c7?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'bites-5',
    name: 'Chicken Caesar Salad',
    category: 'bites',
    price: 270,
    description: 'Crispy lettuce tossed in homemade Caesar dressing, grilled chicken, egg, and sourdough croutons.',
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=800&q=80',
    badge: 'Non-Veg'
  },
  {
    id: 'bites-6',
    name: 'Grilled Veggie & Feta Salad',
    category: 'bites',
    price: 270,
    description: 'Charred zucchini, bell peppers, fresh greens, and toasted nuts topped with crumbled feta cheese.',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80'
  },

  // --- TOASTS & FOCACCIA SANDWICHES ---
  {
    id: 'sand-1',
    name: 'Signature Pesto Chicken Focaccia',
    category: 'sandwiches',
    price: 290,
    description: 'Grilled chicken and homemade earthy basil pesto tucked inside fresh sourdough focaccia.',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80',
    badge: 'Chef Signature'
  },
  {
    id: 'sand-2',
    name: 'Golden Mustard Chicken Focaccia',
    category: 'sandwiches',
    price: 290,
    description: 'Tender chicken and Dijon mustard dressing inside freshly baked sourdough focaccia.',
    image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=800&q=80',
    badge: 'Non-Veg'
  },
  {
    id: 'sand-3',
    name: 'Croque Madame',
    category: 'sandwiches',
    price: 270,
    description: 'Classic French toasted sandwich with smoked ham, melted cheese, and béchamel sauce topped with a sunny side-up egg.',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
    badge: 'Parisian Classic'
  },
  {
    id: 'sand-4',
    name: 'Paneer Picante Focaccia',
    category: 'sandwiches',
    price: 280,
    description: 'Spiced cottage cheese and charred bell peppers in piquant sauce inside sourdough focaccia.',
    image: 'https://images.unsplash.com/photo-1619860860774-1e2e17343432?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'sand-5',
    name: 'Mushroom à la Crème Focaccia',
    category: 'sandwiches',
    price: 280,
    description: 'Sautéed forest mushrooms in rich creamy garlic sauce with melted cheese on focaccia.',
    image: 'https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'sand-6',
    name: 'Cream Cheese & Cherry Tomato Toast',
    category: 'sandwiches',
    price: 250,
    description: 'Artisanal toasted sourdough slathered with whipped cream cheese and confit cherry tomatoes with extra virgin olive oil.',
    image: 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?auto=format&fit=crop&w=800&q=80',
    badge: 'Artisan Bake'
  },
  {
    id: 'sand-7',
    name: 'Cheese Garlic Baguette',
    category: 'sandwiches',
    price: 190,
    description: 'Crusty toasted French baguette loaded with roasted garlic butter and melted mozzarella.',
    image: 'https://images.unsplash.com/photo-1619860860774-1e2e17343432?auto=format&fit=crop&w=800&q=80'
  },

  // --- ARTISANAL PASTA ---
  {
    id: 'pasta-1',
    name: 'Creamy Pesto Pasta',
    category: 'pasta',
    price: 290,
    description: 'Al dente penne pasta coated in a rustic pine-nut basil cream sauce.',
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d62810a9?auto=format&fit=crop&w=800&q=80',
    badge: 'Bestseller'
  },
  {
    id: 'pasta-2',
    name: 'Classic Aglio Olio Spaghetti',
    category: 'pasta',
    price: 340,
    description: 'Spaghetti tossed with cold-pressed olive oil, toasted sliced garlic, chili flakes, and Italian herbs.',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pasta-3',
    name: 'Alfredo Pasta',
    category: 'pasta',
    price: 290,
    description: 'Farfalle bow-ties smothered in dense, cheesy béchamel and Parmesan sauce.',
    image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pasta-4',
    name: 'Penne Arrabiata',
    category: 'pasta',
    price: 290,
    description: 'Penne in spicy San Marzano tomato sauce infused with garlic, chili, and olive oil.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80'
  },

  // --- BURGERS ---
  {
    id: 'burg-1',
    name: 'Crispy Cottage Cheese Burger',
    category: 'burgers',
    price: 290,
    description: 'Crunchy paneer patty, Thousand Island sauce, fresh greens, and cheese in a soft brioche bun.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'burg-2',
    name: 'Barbeque Chicken Burger',
    category: 'burgers',
    price: 300,
    description: 'Grilled chicken breast basted in smoky BBQ glaze, topped with pickled gherkins and cheddar.',
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=800&q=80',
    badge: 'Non-Veg'
  },
  {
    id: 'burg-3',
    name: 'Crispy Chicken Burger',
    category: 'burgers',
    price: 300,
    description: 'Southern spiced fried chicken breast, thousand island mayo, and lettuce in a toasted bun.',
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=800&q=80',
    badge: 'Non-Veg'
  },

  // --- DESSERTS ---
  {
    id: 'des-1',
    name: 'Artisanal Tiramisu',
    category: 'desserts',
    price: 260,
    description: 'House-baked ladyfinger biscuits soaked in dark espresso and rum, layered with light mascarpone.',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80',
    badge: 'House Special'
  },
  {
    id: 'des-2',
    name: 'Blueberry / Nutella Cheesecake',
    category: 'desserts',
    price: 250,
    description: 'Dense New York-style baked cream cheese cake with sweet wild blueberry compote.',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'des-3',
    name: 'Vanilla Crème Brûlée',
    category: 'desserts',
    price: 290,
    description: 'Classical French baked vanilla pod custard cracked open under a torch-caramelized sugar crust.',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    badge: 'French Classic'
  },
  {
    id: 'des-4',
    name: 'Tres Leches Rose',
    category: 'desserts',
    price: 260,
    description: 'Sponge cake soaked in three decadent milks, delicately infused with Persian rose water.',
    image: 'https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?auto=format&fit=crop&w=800&q=80'
  }
];
