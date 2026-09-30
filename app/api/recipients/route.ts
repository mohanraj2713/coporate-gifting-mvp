import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Recipient from '@/models/Recipient';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const campaignId = searchParams.get('campaignId');
    const type = searchParams.get('type');
    
    let query: any = {};
    
    if (campaignId) {
      query.campaign = campaignId;
    }
    
    if (type) {
      query.type = type;
    }
    
    const recipients = await Recipient.find(query)
      .populate('campaign', 'name')
      .sort({ createdAt: -1 });
    
    return NextResponse.json(recipients);
  } catch (error) {
    console.error('Error fetching recipients:', error);
    return NextResponse.json(
      { message: 'Failed to fetch recipients' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { name, email, phone, address, department, type, campaign } = body;
    
    if (!name || !email || !phone || !address || !type || !campaign) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    await connectDB();
    
    const recipient = await Recipient.create({
      name,
      email,
      phone,
      address,
      department,
      type,
      campaign,
    });
    
    return NextResponse.json(recipient, { status: 201 });
  } catch (error) {
    console.error('Error creating recipient:', error);
    return NextResponse.json(
      { message: 'Failed to create recipient' },
      { status: 500 }
    );
  }
}
