import { useEffect, useState } from "react";
import { formatDate } from "./useDateTimeFormat";

const isRelativeTimeFormatSupported: boolean =
  typeof Intl !== "undefined" && typeof Intl.RelativeTimeFormat !== "undefined";

type DateUnit = "day" | "hour" | "minute" | "second";

interface DateDiffs {
  value: number;
  unit: DateUnit;
}

const DATE_UNITS: [DateUnit, number][] = [
  ["day", 86400],
  ["hour", 3600],
  ["minute", 60],
  ["second", 1],
];

const getDateDiffs = (timestamp: number): DateDiffs => {
  const now = Date.now();
  const elapsed = (timestamp - now) / 1000;

  for (const [unit, secondsInUnit] of DATE_UNITS) {
    if (Math.abs(elapsed) > secondsInUnit || unit === "second") {
      const value = Math.round(elapsed / secondsInUnit);
      return { value, unit };
    }
  }

  return { value: 0, unit: "second" }; // default return in case nothing matches
};

export default function useTimeAgo(timestamp: number): string {
  const [timeago, setTimeago] = useState<DateDiffs>(() =>
    getDateDiffs(timestamp)
  );

  useEffect(() => {
    if (isRelativeTimeFormatSupported) {
      const interval = setInterval(() => {
        const newTimeAgo = getDateDiffs(timestamp);
        setTimeago(newTimeAgo);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [timestamp]);

  if (!isRelativeTimeFormatSupported) {
    return formatDate(timestamp, { language: "es" });
  }

  const rtf = new Intl.RelativeTimeFormat("es", { style: "short" });

  const { value, unit } = timeago;

  return rtf.format(value, unit);
}
