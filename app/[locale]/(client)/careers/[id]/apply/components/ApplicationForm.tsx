"use client";

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
import { useTranslations } from "next-intl";
import { Poppins } from "next/font/google";
import { ComponentProps } from "react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const ApplicationForm = ({ className }: ComponentProps<"section">) => {
  const t = useTranslations("careers.singleCareer.apply");
  const inputsT = useTranslations("inputs");

  // Example job roles, you can put these in your translations file
  const jobRoles = [
    { value: "backend-developer", label: "Backend Developer" },
    { value: "frontend-developer", label: "Frontend Developer" },
    { value: "designer", label: "Designer" },
  ];

  return (
    <section className={cn("mt-10", className)}>
      <Container>
        <h2 className="text-sm font-normal mb-10">{t("jobName")}</h2>
        <form>
          <div
            className="grid md:grid-cols-2"
            style={{ rowGap: "2rem", columnGap: "4rem" }}
          >
            <div className="grid gap-3">
              <Label className="text-lg">{inputsT("firstName.label")}</Label>
              <Input placeholder={inputsT("firstName.placeholder")} />
            </div>
            <div className="grid gap-3">
              <Label className="text-lg">{inputsT("lastName.label")}</Label>
              <Input placeholder={inputsT("lastName.placeholder")} />
            </div>
            <div className="grid gap-3">
              <Label className="text-lg">{inputsT("email.label")}</Label>
              <Input placeholder={inputsT("email.placeholder")} />
            </div>
            <div className="grid gap-3">
              <Label className="text-lg">{inputsT("jobRole.label")}</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder={inputsT("jobRole.placeholder")} />
                </SelectTrigger>
                <SelectContent>
                  {jobRoles.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-3 my-7">
            <Label className="text-lg">{inputsT("address.label")}</Label>
            <textarea
              className="w-full h-[400px] max-h-[470px] min-h-[300px] border border-primary bg-[#282828] rounded-3xl p-4 outline-none"
              placeholder={inputsT("address.placeholder")}
            ></textarea>
          </div>

          <div
            className="grid md:grid-cols-2"
            style={{ rowGap: "2rem", columnGap: "4rem" }}
          >
            <div className="grid gap-3">
              <Label className="text-lg">{inputsT("city.label")}</Label>
              <Input placeholder={inputsT("city.placeholder")} />
            </div>
            <div className="grid gap-3">
              <Label className="text-lg">{inputsT("street.label")}</Label>
              <Input placeholder={inputsT("street.placeholder")} />
            </div>
            <div className="grid gap-3">
              <Label className="text-lg">{inputsT("startDate.label")}</Label>
              <Input
                type="date"
                placeholder={inputsT("startDate.placeholder")}
              />
            </div>
            <div className="grid gap-3">
              <Label className="text-lg">{inputsT("cvUpload.label")}</Label>
              <Input
                type="file"
                placeholder={inputsT("cvUpload.placeholder")}
              />
            </div>
          </div>

          <div className="flex justify-end mt-5">
            <Button className="h-14 px-10 text-lg">{t("button")}</Button>
          </div>
        </form>
      </Container>
    </section>
  );
};
