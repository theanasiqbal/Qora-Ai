import { writeFile, mkdir } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const data = await req.formData();
    const name = data.get("name"); // Get user name
    const folder = data.get("folder"); // Get folder name (e.g., "Legal Documents")
    const files = data.getAll("files"); // Get multiple files

    if (!name || !folder ) {
      return NextResponse.json(
        { error: "Name, folder, and files are required!" },
        { status: 400 }
      );
    }

    const uploadDir = path.join(process.cwd(), "public", "data", name, folder);

    // Create the directory if it doesn't exist
    await mkdir(uploadDir, { recursive: true });

    // Save each file into the correct folder
    await Promise.all(
      files.map(async (file) => {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filePath = path.join(uploadDir, file.name);
        await writeFile(filePath, buffer);
      })
    );

    return NextResponse.json(
      { message: `Files uploaded to ${folder} successfully!` },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "File upload failed!" }, { status: 500 });
  }
}

export async function GET() {
  // Get cookies using next/headers
  const cookieStore = cookies();
  const company = cookieStore.get("company")?.value;

  let companyName = "Unknown";
  try {
    if (company) {
      const companyData = JSON.parse(company);
      companyName = companyData.name || "Unknown";
    }
  } catch (error) {
    console.error("Error parsing cookies:", error);
  }

  const basePath = path.join(process.cwd(), "public", "data", companyName);

  try {
    const items = fs.readdirSync(basePath, { withFileTypes: true });

    // Prepare the response structure
    const folders = items
      .filter((item) => item.isDirectory())
      .map((folder) => {
        const folderPath = path.join(basePath, folder.name);
        const files = fs.readdirSync(folderPath).map((file) => ({
          name: file,
          type: "file",
        }));

        return {
          name: folder.name,
          type: "folder",
          files,
        };
      });

    return NextResponse.json({ success: true, data: folders });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Error fetching folders & files",
    });
  }
}
