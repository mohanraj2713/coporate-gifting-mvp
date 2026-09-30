import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Wishlist from '@/models/Wishlist';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    if (!userId) return NextResponse.json({ items: [] });
    
    await connectDB();
    const list = await Wishlist.findOne({ userId });
    return NextResponse.json({ items: list ? list.items : [] });
  } catch (error) {
    return NextResponse.json({ items: [] });
  }
}

export async function POST(req: Request) {
  try {
    const { userId, itemId, action } = await req.json();
    if (!userId || !itemId) return NextResponse.json({ error: 'Missing args' }, { status: 400 });

    await connectDB();
    let list = await Wishlist.findOne({ userId });
    if (!list) {
      list = new Wishlist({ userId, items: [] });
    }
    
    if (action === 'add' && !list.items.includes(itemId)) {
      list.items.push(itemId);
    } else if (action === 'remove') {
      list.items = list.items.filter((id: string) => id !== itemId);
    }
    
    await list.save();
    return NextResponse.json({ items: list.items });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
