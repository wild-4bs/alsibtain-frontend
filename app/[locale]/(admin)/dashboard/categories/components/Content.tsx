"use client";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/dashboard/dynamic-sections";
import { Input } from "@/components/ui/dashboard/Input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { timeAgo } from "@/lib/date";
import {
  useCreateCategory,
  useDeleteCategory,
  useGetCategories,
} from "@/services/categories";
import { TrashIcon } from "lucide-react";
import { useState } from "react";

export const Content = () => {
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { data } = useGetCategories({ name });

  const { mutate, isPending: isDeleting } = useDeleteCategory();
  const {
    mutate: addCategory,
    isPending: isAdding,
    error,
  } = useCreateCategory(() => {
    setIsOpen(false);
  });
  return (
    <main>
      <header className="mb-4">
        <h1 className="text-3xl font-semibold">Categories</h1>
        <div className="flex mt-2 items-center justify-between gap-4">
          <Input
            placeholder="Search by name..."
            onChange={(e) =>
              setTimeout(() => {
                setName(e.target.value);
              }, 500)
            }
          />
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>Add Category</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create a New Category</DialogTitle>
              </DialogHeader>
              <form
              className="p-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = new FormData(e.target as HTMLFormElement);
                  addCategory({ name: form.get("name") });
                }}
              >
                <InputField
                  name="name"
                  placeholder="Enter category name"
                  label="Category Name"
                  error={(error as any)?.fieldErrors?.name[0]}
                />
                <Button disabled={isAdding} className="mt-4 w-full">
                  {isAdding ? "Saving..." : "Save"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </header>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="w-[200px]">Created At</TableHead>
            <TableHead className="w-[200px] text-center">Total Jobs</TableHead>
            <TableHead className="w-[100px]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.categories?.map((category, i) => (
            <TableRow key={i}>
              <TableCell>{category.name}</TableCell>
              <TableCell>{timeAgo(category.createdAt)}</TableCell>
              <TableCell>
                <div className="flex items-center justify-center">
                  {category.totalJobs}
                </div>
              </TableCell>
              <TableCell>
                <Button
                  variant={"ghost"}
                  disabled={isDeleting}
                  onClick={() => mutate(category?._id)}
                >
                  <TrashIcon width={12} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
};
