import { assert } from "https://deno.land/std/testing/asserts.ts";
import { add } from "./mod.ts";

Deno.test("env", () => {
  if (!add) {
    throw Error("no module; no good");
  }
});

Deno.test("1 + 1 = 2", () => {
  assert(add(1, 1) === 2);
});

Deno.test("1 + 2 + 3 + 4 = 10", () => {
  assert(add(1, 2, 3, 4) === 10);
});
