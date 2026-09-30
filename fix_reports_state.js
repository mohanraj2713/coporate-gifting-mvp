const fs = require('fs');

// Fix Reports Page state update
let code = fs.readFileSync('app/reports/page.tsx', 'utf8');

const newFetch = `  useEffect(() => {
    fetch('/api/reports')
      .then(res => res.json())
      .then(data => {
        if (data.summary) setSummary(data.summary);
        if (data.categoryDistribution) setCatDist(data.categoryDistribution);
        if (data.monthlyPerformance) setMonthlyPerf(data.monthlyPerformance);
        if (data.departmentBreakdown) setDeptBreakdown(data.departmentBreakdown);
      })
      .catch(console.error);
  }, []);`;

code = code.replace(/useEffect\(\(\) => \{[\s\S]*?\}, \[\]\);/, newFetch);
fs.writeFileSync('app/reports/page.tsx', code);
console.log('Fixed reports page state updates.');
