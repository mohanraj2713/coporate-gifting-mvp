import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Cart from '@/models/Cart';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    if (!userId) return NextResponse.json({ items: [] });
    
    await connectDB();
    const list = await Cart.findOne({ userId });
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
    let list = await Cart.findOne({ userId });
    if (!list) {
      list = new Cart({ userId, items: [] });
    }
    
    if (action === 'add' && !list.items.includes(itemId)) {
      list.items.push(itemId);
    } else if (action === 'remove') {
      list.items = list.items.filter((id: string) => id !== itemId);
    } else if (action === 'clear') {
      list.items = [];
    }
    
    await list.save();
    return NextResponse.json({ items: list.items });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
