import { notFound } from "next/navigation";
import LeadForm from "./lead-form";

type TLeadViewPageProps = {
  params: { leadId: string };
};

export default async function LeadViewPage(leadId: string) {
  let lead = null;
  let pageTitle = "Create New Lead";

  if (leadId !== "new") {
    const res = await fetch(`http://localhost:3001/api/lead/${leadId?.leadId}`);
    if (!res.ok) {
      notFound(); // Redirects to 404 if lead not found
    }
    lead = await res.json();
    pageTitle = "Update Lead";
  }

  return <LeadForm initialData={lead.lead} pageTitle={pageTitle} />;
}
