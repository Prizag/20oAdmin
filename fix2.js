const fs = require('fs');
const files = [
  'src/app/admin/layout.tsx', 
  'src/app/admin/roles/page.tsx'
];
files.forEach(f => {
  if(fs.existsSync(f)) {
    let c = fs.readFileSync(f, 'utf8');
    c = c.replace(/\\`/g, '`').replace(/\\\$/g, '$');
    fs.writeFileSync(f, c);
    console.log('Fixed', f);
  }
});
