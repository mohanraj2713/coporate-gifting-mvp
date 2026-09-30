import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Gift from '@/models/Gift';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    
    let query: any = {};
    
    if (category && category !== 'All') {
      query.category = category;
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }
    
    const gifts = await Gift.find(query).sort({ createdAt: -1 });
    
    return NextResponse.json(gifts);
  } catch (error) {
    console.error('Error fetching gifts:', error);
    return NextResponse.json(
      { message: 'Failed to fetch gifts' },
      { status: 500 }
    );
  }
}
