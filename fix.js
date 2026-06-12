const fs = require('fs');
const path = require('path');
const files = [
  'admin/dashboard/page.tsx', 
  'vendor/dashboard/page.tsx', 
  'china/dashboard/page.tsx', 
  'hub/dashboard/page.tsx'
].map(f => path.join('c:/Users/ASUS/OneDrive/Desktop/20oFrontendAdmin/src/app', f));

files.forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  c = c.replace(/\\`/g, '`').replace(/\\\$/g, '$');
  fs.writeFileSync(f, c);
  console.log('Fixed', f);
});
