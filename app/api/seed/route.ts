import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Category from '@/lib/models/Category';
import Product from '@/lib/models/Product';
import Gift from '@/models/Gift';

export async function GET() {
  try {
    await connectDB();

    // Clear existing data
    await Category.deleteMany({});
    await Product.deleteMany({});
    await Gift.deleteMany({});

    const giftsData = [
      {
        name: 'Executive Tech & Wellness Kit',
        description: 'Complete employee appreciation package including noise-canceling headphones, thermal flask, and leather notebook.',
        price: 149.99,
        category: 'Employee Kits',
        imageUrl: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&auto=format&fit=crop&q=80',
        minOrderQuantity: 10,
        customizationAvailable: true,
        rating: 4.9,
        bestseller: true
      },
      {
        name: 'ANC Wireless Headphones',
        description: 'High-fidelity audio with active noise cancellation and custom laser-engraved corporate logo.',
        price: 99.00,
        category: 'Electronics',
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
        minOrderQuantity: 5,
        customizationAvailable: true,
        rating: 4.8,
        bestseller: true
      },
      {
        name: 'Premium Leather Work Tote',
        description: 'Full-grain leather brief tote with laptop compartment and custom debossed company logo.',
        price: 79.50,
        category: 'Bags',
        imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&auto=format&fit=crop&q=80',
        minOrderQuantity: 15,
        customizationAvailable: true,
        rating: 4.7
      },
      {
        name: 'Custom Organic Polo Apparel',
        description: 'Breathable organic cotton polo shirt with high-density embroidered corporate branding.',
        price: 38.00,
        category: 'Apparel',
        imageUrl: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&auto=format&fit=crop&q=80',
        minOrderQuantity: 20,
        customizationAvailable: true,
        rating: 4.6
      },
      {
        name: 'Smart Insulated Hydration Flask',
        description: 'Double-wall vacuum flask with digital LED temperature display and matte powder coating.',
        price: 29.99,
        category: 'Drinkware',
        imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop&q=80',
        minOrderQuantity: 25,
        customizationAvailable: true,
        rating: 4.9,
        bestseller: true
      },
      {
        name: 'Artisanal Gourmet Celebration Hamper',
        description: 'Curated organic chocolates, dried fruits, premium teas, and artisanal snacks in wooden crate.',
        price: 119.00,
        category: 'Gift Hampers',
        imageUrl: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=600&auto=format&fit=crop&q=80',
        minOrderQuantity: 10,
        customizationAvailable: true,
        rating: 5.0,
        bestseller: true
      },
      {
        name: 'Hardcover Leather Journal & Pen Set',
        description: 'FSC-certified bamboo notebook with luxury metal ballpoint pen and custom foil stamping.',
        price: 22.50,
        category: 'Stationery',
        imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80',
        minOrderQuantity: 30,
        customizationAvailable: true,
        rating: 4.5
      },
      {
        name: 'Universal Digital Reward Gift Card',
        description: 'Instant digital gift card redeemable across 500+ global brands and experiences.',
        price: 50.00,
        category: 'Gift Cards',
        imageUrl: 'https://images.unsplash.com/photo-1556742049-0a67d57a3e74?w=600&auto=format&fit=crop&q=80',
        minOrderQuantity: 1,
        customizationAvailable: true,
        rating: 4.9
      },
      {
        name: 'Crystal Glass Milestone Award',
        description: 'Handcrafted optical crystal trophy award with personalized 3D laser engraving.',
        price: 85.00,
        category: 'Awards & Recognition',
        imageUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&auto=format&fit=crop&q=80',
        minOrderQuantity: 5,
        customizationAvailable: true,
        rating: 4.9
      }
    ];

    // 1. Extract Unique Categories and Seed
    const uniqueCategories = Array.from(new Set(giftsData.map(g => g.category)));
    const categoriesToInsert = uniqueCategories.map(name => ({
      name,
      count: giftsData.filter(g => g.category === name).length,
      growth: '+10%', // Dummy growth
      iconUrl: giftsData.find(g => g.category === name)?.imageUrl
    }));
    
    const insertedCategories = await Category.insertMany(categoriesToInsert);

    // 2. Map data for Products collection
    const productsData = giftsData.map(gift => ({
      name: gift.name,
      category: gift.category,
      price: gift.price,
      stock: 100, // Dummy default
      vendor: 'Internal', // Dummy default
      customizable: gift.customizationAvailable,
      status: 'In Stock',
      imageUrl: gift.imageUrl
    }));

    const insertedProducts = await Product.insertMany(productsData);

    // 3. Map data for Gifts collection
    const insertedGifts = await Gift.insertMany(giftsData);

    return NextResponse.json({ 
      success: true, 
      message: 'MongoDB successfully seeded with dynamic data!',
      categoriesCount: insertedCategories.length,
      productsCount: insertedProducts.length,
      giftsCount: insertedGifts.length
    }, { status: 200 });

  } catch (error: any) {
    console.error("Error seeding data:", error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to seed data', 
      details: error.message 
    }, { status: 500 });
  }
}
