import { SortingState } from "@tanstack/react-table";

// for goyave
export default function sortingStateToString(sorting: SortingState) {
  let result = "";

  if (Array.isArray(sorting) && sorting[0]) {
    if (sorting[0].desc) {
      result += `sort=${sorting[0].id},DESC`;
    } else {
      result += `sort=${sorting[0].id},ASC`;
    }
  }

  return result;
}
