import singleFile from "./models/Search";

import * as searchView from "./views/searchView";
console.log(
  `Using imported functions! ${searchView.add(
    searchView.ID,
    2
  )} and ${searchView.multiply(3, 5)}, ${singleFile}`
);
