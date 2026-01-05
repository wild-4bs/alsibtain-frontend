"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { validateImageFile } from "@/helpers/image";
import { queryClient } from "@/providers/queryClientProvider";
import { useCreateEmployee } from "@/services/employees";
import clsx from "clsx";
import { PlusIcon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export const AddButton = () => {
  const [image, setImage] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [tab, setTab] = useState<"ar" | "en" | string>("ar");

  // Controlled form state
  const [formValues, setFormValues] = useState({
    name: { ar: "", en: "" },
    position: { ar: "", en: "" },
  });

  const handleSetImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (file) {
      validateImageFile(file, (msg, src) => {
        toast.message(msg);
        setImage(src || "");
      });
    }
  };

  const {
    mutate: createEmployee,
    error,
    isPending: createEmployeePending,
  }: {
    mutate: (data: FormData) => void;
    error: any;
    isPending: boolean;
  } = useCreateEmployee((msg: string) => {
    toast.success(msg);
    setDialogOpen(false);
    queryClient.invalidateQueries({ queryKey: ["employees"] });
  });

  // Reset image when dialog closes
  useEffect(() => {
    if (!dialogOpen) {
      setImage("");
      setFormValues({
        name: { ar: "", en: "" },
        position: { ar: "", en: "" },
      });
    }
  }, [dialogOpen]);

  useEffect(() => {
    if (error && !error?.fieldErrors) {
      toast.error(error?.message);
    }
  }, [error]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);

    const formData = new FormData();
    formData.append("name", JSON.stringify(formValues.name));
    formData.append("position", JSON.stringify(formValues.position));

    const file = form.get("image");
    if (file instanceof File) {
      formData.append("image", file);
    }

    createEmployee(formData);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-auto">
        <DialogTitle className="p-4">Add New Team Member</DialogTitle>

        <form className="flex flex-col gap-4 p-4" onSubmit={handleSubmit}>
          {/* Tabs for AR/EN */}
          <Tabs value={tab} onValueChange={setTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="ar">Arabic</TabsTrigger>
              <TabsTrigger value="en">English</TabsTrigger>
            </TabsList>

            {/* Arabic */}
            <TabsContent value="ar" className="space-y-4">
              <div className="flex flex-col gap-2">
                <Label>Name (AR)</Label>
                <Input
                  placeholder="Employee name in Arabic"
                  name="name-ar"
                  value={formValues.name.ar}
                  onChange={(e) =>
                    setFormValues((prev) => ({
                      ...prev,
                      name: { ...prev.name, ar: e.target.value },
                    }))
                  }
                  className={clsx({
                    "border-destructive": error?.fieldErrors?.name?.ar,
                  })}
                />
                {error?.fieldErrors?.name?.ar && (
                  <span className="text-xs text-destructive">
                    {error?.fieldErrors?.name?.ar}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label>Position (AR)</Label>
                <Input
                  placeholder="Employee position in Arabic"
                  name="position-ar"
                  value={formValues.position.ar}
                  onChange={(e) =>
                    setFormValues((prev) => ({
                      ...prev,
                      position: { ...prev.position, ar: e.target.value },
                    }))
                  }
                  className={clsx({
                    "border-destructive": error?.fieldErrors?.position?.ar,
                  })}
                />
                {error?.fieldErrors?.position?.ar && (
                  <span className="text-xs text-destructive">
                    {error?.fieldErrors?.position?.ar}
                  </span>
                )}
              </div>
            </TabsContent>

            {/* English */}
            <TabsContent value="en" className="space-y-4">
              <div className="flex flex-col gap-2">
                <Label>Name (EN)</Label>
                <Input
                  placeholder="Employee name in English"
                  name="name-en"
                  value={formValues.name.en}
                  onChange={(e) =>
                    setFormValues((prev) => ({
                      ...prev,
                      name: { ...prev.name, en: e.target.value },
                    }))
                  }
                  className={clsx({
                    "border-destructive": error?.fieldErrors?.name?.en,
                  })}
                />
                {error?.fieldErrors?.name?.en && (
                  <span className="text-xs text-destructive">
                    {error?.fieldErrors?.name?.en}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label>Position (EN)</Label>
                <Input
                  placeholder="Employee position in English"
                  name="position-en"
                  value={formValues.position.en}
                  onChange={(e) =>
                    setFormValues((prev) => ({
                      ...prev,
                      position: { ...prev.position, en: e.target.value },
                    }))
                  }
                  className={clsx({
                    "border-destructive": error?.fieldErrors?.position?.en,
                  })}
                />
                {error?.fieldErrors?.position?.en && (
                  <span className="text-xs text-destructive">
                    {error?.fieldErrors?.position?.en}
                  </span>
                )}
              </div>
            </TabsContent>
          </Tabs>

          {/* Image */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="image-input">Image</Label>
            <Input
              id="image-input"
              type="file"
              accept="image/*"
              onChange={handleSetImage}
              name="image"
              className={clsx("cursor-pointer", {
                "border-destructive": error?.fieldErrors?.image,
              })}
            />
            {image && (
              <Image
                src={image}
                width={300}
                height={300}
                alt="employee image"
                className="w-full border border-transparent h-[300px] mt-2 object-cover rounded-lg max-h-[300px]"
              />
            )}
          </div>

          {/* Submit */}
          <Button disabled={createEmployeePending} className="w-full mt-4">
            {createEmployeePending ? "Adding..." : "Add"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
