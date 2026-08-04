import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a Date object into a YYYY-MM-DD string.
 * @param date The date to format.
 * @returns The formatted date string.
 */
export const getFormattedDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const capitalize = (str: string): string =>
  str ? str.charAt(0).toUpperCase() + str.slice(1) : str;
