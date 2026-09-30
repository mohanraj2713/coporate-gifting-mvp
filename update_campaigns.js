const fs = require('fs');

let code = fs.readFileSync('app/campaigns/create/page.tsx', 'utf8');

// 1. Update import
code = code.replace("import { useState } from 'react';", "import { useState, useEffect } from 'react';");

// 2. Remove giftCatalog array
code = code.replace(/const giftCatalog: GiftItem\[\] = \[[\s\S]*?\];/m, '');

// 3. Update component body
const replacement = `export default function CreateCampaignPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [giftCatalog, setGiftCatalog] = useState<GiftItem[]>([]);
  const [isLoadingCatalog, setIsLoadingCatalog] = useState(true);

  useEffect(() => {
    async function fetchCatalog() {
      try {
        const response = await fetch('/api/gifts');
        if (response.ok) {
          const data = await response.json();
          setGiftCatalog(data);
          if (data.length > 0 && !selectedGift) {
            setSelectedGift(data[0]);
          }
        }
      } catch (error) {
        console.error('Failed to fetch gifts:', error);
      } finally {
        setIsLoadingCatalog(false);
      }
    }
    fetchCatalog();
  }, []);

  // Step 1: Details
  const [campaignName, setCampaignName] = useState('Q3 Employee Milestone Celebration');
  const [occasion, setOccasion] = useState('Employee Appreciation');
  const [deliveryDate, setDeliveryDate] = useState('2026-10-30');
  const [targetBudget, setTargetBudget] = useState(5000);

  // Step 2: Gift Selection
  const [selectedGift, setSelectedGift] = useState<GiftItem | null>(null);`;

code = code.replace(
  /export default function CreateCampaignPage\(\) \{[\s\S]*?const \[selectedGift, setSelectedGift\] = useState<GiftItem \| null>\(giftCatalog\[0\]\);/m,
  replacement
);

fs.writeFileSync('app/campaigns/create/page.tsx', code);
console.log('Done');
