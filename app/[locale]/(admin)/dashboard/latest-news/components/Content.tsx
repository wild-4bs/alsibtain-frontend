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
  Edit,
  Calendar,
  User,
  Tag,
  Plus,
  MoreVertical,
  Clock,
} from "lucide-react";
import Image from "next/image";
import { useDeleteNews, useGetNews } from "@/services/latest-news";
import { CreateButton } from "./CreateButton";
import { UpdateNewsButton } from "./UpdateButton";

export const Content = () => {
  const [search, setSearch] = useState("");
  const { data, isLoading } = useGetNews({ search });
  const { mutate: deleteNews, isPending: isDeleting } = useDeleteNews();

  return (
    <main className="pb-8">
      <header className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-semibold">Latest News</h1>
        <div className="flex items-center gap-4 justify-between">
          <Input
            placeholder="Search news..."
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
            {data?.payload?.map((news) => (
              <div
                key={news._id}
                className="border border-input rounded-lg shadow-sm hover:shadow-md transition-all overflow-hidden"
              >
                {news.thumbnail?.url && (
                  <div className="relative w-full h-[250px] overflow-hidden">
                    <Image
                      src={news.thumbnail.url}
                      alt={news.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">
                        {news.title}
                      </h3>
                      <p className="text-sm text-subtitle-color mb-2">
                        {news.caption}
                      </p>
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
                        <UpdateNewsButton newsId={news._id} />
                        <Button
                          variant="ghost"
                          className="justify-start gap-2 text-red-500"
                          onClick={() => deleteNews(news._id)}
                          disabled={isDeleting}
                        >
                          <Trash2 size={14} /> Delete
                        </Button>
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center text-sm text-subtitle-color">
                      <User size={16} className="mr-2 text-subtitle-color" />
                      <span>{news.writtenBy}</span>
                    </div>

                    <div className="flex items-center text-sm text-subtitle-color">
                      <Tag size={16} className="mr-2 text-subtitle-color" />
                      <span>{news.category}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t text-xs text-subtitle-color">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      <span>
                        {new Date(news.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={14} />
                      <span>
                        {new Date(news.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {data?.payload?.length === 0 && (
            <div className="text-center py-12 text-subtitle-color">
              No news found. Try adjusting your search.
            </div>
          )}
        </>
      )}
    </main>
  );
};
