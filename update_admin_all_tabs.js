const fs = require('fs');
let code = fs.readFileSync('app/admin/page.tsx', 'utf8');

// Replace customers, orders, campaigns, recipients static arrays with useState
code = code.replace(/const customers = \[[\\s\\S]*?\];/, 'const [customers, setCustomers] = useState<any[]>([]);');
code = code.replace(/const orders = \[[\\s\\S]*?\];/, 'const [orders, setOrders] = useState<any[]>([]);');

if (!code.includes('const [campaigns, setCampaigns]')) {
  code = code.replace('const [customers, setCustomers] = useState<any[]>([]);', 'const [customers, setCustomers] = useState<any[]>([]);\n  const [campaigns, setCampaigns] = useState<any[]>([]);\n  const [orders, setOrders] = useState<any[]>([]);\n  const [recipients, setRecipients] = useState<any[]>([]);');
}

// Update tabs array with dynamic lengths
code = code.replace(/{ id: 'customers', name: 'Customers', icon: Building2, count: 24 },/, "{ id: 'customers', name: 'Customers', icon: Building2, count: customers.length },");
code = code.replace(/{ id: 'campaigns', name: 'Campaigns', icon: Gift, count: 18 },/, "{ id: 'campaigns', name: 'Campaigns', icon: Gift, count: campaigns.length },");
code = code.replace(/{ id: 'orders', name: 'Orders', icon: ShoppingBag, count: 48 },/, "{ id: 'orders', name: 'Orders', icon: ShoppingBag, count: orders.length },");
code = code.replace(/{ id: 'recipients', name: 'Recipients', icon: Users, count: 156 },/, "{ id: 'recipients', name: 'Recipients', icon: Users, count: recipients.length },");

// Update useEffect to fetch all
const newFetch = `useEffect(() => {
    fetch('/api/products').then(res => res.json()).then(data => { if (data && data.length > 0) setProducts(data); }).catch(console.error);
    fetch('/api/categories').then(res => res.json()).then(data => { if (data && data.length > 0) setCategories(data); }).catch(console.error);
    fetch('/api/customers').then(res => res.json()).then(data => { if (data && Array.isArray(data)) setCustomers(data); }).catch(console.error);
    fetch('/api/campaigns').then(res => res.json()).then(data => { if (data && Array.isArray(data)) setCampaigns(data); }).catch(console.error);
    fetch('/api/orders').then(res => res.json()).then(data => { if (data && Array.isArray(data)) setOrders(data); }).catch(console.error);
    fetch('/api/recipients').then(res => res.json()).then(data => { if (data && Array.isArray(data)) setRecipients(data); }).catch(console.error);
  }, []);`

code = code.replace(/useEffect\(\(\) => \{[\s\S]*?\}, \[\]\);/, newFetch);

fs.writeFileSync('app/admin/page.tsx', code);
console.log('Admin page updated for all tabs');
