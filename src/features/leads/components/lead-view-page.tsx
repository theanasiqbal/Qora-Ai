import { notFound } from "next/navigation";
import LeadForm from "./lead-form";

type TLeadViewPageProps = {
  params: { leadId: string };
};

export default async function LeadViewPage ( { params }: TLeadViewPageProps ) {
  const { leadId } = params;
  let lead = null;
  let pageTitle = "Create New Lead";

  if ( leadId !== "new" )
  {
    const res = await fetch( `${ process.env.NEXT_PUBLIC_API_URL }/api/leads/${ leadId }` );
    if ( !res.ok )
    {
      notFound(); // Redirects to 404 if lead not found
    }
    lead = await res.json();
    pageTitle = "Edit Lead";
  }

  return <LeadForm initialData={lead} pageTitle={pageTitle} />;
}
