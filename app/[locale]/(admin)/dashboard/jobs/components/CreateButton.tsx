"use client";

import { Button } from "@/components/ui/button";
import {
  InputField,
  RichTextField,
  TextareaField,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetCategories } from "@/services/categories";
import { useCreateJob } from "@/services/jobs";
import { PlusIcon } from "lucide-react";
import { FormEvent, useState } from "react";

export const CreateButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState<"ar" | "en" | string>("ar");

  const [titleAr, setTitleAr] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [experienceAr, setExperienceAr] = useState("");
  const [experienceEn, setExperienceEn] = useState("");
  const [descriptionAr, setDescriptionAr] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [locationAr, setLocationAr] = useState("");
  const [locationEn, setLocationEn] = useState("");
  const [jobTypeAr, setJobTypeAr] = useState("");
  const [jobTypeEn, setJobTypeEn] = useState("");
  const [workingHoursAr, setWorkingHoursAr] = useState("");
  const [workingHoursEn, setWorkingHoursEn] = useState("");
  const [workingDaysAr, setWorkingDaysAr] = useState("");
  const [workingDaysEn, setWorkingDaysEn] = useState("");

  const { data } = useGetCategories({});
  const { mutate, isPending, error } = useCreateJob(() => setIsOpen(false));

  const createJob = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);

    mutate({
      title: JSON.stringify({ ar: titleAr, en: titleEn }),
      experience: JSON.stringify({ ar: experienceAr, en: experienceEn }),
      deadline: form.get("deadline")
        ? new Date(form.get("deadline") as string)
        : undefined,
      category: form.get("category") as string,
      applications: [],
      description: JSON.stringify({ ar: descriptionAr, en: descriptionEn }),
      location: JSON.stringify({ ar: locationAr, en: locationEn }),
      jobType: JSON.stringify({ ar: jobTypeAr, en: jobTypeEn }),
      workingHours: JSON.stringify({ ar: workingHoursAr, en: workingHoursEn }),
      workingDays: JSON.stringify({ ar: workingDaysAr, en: workingDaysEn }),
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

      <DialogContent className="max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Create a New Job Application</DialogTitle>
        </DialogHeader>

        <form className="flex flex-col gap-4 p-4 pb-0" onSubmit={createJob}>
          {/* Tabs for AR / EN */}
          <Tabs value={tab} onValueChange={setTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="ar">Arabic</TabsTrigger>
              <TabsTrigger value="en">English</TabsTrigger>
            </TabsList>

            {/* Arabic */}
            <TabsContent value="ar" className="space-y-4">
              <InputField
                label="Title (AR)"
                placeholder="Job title in Arabic"
                value={titleAr}
                onChange={(v) => setTitleAr(v as string)}
                error={(error as any)?.fieldErrors?.title?.ar}
              />
              <InputField
                label="Experience (AR)"
                placeholder="Experience in Arabic"
                value={experienceAr}
                onChange={(v) => setExperienceAr(v as string)}
                error={(error as any)?.fieldErrors?.experience?.ar}
              />
              <RichTextField
                label="Description (AR)"
                value={descriptionAr}
                onChange={(v) => setDescriptionAr(v as string)}
              />
              <InputField
                label="Location (AR)"
                placeholder="Location in Arabic"
                value={locationAr}
                onChange={(v) => setLocationAr(v as string)}
              />
              <InputField
                label="Job Type (AR)"
                placeholder="Job type in Arabic"
                value={jobTypeAr}
                onChange={(v) => setJobTypeAr(v as string)}
              />
              <InputField
                label="Working Hours (AR)"
                placeholder="Working hours in Arabic"
                value={workingHoursAr}
                onChange={(v) => setWorkingHoursAr(v as string)}
              />
              <InputField
                label="Working Days (AR)"
                placeholder="Working days in Arabic"
                value={workingDaysAr}
                onChange={(v) => setWorkingDaysAr(v as string)}
              />
            </TabsContent>

            {/* English */}
            <TabsContent value="en" className="space-y-4">
              <InputField
                label="Title (EN)"
                placeholder="Job title in English"
                value={titleEn}
                onChange={(v) => setTitleEn(v as string)}
                error={(error as any)?.fieldErrors?.title?.en}
              />
              <InputField
                label="Experience (EN)"
                placeholder="Experience in English"
                value={experienceEn}
                onChange={(v) => setExperienceEn(v as string)}
                error={(error as any)?.fieldErrors?.experience?.en}
              />
              <RichTextField
                label="Description (EN)"
                value={descriptionEn}
                onChange={(v) => setDescriptionEn(v as string)}
              />
              <InputField
                label="Location (EN)"
                placeholder="Location in English"
                value={locationEn}
                onChange={(v) => setLocationEn(v as string)}
              />
              <InputField
                label="Job Type (EN)"
                placeholder="Job type in English"
                value={jobTypeEn}
                onChange={(v) => setJobTypeEn(v as string)}
              />
              <InputField
                label="Working Hours (EN)"
                placeholder="Working hours in English"
                value={workingHoursEn}
                onChange={(v) => setWorkingHoursEn(v as string)}
              />
              <InputField
                label="Working Days (EN)"
                placeholder="Working days in English"
                value={workingDaysEn}
                onChange={(v) => setWorkingDaysEn(v as string)}
              />
            </TabsContent>
          </Tabs>

          {/* Deadline */}
          <InputField
            label="Deadline"
            placeholder="Job deadline"
            name="deadline"
            type="date"
            error={(error as any)?.fieldErrors?.deadline}
          />

          {/* Category */}
          <Select disabled={data?.categories?.length === 0} name="category">
            <SelectTrigger error={(error as any)?.fieldErrors?.category}>
              <SelectValue placeholder="Job Category" />
            </SelectTrigger>
            <SelectContent>
              {data?.categories?.map((category) => (
                <SelectItem key={category._id} value={category._id}>
                  {tab === "ar" ? category.name.ar : category.name.en}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Vacancy */}
          <InputField
            label="Vacancy"
            placeholder="Job vacancy"
            name="vacancy"
            type="number"
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
