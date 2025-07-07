"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Schema
const formSchema = z.object({
  prompt: z.string().min(2, {
    message: "Prompt must be at least 2 characters.",
  }),
  status: z.string(),
  scheduledOn: z.string(),
});

function formatScheduledOn(dateString: string | null) {
  if (!dateString) return "";

  const date = new Date(dateString);
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60000); // Adjust to local time

  // Format the date to YYYY-MM-DDTHH:mm format for the datetime-local input
  return localDate.toISOString().slice(0, 16); // '2025-05-13T17:00'
}

export default function ScheduleForm({
  initialData,
  pageTitle,
}: {
  initialData: any;
  pageTitle: string;
}) {
  const defaultValues = {
    prompt: initialData?.prompt || "",
    status: initialData?.published || "",
    scheduledOn: formatScheduledOn(initialData?.scheduledOn || ""),
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    fetch(`/api/feed/${initialData?.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.lead) {
          console.log("Feed updated successfully:", data.lead);
        } else {
          console.error("Error:", data.error);
        }
      })
      .catch((error) => {
        console.error("Request failed", error);
      });
  }

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-left text-2xl font-bold">
          {pageTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prompt</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter prompt" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="scheduledOn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Scheduled On</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit">Schedule Feed</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
