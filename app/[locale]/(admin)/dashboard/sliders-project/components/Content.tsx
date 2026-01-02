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
  Play,
  ExternalLink,
  MoreVertical,
  Maximize2,
  Link2,
  Edit,
  Eye,
} from "lucide-react";
import { useGetProjectById } from "@/services/projects";
import {
  useDeleteSlider,
  useGetSliderProjects,
} from "@/services/slider-projects";
import { CreateButton } from "./CreateButton";
import { UpdateProjectButton } from "./UpdateButton";

// Project Link Component
const ProjectLinkDisplay = ({ projectId }: { projectId: string }) => {
  const { data: project, isLoading } = useGetProjectById(projectId);

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-sm text-subtitle-color animate-pulse">
        <Link2 size={14} />
        <span>Loading project...</span>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex items-center gap-2 text-sm text-red-400">
        <Link2 size={14} />
        <span>Project not found</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
      <Link2 size={14} className="text-blue-400 shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-xs text-blue-300 mb-0.5">Linked Project</p>
        <p className="text-sm font-medium text-blue-400 truncate">
          {project.name}
        </p>
        {project.location && (
          <p className="text-xs text-blue-300/70 truncate">
            {project.location}
          </p>
        )}
      </div>
    </div>
  );
};

// Video Preview Component
const VideoPreview = ({
  videoUrl,
  name,
}: {
  videoUrl: string;
  name: string;
}) => {
  const [showPlayer, setShowPlayer] = useState(false);

  return (
    <div className="relative group">
      {showPlayer ? (
        <video
          src={videoUrl}
          controls
          autoPlay
          className="w-full h-[400px] object-cover rounded-lg"
        >
          Your browser does not support the video tag.
        </video>
      ) : (
        <>
          <div className="relative w-full h-[400px] bg-linear-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden">
            <video
              src={videoUrl}
              className="w-full h-full object-cover opacity-60"
              muted
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <Button
                size="lg"
                className="bg-white/90 hover:bg-white text-black gap-2 px-6 py-6 rounded-full shadow-2xl"
                onClick={() => setShowPlayer(true)}
              >
                <Play size={24} fill="currentColor" />
                <span className="font-semibold">Play Video</span>
              </Button>
            </div>
          </div>
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="sm"
              variant="secondary"
              className="gap-2 shadow-lg"
              onClick={() => window.open(videoUrl, "_blank")}
            >
              <Maximize2 size={14} />
              Fullscreen
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export const Content = () => {
  const [search, setSearch] = useState("");

  const { data: response, isLoading } = useGetSliderProjects({ search });
  const { mutate: deleteSlider, isPending: isDeleting } = useDeleteSlider();

  const data = response?.projects || [];

  return (
    <main className="pb-8">
      <header className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold mb-1">Project Sliders</h1>
          <p className="text-sm text-subtitle-color">
            Manage featured project showcase videos
          </p>
        </div>
        <div className="flex items-center gap-4 justify-between">
          <Input
            placeholder="Search sliders..."
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

      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6">
            {data?.map((slider) => (
              <div
                key={slider._id}
                className="border border-input rounded-xl shadow-sm hover:shadow-lg transition-all overflow-hidden bg-background"
              >
                <div className="p-6">
                  {/* Header Section */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-1 bg-blue-500 rounded-full" />
                        <h3 className="text-2xl font-bold">{slider.name}</h3>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 ml-4 text-sm text-subtitle-color">
                        <div className="flex items-center gap-1.5">
                          <MapPin size={14} className="text-blue-400" />
                          <span>{slider.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Maximize2 size={14} className="text-green-400" />
                          <span>{slider.area}</span>
                        </div>
                      </div>
                    </div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="ghost" className="p-2 h-9 w-9">
                          <MoreVertical size={18} />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="flex flex-col gap-1 w-fit p-1 bg-background text-white border border-input"
                        align="end"
                      >
                        <UpdateProjectButton projectId={slider._id} />
                        <Button
                          variant="ghost"
                          className="justify-start gap-2 text-red-500"
                          onClick={() => deleteSlider(slider._id)}
                          disabled={isDeleting}
                        >
                          <Trash2 size={14} /> Delete
                        </Button>
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Video Section */}
                  {slider.video?.url && (
                    <div className="mb-6">
                      <VideoPreview
                        videoUrl={slider.video.url}
                        name={slider.name}
                      />
                    </div>
                  )}

                  {/* Links Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {slider.link && (
                      <div className="flex items-center gap-2 p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                        <ExternalLink
                          size={14}
                          className="text-purple-400 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-purple-300 mb-0.5">
                            External Link
                          </p>
                          <a
                            href={slider.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-purple-400 hover:text-purple-300 truncate block underline"
                          >
                            {slider.link}
                          </a>
                        </div>
                      </div>
                    )}

                    {slider.projectLink && (
                      <ProjectLinkDisplay projectId={slider.projectLink} />
                    )}
                  </div>

                  {/* Footer Metadata */}
                  <div className="mt-4 pt-4 border-t border-input/50 flex items-center justify-between text-xs text-subtitle-color">
                    <span>
                      Created: {new Date(slider.createdAt).toLocaleDateString()}
                    </span>
                    <span>
                      Updated: {new Date(slider.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {data?.length === 0 && (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800 mb-4">
                <Play size={32} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No sliders found</h3>
              <p className="text-subtitle-color mb-4">
                Try adjusting your search or create a new project slider
              </p>
            </div>
          )}
        </>
      )}
    </main>
  );
};
