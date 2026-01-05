export const formatShortDateTime = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

type Lang = "en" | "ar";

const getArabicUnit = (
  count: number,
  unit: {
    singular: string;
    dual: string;
    plural: string;
  }
) => {
  if (count === 1) return unit.singular;
  if (count === 2) return unit.dual;
  if (count >= 3 && count <= 10) return unit.plural;
  return unit.singular;
};

export const timeAgo = (dateString: string, lang: Lang = "en"): string => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals = [
    {
      key: "year",
      seconds: 31536000,
      ar: { singular: "سنة", dual: "سنتان", plural: "سنوات" },
      en: "year",
    },
    {
      key: "month",
      seconds: 2592000,
      ar: { singular: "شهر", dual: "شهران", plural: "أشهر" },
      en: "month",
    },
    {
      key: "week",
      seconds: 604800,
      ar: { singular: "أسبوع", dual: "أسبوعان", plural: "أسابيع" },
      en: "week",
    },
    {
      key: "day",
      seconds: 86400,
      ar: { singular: "يوم", dual: "يومان", plural: "أيام" },
      en: "day",
    },
    {
      key: "hour",
      seconds: 3600,
      ar: { singular: "ساعة", dual: "ساعتان", plural: "ساعات" },
      en: "hour",
    },
    {
      key: "minute",
      seconds: 60,
      ar: { singular: "دقيقة", dual: "دقيقتان", plural: "دقائق" },
      en: "minute",
    },
    {
      key: "second",
      seconds: 1,
      ar: { singular: "ثانية", dual: "ثانيتان", plural: "ثوانٍ" },
      en: "second",
    },
  ] as const;

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count > 0) {
      if (lang === "ar") {
        const unit = getArabicUnit(count, interval.ar);
        return `منذ ${count} ${unit}`;
      }

      return `${count} ${interval.en}${count !== 1 ? "s" : ""} ago`;
    }
  }

  return lang === "ar" ? "الآن" : "just now";
};
