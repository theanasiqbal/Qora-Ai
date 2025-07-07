import path from "path";
import fs, { mkdir, readFile, writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { redis } from "@/lib/redis";
import { ragChat } from "@/lib/rag-chat";
import { crawlWebsiteToPDF } from "@/lib/crawl-web";

export async function GET() {
  try {
    // Retrieve the logged-in user
    const user = await currentUser();

    if (!user) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    // Construct the path to the websites.txt file in the user's directory
    const websitesFolderPath = path.join(
      process.cwd(),
      "public",
      "data",
      user?.fullName, // Assuming user full name is used for directory structure
      "websites" // Folder where the websites.txt file should be located
    );
    const websitesFilePath = path.join(websitesFolderPath, "websites.txt");

    // Check if the 'websites' folder exists, and create it if necessary
    try {
      await fs.mkdir(websitesFolderPath, { recursive: true }); // Create the directory and its parent directories
      console.log(`Websites folder created at: ${websitesFolderPath}`);
    } catch (folderErr) {
      console.error("Error creating websites folder:", folderErr);
      return NextResponse.json(
        { error: "Failed to create websites folder" },
        { status: 500 }
      );
    }

    // Check if the file exists
    let fileContent = "";
    try {
      fileContent = await fs.readFile(websitesFilePath, "utf-8");
    } catch (err) {
      // If the file does not exist, create it with empty content
      if (err.code === "ENOENT") {
        await fs.writeFile(websitesFilePath, ""); // Create an empty websites.txt file
        console.log(`Created an empty websites.txt for ${user.fullName}`);
      } else {
        throw err; // If the error is not related to missing file, rethrow it
      }
    }

    // Split the file content by commas and return an array of websites
    const websites = fileContent
      .split(",")
      .map((line) => line.trim())
      .filter(Boolean);

    return NextResponse.json({ websites });
  } catch (error) {
    console.error("Error reading the file:", error);
    return NextResponse.json(
      { error: "Failed to read websites" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    // Retrieve the logged-in user
    const user = await currentUser();

    if (!user) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    // Get the form data and extract new websites
    const data = await req.formData();
    const newWebsitesString = data.get("websites") as string;

    // Define the path where the websites should be saved
    const uploadDir = path.join(
      process.cwd(),
      "public",
      "data",
      user?.fullName,
      "websites"
    );

    // Ensure the directory exists
    await mkdir(uploadDir, { recursive: true });

    const websitesFilePath = path.join(uploadDir, "websites.txt");

    await crawlWebsiteToPDF(newWebsitesString)

    // // Initialize a set to hold existing websites
    // let websitesSet = new Set<string>();
    // let existingWebsites = "";

    // try {
    //   existingWebsites = await readFile(websitesFilePath, "utf-8");
    //   // Create a set of websites by splitting on commas and trimming extra whitespace
    //   websitesSet = new Set(
    //     existingWebsites
    //       .split(",")
    //       .map((site) => site.trim())
    //       .filter(Boolean)
    //   );
    // } catch (err) {
    //   // If the file doesn't exist, we'll simply proceed
    //   console.log(err?.message);
    // }

    // // Split and clean up the new websites string
    // const newWebsites = newWebsitesString
    //   .split(",")
    //   .map((site) => site.trim())
    //   .filter(Boolean);

    // // Determine which websites are not already present
    // const websitesToAdd = newWebsites.filter((site) => !websitesSet.has(site));

    // // If there are new websites, update the file and Redis
    // if (websitesToAdd.length > 0) {
    //   let updatedWebsites = "";
    //   if (existingWebsites.trim() === "") {
    //     // No websites exist yet
    //     updatedWebsites = websitesToAdd.join(", ");
    //   } else {
    //     // Append the new websites to the existing list
    //     updatedWebsites =
    //       existingWebsites.trim() + ", " + websitesToAdd.join(", ");
    //   }

    //   // Write the updated websites to the file
    //   await writeFile(websitesFilePath, updatedWebsites);

    //   // Add the new websites to Redis and ragChat context
    //   for (const website of websitesToAdd) {
    //     // Check if the website is already indexed in Redis
    //     const isAlreadyIndexedInRedis = await redis.sismember(
    //       user.fullName || "Unknown",
    //       website
    //     );
    //     if (isAlreadyIndexedInRedis) {
    //       console.log(
    //         `⏩ Skipping website already indexed in Redis: ${website}`
    //       );
    //       continue;
    //     }

    //     // Add the website to Redis if not indexed
    //     await redis.sadd(user.fullName || "Unknown", website);

    //     // Add the website to ragChat context if not already present
    //     await ragChat.context.add({
    //       type: "html",
    //       source: website,
    //     });

    //     console.log(`✅ Indexed and added to context: ${website}`);
    //   }
    // }

    return NextResponse.json(
      { message: "Websites saved and indexed successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving websites:", error);
    return NextResponse.json(
      { error: "Website saving failed!" },
      { status: 500 }
    );
  }
}
