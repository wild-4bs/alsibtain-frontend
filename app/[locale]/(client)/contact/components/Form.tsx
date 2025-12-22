"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import SendLetter from "@/assets/objects/send-letter.svg";
import { useTranslations } from "next-intl";

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

  return (
    <form className="w-full lg:min-w-md flex-1">
      <div className="grid xl:grid-cols-2 gap-8">
        <div className="grid gap-2">
          <Label>{inputsT("firstName.label")}</Label>
          <Input
            placeholder={inputsT("firstName.placeholder")}
            className="rounded-none border-0 border-b border-b-white bg-transparent focus-visible:ring-0"
          />
        </div>

        <div className="grid gap-2">
          <Label>{inputsT("lastName.label")}</Label>
          <Input
            placeholder={inputsT("lastName.placeholder")}
            className="rounded-none border-0 border-b border-b-white bg-transparent focus-visible:ring-0"
          />
        </div>

        <div className="grid gap-2">
          <Label>{inputsT("email.label")}</Label>
          <Input
            placeholder={inputsT("email.placeholder")}
            className="rounded-none border-0 border-b border-b-white bg-transparent focus-visible:ring-0"
          />
        </div>

        <div className="grid gap-2">
          <Label>{inputsT("phoneNumber.label")}</Label>
          <Input
            placeholder={inputsT("phoneNumber.placeholder")}
            className="rounded-none border-0 border-b border-b-white bg-transparent focus-visible:ring-0"
          />
        </div>
      </div>

      <div className="mt-10">
        <Label className="text-lg font-semibold">
          {inputsT("subject.label")}
        </Label>

        <RadioGroup value={selectedSubject} onValueChange={setSelectedSubject}>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 mb-8">
            {subjects.map((subject) => (
              <div key={subject.id} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={subject.id}
                  id={subject.id}
                  className="border-2 border-white text-white"
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
      </div>

      <div className="grid gap-2">
        <Label>{inputsT("message.label")}</Label>
        <Input
          placeholder={inputsT("message.placeholder")}
          className="rounded-none border-0 border-b border-b-white bg-transparent focus-visible:ring-0"
        />
      </div>

      <div className="flex items-end flex-col mt-10 relative">
        <div className="relative">
          <Button variant="ghost" className="bg-white/2 h-12 px-10">
            {commonT("sendMessage")}
          </Button>
          <SendLetter className="absolute top-1/2 end-1/2 rtl:rotate-y-180 pointer-events-none" />
        </div>
      </div>
    </form>
  );
};
