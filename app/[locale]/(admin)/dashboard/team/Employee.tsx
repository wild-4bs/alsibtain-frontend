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
import { useDeleteEmployee, useUpdateEmployee } from "@/services/employees";
import { Employee as EmployeeType } from "@/types/employees";
import clsx from "clsx";
import { Pencil, TrashIcon } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export const Employee = ({ employee }: { employee: EmployeeType }) => {
  const [image, setImage] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [tab, setTab] = useState<"ar" | "en" | string>("ar");

  // Controlled form state for AR/EN
  const [formValues, setFormValues] = useState({
    name: { ar: employee?.name?.ar || "", en: employee?.name?.en || "" },
    position: { ar: employee?.position?.ar || "", en: employee?.position?.en || "" },
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

  const { mutate: deleteEmployee, isPending: deleting } = useDeleteEmployee(
    (msg) => {
      toast.success(msg);
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    }
  );

  const {
    mutate: updateEmployee,
    isPending: updating,
    error: updateError,
  } = useUpdateEmployee((msg) => {
    toast.success(msg);
    setDialogOpen(false);
    queryClient.invalidateQueries({ queryKey: ["employees"] });
  }, employee?._id) as {
    mutate: (data: FormData) => void;
    isPending: boolean;
    error: any;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", JSON.stringify(formValues.name));
    formData.append("position", JSON.stringify(formValues.position));

    const fileInput = (e.target as HTMLFormElement).image as unknown as HTMLInputElement;
    if (fileInput?.files?.[0]) {
      formData.append("image", fileInput.files[0]);
    }

    updateEmployee(formData);
  };

  // Reset form when dialog closes
  useEffect(() => {
    if (!dialogOpen) {
      setImage("");
      setFormValues({
        name: { ar: employee?.name?.ar || "", en: employee?.name?.en || "" },
        position: { ar: employee?.position?.ar || "", en: employee?.position?.en || "" },
      });
      setTab("ar");
    }
  }, [dialogOpen, employee]);

  return (
    <div className="employee flex-1 max-w-[270px] min-w-[270px] w-[270px] border border-input overflow-hidden shadow-sm rounded-sm relative">
      {/* Options */}
      <div className="options flex gap-2 absolute top-2 right-2">
        <Button
          variant={"outline"}
          size={"sm"}
          className="w-[30px] h-[30px] hover:bg-red-400 hover:border-destructive hover:text-white"
          disabled={deleting}
          onClick={() => deleteEmployee({ id: employee._id })}
        >
          <TrashIcon />
        </Button>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant={"outline"}
              size={"sm"}
              className="w-[30px] h-[30px] hover:bg-primary/90 hover:border-primary hover:text-white"
            >
              <Pencil />
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogTitle>Update Employee</DialogTitle>
            <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
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
                      value={formValues?.name?.ar}
                      onChange={(e) =>
                        setFormValues((prev) => ({
                          ...prev,
                          name: { ...prev?.name, ar: e.target.value },
                        }))
                      }
                      className={clsx({
                        "border-destructive": updateError?.fieldsError?.name?.ar,
                      })}
                    />
                    {updateError?.fieldsError?.name?.ar && (
                      <span className="text-xs text-destructive">
                        {updateError?.fieldsError?.name?.ar}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Position (AR)</Label>
                    <Input
                      placeholder="Employee position in Arabic"
                      name="position-ar"
                      value={formValues?.position?.ar}
                      onChange={(e) =>
                        setFormValues((prev) => ({
                          ...prev,
                          position: { ...prev?.position, ar: e.target?.value },
                        }))
                      }
                      className={clsx({
                        "border-destructive": updateError?.fieldsError?.position?.ar,
                      })}
                    />
                    {updateError?.fieldsError?.position?.ar && (
                      <span className="text-xs text-destructive">
                        {updateError?.fieldsError?.position?.ar}
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
                        "border-destructive": updateError?.fieldsError?.name?.en,
                      })}
                    />
                    {updateError?.fieldsError?.name?.en && (
                      <span className="text-xs text-destructive">
                        {updateError?.fieldsError?.name?.en}
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
                        "border-destructive": updateError?.fieldsError?.position?.en,
                      })}
                    />
                    {updateError?.fieldsError?.position?.en && (
                      <span className="text-xs text-destructive">
                        {updateError?.fieldsError?.position?.en}
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
                  onChange={handleSetImage}
                  name="image"
                  className={clsx("cursor-pointer", {
                    "border-destructive": updateError?.fieldsError?.image,
                  })}
                />
                {(image || employee?.image) && (
                  <Image
                    src={image || employee?.image.url}
                    width={300}
                    height={300}
                    alt="employee image"
                    className={clsx(
                      "w-full border border-transparent h-[300px] mt-2 object-cover rounded-lg max-h-[300px]",
                      { "border-destructive": updateError?.fieldsError?.image }
                    )}
                  />
                )}
              </div>

              <Button disabled={updating} className="w-full">
                {updating ? "Editing..." : "Edit"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Showcase */}
      <div className="image">
        <Image
          src={employee?.image.url}
          className="w-full object-cover h-[300px]"
          alt="Employee image"
          width={300}
          height={300}
        />
      </div>

      <div className="name-position px-3 py-2">
        <h1 className="font-bold text-xl">
          {employee?.name?.ar} / {employee?.name?.en}
        </h1>
        <p className="font-medium text-sm text-subtitle-color">
          {employee?.position?.ar} / {employee?.position?.en}
        </p>
      </div>
    </div>
  );
};
