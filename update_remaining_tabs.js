const fs = require('fs');
const path = require('path');

// 1. Create Models
const vendorModel = `import mongoose from 'mongoose';
const VendorSchema = new mongoose.Schema({ name: String, status: { type: String, default: 'Active' } }, { timestamps: true });
export default mongoose.models.Vendor || mongoose.model('Vendor', VendorSchema);
`;

const inventoryModel = `import mongoose from 'mongoose';
const InventorySchema = new mongoose.Schema({ item: String, count: Number }, { timestamps: true });
export default mongoose.models.Inventory || mongoose.model('Inventory', InventorySchema);
`;

const deliveryModel = `import mongoose from 'mongoose';
const DeliverySchema = new mongoose.Schema({ orderId: String, status: String }, { timestamps: true });
export default mongoose.models.Delivery || mongoose.model('Delivery', DeliverySchema);
`;

fs.writeFileSync('models/Vendor.ts', vendorModel);
fs.writeFileSync('models/Inventory.ts', inventoryModel);
fs.writeFileSync('models/Delivery.ts', deliveryModel);

// 2. Create API Routes
const apiDirs = ['app/api/vendors', 'app/api/inventory', 'app/api/delivery'];
apiDirs.forEach(dir => fs.mkdirSync(dir, { recursive: true }));

const makeApi = (modelName, plural) => `import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import ${modelName} from '@/models/${modelName}';

export async function GET() {
  try {
    await connectDB();
    const data = await ${modelName}.find({}).sort({ createdAt: -1 });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const newData = await ${modelName}.create(body);
    return NextResponse.json(newData, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}
`;

fs.writeFileSync('app/api/vendors/route.ts', makeApi('Vendor', 'vendors'));
fs.writeFileSync('app/api/inventory/route.ts', makeApi('Inventory', 'inventory'));
fs.writeFileSync('app/api/delivery/route.ts', makeApi('Delivery', 'delivery'));

// 3. Update app/admin/page.tsx
let code = fs.readFileSync('app/admin/page.tsx', 'utf8');

// The file was already nicely structured in our last step:
//   const [recipients, setRecipients] = useState<any[]>([]);
// Let's replace it to include the remaining three.
const oldStates = `  const [recipients, setRecipients] = useState<any[]>([]);`;
const newStates = `  const [recipients, setRecipients] = useState<any[]>([]);
  const [vendors, setVendors] = useState<any[]>([]);
  const [inventory, setInventory] = useState<any[]>([]);
  const [delivery, setDelivery] = useState<any[]>([]);`;

code = code.replace(oldStates, newStates);

// Update tabs dynamically
code = code.replace(
  /{ id: 'vendors', name: 'Vendors', icon: Boxes, count: 12 },/,
  `{ id: 'vendors', name: 'Vendors', icon: Boxes, count: vendors.length },`
);
code = code.replace(
  /{ id: 'inventory', name: 'Inventory', icon: FileSpreadsheet, count: '1.2k' },/,
  `{ id: 'inventory', name: 'Inventory', icon: FileSpreadsheet, count: inventory.length },`
);
code = code.replace(
  /{ id: 'delivery', name: 'Delivery Status', icon: Truck, count: 36 },/,
  `{ id: 'delivery', name: 'Delivery Status', icon: Truck, count: delivery.length },`
);

// Append the new fetches to the useEffect hook
// We find fetch('/api/recipients').... catch(console.error); and append right after it
const oldFetch = `fetch('/api/recipients').then(res => res.json()).then(data => { if (data && Array.isArray(data)) setRecipients(data); }).catch(console.error);`;
const newFetch = `${oldFetch}
    fetch('/api/vendors').then(res => res.json()).then(data => { if (data && Array.isArray(data)) setVendors(data); }).catch(console.error);
    fetch('/api/inventory').then(res => res.json()).then(data => { if (data && Array.isArray(data)) setInventory(data); }).catch(console.error);
    fetch('/api/delivery').then(res => res.json()).then(data => { if (data && Array.isArray(data)) setDelivery(data); }).catch(console.error);`;

code = code.replace(oldFetch, newFetch);

fs.writeFileSync('app/admin/page.tsx', code);
console.log('Done mapping vendors, inventory, and delivery.');
