"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import SendLetter from "@/assets/objects/send-letter.svg";

export const Form = () => {
  const [selectedSubject, setSelectedSubject] = useState("");

  const subjects = [
    { id: "general", label: "General Inquiry" },
    { id: "project", label: "Project Information" },
    { id: "partnership", label: "Partnership Request" },
    { id: "sales", label: "Sales & Availability" },
  ];

  return (
    <form className="w-full lg:min-w-md flex-1">
      <div className="grid xl:grid-cols-2 gap-8">
        <div className="grid gap-2">
          <Label>First Name</Label>
          <Input className="rounded-none border-0 border-b border-b-white bg-transparent focus-visible:ring-0" />
        </div>
        <div className="grid gap-2">
          <Label>Last Name</Label>
          <Input className="rounded-none border-0 border-b border-b-white bg-transparent focus-visible:ring-0" />
        </div>
        <div className="grid gap-2">
          <Label>Email</Label>
          <Input className="rounded-none border-0 border-b border-b-white bg-transparent focus-visible:ring-0" />
        </div>
        <div className="grid gap-2">
          <Label>Phone Number</Label>
          <Input
            className="rounded-none border-0 border-b border-b-white bg-transparent focus-visible:ring-0"
            placeholder="+964"
          />
        </div>
      </div>
      <div className="mt-10">
        <Label className="text-lg font-semibold">Select Subject?</Label>
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
        <Label>Message</Label>
        <Input
          className="rounded-none border-0 border-b border-b-white bg-transparent focus-visible:ring-0"
          placeholder="Write your message..."
        />
      </div>
      <div className="flex items-end flex-col mt-10 relative">
        <div className="relative">
          <Button variant={"ghost"} className="bg-white/2 h-12 px-10">
            Send Message
          </Button>
          <SendLetter className="absolute top-1/2 right-1/2" />
        </div>
      </div>
    </form>
  );
};
