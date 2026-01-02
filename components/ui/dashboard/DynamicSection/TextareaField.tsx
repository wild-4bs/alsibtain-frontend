import { Label } from "../../label";
import { Textarea } from "../textarea";

export const TextareaField = ({ label, value, onChange }: any) => (
  <div className="space-y-1">
    <Label>{label}</Label>
    <Textarea
      placeholder="Type here..."
      value={value}
      className="min-h-[100px] max-h-[200px]"
      onChange={(e: any) => onChange(e.target.value)}
    />
  </div>
);
