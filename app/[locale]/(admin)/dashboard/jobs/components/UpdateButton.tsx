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

interface Props {
  jobId: string;
}

export const UpdateJobButton = ({ jobId }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState("");

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
        title: form.get("title") as string,
        experience: form.get("experience") as string,
        deadline: form.get("deadline")
          ? new Date(form.get("deadline") as string)
          : undefined,
        category: form.get("category") as string,
        description,
        location: form.get("location") as string | undefined,
        jobType: form.get("jobType") as string | undefined,
        workingHours: form.get("workingHours") as string | undefined,
        workingDays: form.get("workingDays") as string | undefined,
        vacancy: form.get("vacancy") ? Number(form.get("vacancy")) : undefined,
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">
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
            <InputField
              label="Title"
              name="title"
              defaultValue={job?.title}
              error={(error as any)?.fieldErrors?.title}
            />

            <InputField
              label="Experience"
              name="experience"
              defaultValue={job?.experience}
              error={(error as any)?.fieldErrors?.experience}
            />

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
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <RichTextField
              label="Description"
              value={description}
              onChange={(v) => setDescription(v as string)}
            />

            <InputField
              label="Location"
              name="location"
              defaultValue={job?.location}
            />

            <InputField
              label="Job Type"
              name="jobType"
              defaultValue={job?.jobType}
            />

            <InputField
              label="Working Hours"
              name="workingHours"
              defaultValue={job?.workingHours}
            />

            <InputField
              label="Working Days"
              name="workingDays"
              defaultValue={job?.workingDays}
            />

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
