import Search from "./models/Search";
import * as searchView from "./views/searchView";
import { elements, renderLoader, clearLoader } from "./views/base";
/** Global "state" of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */

const state = {};

const controlSearch = async () => {
  // 1) Get query from view
  const query = searchView.getInput();
  //console.log(query);

  if (query) {
    // 2) Get a new search object and store at state object
    state.search = new Search(query);
    // 3) Prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);

    try {
      // 4) Search for recipes
      await state.search.getResults();
      // 5) Render results on UI
      //console.log(state.search.result);
      clearLoader();
      searchView.renderResults(state.search.result);
    } catch (err) {
      alert("Something wrong with the search...");
    }
  }
};

document.querySelector(".search").addEventListener("submit", (e) => {
  e.preventDefault();
  controlSearch();
});

search.getResults;
