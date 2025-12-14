type Locale = "ar" | "en" | "du" | "fr" | "ku";

interface Plurals {
  singular: string; // مفرد
  dual?: string; // مثنى (اختياري)
  few?: string; // 3-10
  many?: string; // 11+
  other?: string; // الباقي (غالباً المفرد)
}

const ARABIC_PLURALIZE = (count: number, forms: Plurals) => {
  if (count === 0) return `٠ ${forms.many || forms.other || forms.singular}`;
  if (count === 1) return forms.singular;
  if (count === 2 && forms.dual) return forms.dual;
  if (count >= 3 && count <= 10 && forms.few) return `${count} ${forms.few}`;
  if (count >= 11 && forms.many) return `${count} ${forms.many}`;
  return `${count} ${forms.other || forms.singular}`;
};

export const localizeCount = (
  count: number,
  locale: Locale,
  forms: Plurals & {
    en?: [string, string];
    du?: [string, string];
    fr?: [string, string];
    ku?: [string, string];
  }
) => {
  switch (locale) {
    case "en":
      const [enSingular, enPlural] = forms.en || [
        forms.singular,
        forms.other || forms.singular + "s",
      ];
      return count === 1 ? `${count} ${enSingular}` : `${count} ${enPlural}`;
    case "du":
      const [duSingular, duPlural] = forms.du || [
        forms.singular,
        forms.other || forms.singular + "e",
      ];
      return count === 1 ? `${count} ${duSingular}` : `${count} ${duPlural}`;
    case "fr":
      const [frSingular, frPlural] = forms.fr || [
        forms.singular,
        forms.other || forms.singular + "s",
      ];
      return count === 1 ? `${count} ${frSingular}` : `${count} ${frPlural}`;
    case "ku":
      const [kuSingular, kuPlural] = forms.ku || [
        forms.singular,
        forms.other || forms.singular + "an",
      ];
      return count === 1 ? `${count} ${kuSingular}` : `${count} ${kuPlural}`;
    case "ar":
    default:
      return ARABIC_PLURALIZE(count, forms);
  }
};

// مثال للاستخدام:
console.log(
  localizeCount(0, "ar", {
    singular: "يوم",
    dual: "يومان",
    few: "أيام",
    many: "يومًا",
  })
);
console.log(localizeCount(1, "en", { singular: "day", en: ["day", "days"] }));
console.log(
  localizeCount(5, "fr", { singular: "jour", fr: ["jour", "jours"] })
);
