import { notFound } from "next/navigation";
import ScheduleForm from "./schedule-form";

type Props = {
  feedId: string;
};

export default async function ScheduleViewPage({ feedId }: Props) {
  let feed = null;
  let pageTitle = "Schedule feed";

  if (feedId !== "new") {
    const res = await fetch(`http://localhost:3001/api/feed/${feedId}`);
    if (!res.ok) {
      notFound();
    }
    feed = await res.json();
    pageTitle = "Schedule feed";
  }

  return <ScheduleForm initialData={feed} pageTitle={pageTitle} />;
}
