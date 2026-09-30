const fs = require('fs');

let code = fs.readFileSync('app/page.tsx', 'utf8');

// Add categories state and fetch
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

// Replace category map
const oldCatMap = `{['Apparel & T-Shirts', 'Business Cards', 'Mugs & Drinkware', 'Corporate Hampers', 'Stationery', 'Banners'].map((cat, i) => (
              <Link href={\`/products?category=\${cat}\`} key={cat} className="group flex flex-col items-center gap-4">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-white border-4 border-slate-100 shadow-sm group-hover:border-teal-500 group-hover:shadow-md transition-all flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-slate-100 flex items-center justify-center text-slate-400 group-hover:scale-110 transition-transform duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                  </div>
                </div>
                <h3 className="font-bold text-slate-700 text-sm text-center max-w-[120px] leading-tight group-hover:text-teal-700 transition-colors">{cat}</h3>
              </Link>
            ))}`;

const newCatMap = `{(categories.length > 0 ? categories : [{name: 'Apparel'}, {name: 'Accessories'}]).map((catObj, i) => {
              const catName = typeof catObj === 'string' ? catObj : (catObj.name || 'Uncategorized');
              return (
              <Link href={\`/products?category=\${catName}\`} key={catName} className="group flex flex-col items-center gap-4">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-white border-4 border-slate-100 shadow-sm group-hover:border-teal-500 group-hover:shadow-md transition-all flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-slate-100 flex items-center justify-center text-slate-400 group-hover:scale-110 transition-transform duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                  </div>
                </div>
                <h3 className="font-bold text-slate-700 text-sm text-center max-w-[120px] leading-tight group-hover:text-teal-700 transition-colors">{catName}</h3>
              </Link>
            ) })}`;

code = code.replace(oldCatMap, newCatMap);

fs.writeFileSync('app/page.tsx', code);
console.log('Categories updated on homepage');
