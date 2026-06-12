const mammoth = require('mammoth');
const TurndownService = require('turndown');
const fs = require('fs');

const turndownService = new TurndownService({ headingStyle: 'atx' });
// Add a plugin or rule to handle tables if turndown doesn't by default
const turndownPluginGfm = require('turndown-plugin-gfm');
turndownService.use(turndownPluginGfm.tables);

mammoth.convertToHtml({path: '20o_ecommerce_admin_vendor_panel_spec.docx'})
    .then(function(result){
        const html = result.value;
        const markdown = turndownService.turndown(html);
        fs.writeFileSync('docs/20o_admin_spec_extracted.md', markdown);
        console.log('Extraction complete');
    })
    .catch(function(err){
        console.error('Error:', err);
    });
