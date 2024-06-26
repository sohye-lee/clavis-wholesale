import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const capitalize = (string: string | null) => {
  if (!string) return "";
  return string[0].toUpperCase().concat(string.slice(1));
};

export const capitalizeSentence = (sentence: string) => {
  const words = sentence.trim().split(" ");
  const capitalizedWords = [];
  for (var word of words) {
    capitalizedWords.push(capitalize(word));
  }

  return capitalizedWords.join(" ");
};

export const numberWithCommas = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
