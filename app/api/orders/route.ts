import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import { generateInvoiceNumber } from '@/lib/utils';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const paymentStatus = searchParams.get('paymentStatus');
    
    let query: any = {};
    
    if (status) {
      query.status = status;
    }
    
    if (paymentStatus) {
      query.paymentStatus = paymentStatus;
    }
    
    const orders = await Order.find(query)
      .populate('campaign', 'name')
      .populate('recipient', 'name email')
      .populate('gift', 'name price')
      .sort({ createdAt: -1 });
    
    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { message: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { campaign, recipient, gift, quantity, courier } = body;
    
    if (!campaign || !recipient || !gift || !quantity) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    await connectDB();
    
    // Calculate totals
    const giftPrice = body.giftPrice || 0;
    const subtotal = giftPrice * quantity;
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;
    
    const order = await Order.create({
      campaign,
      recipient,
      gift,
      quantity,
      status: 'pending',
      trackingNumber: `TRK-${Date.now().toString().slice(-8)}`,
      courier: courier || '',
      invoice: {
        invoiceNumber: generateInvoiceNumber(),
        subtotal,
        tax,
        total,
        date: new Date(),
      },
      paymentStatus: 'pending',
    });
    
    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { message: 'Failed to create order' },
      { status: 500 }
    );
  }
}
