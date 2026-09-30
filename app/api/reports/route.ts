import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import Campaign from '@/models/Campaign';
import Gift from '@/models/Gift';

export async function GET() {
  try {
    await connectDB();

    const orders = await Order.find({}).populate('gift');
    const campaigns = await Campaign.find({});
    
    let totalExpenditure = 0;
    let totalGiftsDelivered = 0;
    let totalOnTime = 0;
    let totalDelivered = 0;
    
    const categoryMap = new Map();
    const monthlyMap = new Map();

    // Default months if no orders exist, to ensure the chart looks okay when empty
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    months.forEach(m => {
      monthlyMap.set(m, { month: m, spend: 0, campaigns: 0, recipients: 0, deliverySla: 100 });
    });

    orders.forEach(order => {
      totalExpenditure += order.invoice?.total || 0;
      
      if (order.status === 'delivered') {
        totalGiftsDelivered += order.quantity;
        totalDelivered++;
        totalOnTime++;
      }

      const cat = (order.gift && order.gift.category) ? order.gift.category : 'Uncategorized';
      const val = categoryMap.get(cat) || 0;
      categoryMap.set(cat, val + (order.invoice?.total || 0));

      const d = new Date(order.createdAt);
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const mName = monthNames[d.getMonth()];
      if (monthlyMap.has(mName)) {
        const mData = monthlyMap.get(mName);
        mData.spend += (order.invoice?.total || 0);
        mData.recipients += order.quantity;
      }
    });

    campaigns.forEach(campaign => {
      const d = new Date(campaign.createdAt);
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const mName = monthNames[d.getMonth()];
      if (monthlyMap.has(mName)) {
        monthlyMap.get(mName).campaigns++;
      }
    });

    const slaRate = totalDelivered > 0 ? ((totalOnTime / totalDelivered) * 100).toFixed(1) : 0;
    const avgCost = totalGiftsDelivered > 0 ? (totalExpenditure / totalGiftsDelivered).toFixed(2) : 0;

    const categoryDistribution = Array.from(categoryMap.entries()).map(([name, value]) => ({
      name, value, color: '#' + Math.floor(Math.random()*16777215).toString(16)
    }));

    const monthlyPerformance = Array.from(monthlyMap.values());

    const reportData = {
      summary: {
        totalExpenditure,
        totalGiftsDelivered,
        slaRate,
        avgCost
      },
      monthlyPerformance,
      categoryDistribution,
      departmentBreakdown: [] 
    };

    return NextResponse.json(reportData);
  } catch (error) {
    console.error('Reports Error:', error);
    return NextResponse.json({ message: 'Error fetching reports' }, { status: 500 });
  }
}
