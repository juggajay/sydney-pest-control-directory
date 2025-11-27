const fs = require('fs');
const path = require('path');

const dir = 'public/operators';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json') && f !== 'index.json');
const operators = files.map(f => JSON.parse(fs.readFileSync(path.join(dir, f))));

console.log('Total operators:', operators.length);

const allAreas = new Set();
operators.forEach(o => (o.serviceAreas || []).forEach(a => allAreas.add(a)));
console.log('Unique service areas:', allAreas.size);
console.log('Service areas:', Array.from(allAreas).slice(0, 30).join(', '));

// Count per area
const areaCounts = {};
operators.forEach(o => (o.serviceAreas || []).forEach(a => {
  areaCounts[a] = (areaCounts[a] || 0) + 1;
}));

console.log('\nTop areas by operator count:');
Object.entries(areaCounts).sort((a,b) => b[1] - a[1]).slice(0, 20).forEach(([a, c]) => {
  console.log('  ' + a + ': ' + c);
});
