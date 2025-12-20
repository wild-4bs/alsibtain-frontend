import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { ComponentProps } from "react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const ApplicationForm = ({ className }: ComponentProps<"section">) => {
  return (
    <section className={cn("mt-10", className)}>
      <Container>
        <h2 className="text-sm font-normal mb-10">Job Application</h2>
        <form>
          <div
            className="grid md:grid-cols-2"
            style={{ rowGap: "2rem", columnGap: "4rem" }}
          >
            <div className="grid gap-3">
              <Label className="text-lg">First Name</Label>
              <Input placeholder="Enter first name..." />
            </div>
            <div className="grid gap-3">
              <Label className="text-lg">Last Name</Label>
              <Input placeholder="Enter last name..." />
            </div>
            <div className="grid gap-3">
              <Label className="text-lg">Email</Label>
              <Input placeholder="Enter email..." />
            </div>
            <div className="grid gap-3">
              <Label className="text-lg">Job Role</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select job role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="backend-developer">
                    Backend Developer
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid gap-3 my-7">
            <Label className="text-lg">Enter Address</Label>
            <textarea
              className="w-full h-[400px] max-h-[470px] min-h-[300px] border border-primary bg-[#282828] rounded-3xl p-4 outline-none"
              placeholder="Enter your address..."
            ></textarea>
          </div>
          <div
            className="grid md:grid-cols-2"
            style={{ rowGap: "2rem", columnGap: "4rem" }}
          >
            <div className="grid gap-3">
              <Label className="text-lg">City</Label>
              <Input placeholder="Enter city..." />
            </div>
            <div className="grid gap-3">
              <Label className="text-lg">Street</Label>
              <Input placeholder="Enter street..." />
            </div>
            <div className="grid gap-3">
              <Label className="text-lg">Start Date</Label>
              <Input type="date" />
            </div>
            <div className="grid gap-3">
              <Label className="text-lg">Upload Your CV</Label>
              <Input type="file" />
            </div>
          </div>
          <div className="flex justify-end mt-5">
            <Button className="h-14 px-10 text-lg">Apply Now</Button>
          </div>
        </form>
      </Container>
    </section>
  );
};
