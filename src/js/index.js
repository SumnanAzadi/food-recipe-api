import Search from "./models/Search";
import * as searchView from "./views/searchView";
import { elements, renderLoader, clearLoader } from "./views/base";

//Recipe
import Recipe from "./models/Recipe";
import * as recipeView from "./views/recipeView";

/** Global "state" of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {};

/*
 * SEARCH CONTROLLER
 */

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
      clearLoader();
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

/*
 * RECIPE CONTROLLER
 */
const controlRecipe = async () => {
  // Get the hash ID from url and replace # with ""
  const id = window.location.hash.replace("#", "");
  //console.log(id);

  if (id) {
    // Prepare UI for changes
    recipeView.clearRecipe(); //clear the existing recipe from the view first
    renderLoader(elements.recipe); //render the loader

    // Highlight selected search item
    if (state.search) recipeView.highlightSelected(id);

    // Create new recipe object
    state.recipe = new Recipe(id);

    try {
      // Get recipe data and parse ingredients
      await state.recipe.getRecipe();

      //console.log(state.recipe);
      state.recipe.parseIngredients();

      // Calculate servings and time
      state.recipe.calcTime();
      state.recipe.calcServings();

      // Render recipe
      //console.log(state.recipe);
      clearLoader(); //clear the loader
      recipeView.renderRecipe(state.recipe);
    } catch (err) {
      console.log(err);
      alert("Error processing recipe!");
    }
  }
};
//javascript "hashchange" event. when hash value of a url change. it will trigger
//window.addEventListener("hashchange", controlRecipe);
//javascript "load" event. when window loads, it will trigger
//window.addEventListener("load", controlRecipe);

//add the same event listener to different events
["hashchange", "load"].forEach((event) =>
  window.addEventListener(event, controlRecipe)
);

// Handling recipe button clicks
elements.recipe.addEventListener("click", (e) => {
  //Here we want to click exact 'btn-decrease' class not any other element
  if (e.target.matches(".btn-decrease, .btn-decrease *")) {
    //* means any child element of bt-decrease class
    // Decrease button is clicked
    if (state.recipe.servings > 1) {
      state.recipe.updateServings("dec");
      recipeView.updateServingsIngredients(state.recipe);
    }
  } else if (e.target.matches(".btn-increase, .btn-increase *")) {
    // Increase button is clicked
    state.recipe.updateServings("inc");
    recipeView.updateServingsIngredients(state.recipe);
  }
});
