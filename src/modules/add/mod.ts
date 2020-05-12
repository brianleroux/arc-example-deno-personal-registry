export function add(...args: number[]) {
  const reducer = (accumulator: number, current: number) =>
    accumulator + current;
  return args.reduce(reducer, 0);
}
