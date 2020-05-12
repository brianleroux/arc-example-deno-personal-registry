// deno run -A build.ts 
import { join } from "https://deno.land/std/path/mod.ts";
import { React } from "https://unpkg.com/es-react";
import ReactDOMServer from "https://dev.jspm.io/react-dom/server";
import Index from './src/index.tsx'

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

/* generate html
let jsx = `<table>
  <tr>
    <th>module</th>
    <th>source</th>
  </tr>`

for (let mod of versions.filter(clean)) {
  let name = mod.split('@')[0]
  jsx += `<tr>
    <td><a href=/${mod}/mod.ts>${mod}</a></td>
    <td><a href=${GITHUB_REPO}/src/${name}>${name}</a></td>
  </tr>`
}
jsx += '</table>'
*/

// make deno do a jsx
const repo = 'https://github.com/brianleroux/arc-example-deno-personal-registry/tree/master'
const clean = (m: string)=> m.includes('.html') === false
const jsx = <Index modules={versions.filter(clean)} repo={repo} />
const body = ReactDOMServer.renderToString(jsx)
const src = join('src', 'index.html')
const dest = join('dist', 'index.html')

// write out index.html
const dec = new TextDecoder();
const enc = new TextEncoder();
const html = await Deno.readFile(src)
const raw = dec.decode(html).replace('<!--REPLACE-->', body)
await Deno.writeFile(dest, enc.encode(raw))

// copy in 404.html
const notFoundSrc = join('src', '404.html')
const notFoundDest = join('dist', '404.html')
await Deno.copyFile(notFoundSrc, notFoundDest)
