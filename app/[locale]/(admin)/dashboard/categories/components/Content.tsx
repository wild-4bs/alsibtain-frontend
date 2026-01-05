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
  const [searchName, setSearchName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeLang, setActiveLang] = useState<"ar" | "en">("ar");
  const [displayLang, setDisplayLang] = useState<"ar" | "en">("en");

  // State for multilingual name
  const [name, setName] = useState({ ar: "", en: "" });

  const { data } = useGetCategories({ name: searchName });

  const { mutate, isPending: isDeleting } = useDeleteCategory();
  const {
    mutate: addCategory,
    isPending: isAdding,
    error,
  } = useCreateCategory(() => {
    setIsOpen(false);
    setName({ ar: "", en: "" });
    setActiveLang("ar");
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
                setSearchName(e.target.value);
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
                  addCategory({ name });
                }}
              >
                {/* Language Tabs */}
                <div className="flex gap-2 mb-4">
                  <Button
                    type="button"
                    variant={activeLang === "ar" ? "default" : "outline"}
                    onClick={() => setActiveLang("ar")}
                  >
                    Arabic
                  </Button>
                  <Button
                    type="button"
                    variant={activeLang === "en" ? "default" : "outline"}
                    onClick={() => setActiveLang("en")}
                  >
                    English
                  </Button>
                </div>

                <InputField
                  placeholder={`Enter category name in ${activeLang === "ar" ? "Arabic" : "English"}`}
                  label="Category Name"
                  value={name[activeLang]}
                  onChange={(v) => {
                    const value = typeof v === 'string' ? v : String(v);
                    setName({ ...name, [activeLang]: value });
                  }}
                  error={(error as any)?.fieldErrors?.name}
                />
                <Button disabled={isAdding} className="mt-4 w-full">
                  {isAdding ? "Saving..." : "Save"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      {/* Display Language Toggle */}
      <div className="flex gap-2 mb-4">
        <Button
          size="sm"
          variant={displayLang === "en" ? "default" : "outline"}
          onClick={() => setDisplayLang("en")}
        >
          Show English
        </Button>
        <Button
          size="sm"
          variant={displayLang === "ar" ? "default" : "outline"}
          onClick={() => setDisplayLang("ar")}
        >
          Show Arabic
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name ({displayLang.toUpperCase()})</TableHead>
            <TableHead className="w-[200px]">Created At</TableHead>
            <TableHead className="w-[200px] text-center">Total Jobs</TableHead>
            <TableHead className="w-[100px]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.categories?.map((category, i) => (
            <TableRow key={i}>
              <TableCell>{category.name[displayLang]}</TableCell>
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