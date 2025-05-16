import { Product } from '@/constants/data';
import { fakeProducts } from '@/constants/mock-api';
import { searchParamsCache } from '@/lib/searchparams';
import { DataTable as ProductTable } from '@/components/ui/table/data-table';
import { columns } from './product-tables/columns';
import { prisma } from '@/lib/prisma';

type ProductListingPage = {};

export default async function ProductListingPage({}: ProductListingPage) {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('q');
  const pageLimit = searchParamsCache.get('limit');
  const categories = searchParamsCache.get('categories');
  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
    ...(categories && { categories: categories })
  };

  const response = await fetch("http://localhost:3001/api/feed", {
    cache: "no-store"
  });

  // Check if the response was successful (status code 200-299)
  if (!response.ok) {
    console.error('Error fetching leads:', response.statusText);
    return;
  }

  // Parse the response body as JSON
  const data = await response.json();   
  const totalFeeds = data.total_feeds;
  const feeds = data.feeds;

  const cleanedFeeds = feeds.map(feed => ({
    ...feed,
    content: feed.content.replace(/<[^>]*>?/gm, '')
  }));

  // console.log('feeds', feeds);
  // console.log( "columns", columns )

  return (
    <ProductTable
      columns={columns}
      data={cleanedFeeds}
      totalItems={totalFeeds}
      feed={true}
    />
  );
}
