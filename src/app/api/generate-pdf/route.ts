// app/api/generate-pdf/route.ts

import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function POST(request: Request) {
  try {
    // Parse the request body
    const { htmlContent } = await request.json();
    
    // Validate input
    if (!htmlContent) {
      return NextResponse.json(
        { 
          error: 'Bad Request', 
          message: 'htmlContent is required' 
        },
        { status: 400 }
      );
    }

    // Add default styling
    const styledHtmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { 
            font-family: Arial, sans-serif; 
            line-height: 1.6; 
            padding: 20px;
            margin: 0;
          }
          .custom-code-block { 
            background-color: #f5f5f5; 
            border: 1px solid #ddd; 
            border-radius: 5px; 
            margin-bottom: 15px;
            overflow-x: auto;
          }
          .custom-code-block code {
            display: block;
            padding: 15px;
            font-family: 'Courier New', monospace;
            white-space: pre-wrap;
            font-size: 14px;
          }
          p { 
            margin-bottom: 15px; 
            font-size: 16px;
          }
        </style>
      </head>
      <body>
        ${htmlContent}
      </body>
      </html>
    `;

    // Launch browser with explicit options
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    
    // Set content with timeout
    await page.setContent(styledHtmlContent, {
      waitUntil: 'networkidle0',
      timeout: 30000 // 30 second timeout
    });

    // Generate PDF
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        right: '20mm',
        bottom: '20mm',
        left: '20mm'
      }
    });

    // Close the browser
    await browser.close();

    // Create a new Response with the PDF
    const response = new Response(pdf, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="exported-content.pdf"'
      }
    });

    return response;
  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json(
      { 
        error: 'Internal Server Error', 
        message: 'Failed to generate PDF',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}

// In App Router, config for body size is set differently
export const dynamic = 'force-dynamic';
export const maxDuration = 60; // Extend processing time limit if needed (in seconds)