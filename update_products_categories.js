const fs = require('fs');
let code = fs.readFileSync('app/products/page.tsx', 'utf8');

const stateCode = `  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  useEffect(() => {
    fetch('/api/gifts').then(r => r.json()).then(data => setProducts(data)).catch(console.error);
    fetch('/api/categories').then(r => r.json()).then(data => setCategories(data)).catch(console.error);
  }, []);`;

code = code.replace(
  `  const [products, setProducts] = useState<any[]>([]);
  useEffect(() => {
    fetch('/api/gifts').then(r => r.json()).then(data => setProducts(data)).catch(console.error);
  }, []);`,
  stateCode
);

const oldCatMap = `{['T-Shirts', 'Business Cards', 'Mugs', 'Stationery', 'Banners'].map(cat => (
                  <li key={cat} className="flex items-center gap-3">
                    <input type="checkbox" id={cat} className="w-4 h-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500" />
                    <label htmlFor={cat} className="text-slate-600 font-medium cursor-pointer">{cat}</label>
                  </li>
                ))}`;

const newCatMap = `{(categories.length > 0 ? categories : [{name: 'T-Shirts'}, {name: 'Mugs'}]).map(catObj => {
                  const catName = typeof catObj === 'string' ? catObj : (catObj.name || 'Uncategorized');
                  return (
                  <li key={catName} className="flex items-center gap-3">
                    <input type="checkbox" id={catName} className="w-4 h-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500" />
                    <label htmlFor={catName} className="text-slate-600 font-medium cursor-pointer">{catName}</label>
                  </li>
                ) })}`;

code = code.replace(oldCatMap, newCatMap);

fs.writeFileSync('app/products/page.tsx', code);
console.log('Categories updated on products page');
