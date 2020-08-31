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
//controller for previous and next button
elements.searchResPages.addEventListener("click", (e) => {
  //event bubbling
  //"closest" returns the closest ancestor of the current element(in the parameter(.btn-inline))
  //se, if we click on any child element of this "btn-inline" class, it will fire only "btn-inline" class.
  const btn = e.target.closest(".btn-inline");
  if (btn) {
    //dataset = data stored in the data attribute(data-goto)
    const goToPage = parseInt(btn.dataset.goto, 10); //10 means 10 base number
    searchView.clearResults();
    //In searchView : renderResults(recipes, page = 1, resultPerPage = 10)
    searchView.renderResults(state.search.result, goToPage);
  }
});
