"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/dashboard/Input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDeleteJob, useGetJobs, useUpdateJob } from "@/services/jobs";
import {
  Trash2,
  Edit,
  Briefcase,
  MapPin,
  Clock,
  Calendar,
  Users,
  Folder,
  Plus,
  MoreVerticalIcon,
} from "lucide-react";
import { CreateButton } from "./CreateButton";
import { UpdateJobButton } from "./UpdateButton";

export const Content = () => {
  const [search, setSearch] = useState("");
  const { data } = useGetJobs({ search });
  const { mutate: deleteJob, isPending: isDeleting } = useDeleteJob();

  return (
    <main className="pb-8">
      <header className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-semibold">Jobs</h1>
        <div className="flex items-center gap-4 justify-between">
          <Input
            placeholder="Search jobs..."
            className="max-w-sm"
            onChange={(e) =>
              setTimeout(() => {
                setSearch(e.target.value);
              }, 500)
            }
          />
          <CreateButton />
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {data?.payload?.map((job) => (
          <div
            key={job._id}
            className="border h-fit border-input rounded-lg shadow-sm hover:shadow-sm transition-all overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-0">{job.title}</h3>
                  {job?.category?.name && (
                    <span className="inline-flex items-center py-0.5 rounded-full text-xs font-medium bg-subtitlecolor text-blue-100">
                      {job.category.name}
                    </span>
                  )}
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" className="p-1 h-8 w-8">
                      <MoreVerticalIcon size={16} />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="flex flex-col gap-1 w-fit p-1 bg-background text-white border border-input"
                    align="end"
                  >
                    <UpdateJobButton jobId={job?._id} />
                    <Button
                      variant="ghost"
                      className="justify-start gap-2 text-red-500"
                      onClick={() => deleteJob(job._id)}
                      disabled={isDeleting}
                    >
                      <Trash2 size={12} /> Delete
                    </Button>
                  </PopoverContent>
                </Popover>
              </div>

              {job.description && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: job?.description as string,
                  }}
                  className="[&_ul]:list-[unset] [&_ol]:list-[unset] [&_ul]:p-0 [&_ol]:p-0 [&_ul]:m-0 [&_ol]:m-0 [&_li]:p-0 [&_li]:m-0 **:border-[unset] **:shadow-[unset]"
                ></div>
              )}

              <div className="space-y-2 mb-4">
                {job.location && (
                  <div className="flex items-center text-sm text-subtitle-color">
                    <MapPin size={16} className="mr-2 text-subtitle-color" />
                    {job.location}
                  </div>
                )}

                {job.jobType && (
                  <div className="flex items-center text-sm text-subtitle-color">
                    <Briefcase size={16} className="mr-2 text-subtitle-color" />
                    {job.jobType}
                  </div>
                )}

                <div className="flex items-center text-sm text-subtitle-color">
                  <Clock size={16} className="mr-2 text-subtitle-color" />
                  {job.experience} experience
                </div>

                {job.workingHours && (
                  <div className="flex items-center text-sm text-subtitle-color">
                    <Clock size={16} className="mr-2 text-subtitle-color" />
                    {job.workingHours}
                    {job.workingDays && ` • ${job.workingDays}`}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center text-subtitle-color">
                    <Users size={16} className="mr-1 text-subtitle-color" />
                    <span className="font-medium">
                      {job.applications.length}
                    </span>
                    <span className="ml-1">applicants</span>
                  </div>
                  <div className="flex items-center text-subtitle-color">
                    <Folder size={16} className="mr-1 text-subtitle-color" />
                    <span className="font-medium">{job.vacancy}</span>
                    <span className="ml-1">vacancies</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center text-xs text-subtitle-color mt-3">
                <Calendar size={14} className="mr-1" />
                Deadline: {new Date(job.deadline).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      {data?.payload?.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No jobs found. Try adjusting your search.
        </div>
      )}
    </main>
  );
};
