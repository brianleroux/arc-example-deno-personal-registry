import { assert } from "https://deno.land/std/testing/asserts.ts";
import { padLeft } from "./mod.ts";

Deno.test("env", () => {
  if (!padLeft) {
    throw Error("no module; no good");
  }
});

Deno.test("can pad left", () => {
  let value = padLeft("foo", 5, "0");
  assert(value.length === 5);
  console.log(value);
});
