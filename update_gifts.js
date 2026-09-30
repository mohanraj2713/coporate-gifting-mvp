const fs = require('fs');

let code = fs.readFileSync('app/gifts/page.tsx', 'utf8');

// 1. Update import
code = code.replace("import { useState } from 'react';", "import { useState, useEffect } from 'react';");

// 2. Remove gifts array
code = code.replace(/const gifts: Gift\[\] = \[[\s\S]*?\];/m, '');

// 3. Update component body
code = code.replace(
  "export default function GiftsPage() {\n  const [searchTerm, setSearchTerm] = useState('');\n  const [selectedCategory, setSelectedCategory] = useState('All');\n  const [customizationOnly, setCustomizationOnly] = useState(false);",
  `export default function GiftsPage() {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [customizationOnly, setCustomizationOnly] = useState(false);

  useEffect(() => {
    async function fetchGifts() {
      try {
        const response = await fetch('/api/gifts');
        if (response.ok) {
          const data = await response.json();
          setGifts(data);
        }
      } catch (error) {
        console.error('Failed to fetch gifts:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchGifts();
  }, []);`
);

fs.writeFileSync('app/gifts/page.tsx', code);
console.log('Done');
