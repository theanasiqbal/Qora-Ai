import { NextResponse } from "next/server";
import { loginToSalesforce } from "@/lib/salesForce";
import path from "path";
import { cookies } from "next/headers";
import puppeteer from "puppeteer";

export async function POST() {
  try {
    // Get company name from cookies
    const cookieStore = cookies();
    const company = cookieStore.get("company")?.value;

    let companyName = "Unknown";
    try {
      if (company) {
        const companyData = JSON.parse(company);
        companyName = companyData.name?.trim() || "Unknown";
      }
    } catch (error) {
      console.error("Error parsing cookies:", error);
      return NextResponse.json(
        { message: "Invalid company data in cookies" },
        { status: 400 }
      );
    }

    if (companyName === "Unknown") {
      return NextResponse.json(
        { message: "Company name not found in cookies" },
        { status: 400 }
      );
    }



    // Connect to Salesforce and fetch leads
    const conn = await loginToSalesforce();
    const results = await conn.query(
      "SELECT Id, Name, Company, Email, Status, CreatedDate, Phone FROM Lead"
    );

    const leads = results.records;

    if (!leads.length) {
      return NextResponse.json({ message: "No leads found" }, { status: 404 });
    }

    // Generate HTML content for PDF
    const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Customer Leads</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h1 { text-align: center; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f4f4f4; }
          tr:nth-child(even) { background-color: #f9f9f9; }
        </style>
      </head>
      <body>
        <h1>Customer Leads</h1>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Company</th>
              <th>Email</th>
              <th>Status</th>
              <th>Created Date</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            ${leads
              .map(
                (lead, index) => `
                <tr>
                  <td>${index + 1}</td>
                  <td>${lead.Name || "-"}</td>
                  <td>${lead.Company || "-"}</td>
                  <td>${lead.Email || "-"}</td>
                  <td>${lead.Status || "-"}</td>
                  <td>${lead.CreatedDate || "-"}</td>
                  <td>${lead.Phone || "-"}</td>
                </tr>`
              )
              .join("")}
          </tbody>
        </table>
      </body>
    </html>`;

    // Launch Puppeteer and create PDF
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    const folderPath = path.join(process.cwd(), "public", "data", companyName, "Salesforce");

    // Define PDF file path
    const filePath = path.join(folderPath, "Leads.pdf");

    await page.pdf({ path: filePath, format: "A4", printBackground: true });

    await browser.close();

    return NextResponse.json({ message: "PDF file created", filePath });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return NextResponse.json(
      { message: "Error creating PDF" },
      { status: 500 }
    );
  }
}
