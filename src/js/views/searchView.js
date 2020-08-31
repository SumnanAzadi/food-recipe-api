import { elements } from "./base";

export const getInput = () => elements.searchInput.value; //implicit returns

//clear Input field(we are not returning anything, so no need explicit)
export const clearInput = () => {
  elements.searchInput.value = "";
};

//clear the results before search any thing again. Otherwise it will be bottom of the previous list

export const clearResults = () => {
  elements.searchResList.innerHTML = "";
  elements.searchResPages.innerHTML = "";
};

/*
Example::
// 'Pasta with tomato and spinach'
acc: 0 = acc + cur.length = 5 = newTitle = ['Pasta']
acc: 5 = acc + cur.length = 9 = newTitle = ['Pasta', 'with']
acc: 9 = acc + cur.length = 15 = newTitle = ['Pasta', 'with', 'tomato']
acc: 15 = acc + cur.length = 18 = newTitle = ['Pasta', 'with', 'tomato']
acc: 18 = acc + cur.length = 24 = newTitle = ['Pasta', 'with', 'tomato'] //final word
*/
export const limitRecipeTitle = (title, limit = 17) => {
  const newTitle = [];
  if (title.length > limit) {
    title.split(" ").reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        newTitle.push(cur);
      }
      return acc + cur.length;
    }, 0);

    // return the result
    //join is opposite of split, here, join the element of the world with a space
    return `${newTitle.join(" ")} ...`;
  }
  return title;
};

const renderRecipe = (recipe) => {
  const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(
                      recipe.title
                    )}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;
  elements.searchResList.insertAdjacentHTML("beforeend", markup);
};

/* 
//render the results without pagination
export const renderResults = (recipes) => {
  recipes.forEach((el) => renderRecipe(el));
  //can be write like below. Here the function will automatically passs the current element.
  //recipes.forEach(renderRecipe);
}; 
*/

//render the results with pagination

// type: 'prev' or 'next'
//html data attribute(goto is the name)
const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${
  type === "prev" ? page - 1 : page + 1
}>
        <span>Page ${type === "prev" ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${
              type === "prev" ? "left" : "right"
            }"></use>
        </svg>
    </button>
`;

const renderButtons = (page, numResults, resultPerPage) => {
  const pages = Math.ceil(numResults / resultPerPage);

  let button;
  if (page === 1 && pages > 1) {
    // Only show next button to go to next page
    button = createButton(page, "next");
  } else if (page < pages) {
    //Show both buttons
    button = `
            ${createButton(page, "prev")}
            ${createButton(page, "next")}
        `;
  } else if (page === pages && pages > 1) {
    // Only show prev button to go to previous page(this is last page)
    button = createButton(page, "prev");
  }

  elements.searchResPages.insertAdjacentHTML("afterbegin", button);
};

export const renderResults = (recipes, page = 1, resultPerPage = 10) => {
  // render results of current page

  /* 
  //so in first page let's say we want to show 10 elements(0 to 9), So, ....
  const start = 0;
  const end = 10; */
  const start = (page - 1) * resultPerPage;
  const end = page * resultPerPage;

  recipes.slice(start, end).forEach(renderRecipe);

  // render pagination buttons
  renderButtons(page, recipes.length, resultPerPage);
};
