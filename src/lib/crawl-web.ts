// Install: npm install puppeteer

import puppeteer from 'puppeteer';

export async function crawlWebsiteToPDF(websiteUrl, options = {}) {
  const {
    maxPages = 20,
    outputFileName = `website-crawl-${Date.now()}.pdf`,
    outputDirectory = './public'
  } = options;

  let browser;
  const allUrls = new Set();
  const crawledData = [];

  try {
    console.log(`🚀 Starting crawl of: ${websiteUrl}`);
    
    // Launch browser
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });

    // Step 1: Find all routes
    console.log('🔍 Discovering routes...');
    await findAllRoutes(page, websiteUrl, allUrls, maxPages);
    
    console.log(`📊 Found ${allUrls.size} unique routes`);
    
    // Step 2: Crawl each route and collect data
    console.log('📄 Crawling pages...');
    const urlArray = Array.from(allUrls).slice(0, maxPages);
    
    for (let i = 0; i < urlArray.length; i++) {
      const url = urlArray[i];
      console.log(`Processing ${i + 1}/${urlArray.length}: ${url}`);
      
      try {
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const pageData = await page.evaluate(() => ({
          title: document.title,
          url: window.location.href,
          content: document.body.innerText
        }));
        
        crawledData.push(pageData);
      } catch (error) {
        console.warn(`⚠️ Failed to crawl ${url}: ${error.message}`);
      }
    }

    // Step 3: Generate PDF
    console.log('📋 Generating PDF...');
    const outputPath = `${outputDirectory}/${outputFileName}`;
    await createPDF(browser, crawledData, outputPath);
    
    console.log(`✅ PDF saved to: ${outputPath}`);
    
    return {
      success: true,
      totalRoutes: allUrls.size,
      crawledPages: crawledData.length,
      outputPath,
      fileName: outputFileName
    };

  } catch (error) {
    console.error('❌ Crawling failed:', error);
    throw error;
  } finally {
    if (browser) await browser.close();
  }
}

async function findAllRoutes(page, startUrl, foundUrls, maxPages) {
  const baseUrl = new URL(startUrl);
  const toVisit = [startUrl];
  const visited = new Set();

  while (toVisit.length > 0 && foundUrls.size < maxPages) {
    const currentUrl = toVisit.shift();
    
    if (visited.has(currentUrl)) continue;
    visited.add(currentUrl);
    foundUrls.add(currentUrl);

    try {
      await page.goto(currentUrl, { waitUntil: 'networkidle2', timeout: 30000 });
      
      // Extract all links
      const links = await page.evaluate(() => {
        const anchors = Array.from(document.querySelectorAll('a[href]'));
        return anchors.map(a => a.href).filter(href => href?.trim());
      });

      // Process links
      for (const link of links) {
        try {
          const linkUrl = new URL(link);
          
          // Only same domain links
          if (linkUrl.origin !== baseUrl.origin) continue;
          
          // Clean URL (remove fragment)
          linkUrl.hash = '';
          const cleanUrl = linkUrl.toString();
          
          // Skip if already found or is a file
          if (foundUrls.has(cleanUrl) || /\.(jpg|jpeg|png|gif|pdf|zip|exe)$/i.test(cleanUrl)) {
            continue;
          }
          
          foundUrls.add(cleanUrl);
          toVisit.push(cleanUrl);
          
        } catch (e) {
          // Skip invalid URLs
        }
      }
      
    } catch (error) {
      console.warn(`⚠️ Failed to scan ${currentUrl}: ${error.message}`);
    }
  }
}

async function createPDF(browser, pagesData, outputPath) {
  const page = await browser.newPage();
  
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Website Export</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.5; }
        .page-break { page-break-before: always; }
        .header { border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px; }
        .title { font-size: 20px; font-weight: bold; color: #2c3e50; }
        .url { font-size: 12px; color: #666; word-break: break-all; }
        .content { font-size: 11px; margin-top: 15px; white-space: pre-wrap; }
        .toc { margin-bottom: 30px; }
        .toc-item { margin: 5px 0; }
      </style>
    </head>
    <body>
      <div class="toc">
        <h1>Website Export</h1>
        <p>Generated: ${new Date().toLocaleString()}</p>
        <p>Total Pages: ${pagesData.length}</p>
        <h2>Pages:</h2>
        ${pagesData.map((page, i) => 
          `<div class="toc-item">${i + 1}. ${escapeHtml(page.title || 'Untitled')}</div>`
        ).join('')}
      </div>

      ${pagesData.map((pageData, index) => `
        <div class="${index > 0 ? 'page-break' : ''}">
          <div class="header">
            <div class="title">${escapeHtml(pageData.title || 'Untitled Page')}</div>
            <div class="url">${escapeHtml(pageData.url)}</div>
          </div>
          <div class="content">${escapeHtml(pageData.content || 'No content')}</div>
        </div>
      `).join('')}
    </body>
    </html>
  `;

  await page.setContent(htmlContent);
  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '15mm', right: '15mm', bottom: '15mm', left: '15mm' }
  });
  
  await page.close();
}

function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
