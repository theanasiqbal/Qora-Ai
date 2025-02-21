import { writeFile, mkdir } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

export async function POST(req) {
  try {
    const data = await req.formData();
    const name = data.get("name"); // Get user-provided name
    const files = data.getAll("files"); // Get multiple files

    if (!name || files.length === 0) {
      return NextResponse.json({ error: "Name and files are required!" }, { status: 400 });
    }

    const uploadDir = path.join(process.cwd(), "public", "data", name);

    // Create directory if it doesn't exist
    await mkdir(uploadDir, { recursive: true });

    // Save each file
    await Promise.all(
      files.map(async (file) => {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filePath = path.join(uploadDir, file.name);
        await writeFile(filePath, buffer);
      })
    );

    return NextResponse.json({ message: "Files uploaded successfully!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "File upload failed!" }, { status: 500 });
  }
}
