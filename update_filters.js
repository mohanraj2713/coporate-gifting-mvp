const fs = require('fs');
let code = fs.readFileSync('app/products/page.tsx', 'utf8');

// Add state variables
const stateTarget = `  const [products, setProducts] = useState<any[]>([]);`;
const stateReplacement = `  const [products, setProducts] = useState<any[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [sortOption, setSortOption] = useState<string>('Featured');
  
  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
  };
  
  const filteredProducts = products.filter(p => {
    const pPrice = Number(p.price || 49);
    if (pPrice > maxPrice) return false;
    if (selectedCategories.length > 0 && !selectedCategories.includes(p.category)) return false;
    return true;
  }).sort((a, b) => {
    if (sortOption === 'Price: Low to High') return Number(a.price || 49) - Number(b.price || 49);
    if (sortOption === 'Price: High to Low') return Number(b.price || 49) - Number(a.price || 49);
    return 0;
  });`;

code = code.replace(stateTarget, stateReplacement);

// Replace Categories Checkboxes
const catTarget = `<input type="checkbox" id={catName} className="w-4 h-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500" />`;
const catReplacement = `<input type="checkbox" id={catName} checked={selectedCategories.includes(catName)} onChange={() => toggleCategory(catName)} className="w-4 h-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500" />`;
code = code.replace(catTarget, catReplacement);

// Replace Range
const rangeTarget = `<input type="range" className="w-full accent-teal-600" min="0" max="1000" />`;
const rangeReplacement = `              <input type="range" className="w-full accent-teal-600" min="0" max="1000" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} />
              <div className="text-center font-bold text-teal-700 mt-2">Up to $\\{maxPrice}</div>`;
code = code.replace(rangeTarget, rangeReplacement);

// Replace Sort
const sortTarget = `<select className="border border-slate-300 rounded-lg px-4 py-2 text-slate-600 font-medium bg-white focus:outline-none focus:ring-2 focus:ring-teal-500">`;
const sortReplacement = `<select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="border border-slate-300 rounded-lg px-4 py-2 text-slate-600 font-medium bg-white focus:outline-none focus:ring-2 focus:ring-teal-500">`;
code = code.replace(sortTarget, sortReplacement);

// Replace products map
const mapTarget = `{(products.length > 0 ? products : []).map(item => {`;
const mapReplacement = `{(filteredProducts.length > 0 ? filteredProducts : []).map(item => {`;
code = code.replace(mapTarget, mapReplacement);

fs.writeFileSync('app/products/page.tsx', code);
console.log('Filters added');
