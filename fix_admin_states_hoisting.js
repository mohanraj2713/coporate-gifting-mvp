const fs = require('fs');
let code = fs.readFileSync('app/admin/page.tsx', 'utf8');

// First remove the broken tabs array block completely, wherever it is
code = code.replace(/const tabs = \[[\\s\\S]*?\];/m, '');
code = code.replace(/const tabs = \[[\\s\\S]*?\];/g, '');

// Second remove the static customers and orders arrays
code = code.replace(/const customers = \[[\\s\\S]*?\];/m, '');
code = code.replace(/const orders = \[[\\s\\S]*?\];/m, '');
// Also remove them if they were declared as useState below somewhere else
code = code.replace(/const \[customers, setCustomers\] = useState<any\[\]>\(\[\]\);/g, '');
code = code.replace(/const \[campaigns, setCampaigns\] = useState<any\[\]>\(\[\]\);/g, '');
code = code.replace(/const \[orders, setOrders\] = useState<any\[\]>\(\[\]\);/g, '');
code = code.replace(/const \[recipients, setRecipients\] = useState<any\[\]>\(\[\]\);/g, '');

// Third, ensure all states are defined at the top
const statesStr = `
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [recipients, setRecipients] = useState<any[]>([]);

  const tabs = [
    { id: 'products', name: 'Products', icon: Package, count: products.length },
    { id: 'categories', name: 'Categories', icon: Tag, count: categories.length },
    { id: 'customers', name: 'Customers', icon: Building2, count: customers.length },
    { id: 'campaigns', name: 'Campaigns', icon: Gift, count: campaigns.length },
    { id: 'orders', name: 'Orders', icon: ShoppingBag, count: orders.length },
    { id: 'recipients', name: 'Recipients', icon: Users, count: recipients.length },
    { id: 'vendors', name: 'Vendors', icon: Boxes, count: 12 },
    { id: 'inventory', name: 'Inventory', icon: FileSpreadsheet, count: '1.2k' },
    { id: 'delivery', name: 'Delivery Status', icon: Truck, count: 36 },
  ];
`;

// Replace existing products and categories
code = code.replace(/const \[products, setProducts\] = useState<any\[\]>\(\[\]\);/g, '');
code = code.replace(/const \[categories, setCategories\] = useState<any\[\]>\(\[\]\);/g, '');

// Insert the block exactly after showAddCategoryModal
code = code.replace(
  'const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);',
  'const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);\n' + statesStr
);

fs.writeFileSync('app/admin/page.tsx', code);
console.log('Fixed hoisted states safely');
