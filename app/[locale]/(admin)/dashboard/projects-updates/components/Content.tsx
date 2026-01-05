"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/dashboard/Input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Trash2, Calendar, User, MoreVertical, Clock } from "lucide-react";
import Image from "next/image";
import { useDeleteUpdates, useGetUpdates } from "@/services/projects-updates";
import { CreateButton } from "./CreateButton";
import { UpdateButton } from "./UpdateButton";

// Separate UpdateCard component to handle individual card state
const UpdateCard = ({ update, onDelete, isDeleting }: any) => {
  const [activeLang, setActiveLang] = useState<"ar" | "en">("ar");

  return (
    <div className="border border-input rounded-lg shadow-sm hover:shadow-md transition-all overflow-hidden">
      {update.thumbnail?.url && (
        <div className="relative w-full h-[250px] overflow-hidden">
          <Image
            src={update.thumbnail.url}
            alt={update.title?.en}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
        </div>
      )}

      {/* Language Tabs */}
      <div className="flex border-b border-input">
        <Button
          variant={activeLang === "ar" ? "default" : "outline"}
          className="flex-1 rounded-none"
          onClick={() => setActiveLang("ar")}
        >
          AR
        </Button>
        <Button
          variant={activeLang === "en" ? "default" : "outline"}
          className="flex-1 rounded-none"
          onClick={() => setActiveLang("en")}
        >
          EN
        </Button>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2">
              {update.title[activeLang]}
            </h3>
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
              <UpdateButton updateId={update._id} />
              <Button
                variant="ghost"
                className="justify-start gap-2 text-red-500"
                onClick={() => onDelete(update._id)}
                disabled={isDeleting}
              >
                <Trash2 size={14} /> Delete
              </Button>
            </PopoverContent>
          </Popover>
        </div>

        {update.description && (
          <p className="text-sm text-subtitle-color mb-4">
            {update.description[activeLang]}
          </p>
        )}

        <div className="flex items-center text-sm text-subtitle-color mb-4">
          <User size={16} className="mr-2 text-subtitle-color" />
          <span>{update.writtenBy[activeLang]}</span>
        </div>

        <div className="flex items-center justify-between pt-4 border-t text-xs text-subtitle-color">
          <div className="flex items-center gap-2">
            <Calendar size={14} />
            <span>{new Date(update.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={14} />
            <span>{new Date(update.createdAt).toLocaleTimeString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Content = () => {
  const [search, setSearch] = useState("");
  const { data, isLoading } = useGetUpdates({ search });
  const { mutate: deleteUpdate, isPending: isDeleting } = useDeleteUpdates();

  return (
    <main className="pb-8">
      <header className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-semibold">Project Updates</h1>
        <div className="flex items-center gap-4 justify-between">
          <Input
            placeholder="Search updates..."
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
          <div className="grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-6">
            {data?.payload?.map((update) => (
              <UpdateCard
                key={update._id}
                update={update}
                onDelete={deleteUpdate}
                isDeleting={isDeleting}
              />
            ))}
          </div>

          {data?.payload?.length === 0 && (
            <div className="text-center py-12 text-subtitle-color">
              No updates found. Try adjusting your search.
            </div>
          )}
        </>
      )}
    </main>
  );
};
