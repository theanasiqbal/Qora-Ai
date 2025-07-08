import { Product } from "@/constants/data";
import { fakeProducts } from "@/constants/mock-api";
import { searchParamsCache } from "@/lib/searchparams";
import { DataTable as ProductTable } from "@/components/ui/table/data-table";
import { columns } from "./product-tables/columns";

type ProductListingPage = {};

export default async function ProductListingPage({}: ProductListingPage) {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get("page");
  const search = searchParamsCache.get("q");
  const pageLimit = searchParamsCache.get("limit");
  const categories = searchParamsCache.get("categories");
  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
    ...(categories && { categories: categories }),
  };

  const response = await fetch("http://localhost:3001/api/feed", {
    cache: "no-store",
  });

  // Check if the response was successful (status code 200-299)
  if (!response.ok) {
    console.error("Error fetching leads:", response.statusText);
    return;
  }

  // Parse the response body as JSON
  const data = await response.json();
  const totalFeeds = data.total_feeds;
  const feeds = data.feeds;

const cleanedFeeds = feeds.map((feed: any) => {
  const now = new Date();
  const scheduledDate = new Date(feed.scheduledOn);
  const timeDiff = scheduledDate.getTime() - now.getTime();

  const isPostingNow = timeDiff >= 0 && timeDiff <= 60000; // within 1 minute (in milliseconds)

  let publishedStatus = "❌ Not Published";
  if (isPostingNow) {
    publishedStatus = "⏳ Posting..."; // Use a spinner icon if desired
  } else if (feed.published) {
    publishedStatus = `✔️ Published on ${scheduledDate.toLocaleDateString("en-GB")}`;
  }

  return {
    ...feed,
    content: feed.content.replace(/<[^>]*>?/gm, ""),
    published: publishedStatus,
  };
});

  return (
    <ProductTable
      columns={columns}
      data={cleanedFeeds}
      totalItems={totalFeeds}
      feed={true}
    />
  );
}
