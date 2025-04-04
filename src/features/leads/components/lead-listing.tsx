import { DataTable as LeadTable } from "@/components/ui/table/data-table";
import { columns } from "./lead-tables/columns";
import { searchParamsCache } from "@/lib/searchparams";

type LeadListingPageProps = {
  searchParams: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
  };
};

export default async function LeadListingPage ( { }: LeadListingPageProps ) {
  // Use Nuqs to manage query parameters dynamically
  const page = searchParamsCache.get( 'page' );
  const search = searchParamsCache.get( 'q' );
  const pageLimit = searchParamsCache.get( 'limit' );
  const status = searchParamsCache.get( 'status' );

  const filters = {
    page,
    limit: pageLimit,
    ...( search && { search } ),
    ...( status && { status } )
  };
  const sanitizedFilters = Object.fromEntries(
    Object.entries( filters ).filter( ( [ _, value ] ) => value && value !== "null" )
  );

  const queryString = new URLSearchParams( sanitizedFilters as any ).toString();

  const apiUrl = queryString ? `http://localhost:3000/api/leads?${ queryString }` : `http://localhost:3000/api/leads`;

  const response = await fetch( apiUrl );

  // Check if the response was successful (status code 200-299)
  if ( !response.ok )
  {
    console.error( 'Error fetching leads:', response.statusText );
    return;
  }

  // Parse the response body as JSON
  const data = await response.json();

  // Extract the leads and total_leads from the response
  const totalLeads = data.total_leads;
  const leads = data.leads;

  // console.log( 'Total Leads:', totalLeads );
  // console.log( 'Leads:', leads );

  return (
    <LeadTable columns={columns} data={leads} totalItems={totalLeads} />
  );
}
