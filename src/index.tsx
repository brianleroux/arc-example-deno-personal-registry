import { React } from "https://unpkg.com/es-react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      table: any;
      tr: any;
      th: any;
      td: any;
      a: any;
    }
  }
}

interface TableProps {
  modules: string[];
  repo: string;
}

export default function Index(props:TableProps) {
  return (<table>
  <tr>
    <th>module</th>
    <th>source</th>
  </tr>
  {props.modules.map((mod: string) => {
    let name = mod.split('@')[0]
    let raw = `${mod}/mod.ts`
    let src = `${props.repo}/src/modules/${name}`
    return (
      <tr>
        <td><a href={raw}>{mod}</a></td>
        <td><a href={src}>{name}</a></td>
      </tr>
    );
  })}
  </table>)
}
