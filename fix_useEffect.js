const fs = require('fs');
let code = fs.readFileSync('app/reports/page.tsx', 'utf8');

// Replace standard useState import with useState and useEffect
code = code.replace(/import\s*\{\s*useState\s*\}\s*from\s*'react';/, "import { useState, useEffect } from 'react';");

fs.writeFileSync('app/reports/page.tsx', code);
console.log('Fixed useEffect import.');
