"use client";
import { Button } from "@/components/ui/button";
import { ImageInput } from "@/components/ui/dashboard/ImageInput";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { queryClient } from "@/providers/queryClientProvider";
import { useCreateVideo } from "@/services/video-gallery";
import React, { useState } from "react";

export const CreateButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutateAsync, isPending, error }: any = useCreateVideo();

  const create = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    await mutateAsync(form)
      .then(() => {
        setIsOpen(false);
        queryClient.invalidateQueries({ queryKey: ["videos"] });
      })
      .catch(() => {});
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Add Video</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Add New Video</DialogTitle>
        <form onSubmit={create}>
          <Input
            type="file"
            name="video"
            className="flex items-center pt-2"
            accept="video/mp4,video/webm,video/ogg"
          />
          <Button className="w-full mt-2" disabled={isPending}>
            {isPending ? "Creating..." : "Create"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
