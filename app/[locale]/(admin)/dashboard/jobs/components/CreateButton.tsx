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
import { useCreateJob } from "@/services/jobs";
import { PlusIcon } from "lucide-react";
import { FormEvent, useState } from "react";

interface Job {
  title: string;
  experience: string;
  deadline: Date;
  category: string;
  applications: string[];
  description?: string;
  location?: string;
  jobType?: string;
  workingHours?: string;
  workingDays?: string;
  vacancy?: number;
}

export const CreateButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState("");
  const { data } = useGetCategories({});

  const { mutate, isPending, error } = useCreateJob(() => {
    setIsOpen(false);
  });

  const createJob = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    mutate({
      title: form.get("title") as string,
      experience: form.get("experience") as string,
      deadline: form.get("deadline")
        ? new Date(form.get("deadline") as string)
        : undefined,
      category: form.get("category") as string,
      applications: [],
      description: description as string | undefined,
      location: form.get("location") as string | undefined,
      jobType: form.get("jobType") as string | undefined,
      workingHours: form.get("workingHours") as string | undefined,
      workingDays: form.get("workingDays") as string | undefined,
      vacancy: form.get("vacancy") ? Number(form.get("vacancy")) : 1,
    });
  };
  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a New Job Application</DialogTitle>
        </DialogHeader>
        <form className="flex flex-col gap-4 p-4 pb-0" onSubmit={createJob}>
          <InputField
            label="Title"
            placeholder="Enter job title"
            name="title"
            error={(error as any)?.fieldErrors?.title}
          />
          <InputField
            label="experience"
            placeholder="Enter job experience required"
            name="experience"
            error={(error as any)?.fieldErrors?.experience}
          />
          <InputField
            label="deadline"
            placeholder="Enter job deadline"
            name="deadline"
            type="date"
            error={(error as any)?.fieldErrors?.deadline}
          />
          <Select disabled={data?.categories?.length == 0} name="category">
            <SelectTrigger error={(error as any)?.fieldErrors?.category}>
              <SelectValue placeholder="Job Category" />
            </SelectTrigger>
            <SelectContent>
              {data?.categories?.map((category, i) => (
                <SelectItem value={category._id} key={i}>
                  {category?.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <RichTextField
            value={description}
            onChange={(v) => setDescription(v as string)}
            label="Description"
          />
          <InputField
            label="location"
            placeholder="Enter job location"
            name="location"
            error={(error as any)?.fieldErrors?.location}
          />
          <InputField
            label="job type"
            placeholder="Enter job job type"
            name="jobType"
            error={(error as any)?.fieldErrors?.jobType}
          />
          <InputField
            label="working hours"
            placeholder="Enter job working hours"
            name="workingHours"
            error={(error as any)?.fieldErrors?.workingHours}
          />
          <InputField
            label="working days"
            placeholder="Enter job working days"
            name="workingDays"
            error={(error as any)?.fieldErrors?.workingDays}
          />
          <InputField
            label="vacancy"
            placeholder="Enter job vacancy"
            name="vacancy"
            error={(error as any)?.fieldErrors?.vacancy}
          />
          <DialogFooter>
            <Button className="w-full" disabled={isPending}>
              {isPending ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
