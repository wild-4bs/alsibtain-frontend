import { Label } from "../../label";
import { Input } from "../Input";

export const InputField = ({ label, value, onChange }: any) => (
  <div className="space-y-1">
    <Label className="capitalize">{label}</Label>
    <Input value={value} onChange={(e) => onChange(e.target.value)} />
  </div>
);
