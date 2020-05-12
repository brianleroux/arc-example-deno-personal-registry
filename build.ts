// deno run -A build.ts 
import { join } from "https://deno.land/std/path/mod.ts";

// construct the path to the modules
const modules = join(Deno.cwd(), "src", "modules");

// loop thru the modules
for await (const entry of Deno.readDir(modules)) {

  // import the module version
  let { version } = await import(join(modules, entry.name, "version.ts"));

  // get a reference to the final bundle path
  let source = join(modules, entry.name, "mod.ts");
  let bundle = join(Deno.cwd(), "dist", `${entry.name}@v${version}`, "mod.ts");

  // shell out to `deno bundle`
  const p = Deno.run({
    cmd: ["deno", "bundle", source],
    stdout: "piped",
  });

  // if the result is good write it
  let { code } = await p.status();
  if (code === 0) {
    let raw = await p.output();
    await Deno.mkdir(bundle.replace("mod.ts", ""), { recursive: true });
    await Deno.writeFile(bundle, raw);
  }
}

// read /dist and get an array of module names
const dist = join(Deno.cwd(), "dist");
const list = join(Deno.cwd(), "dist", "modules.json");
const versions = []
for await (const entry of Deno.readDir(dist)) {
  versions.push(entry.name)
}
// write out modules.json
const enc = new TextEncoder();
const self = (m: string)=> m != "modules.json"
const value = enc.encode(JSON.stringify({modules: versions.filter(self)}));
await Deno.writeFile(list, value)
