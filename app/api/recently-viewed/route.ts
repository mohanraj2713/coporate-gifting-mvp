import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import RecentlyViewed from '@/models/RecentlyViewed';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    if (!userId) return NextResponse.json({ items: [] });
    
    await connectDB();
    const list = await RecentlyViewed.findOne({ userId });
    return NextResponse.json({ items: list ? list.items : [] });
  } catch (error) {
    return NextResponse.json({ items: [] });
  }
}

export async function POST(req: Request) {
  try {
    const { userId, itemId } = await req.json();
    if (!userId || !itemId) return NextResponse.json({ error: 'Missing args' }, { status: 400 });

    await connectDB();
    let list = await RecentlyViewed.findOne({ userId });
    if (!list) {
      list = new RecentlyViewed({ userId, items: [] });
    }
    
    // Remove if exists to push to front
    list.items = list.items.filter((id: string) => id !== itemId);
    list.items.unshift(itemId);
    
    // Keep max 5 items
    if (list.items.length > 5) list.items = list.items.slice(0, 5);
    
    await list.save();
    return NextResponse.json({ items: list.items });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
