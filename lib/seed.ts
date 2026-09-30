import connectDB from './mongodb';
import Company from '@/models/Company';
import User from '@/models/User';
import Gift from '@/models/Gift';
import Campaign from '@/models/Campaign';
import Recipient from '@/models/Recipient';
import bcrypt from 'bcryptjs';

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Campaign.deleteMany({});
    await Recipient.deleteMany({});
    await Gift.deleteMany({});
    await User.deleteMany({});
    await Company.deleteMany({});

    // Create company
    const company = await Company.create({
      name: 'Test Corporation',
    });

    // Create user
    const hashedPassword = await bcrypt.hash('password123', 10);
    await User.create({
      name: 'Admin User',
      email: 'admin@testcorporation.com',
      password: hashedPassword,
      company: company._id,
      role: 'admin',
    });

    // Create sample gifts
    const gifts = await Gift.insertMany([
      {
        name: 'Premium Employee Kit',
        description: 'Complete employee appreciation package including premium items',
        price: 150,
        category: 'Employee Kits',
        minOrderQuantity: 10,
        customizationAvailable: true,
      },
      {
        name: 'Wireless Earbuds',
        description: 'High-quality wireless earbuds with charging case',
        price: 89,
        category: 'Electronics',
        minOrderQuantity: 5,
        customizationAvailable: false,
      },
      {
        name: 'Leather Tote Bag',
        description: 'Premium leather tote bag for professionals',
        price: 65,
        category: 'Bags',
        minOrderQuantity: 20,
        customizationAvailable: true,
      },
      {
        name: 'Custom Polo Shirts',
        description: 'High-quality cotton polo shirts with your company logo',
        price: 35,
        category: 'Apparel',
        minOrderQuantity: 25,
        customizationAvailable: true,
      },
      {
        name: 'Stainless Steel Water Bottle',
        description: 'Insulated stainless steel water bottle with carabiner',
        price: 25,
        category: 'Drinkware',
        minOrderQuantity: 50,
        customizationAvailable: true,
      },
      {
        name: 'Gourmet Gift Hamper',
        description: 'Curated selection of premium gourmet treats',
        price: 120,
        category: 'Gift Hampers',
        minOrderQuantity: 10,
        customizationAvailable: true,
      },
    ]);



    console.log('Database seeded successfully!');
    console.log('Default login: admin@testcorporation.com / password123');

    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedDatabase();
