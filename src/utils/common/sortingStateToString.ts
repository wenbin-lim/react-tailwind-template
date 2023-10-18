import { SortingState } from "@tanstack/react-table";

export default function sortingStateToString(sorting: SortingState) {
  let result = "";

  if (Array.isArray(sorting) && sorting[0]) {
    if (sorting[0].desc) {
      result = `-${sorting[0].id}`;
    } else {
      result = sorting[0].id;
    }
  }

  return result;
}
