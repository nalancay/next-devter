import { DEFAULT_LANGUAGE } from "@/constants/locale";

const isDateTimeFormatSupported: boolean =
  typeof Intl !== "undefined" && typeof Intl.DateTimeFormat !== "undefined";

interface FormatDateOptions {
  language?: string;
}

export const formatDate = (
  timestamp: number | string | Date,
  { language = DEFAULT_LANGUAGE }: FormatDateOptions = {}
): string => {
  const date = new Date(timestamp);

  if (!isDateTimeFormatSupported) {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    return date.toLocaleDateString(language, options);
  }

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  return new Intl.DateTimeFormat(language, options).format(date);
};

export default function useDateTimeFormat(
  timestamp: number | string | Date
): string {
  return formatDate(timestamp, { language: DEFAULT_LANGUAGE });
}
