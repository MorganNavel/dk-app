export function ArrayToString(array: string[]): string | null {
  if (!array) return null;
  if (array.length === 0) return null;
  if (array.length === 1 && array[0] === "") return null;

  return array.join(";");
}
export function StringToArray(string: string): string[] | null {
  if (!string) return null;
  const array = string.split(";");
  if (array.length === 1 && array[0] === "") {
    return null;
  }
  return array;
}
