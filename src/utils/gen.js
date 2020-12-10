import _ from "lodash";

export function GenFilter(items, id) {
  console.log(id);
  if (id === null) {
    return items;
  }
  if (id !== null) {
    return items.filter((item) => item.genre._id === id);
  }
}