const fs = require('fs');

let code = fs.readFileSync('app/reports/page.tsx', 'utf8');

// The original file has static variables: monthlyPerformance, categoryDistribution, departmentBreakdown
// And inside ReportsPage:
//   const [activeTab, setActiveTab] = useState<'spending' | 'campaigns' | 'categories' | 'fulfillment'>('spending');
//   const [timeRange, setTimeRange] = useState('6M');
// 
// I will move these outside variables into the component state, or just fetch them into state.

const fetchHook = `  const [activeTab, setActiveTab] = useState<'spending' | 'campaigns' | 'categories' | 'fulfillment'>('spending');
  const [timeRange, setTimeRange] = useState('6M');

  const [summary, setSummary] = useState({
    totalExpenditure: 0,
    totalGiftsDelivered: 0,
    slaRate: 0,
    avgCost: 0
  });
  const [monthlyPerf, setMonthlyPerf] = useState(monthlyPerformance);
  const [catDist, setCatDist] = useState(categoryDistribution);
  const [deptBreakdown, setDeptBreakdown] = useState(departmentBreakdown);

  useEffect(() => {
    fetch('/api/reports')
      .then(res => res.json())
      .then(data => {
        if (data.summary) {
          setSummary(data.summary);
        }
        if (data.categoryDistribution && data.categoryDistribution.length > 0) {
          setCatDist(data.categoryDistribution);
        }
      })
      .catch(console.error);
  }, []);
`;

// Replace component initialization
code = code.replace(
  `  const [activeTab, setActiveTab] = useState<'spending' | 'campaigns' | 'categories' | 'fulfillment'>('spending');
  const [timeRange, setTimeRange] = useState('6M');`,
  fetchHook
);

// We must also import useEffect
if (!code.includes('useEffect')) {
  code = code.replace(`import { useState } from 'react';`, `import { useState, useEffect } from 'react';`);
}

// Replace the hardcoded metrics in the JSX:
// $255,890.00
code = code.replace('$255,890.00', `$\${summary.totalExpenditure.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);

// 1,960 Units
code = code.replace('1,960 Units', `{summary.totalGiftsDelivered} Units`);

// 98.6% On-Time
code = code.replace('98.6% On-Time', `{summary.slaRate}% On-Time`);

// $130.55 / Person
code = code.replace('$130.55 / Person', `$\${summary.avgCost} / Person`);

// Update chart data usage
code = code.replace(/data=\{monthlyPerformance\}/g, 'data={monthlyPerf}');
code = code.replace(/data=\{categoryDistribution\}/g, 'data={catDist}');

fs.writeFileSync('app/reports/page.tsx', code);
console.log('Reports page updated to use live data');
