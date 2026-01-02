"use client";
import { Accordion } from "../../accordion";
import { SectionEditor } from "../SectionEditor";
import { ReactNode, ComponentProps } from "react";
import { formatStr } from "@/i18n/helpers";
import { PageName } from "@/types/pages";
import { Label } from "../../label";
import { Input } from "../Input";
import { Button } from "../../button";
import { Textarea } from "../textarea";
import RichEditor from "../RichEditor";
import { IconPicker } from "../IconPicker";
import { cn } from "@/lib/utils";
import { AccordionItemProps } from "@radix-ui/react-accordion";
import clsx from "clsx";

interface DynamicSectionsProps {
  children?: ReactNode;
}

export const DynamicSections = ({ children }: DynamicSectionsProps) => (
  <Accordion type="multiple" className="space-y-4">
    {children}
  </Accordion>
);

interface DynamicSectionProps {
  sectionKey: string;
  id: string;
  children?: ReactNode;
  pending?: boolean;
}

export const DynamicSection = ({
  sectionKey,
  id,
  children,
  pending,
  className,
}: DynamicSectionProps & ComponentProps<"div">) => {
  return (
    <SectionEditor
      name={formatStr(sectionKey)}
      sectionId={id}
      className={cn(className)}
      disabled={pending}
    >
      {children}
    </SectionEditor>
  );
};

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

interface TextareaFieldProps {
  label?: string;
  value?: string;
  onChange?: (v: string) => void;
  error?: string;
}

export const TextareaField = ({
  label,
  value,
  onChange,
  error,
  ...props
}: TextareaFieldProps & ComponentProps<"textarea">) => (
  <div className="grid gap-2">
    <Label className="capitalize font-medium">{label}</Label>
    <Textarea
      placeholder="Type here..."
      value={value}
      className="min-h-[100px] max-h-[200px]"
      onChange={(e: any) => onChange?.(e.target.value)}
      {...props}
    />
    {error && (
      <p className="text-red-500 text-sm first-letter:uppercase">{error}</p>
    )}
  </div>
);

interface RichTextFieldProps {
  label?: string;
  value?: string;
  onChange: (v: string) => void;
}

export const RichTextField = ({
  label,
  value,
  onChange,
  className,
}: RichTextFieldProps & ComponentProps<"div">) => (
  <div className={`grid gap-2 ${className}`}>
    <Label className="capitalize font-medium">{label}</Label>
    <RichEditor value={value} onChange={(val: string) => onChange(val)} />
  </div>
);

interface IconFieldProps {
  label?: string;
  value?: string;
  onChange?: (v: string) => void;
}

export const IconFIeld = ({
  label,
  value,
  onChange,
  className,
}: IconFieldProps & ComponentProps<"div">) => (
  <div className={`grid gap-2 ${className}`}>
    <Label className="capitalize font-medium">{label}</Label>
    <IconPicker
      onChange={(val) => onChange?.(val as string)}
      value={value}
      className={cn(className)}
    />
  </div>
);
