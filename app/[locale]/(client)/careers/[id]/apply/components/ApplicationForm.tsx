"use client";

import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useCreateApplication } from "@/services/applications";
import { useCreateJob } from "@/services/jobs";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { ComponentProps } from "react";
import { toast } from "sonner";

/* =======================
   InputField Component
======================= */

interface InputFieldProps {
  label?: string;
  value?: string;
  onChange?: (v: string) => void;
  error?: string;
}

export const InputField = ({
  label,
  value,
  onChange,
  type,
  error,
  ...props
}: InputFieldProps & ComponentProps<"input">) => (
  <div className="grid gap-3">
    {label && <Label className="text-lg">{label}</Label>}

    <Input
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      type={type}
      className={clsx({
        "border-red-600 focus-visible:border-red-600 focus-visible:ring-0":
          error,
      })}
      {...props}
    />

    {error && (
      <p className="text-red-500 text-sm first-letter:uppercase">{error}</p>
    )}
  </div>
);

/* =======================
   ApplicationForm
======================= */

export const ApplicationForm = ({ className }: ComponentProps<"section">) => {
  const t = useTranslations("careers.singleCareer.apply");
  const commonT = useTranslations("common");
  const inputsT = useTranslations("inputs");
  const router = useRouter();
  const { mutate, isPending, error } = useCreateApplication(() => {
    toast.success(commonT("applicationSent"));
    router.push("/");
  });
  const { id } = useParams<{ id: string }>();

  const fieldErrors = (error as any)?.fieldErrors || {};

  return (
    <section className={cn("mt-10", className)}>
      <Container>
        <h2 className="text-sm font-normal mb-10">{t("jobName")}</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = new FormData(e.target as HTMLFormElement);
            form.append("job", id as string);
            mutate(form);
          }}
        >
          {/* ===== Names ===== */}
          <div className="grid gap-8 md:grid-cols-2">
            <InputField
              label={inputsT("firstName.label")}
              placeholder={inputsT("firstName.placeholder")}
              name="firstName"
              error={fieldErrors.firstName}
            />

            <InputField
              label={inputsT("lastName.label")}
              placeholder={inputsT("lastName.placeholder")}
              name="lastName"
              error={fieldErrors.lastName}
            />
          </div>

          {/* ===== Email ===== */}
          <div className="grid gap-3 mt-8">
            <Label className="text-lg">{inputsT("email.label")}</Label>

            <Input
              name="email"
              placeholder={inputsT("email.placeholder")}
              className={clsx({
                "border-red-600 focus-visible:ring-0": fieldErrors.email,
              })}
            />

            {fieldErrors.email && (
              <p className="text-red-500 text-sm">{fieldErrors.email}</p>
            )}
          </div>

          {/* ===== Address (RESTORED STYLE) ===== */}
          <div className="grid gap-3 my-7">
            <Label className="text-lg">{inputsT("address.label")}</Label>

            <textarea
              name="address"
              placeholder={inputsT("address.placeholder")}
              className={clsx(
                "w-full h-[400px] max-h-[470px] min-h-[300px] border border-primary bg-[#282828] rounded-3xl p-4 outline-none",
                {
                  "border-red-600": fieldErrors.address,
                }
              )}
            />

            {fieldErrors.address && (
              <p className="text-red-500 text-sm">{fieldErrors.address}</p>
            )}
          </div>

          {/* ===== Other Fields ===== */}
          <div className="grid gap-8 md:grid-cols-2">
            <InputField
              label={inputsT("city.label")}
              placeholder={inputsT("city.placeholder")}
              name="city"
              error={fieldErrors.city}
            />

            <div className="grid gap-3">
              <Label className="text-lg">{inputsT("coverLetter.label")}</Label>

              <Input
                type="file"
                name="coverLetter"
                accept="application/pdf"
                className={clsx({
                  "border-red-600 focus-visible:ring-0":
                    error && error?.message?.includes("Cover Letter"),
                })}
              />

              {fieldErrors.coverLetter && (
                <p className="text-red-500 text-sm">
                  {fieldErrors.coverLetter}
                </p>
              )}
            </div>

            <InputField
              label={inputsT("startDate.label")}
              type="date"
              name="startDate"
              error={fieldErrors.startDate}
            />

            <div className="grid gap-3">
              <Label className="text-lg">{inputsT("cvUpload.label")}</Label>

              <Input
                type="file"
                name="cv"
                accept="application/pdf"
                className={clsx({
                  "border-red-600 focus-visible:ring-0":
                    error && error?.message?.includes("CV"),
                })}
              />

              {fieldErrors.cv && (
                <p className="text-red-500 text-sm">{fieldErrors.cv}</p>
              )}
            </div>
          </div>

          {/* ===== Submit ===== */}
          <div className="flex justify-end mt-8">
            <Button className="h-14 px-10 text-lg" disabled={isPending}>
              {t("button")}
            </Button>
          </div>
        </form>
      </Container>
    </section>
  );
};
