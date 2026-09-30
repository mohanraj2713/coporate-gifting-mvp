const fs = require('fs');
let code = fs.readFileSync('app/campaigns/create/page.tsx', 'utf8');

const oldFetchBlock = `const response = await fetch('/api/gifts');
        if (response.ok) {
          const data = await response.json();
          setGiftCatalog(data);
          if (data.length > 0 && !selectedGift) {
            setSelectedGift(data[0]);
          }`;

const newFetchBlock = `const response = await fetch('/api/gifts');
        if (response.ok) {
          const data = await response.json();
          const mappedData = data.map((item: any) => ({
            ...item,
            id: item._id,
            image: item.imageUrl || item.image
          }));
          setGiftCatalog(mappedData);
          if (mappedData.length > 0 && !selectedGift) {
            setSelectedGift(mappedData[0]);
          }`;

code = code.replace(oldFetchBlock, newFetchBlock);
fs.writeFileSync('app/campaigns/create/page.tsx', code);
console.log('Fixed API mapping in campaign create page.');
