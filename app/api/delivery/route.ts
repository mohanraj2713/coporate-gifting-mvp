import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Delivery from '@/models/Delivery';

export async function GET() {
  try {
    await connectDB();
    const data = await Delivery.find({}).sort({ createdAt: -1 });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const newData = await Delivery.create(body);
    return NextResponse.json(newData, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}
