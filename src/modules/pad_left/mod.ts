import { colours } from "./deps.ts";
import { version } from "./version.ts";

export function padLeft(src: string, length: number, str: string) {
  return src.padStart(length, str);
}

if (import.meta.main) {
  console.log(colours.cyan(`pad_left@${version}`));
}
