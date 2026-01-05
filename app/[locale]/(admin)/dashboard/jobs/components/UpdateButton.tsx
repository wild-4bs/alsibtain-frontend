"use client";

import { Button } from "@/components/ui/button";
import {
  InputField,
  RichTextField,
} from "@/components/ui/dashboard/dynamic-sections";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetCategories } from "@/services/categories";
import { useGetJobById, useUpdateJob } from "@/services/jobs";
import { Edit } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Props {
  jobId: string;
}

export const UpdateJobButton = ({ jobId }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState<"ar" | "en">("ar");
  const [description, setDescription] = useState({ ar: "", en: "" });

  const { data: categories } = useGetCategories({});
  const { data: jobResponse, isLoading } = useGetJobById(jobId);

  const job = jobResponse;

  const { mutate, isPending, error } = useUpdateJob(() => {
    setIsOpen(false);
  });

  useEffect(() => {
    if (job?.description) {
      setDescription(job.description);
    }
  }, [job]);

  const updateJob = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);

    mutate({
      id: jobId,
      data: {
        title: {
          ar: form.get("title_ar") as string,
          en: form.get("title_en") as string,
        },
        experience: {
          ar: form.get("experience_ar") as string,
          en: form.get("experience_en") as string,
        },
        deadline: form.get("deadline")
          ? new Date(form.get("deadline") as string)
          : undefined,
        category: form.get("category") as string,
        description,
        location: {
          ar: form.get("location_ar") as string,
          en: form.get("location_en") as string,
        },
        jobType: {
          ar: form.get("jobType_ar") as string,
          en: form.get("jobType_en") as string,
        },
        workingHours: {
          ar: form.get("workingHours_ar") as string,
          en: form.get("workingHours_en") as string,
        },
        workingDays: {
          ar: form.get("workingDays_ar") as string,
          en: form.get("workingDays_en") as string,
        },
        vacancy: form.get("vacancy") ? Number(form.get("vacancy")) : undefined,
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-foreground">
          <Edit width={12} /> Update
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Job</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <p className="text-center py-10">Loading...</p>
        ) : (
          <form className="flex flex-col gap-4 p-4 pb-0" onSubmit={updateJob}>
            {/* Tabs for AR / EN */}
            <Tabs
              value={tab}
              onValueChange={(v) => setTab(v as "ar" | "en")}
              className="w-full"
            >
              <TabsList className="grid grid-cols-2 mb-2">
                <TabsTrigger value="ar">AR</TabsTrigger>
                <TabsTrigger value="en">EN</TabsTrigger>
              </TabsList>

              <TabsContent value={tab}>
                <InputField
                  label="Title"
                  name={`title_${tab}`}
                  defaultValue={job?.title?.[tab]}
                  error={(error as any)?.fieldErrors?.title}
                />

                <InputField
                  label="Experience"
                  name={`experience_${tab}`}
                  defaultValue={job?.experience?.[tab]}
                  error={(error as any)?.fieldErrors?.experience}
                />

                <RichTextField
                  label="Description"
                  value={description[tab] || ""}
                  onChange={(v) =>
                    setDescription((prev) => ({ ...prev, [tab]: v as string }))
                  }
                />

                <InputField
                  label="Location"
                  name={`location_${tab}`}
                  defaultValue={job?.location?.[tab]}
                />

                <InputField
                  label="Job Type"
                  name={`jobType_${tab}`}
                  defaultValue={job?.jobType?.[tab]}
                />

                <InputField
                  label="Working Hours"
                  name={`workingHours_${tab}`}
                  defaultValue={job?.workingHours?.[tab]}
                />

                <InputField
                  label="Working Days"
                  name={`workingDays_${tab}`}
                  defaultValue={job?.workingDays?.[tab]}
                />
              </TabsContent>
            </Tabs>

            {/* Common fields */}
            <InputField
              label="Deadline"
              name="deadline"
              type="date"
              defaultValue={
                job?.deadline
                  ? new Date(job.deadline).toISOString().split("T")[0]
                  : undefined
              }
              error={(error as any)?.fieldErrors?.deadline}
            />

            <Select defaultValue={job?.category?._id} name="category">
              <SelectTrigger error={(error as any)?.fieldErrors?.category}>
                <SelectValue placeholder="Job Category" />
              </SelectTrigger>
              <SelectContent>
                {categories?.categories?.map((cat) => (
                  <SelectItem key={cat._id} value={cat._id}>
                    {cat.name.ar} / {cat.name.en}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <InputField
              label="Vacancy"
              name="vacancy"
              defaultValue={job?.vacancy?.toString()}
            />

            <DialogFooter>
              <Button className="w-full" disabled={isPending}>
                {isPending ? "Updating..." : "Update Job"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
