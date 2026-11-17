// Renders prep.html to the A4 PDF next to it: node build.js <out.pdf>
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const out = process.argv[2] || path.join(__dirname, '..', 'Sandra_Interview_Prep_AR_updated.pdf');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file://' + path.join(__dirname, 'prep.html'), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({
    path: out, format: 'A4', printBackground: true, preferCSSPageSize: true,
    displayHeaderFooter: true, headerTemplate: '<span></span>',
    footerTemplate: '<div style="width:100%;text-align:center;font-size:8px;color:#8a92a3;font-family:sans-serif;"><span class="pageNumber"></span> / <span class="totalPages"></span></div>',
  });
  await browser.close();
  console.log('wrote', out);
})();
