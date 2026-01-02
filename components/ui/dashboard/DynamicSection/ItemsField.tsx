import { Plus, X } from "lucide-react";
import { Input } from "../Input";
import { Textarea } from "../textarea";
import { Label } from "../../label";
import { IconPicker } from "../IconPicker";

/* ---------------- IconField ---------------- */
// const IconField = ({
//   value,
//   onChange,
//   className,
// }: {
//   value?: string;
//   onChange: (val: string) => void;
//   className?: string;
// }) => {
//   const [local, setLocal] = useState(value || "");

//   useEffect(() => {
//     setLocal(value || "");
//   }, [value]);

//   const handle = (v: any) => {
//     const normalized =
//       typeof v === "string" ? v : v?.value ?? v?.name ?? v?.icon ?? "";
//     setLocal(normalized);
//     onChange(normalized);
//   };

//   return (
//     <IconPicker
//       value={local}
//       onChange={handle}
//       showClearButton
//       className={className}
//       // بعض النسخ من IconPicker تستعمل onValueChange
//       // @ts-ignore
//       onValueChange={handle}
//     />
//   );
// };

/* ---------------- UnlimitedItems ---------------- */

interface ItemsFieldProps {
  type: "unlimited" | "limited";
  items: any[];
  setItems: (v: any[]) => void;
  expectedFields: string[];
}

export const ItemsField = ({
  type,
  expectedFields,
  items,
  setItems,
}: ItemsFieldProps) => {
  return (
    <>
      {type == "unlimited" && (
        <UnlimitedItems
          expectedFields={expectedFields}
          items={items}
          setItems={setItems}
        />
      )}
    </>
  );
};

export const UnlimitedItems = ({
  items,
  setItems,
  expectedFields,
}: {
  items: any[];
  setItems: (v: any[]) => void;
  expectedFields: string[];
}) => {
  const addItem = () => {
    const newItem: any = {};
    expectedFields.forEach((f) => (newItem[f] = ""));
    setItems([...(items || []), newItem]);
  };

  const updateItem = (i: number, key: string, value: any) => {
    const copy = [...(items || [])];
    copy[i] = { ...(copy[i] || {}), [key]: value };
    setItems(copy);
  };

  const removeItem = (i: number) =>
    setItems((items || []).filter((_, idx) => idx !== i));

  return (
    <div className="flex flex-wrap gap-4 mt-2">
      {(items || []).map((item, i) => (
        <div
          key={`item-${i}`}
          className="relative w-full min-w-lg flex-1 border rounded-lg px-4 py-4 flex flex-col gap-2"
        >
          {expectedFields.map((f) => {
            if (f === "title" || f === "headline" || f == "value")
              return (
                <div key={`${i}-${f}`} className="space-y-1">
                  <Label className="capitalize">{f}</Label>
                  <Input
                    value={item?.[f] ?? ""}
                    onChange={(e) => updateItem(i, f, e.target.value)}
                  />
                </div>
              );
            if (f === "caption")
              return (
                <div key={`${i}-${f}`} className="space-y-1">
                  <Label className="capitalize">{f}</Label>
                  <Textarea
                    value={item?.[f] ?? ""}
                    onChange={(e) => updateItem(i, f, e.target.value)}
                    className="min-h-[50px]"
                  />
                </div>
              );
            if (f === "icon")
              return (
                <div key={`${i}-${f}`} className="space-y-1">
                  <Label className="capitalize">{f}</Label>
                  <IconPicker
                    value={item?.[f] ?? ""}
                    onChange={(val) => updateItem(i, f, val)}
                  />
                </div>
              );
            return null;
          })}

          <button
            type="button"
            onClick={() => removeItem(i)}
            className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 hover:bg-red-500 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addItem}
        className="flex items-center justify-center w-[200px] h-[200px] border-2 border-dashed rounded-lg text-gray-500 hover:text-white hover:border-gray-400 transition"
      >
        <Plus className="w-10 h-10" />
      </button>
    </div>
  );
};

/* ---------------- LimitedItems ---------------- */
export const LimitedItems = ({
  items,
  setItems,
  max,
  expectedFields,
}: {
  items: any[];
  setItems: (v: any[]) => void;
  max: number;
  expectedFields: string[];
}) => {
  const updateItem = (i: number, key: string, value: any) => {
    const copy = [...items];
    while (copy.length < max) copy.push({});
    copy[i] = { ...(copy[i] || {}), [key]: value };
    setItems(copy);
  };

  const normalized = Array.from({ length: max }).map(
    (_, i) => items?.[i] || {}
  );

  return (
    <div className="flex flex-wrap gap-4 mt-2">
      {normalized.map((item, i) => (
        <div
          key={`limited-${i}`}
          className="relative w-full min-w-lg flex-1 border rounded-lg px-4 py-6 flex flex-col gap-2"
        >
          {expectedFields.map((f) => {
            if (f === "title" || f === "headline" || f == "value")
              return (
                <div key={`${i}-${f}`} className="space-y-1">
                  <Label className="capitalize">{f}</Label>
                  <Input
                    value={item?.[f] ?? ""}
                    onChange={(e) => updateItem(i, f, e.target.value)}
                  />
                </div>
              );
            if (f === "caption")
              return (
                <div key={`${i}-${f}`} className="space-y-1">
                  <Label className="capitalize">{f}</Label>
                  <Textarea
                    value={item?.[f] ?? ""}
                    onChange={(e) => updateItem(i, f, e.target.value)}
                    className="min-h-[50px]"
                  />
                </div>
              );
            if (f === "icon")
              return (
                <div key={`${i}-${f}`} className="space-y-1">
                  <Label className="capitalize">{f}</Label>
                  <IconPicker
                    value={item?.[f] ?? ""}
                    onChange={(val) => updateItem(i, f, val)}
                  />
                </div>
              );
            return null;
          })}
        </div>
      ))}
    </div>
  );
};
