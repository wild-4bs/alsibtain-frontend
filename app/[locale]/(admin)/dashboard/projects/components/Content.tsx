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
  Layers,
  Home,
  LayoutGrid,
  Video,
  MoreVertical,
  FileImage,
  Building2,
  Plus,
  Edit,
} from "lucide-react";
import { useDeleteProject, useGetProjects } from "@/services/projects";
import { CreateButton } from "./CreateButton";
import Image from "next/image";
import { UpdateProjectButton } from "./UpdateButton";

export const Content = () => {
  const [search, setSearch] = useState("");
  const { data } = useGetProjects({ search });
  const { mutate: deleteProject, isPending: isDeleting } = useDeleteProject();

  return (
    <main className="pb-8">
      <header className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-semibold">Projects</h1>
        <div className="flex items-center gap-4 justify-between">
          <Input
            placeholder="Search projects..."
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
        {data?.map((project) => (
          <div
            key={project._id}
            className="border h-fit border-input rounded-lg shadow-sm hover:shadow-md transition-all overflow-hidden"
          >
            {project.background?.url && (
              <div className="relative w-full h-[250px] overflow-hidden">
                <Image
                  width={10000}
                  height={10000}
                  src={project.background.url}
                  alt={project.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                {project.logo?.url && (
                  <div className="absolute bottom-4 left-4">
                    <Image
                      width={10000}
                      height={10000}
                      src={project.logo.url}
                      alt={project.name}
                      className="h-16 w-auto px-4 py-2 rounded-lg border-2 border-white shadow-lg object-cover"
                    />
                  </div>
                )}
              </div>
            )}

            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-1">{project.name}</h3>
                  <p className="text-sm text-subtitle-color mb-2">
                    {project.caption}
                  </p>
                  {project.projectFullName && (
                    <p className="text-xs text-subtitle-color">
                      {project.projectFullName}
                    </p>
                  )}
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
                    <UpdateProjectButton projectId={project?._id} />
                    <Button
                      variant="ghost"
                      className="justify-start gap-2 text-red-500"
                      onClick={() => deleteProject(project._id)}
                      disabled={isDeleting}
                    >
                      <Trash2 size={12} /> Delete
                    </Button>
                  </PopoverContent>
                </Popover>
              </div>

              {project.description && (
                <div
                  className="text-subtitle-color mb-4 text-sm"
                  dangerouslySetInnerHTML={{ __html: project.description }}
                ></div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {project.location && (
                  <div className="flex items-center text-sm text-subtitle-color">
                    <MapPin
                      size={16}
                      className="mr-2 text-subtitle-color flex-shrink-0"
                    />
                    <span>{project.location}</span>
                  </div>
                )}

                {project.totalArea && (
                  <div className="flex items-center text-sm text-subtitle-color">
                    <Layers
                      size={16}
                      className="mr-2 text-subtitle-color flex-shrink-0"
                    />
                    <span>Area: {project.totalArea}</span>
                  </div>
                )}

                {project.totalResidentialUnits && (
                  <div className="flex items-center text-sm text-subtitle-color">
                    <Home
                      size={16}
                      className="mr-2 text-subtitle-color flex-shrink-0"
                    />
                    <span>{project.totalResidentialUnits} Units</span>
                  </div>
                )}

                {project.unitType && (
                  <div className="flex items-center text-sm text-subtitle-color">
                    <LayoutGrid
                      size={16}
                      className="mr-2 text-subtitle-color flex-shrink-0"
                    />
                    <span>Type: {project.unitType}</span>
                  </div>
                )}
              </div>

              {project.introduction && (
                <div className="border-t pt-4 mt-4">
                  <h4 className="text-sm font-semibold mb-3">
                    Introduction Media
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {project.introduction.thumbnail?.url && (
                      <div className="border border-input rounded-lg p-3 bg-background/50">
                        <div className="flex items-center gap-2 mb-2">
                          <FileImage size={16} className="text-blue-500" />
                          <span className="text-xs font-medium">Thumbnail</span>
                        </div>
                        <Image
                          width={10000}
                          height={10000}
                          src={project.introduction.thumbnail.url}
                          alt="Thumbnail"
                          className="w-full h-[300px] object-cover rounded"
                        />
                      </div>
                    )}
                    {project.introduction.video?.url && (
                      <div className="border border-input rounded-lg p-3 bg-background/50">
                        <div className="flex items-center gap-2 mb-2">
                          <Video size={16} className="text-green-500" />
                          <span className="text-xs font-medium">Video</span>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full"
                          onClick={() =>
                            window.open(
                              project.introduction.video.url,
                              "_blank"
                            )
                          }
                        >
                          View Video
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {project.showUrukCity360 && (
                <div className="mt-4 pt-4 border-t">
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-500 border border-blue-500/20">
                    <Building2 size={12} className="mr-1" />
                    Uruk City 360 Featured
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {data?.length === 0 && (
        <div className="text-center py-12 text-subtitle-color">
          No projects found. Try adjusting your search.
        </div>
      )}
    </main>
  );
};
