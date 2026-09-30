const fs = require('fs');

let code = fs.readFileSync('app/campaigns/create/page.tsx', 'utf8');

// 1. Change state definition
code = code.replace(
  'const [selectedGift, setSelectedGift] = useState<GiftItem | null>(null);',
  'const [selectedGifts, setSelectedGifts] = useState<GiftItem[]>([]);'
);

// 2. Change useEffect
code = code.replace(
  /if \(mappedData\.length > 0 && !selectedGift\) \{\s*setSelectedGift\(mappedData\[0\]\);\s*\}/,
  `if (mappedData.length > 0 && selectedGifts.length === 0) {
            setSelectedGifts([mappedData[0]]);
          }`
);

// 3. Change subtotal
code = code.replace(
  'const subtotal = selectedGift ? selectedGift.price * recipients.length : 0;',
  'const subtotal = selectedGifts.reduce((sum, g) => sum + g.price, 0) * recipients.length;'
);

// 4. Change Step 2 mapping
code = code.replace(
  /const isSelected = selectedGift\?\.id === gift\.id;[\s\S]*?onClick=\{\(\) => setSelectedGift\(gift\)\}/,
  `const isSelected = selectedGifts.some(g => g.id === gift.id);
                      return (
                        <div
                          key={gift.id}
                          onClick={() => {
                            if (isSelected) {
                              setSelectedGifts(selectedGifts.filter(g => g.id !== gift.id));
                            } else {
                              setSelectedGifts([...selectedGifts, gift]);
                            }
                          }}`
);

// 5. Change Step 5 Review
const oldStep5 = `<div className="flex items-start gap-4 p-4 rounded-xl border border-slate-200">
                    <img src={selectedGift?.image} alt={selectedGift?.name} className="w-16 h-16 object-cover rounded-lg" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{selectedGift?.name}</h4>
                      <p className="text-xs text-slate-600">\${selectedGift?.price.toFixed(2)} × {recipients.length} recipients</p>
                      <p className="text-[10px] text-emerald-600 font-bold mt-1">Includes Custom Logo & {greetingCardStyle} Card</p>
                    </div>
                  </div>`;

const newStep5 = `{selectedGifts.map((gift) => (
                    <div key={gift.id} className="flex items-start gap-4 p-4 rounded-xl border border-slate-200">
                      <img src={gift.image} alt={gift.name} className="w-16 h-16 object-cover rounded-lg" />
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{gift.name}</h4>
                        <p className="text-xs text-slate-600">\${gift.price.toFixed(2)} × {recipients.length} recipients</p>
                        <p className="text-[10px] text-emerald-600 font-bold mt-1">Includes Custom Logo & {greetingCardStyle} Card</p>
                      </div>
                    </div>
                  ))}`;

code = code.replace(oldStep5, newStep5);

// 6. Change Order Summary Sidebar
const oldSummaryProduct = `<div className="flex justify-between text-slate-600">
                  <span>Selected Product</span>
                  <span className="font-bold text-slate-900">{selectedGift?.name}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Unit Price</span>
                  <span className="font-bold text-slate-900">\${selectedGift?.price.toFixed(2)}</span>
                </div>`;

const newSummaryProduct = `<div className="flex justify-between text-slate-600">
                  <span>Selected Products</span>
                  <span className="font-bold text-slate-900 text-right max-w-[150px] truncate">{selectedGifts.map(g => g.name).join(', ')}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Total Unit Price</span>
                  <span className="font-bold text-slate-900">\${selectedGifts.reduce((sum, g) => sum + g.price, 0).toFixed(2)}</span>
                </div>`;

code = code.replace(oldSummaryProduct, newSummaryProduct);

// Also need to fix selectedGifts inside the useEffect because we can't reference it easily in the dependency array without adding it
// Let's replace selectedGifts.length === 0 by making it checking a variable or just removing the default selection
code = code.replace(
  `if (mappedData.length > 0 && selectedGifts.length === 0) {
            setSelectedGifts([mappedData[0]]);
          }`,
  `if (mappedData.length > 0) {
            setSelectedGifts(prev => prev.length === 0 ? [mappedData[0]] : prev);
          }`
);

fs.writeFileSync('app/campaigns/create/page.tsx', code);
console.log('Update multiple gifts logic done.');
