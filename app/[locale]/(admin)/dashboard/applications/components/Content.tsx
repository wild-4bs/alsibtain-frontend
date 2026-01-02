"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/dashboard/Input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Trash2,
  MapPin,
  Calendar,
  MoreVertical,
  FileText,
  Download,
  ExternalLink,
  Briefcase,
  Mail,
  User,
} from "lucide-react";
import {
  useDeleteApplicaiton,
  useGetApplications,
} from "@/services/applications";

export const Content = () => {
  const [search, setSearch] = useState("");
  const { data } = useGetApplications({ search });
  const { mutate: deleteApplicaiton, isPending: isDeleting } =
    useDeleteApplicaiton();

  return (
    <main className="pb-8">
      <header className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-semibold">Job Applications</h1>
        <div className="flex items-center gap-4 justify-between">
          <Input
            placeholder="Search applications..."
            className="max-w-sm"
            onChange={(e) =>
              setTimeout(() => {
                setSearch(e.target.value);
              }, 500)
            }
          />
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {data?.payload?.map((application) => (
          <div
            key={application._id}
            className="border border-input rounded-lg shadow-sm hover:shadow-md transition-all overflow-hidden"
          >
            <div className="p-6">
              {/* Applicant Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <User size={20} className="text-subtitle-color" />
                    <h3 className="text-xl font-semibold">
                      {application.firstName} {application.lastName}
                    </h3>
                  </div>
                  <div className="flex flex-col gap-1 text-sm text-subtitle-color">
                    <div className="flex items-center gap-2">
                      <Mail size={14} />
                      {application.email}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={14} />
                      {application.address}, {application.city}
                    </div>
                  </div>
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" className="p-1 h-8 w-8">
                      <MoreVertical size={16} />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="flex flex-col gap-1 w-fit p-1 bg-background text-white border border-input"
                    align="end"
                  >
                    <Button
                      variant="ghost"
                      className="justify-start gap-2 text-red-500"
                      onClick={() => deleteApplicaiton(application._id)}
                      disabled={isDeleting}
                    >
                      <Trash2 size={12} /> Delete
                    </Button>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Job Information */}
              {application.job && (
                <div className="mb-4 p-3 rounded-md">
                  <div className="flex items-center gap-2 mb-1">
                    <Briefcase size={16} className="text-subtitle-color" />
                    <span className="font-medium">
                      Applied for: {application.job.title}
                    </span>
                  </div>
                  {application.job.category?.name && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-subtitle-color text-blue-100">
                      {application.job.category.name}
                    </span>
                  )}
                </div>
              )}

              {/* Documents Showcase */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* CV Card */}
                <div className="border border-input rounded-lg p-4 bg-background/50 hover:bg-background/80 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-blue-500/10 rounded-lg">
                        <FileText size={20} className="text-blue-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">
                          Curriculum Vitae
                        </h4>
                        <p className="text-xs text-subtitle-color">
                          Resume Document
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => window.open(application.cv.url, "_blank")}
                    >
                      <ExternalLink size={14} className="mr-1" />
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        const link = document.createElement("a");
                        link.href = application.cv.url;
                        link.download = `${application.firstName}_${application.lastName}_CV.pdf`;
                        link.click();
                      }}
                    >
                      <Download size={14} />
                    </Button>
                  </div>
                </div>

                {/* Cover Letter Card */}
                <div className="border border-input rounded-lg p-4 bg-background/50 hover:bg-background/80 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-green-500/10 rounded-lg">
                        <FileText size={20} className="text-green-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">Cover Letter</h4>
                        <p className="text-xs text-subtitle-color">
                          Motivation Letter
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() =>
                        window.open(application.coverLetter.url, "_blank")
                      }
                    >
                      <ExternalLink size={14} className="mr-1" />
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        const link = document.createElement("a");
                        link.href = application.coverLetter.url;
                        link.download = `${application.firstName}_${application.lastName}_CoverLetter.pdf`;
                        link.click();
                      }}
                    >
                      <Download size={14} />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-2 text-sm text-subtitle-color">
                  <Calendar size={14} />
                  <span>
                    Available from:{" "}
                    {new Date(application.startDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {data?.payload?.length === 0 && (
        <div className="text-center py-12 text-subtitle-color">
          No applications found. Try adjusting your search.
        </div>
      )}
    </main>
  );
};
