import { DataTable as LeadTable } from "@/components/ui/table/data-table";
import { columns } from "./lead-tables/columns";
import { searchParamsCache } from "@/lib/searchparams";

type LeadListingPageProps = {
  searchParams: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    id?: string;
  };
};

export default async function LeadListingPage({}: LeadListingPageProps) {
  // Use Nuqs to manage query parameters dynamically
  const page = searchParamsCache.get("page");
  const search = searchParamsCache.get("q");
  const pageLimit = searchParamsCache.get("limit");
  const status = searchParamsCache.get("status");
  const feedId = searchParamsCache.get("id");

  const filters = {
    feedId,
    page,
    limit: pageLimit,
    ...(search && { search }),
    ...(status && { status }),
  };
  const sanitizedFilters = Object.fromEntries(
    Object.entries(filters).filter(([_, value]) => value && value !== "null")
  );

  const queryString = new URLSearchParams(sanitizedFilters as any).toString();

  const apiUrl = `http://localhost:3001/api/lead?${queryString}`;

  const response = await fetch(apiUrl, {
    cache: "no-store",
  });

  // Check if the response was successful (status code 200-299)
  if (!response.ok) {
    console.error("Error fetching leads:", response.statusText);
    return;
  }

  // Parse the response body as JSON
  const data = await response.json();

  // Extract the leads and total_leads from the response
  const totalLeads = data.total_feeds;
  const leads = data.feeds;

  
  // console.log( 'Total Leads:', totalLeads );
  // console.log( 'Leads:', leads );

  return (
    <LeadTable
      lead={true}
      columns={columns}
      data={leads}
      totalItems={totalLeads}
    />
  );
}
