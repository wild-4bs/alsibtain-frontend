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
  Mail,
  User,
  Phone,
  MessageSquare,
  Clock,
} from "lucide-react";
import { useDeleteMessage, useGetMessages } from "@/services/messages";

export const Content = () => {
  const [search, setSearch] = useState("");
  const { data } = useGetMessages({ search });
  const { mutate: deleteMessage, isPending: isDeleting } = useDeleteMessage();

  return (
    <main className="pb-8">
      <header className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-semibold">Messages</h1>
        <div className="flex items-center gap-4 justify-between">
          <Input
            placeholder="Search messages..."
            className="max-w-sm"
            onChange={(e) => setTimeout(() => setSearch(e.target.value), 500)}
          />
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {data?.payload?.map((msg) => (
          <div
            key={msg._id}
            className="border border-input rounded-lg shadow-sm hover:shadow-md transition-all overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <User size={20} className="text-subtitle-color" />
                    <h3 className="text-xl font-semibold">
                      {msg.firstName} {msg.lastName}
                    </h3>
                  </div>
                  <div className="flex flex-col gap-1 text-sm text-subtitle-color">
                    <div className="flex items-center gap-2">
                      <Mail size={14} />
                      <span>{msg.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={14} />
                      <span>{msg.phoneNumber}</span>
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
                      onClick={() => deleteMessage(msg._id)}
                      disabled={isDeleting}
                    >
                      <Trash2 size={12} /> Delete
                    </Button>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="mb-4 p-3 rounded-md">
                <div className="flex items-center gap-2 mb-1">
                  <MessageSquare size={16} className="text-subtitle-color" />
                  <span className="font-semibold text-sm">Subject:</span>
                </div>
                <p className="text-sm ml-6">{msg.subject}</p>
              </div>

              <div className="mb-4 p-4 border border-input rounded-lg bg-background/50">
                <div className="flex items-center gap-2 mb-2">
                  <Mail size={16} className="text-subtitle-color" />
                  <span className="font-semibold text-sm">Message:</span>
                </div>
                <p className="text-sm text-subtitle-color whitespace-pre-wrap ml-6">
                  {msg.message}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t text-xs text-subtitle-color">
                <div className="flex items-center gap-2">
                  <Calendar size={14} />
                  <span>
                    Received: {new Date(msg.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} />
                  <span>{new Date(msg.createdAt).toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {data?.payload?.length === 0 && (
        <div className="text-center py-12 text-subtitle-color">
          No messages found. Try adjusting your search.
        </div>
      )}
    </main>
  );
};
