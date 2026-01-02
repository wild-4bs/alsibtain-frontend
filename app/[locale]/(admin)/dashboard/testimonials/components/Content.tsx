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
  Calendar,
  MoreVertical,
  Star,
  MapPin,
  User,
  MessageSquare,
  Clock,
  Plus,
} from "lucide-react";
import Image from "next/image";
import {
  useDeleteTestimonial,
  useGetTestimonials,
} from "@/services/testimonials";
import { CreateButton } from "./CreateButton";
import { UpdateTestimonialButton } from "./UpdateButton";

export const Content = () => {
  const [search, setSearch] = useState("");
  const { data, isPending: isLoading } = useGetTestimonials({
    search,
  });
  const { mutate: deleteTestimonial, isPending: isDeleting } =
    useDeleteTestimonial();

  const renderStars = (stars: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            size={16}
            className={
              index < stars
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-600"
            }
          />
        ))}
      </div>
    );
  };

  return (
    <main className="pb-8">
      <header className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold mb-1">Testimonials</h1>
          <p className="text-sm text-subtitle-color">
            Manage client testimonials and reviews
          </p>
        </div>
        <div className="flex items-center gap-4 justify-between">
          <Input
            placeholder="Search testimonials..."
            className="max-w-sm"
            onChange={(e) => setTimeout(() => setSearch(e.target.value), 500)}
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
            {data?.payload?.map((testimonial) => (
              <div
                key={testimonial._id}
                className="border border-input rounded-xl shadow-sm hover:shadow-lg transition-all overflow-hidden bg-background"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex gap-4 flex-1">
                      {/* Client Image */}
                      {testimonial.image?.url && (
                        <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-blue-500/20 shrink-0">
                          <Image
                            src={testimonial.image.url}
                            alt={testimonial.clientType}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}

                      {/* Client Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <User size={18} className="text-blue-400" />
                          <h3 className="text-xl font-semibold">
                            {testimonial.clientType}
                          </h3>
                        </div>

                        {testimonial.location && (
                          <div className="flex items-center gap-2 text-sm text-subtitle-color mb-3">
                            <MapPin size={14} className="text-green-400" />
                            <span>{testimonial.location}</span>
                          </div>
                        )}

                        {/* Star Rating */}
                        <div className="flex items-center gap-2">
                          {renderStars(testimonial.stars)}
                          <span className="text-sm text-subtitle-color">
                            ({testimonial.stars}/5)
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions Menu */}
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
                        <UpdateTestimonialButton
                          testimonialId={testimonial._id}
                        />
                        <Button
                          variant="ghost"
                          className="justify-start gap-2 text-red-500"
                          onClick={() => deleteTestimonial(testimonial._id)}
                          disabled={isDeleting}
                        >
                          <Trash2 size={14} /> Delete
                        </Button>
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Testimonial Content */}
                  <div className="mb-4 p-4 border border-input rounded-lg bg-background/50">
                    <div className="flex items-center gap-2 mb-3">
                      <MessageSquare size={16} className="text-purple-400" />
                      <span className="font-semibold text-sm">
                        Testimonial:
                      </span>
                    </div>
                    <p className="text-sm text-subtitle-color whitespace-pre-wrap leading-relaxed ml-6">
                      "{testimonial.testimonial}"
                    </p>
                  </div>

                  {/* Footer - Timestamps */}
                  <div className="flex items-center justify-between pt-4 border-t border-input/50 text-xs text-subtitle-color">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      <span>
                        Created:{" "}
                        {new Date(testimonial.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={14} />
                      <span>
                        {new Date(testimonial.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {data?.payload?.length === 0 && (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800 mb-4">
                <MessageSquare size={32} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                No testimonials found
              </h3>
              <p className="text-subtitle-color mb-4">
                Try adjusting your search or create a new testimonial
              </p>
            </div>
          )}

          {/* Pagination Info */}
          {data && data.payload.length > 0 && (
            <div className="mt-6 flex items-center justify-between text-sm text-subtitle-color">
              <span>
                Showing {data.payload.length} of {data.total} testimonials
              </span>
              <span>
                Page {data.page} of {data.lastPage}
              </span>
            </div>
          )}
        </>
      )}
    </main>
  );
};
