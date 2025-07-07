import { writeFile, mkdir, readFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { cookies } from "next/headers";
import { currentUser } from "@clerk/nextjs/server";
import { uploadToAzureBlob } from "@/lib/azure";

export async function POST(req) {
  const { searchParams } = new URL(req.url);
  const documents = searchParams.get("documents");
  const user = await currentUser();
  if (documents) {
     try {
      const data = await req.formData();
      const files = data.getAll("files") as File[];

      const uploadedUrls = await Promise.all(
        files.map(async (file) => {
          const bytes = await file.arrayBuffer();
          const buffer = Buffer.from(bytes);
          const url = await uploadToAzureBlob(buffer, file.name, `${user?.id}`);
          return url;
        })
      );

      return NextResponse.json(
        { message: "Files uploaded successfully!", urls: uploadedUrls },
        { status: 200 }
      );
    } catch (error) {
      console.error("Upload error:", error);
      return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
  } else {
    try {
      const data = await req.formData();
      const newWebsitesString = data.get("websites") as string;

      const uploadDir = path.join(
        process.cwd(),
        "public",
        "data",
        user?.fullName,
        "websites"
      );

      await mkdir(uploadDir, { recursive: true });

      const websitesFilePath = path.join(uploadDir, "websites.txt");

      // Initialize a set to hold existing websites.
      let websitesSet = new Set<string>();
      let existingWebsites = "";

      try {
        existingWebsites = await readFile(websitesFilePath, "utf-8");
        // Create a set of websites by splitting on commas and trimming extra whitespace.
        websitesSet = new Set(
          existingWebsites
            .split(",")
            .map((site) => site.trim())
            .filter(Boolean)
        );
      } catch (err) {
        // If the file doesn't exist, we'll simply proceed.
        console.log(err?.message)
      }

      const newWebsites = newWebsitesString
        .split(",")
        .map((site) => site.trim())
        .filter(Boolean);

      // Determine which websites are not already present.
      const websitesToAdd = newWebsites.filter(
        (site) => !websitesSet.has(site)
      );

      // If there are any new websites, update the file.
      if (websitesToAdd.length > 0) {
        let updatedWebsites = "";
        if (existingWebsites.trim() === "") {
          // No websites exist yet.
          updatedWebsites = websitesToAdd.join(", ");
        } else {
          // Append the new websites to the existing list.
          updatedWebsites =
            existingWebsites.trim() + ", " + websitesToAdd.join(", ");
        }

        await writeFile(websitesFilePath, updatedWebsites);
      }

      return NextResponse.json(
        { message: "Websites saved successfully!" },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { error: "Website saving failed!" },
        { status: 500 }
      );
    }
  }
}

export async function GET() {
  // Get cookies using next/headers
  const cookieStore = cookies();
  const user = await currentUser();

  const basePath = path.join(process.cwd(), "public", "data", user?.fullName);

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
