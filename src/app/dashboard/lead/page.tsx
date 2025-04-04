import PageContainer from "@/components/layout/page-container";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTableSkeleton } from "@/components/ui/table/data-table-skeleton";
import { searchParamsCache, serialize } from '@/lib/searchparams';
import { SearchParams } from 'nuqs/server';
import { Suspense } from 'react';
import LeadTableAction from "@/features/leads/components/lead-tables/lead-table-action";
import LeadListingPage from "@/features/leads/components/lead-listing";

export const metadata = {
    title: 'Dashboard: Leads'
};

type pageProps = {
    searchParams: Promise<SearchParams>;
};

export default async function Page ( props: pageProps ) {
    const searchParams = await props.searchParams;
    // Allow nested RSCs to access the search params (in a type-safe way)
    searchParamsCache.parse( searchParams );

    // This key is used for invoke suspense if any of the search params changed (used for filters).
    const key = serialize( { ...searchParams } );
    // console.log( 'searchParamssearchParams', searchParams );

    return (
        <PageContainer scrollable={false}>
            <div className="flex flex-1 flex-col space-y-4">
                <div className="flex items-start justify-between">
                    <Heading title="Leads" description="Manage Leads" />
                    {/* <a href="/dashboard/leads/new" className={cn( buttonVariants(), "text-xs md:text-sm" )}>
                        <Plus className="mr-2 h-4 w-4" /> Add New
                    </a> */}
                </div>
                <Separator />

                {/* Actions (Filters, Search, etc.) */}
                <LeadTableAction />
                <Suspense
                    key={key}
                    fallback={<DataTableSkeleton columnCount={5} rowCount={10} />}
                >
                    <LeadListingPage searchParams={searchParams} />
                </Suspense>
            </div>
        </PageContainer>
    );
}
