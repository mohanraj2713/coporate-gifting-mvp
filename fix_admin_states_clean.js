const fs = require('fs');
let code = fs.readFileSync('app/admin/page.tsx', 'utf8');

let lines = code.split('\n');

// Find the index of showAddCategoryModal
let startIndex = lines.findIndex(l => l.includes('const [showAddCategoryModal'));

// Find the index of the return statement
let endIndex = lines.findIndex(l => l.trim().startsWith('return ('));

if (startIndex !== -1 && endIndex !== -1) {
  const newBlock = `  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);

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

  useEffect(() => {
    fetch('/api/products').then(res => res.json()).then(data => { if (data && data.length > 0) setProducts(data); }).catch(console.error);
    fetch('/api/categories').then(res => res.json()).then(data => { if (data && data.length > 0) setCategories(data); }).catch(console.error);
    fetch('/api/customers').then(res => res.json()).then(data => { if (data && Array.isArray(data)) setCustomers(data); }).catch(console.error);
    fetch('/api/campaigns').then(res => res.json()).then(data => { if (data && Array.isArray(data)) setCampaigns(data); }).catch(console.error);
    fetch('/api/orders').then(res => res.json()).then(data => { if (data && Array.isArray(data)) setOrders(data); }).catch(console.error);
    fetch('/api/recipients').then(res => res.json()).then(data => { if (data && Array.isArray(data)) setRecipients(data); }).catch(console.error);
  }, []);
`;

  lines.splice(startIndex, endIndex - startIndex, newBlock);
  fs.writeFileSync('app/admin/page.tsx', lines.join('\n'));
  console.log('Fixed file structurally');
} else {
  console.log('Could not find start or end index');
}
