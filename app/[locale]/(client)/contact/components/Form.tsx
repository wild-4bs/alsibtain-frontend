"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React, { ComponentProps, FormEvent, useState } from "react";
import SendLetter from "@/assets/objects/send-letter.svg";
import { useTranslations } from "next-intl";
import { useCreateMessage } from "@/services/messages";
import { useRouter } from "@/i18n/routing";
import clsx from "clsx";

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
  <div className="grid gap-2">
    <Label className="capitalize font-medium">{label}</Label>
    <Input
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      type={type}
      className={clsx({
        "border-red-600 focus-visible:border-red-800 focus-visible:ring-0":
          error,
      })}
      {...props}
    />
    {error && (
      <p className="text-red-500 text-sm first-letter:uppercase">{error}</p>
    )}
  </div>
);

export const Form = () => {
  const [selectedSubject, setSelectedSubject] = useState("");

  const inputsT = useTranslations("inputs");
  const commonT = useTranslations("common");

  const subjects = [
    {
      id: "generalInquiry",
      label: inputsT("subject.options.generalInquiry"),
    },
    {
      id: "projectInformation",
      label: inputsT("subject.options.projectInformation"),
    },
    {
      id: "partnershipRequest",
      label: inputsT("subject.options.partnershipRequest"),
    },
    {
      id: "salesAvailability",
      label: inputsT("subject.options.salesAvailability"),
    },
  ];

  const router = useRouter();

  const { mutate, error, isPending } = useCreateMessage(() => {
    router.push("/");
  });

  // Extract field-level errors
  const fieldErrors = (error as any)?.fieldsError || {};

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    mutate({
      firstName: form.get("firstName")?.toString(),
      lastName: form.get("lastName")?.toString(),
      email: form.get("email")?.toString(),
      phoneNumber: form.get("phoneNumber")?.toString(),
      subject: subjects.find((s) => s.id == selectedSubject)?.label,
      message: form.get("message")?.toString(),
    });
  };

  return (
    <form className="w-full lg:min-w-md flex-1" onSubmit={submit}>
      <div className="grid xl:grid-cols-2 gap-8">
        <InputField
          label={inputsT("firstName.label")}
          name="firstName"
          error={fieldErrors.firstName}
          placeholder={inputsT("firstName.placeholder")}
        />
        <InputField
          label={inputsT("lastName.label")}
          name="lastName"
          error={fieldErrors.lastName}
          placeholder={inputsT("lastName.placeholder")}
        />
        <InputField
          label={inputsT("email.label")}
          name="email"
          error={fieldErrors.email}
          placeholder={inputsT("email.placeholder")}
        />
        <InputField
          label={inputsT("phoneNumber.label")}
          name="phoneNumber"
          error={fieldErrors.phoneNumber}
          placeholder={inputsT("phoneNumber.placeholder")}
        />
      </div>

      <div className="mt-10">
        <Label className="text-lg font-semibold">
          {inputsT("subject.label")}
        </Label>

        <RadioGroup value={selectedSubject} onValueChange={setSelectedSubject}>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 mb-2">
            {subjects.map((subject) => (
              <div key={subject.id} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={subject.id}
                  id={subject.id}
                  className={clsx("border-2 border-white text-white", {
                    "border-red-600": fieldErrors.subject,
                  })}
                />
                <Label
                  htmlFor={subject.id}
                  className="text-white text-xl font-normal cursor-pointer"
                >
                  {subject.label}
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
        {fieldErrors.subject && (
          <p className="text-red-500 text-sm">{fieldErrors.subject}</p>
        )}
      </div>

      <div className="grid gap-2">
        <Label>{inputsT("message.label")}</Label>
        <Input
          name="message"
          placeholder={inputsT("message.placeholder")}
          className={clsx(
            "rounded-none border-0 border-b border-b-white bg-transparent focus-visible:ring-0",
            { "border-red-600": fieldErrors.message }
          )}
        />
        {fieldErrors.message && (
          <p className="text-red-500 text-sm">{fieldErrors.message}</p>
        )}
      </div>

      <div className="flex items-end flex-col mt-10 relative">
        <div className="relative">
          <Button
            variant="ghost"
            type="submit"
            disabled={isPending}
            className="bg-white/2 h-12 px-10"
          >
            {commonT("sendMessage")}
          </Button>
          <SendLetter className="absolute top-1/2 end-1/2 rtl:rotate-y-180 pointer-events-none" />
        </div>
      </div>
    </form>
  );
};
