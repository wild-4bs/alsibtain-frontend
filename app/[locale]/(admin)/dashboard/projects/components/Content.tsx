"use client";

import Image from "next/image";
import {
  MapPin,
  Layers,
  Home,
  LayoutGrid,
  Video,
  Building2,
  ImageIcon,
  Search,
  MoreVertical,
  TrashIcon,
} from "lucide-react";
import { useDeleteProject, useGetProjects } from "@/services/projects";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocale } from "next-intl";
import { useState } from "react";
import { CreateButton } from "./CreateButton";
import { UpdateProjectButton } from "./UpdateButton";

type Locale = "en" | "ar";

export const Content = () => {
  const [search, setSearch] = useState("");
  const { data, isLoading } = useGetProjects({ search });
  const { mutate, isPending } = useDeleteProject();
  const locale = useLocale() as Locale;

  return (
    <section className="space-y-8 px-4">
      {/* Search Bar */}
      <div className="flex items-center justify-between gap-4 sticky top-0 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 z-10 py-4 border-b border-b-input">
        <div>
          <h1 className="text-3xl font-bold mb-1">Projects Showcase</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative max-w-sm w-full">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={18}
            />
            <Input
              placeholder="Search projects..."
              className="pl-10"
              onChange={(e) => {
                const value = e.target.value;
                setTimeout(() => setSearch(value), 500);
              }}
            />
          </div>
          <CreateButton />
        </div>
      </div>

      {/* Empty State */}
      {!data || data.length === 0 ? (
        <div className="text-center py-20">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
            <Building2 size={32} className="text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No projects found</h3>
          <p className="text-muted-foreground">
            {search
              ? "Try adjusting your search terms"
              : "No projects available at the moment"}
          </p>
        </div>
      ) : (
        <div className="space-y-16">
          {data.map((project) => (
            <article
              key={project._id}
              className="rounded-2xl overflow-hidden border border-input bg-background shadow-sm relative"
            >
              <div className="absolute top-4 right-4 z-20">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-9 w-9 rounded-full shadow-lg  backdrop-blur"
                    >
                      <MoreVertical size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-40 flex flex-col"
                  >
                    <UpdateProjectButton projectId={project._id} />
                    <Button
                      className="justify-start"
                      variant={"ghost"}
                      disabled={isPending}
                      onClick={() => mutate(project?._id)}
                    >
                      <TrashIcon /> Delete
                    </Button>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* HERO */}
              {project.background?.url && (
                <div className="relative h-80 w-full">
                  <Image
                    src={project.background.url}
                    alt={project.name[locale]}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />

                  {project.logo?.url && (
                    <div className="absolute bottom-6 left-6">
                      <Image
                        src={project.logo.url}
                        alt="Project Logo"
                        width={160}
                        height={80}
                        className="bg-white/10 p-3 rounded-xl shadow-lg"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* CONTENT */}
              <div className="max-w-6xl px-6 py-10">
                {/* Language Tabs for Project Info */}
                <Tabs defaultValue={locale} className="w-full mb-8">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="ar">العربية</TabsTrigger>
                    <TabsTrigger value="en">English</TabsTrigger>
                  </TabsList>

                  <TabsContent value="ar" className="space-y-6">
                    <div>
                      <h2 className="text-3xl font-bold mb-2">
                        {project.name.ar}
                      </h2>
                      {project.caption && (
                        <p className="text-muted-foreground mb-6">
                          {project.caption.ar}
                        </p>
                      )}
                    </div>

                    {/* META - Arabic */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {project.location && (
                        <Meta
                          icon={<MapPin size={16} />}
                          label={project.location.ar}
                        />
                      )}
                      {project.totalArea && (
                        <Meta
                          icon={<Layers size={16} />}
                          label={`المساحة: ${project.totalArea}`}
                        />
                      )}
                      {project.totalResidentialUnits && (
                        <Meta
                          icon={<Home size={16} />}
                          label={`${project.totalResidentialUnits} وحدة`}
                        />
                      )}
                      {project.unitType && (
                        <Meta
                          icon={<LayoutGrid size={16} />}
                          label={`النوع: ${project.unitType.ar}`}
                        />
                      )}
                    </div>

                    {/* DESCRIPTION - Arabic */}
                    {project.description && (
                      <div
                        className="prose prose-neutral dark:prose-invert max-w-none"
                        dangerouslySetInnerHTML={{
                          __html: project.description.ar,
                        }}
                      />
                    )}
                  </TabsContent>

                  <TabsContent value="en" className="space-y-6">
                    <div>
                      <h2 className="text-3xl font-bold mb-2">
                        {project.name.en}
                      </h2>
                      {project.caption && (
                        <p className="text-muted-foreground mb-6">
                          {project.caption.en}
                        </p>
                      )}
                    </div>

                    {/* META - English */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {project.location && (
                        <Meta
                          icon={<MapPin size={16} />}
                          label={project.location.en}
                        />
                      )}
                      {project.totalArea && (
                        <Meta
                          icon={<Layers size={16} />}
                          label={`Area: ${project.totalArea}`}
                        />
                      )}
                      {project.totalResidentialUnits && (
                        <Meta
                          icon={<Home size={16} />}
                          label={`${project.totalResidentialUnits}`}
                        />
                      )}
                      {project.unitType && (
                        <Meta
                          icon={<LayoutGrid size={16} />}
                          label={`Type: ${project.unitType.en}`}
                        />
                      )}
                    </div>

                    {/* DESCRIPTION - English */}
                    {project.description && (
                      <div
                        className="prose prose-neutral dark:prose-invert max-w-none"
                        dangerouslySetInnerHTML={{
                          __html: project.description.en,
                        }}
                      />
                    )}
                  </TabsContent>
                </Tabs>

                {/* GALLERIES TABS */}
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-6">
                    <TabsTrigger value="overview" className="gap-2">
                      <LayoutGrid size={16} />
                      Overview
                    </TabsTrigger>
                    <TabsTrigger
                      value="images"
                      className="gap-2"
                      disabled={!project.imageGallery?.length}
                    >
                      <ImageIcon size={16} />
                      Images ({project.imageGallery?.length || 0})
                    </TabsTrigger>
                    <TabsTrigger
                      value="videos"
                      className="gap-2"
                      disabled={!project.videoGallery?.length}
                    >
                      <Video size={16} />
                      Videos ({project.videoGallery?.length || 0})
                    </TabsTrigger>
                  </TabsList>

                  {/* OVERVIEW TAB */}
                  <TabsContent value="overview" className="space-y-6">
                    {project.introduction && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {project.introduction.thumbnail?.url && (
                          <div className="relative h-[300px] rounded-xl overflow-hidden border border-input">
                            <Image
                              src={project.introduction.thumbnail.url}
                              alt="Introduction Thumbnail"
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}

                        {project.introduction.video?.url && (
                          <div className="flex flex-col items-center justify-center border border-input rounded-xl bg-muted/30 p-6">
                            <Video
                              className="mb-4 text-muted-foreground"
                              size={48}
                            />
                            <h3 className="text-lg font-semibold mb-2">
                              Introduction Video
                            </h3>
                            <p className="text-sm text-muted-foreground mb-4 text-center">
                              Watch the project introduction
                            </p>
                            <Button
                              size="lg"
                              onClick={() =>
                                window.open(
                                  project.introduction.video.url,
                                  "_blank"
                                )
                              }
                            >
                              <Video className="mr-2" size={18} />
                              Watch Now
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </TabsContent>

                  {/* IMAGE GALLERY TAB */}
                  <TabsContent value="images">
                    {project.imageGallery && project.imageGallery.length > 0 ? (
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {project.imageGallery.map((image, index) => (
                          <div
                            key={index}
                            className="relative h-[250px] rounded-xl overflow-hidden group cursor-pointer border border-input"
                          >
                            <Image
                              src={image.url}
                              alt={`Gallery image ${index + 1}`}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                              <span className="text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                                Image {index + 1}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-muted-foreground">
                        <ImageIcon
                          size={48}
                          className="mx-auto mb-4 opacity-50"
                        />
                        <p>No images available</p>
                      </div>
                    )}
                  </TabsContent>

                  {/* VIDEO GALLERY TAB */}
                  <TabsContent value="videos">
                    {project.videoGallery && project.videoGallery.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {project.videoGallery.map((video, index) => (
                          <div
                            key={index}
                            className="flex flex-col items-center justify-center border border-input rounded-xl bg-muted/30 p-8 hover:bg-muted/50 transition-colors"
                          >
                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                              <Video className="text-primary" size={32} />
                            </div>
                            <h3 className="font-semibold mb-2">
                              Video {index + 1}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-4 text-center">
                              Click to watch
                            </p>
                            <Button
                              onClick={() => window.open(video.url, "_blank")}
                            >
                              <Video className="mr-2" size={16} />
                              Play Video
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-muted-foreground">
                        <Video size={48} className="mx-auto mb-4 opacity-50" />
                        <p>No videos available</p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>

                {/* BADGE */}
                {project.showUrukCity360 && (
                  <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm bg-blue-500/10 text-blue-600 border border-input">
                    <Building2 size={14} />
                    Uruk City 360 Featured
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

const Meta = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <div className="flex items-center gap-2 text-sm text-muted-foreground">
    {icon}
    <span>{label}</span>
  </div>
);
