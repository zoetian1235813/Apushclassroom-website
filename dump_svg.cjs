const fs = require('fs');
const text = fs.readFileSync('src/data/units/unit3.ts', 'utf8');
const start = text.indexOf('<div class="my-6 flex flex-col items-center gap-3">');
const end = text.indexOf('</div>', start);
console.log(text.slice(start, end + 6));
