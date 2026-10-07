import { defineField, defineType } from 'sanity';

export const menuItem = defineType({
  name: 'menuItem',
  title: 'Menu Item',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Item Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Specialty Coffee', value: 'coffee' },
          { title: 'Cold Brew', value: 'cold-brew' },
          { title: 'Artisan Pastry', value: 'pastry' },
          { title: 'All-Day Brunch', value: 'brunch' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price (in ₹)',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'badge',
      title: 'Highlight Badge (Optional)',
      type: 'string',
      description: 'e.g. Bestseller, Fresh Daily, Chef Choice',
    }),
    defineField({
      name: 'image',
      title: 'Dish Photo',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isAvailable',
      title: 'Is Available?',
      type: 'boolean',
      initialValue: true,
      description: 'Turn off if sold out for the day.',
    }),
  ],
});