const fs = require('fs');
let code = fs.readFileSync('app/admin/page.tsx', 'utf8');

const tabsBlock = `  const tabs = [
    { id: 'products', name: 'Products', icon: Package, count: products.length },
    { id: 'categories', name: 'Categories', icon: Tag, count: categories.length },
    { id: 'customers', name: 'Customers', icon: Building2, count: 24 },
    { id: 'campaigns', name: 'Campaigns', icon: Gift, count: 18 },
    { id: 'orders', name: 'Orders', icon: ShoppingBag, count: 48 },
    { id: 'recipients', name: 'Recipients', icon: Users, count: 156 },
    { id: 'vendors', name: 'Vendors', icon: Boxes, count: 12 },
    { id: 'inventory', name: 'Inventory', icon: FileSpreadsheet, count: '1.2k' },
    { id: 'delivery', name: 'Delivery Status', icon: Truck, count: 36 },
  ];`;

// Remove tabs block from its current location
code = code.replace(tabsBlock, '');

// Insert it after setCategories
const categoriesBlock = `const [categories, setCategories] = useState<any[]>([]);`;
code = code.replace(categoriesBlock, `${categoriesBlock}\n\n${tabsBlock}`);

fs.writeFileSync('app/admin/page.tsx', code);
console.log('Fixed initialization order error.');
