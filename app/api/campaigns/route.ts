import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Campaign from '@/models/Campaign';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    
    let query: any = {};
    
    if (status) {
      query.status = status;
    }
    
    const campaigns = await Campaign.find(query)
      .populate('gift', 'name')
      .sort({ createdAt: -1 });
    
    return NextResponse.json(campaigns);
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    return NextResponse.json(
      { message: 'Failed to fetch campaigns' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { name, occasion, gift, quantity, budget, deliveryDate, message, logo, company } = body;
    
    if (!name || !occasion || !gift || !quantity || !budget || !deliveryDate || !company) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    await connectDB();
    
    const campaign = await Campaign.create({
      name,
      occasion,
      gift,
      quantity,
      budget,
      deliveryDate,
      message,
      logo,
      company,
      status: 'draft',
    });
    
    return NextResponse.json(campaign, { status: 201 });
  } catch (error) {
    console.error('Error creating campaign:', error);
    return NextResponse.json(
      { message: 'Failed to create campaign' },
      { status: 500 }
    );
  }
}
