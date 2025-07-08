import { notFound } from "next/navigation";
import LeadForm from "./lead-form";

type TLeadViewPageProps = {
  leadId: string;
};

export default async function LeadViewPage({ leadId }: TLeadViewPageProps) {
  let lead = null;
  let pageTitle = "Create New Lead";

  if (leadId !== "new") {
    const res = await fetch(`http://localhost:3001/api/lead/${leadId}`);
    if (!res.ok) {
      notFound();
    }
    lead = await res.json();
    pageTitle = "Update Lead";
  }

  return <LeadForm initialData={lead?.lead} pageTitle={pageTitle} />;
}

