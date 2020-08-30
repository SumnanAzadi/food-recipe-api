/* //basic start import
import singleFile from "./models/Search";

import * as searchView from "./views/searchView";
console.log(
  `Using imported functions! ${searchView.add(
    searchView.ID,
    2
  )} and ${searchView.multiply(3, 5)}, ${singleFile}`
); */

//npm install axios
import axios from "axios";

async function getResults(query) {
  try {
    const res = await axios(
      `https://forkify-api.herokuapp.com/api/search?&q=${query}`
    );
    const recipes = res.data.recipes;
    console.log(recipes);
  } catch (error) {
    alert(error);
  }
}
getResults("pizza");
