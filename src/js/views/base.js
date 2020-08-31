export const elements = {
  searchForm: document.querySelector(".search"),
  searchInput: document.querySelector(".search__field"),
  searchRes: document.querySelector(".results"),
  searchResList: document.querySelector(".results__list"),
  searchResPages: document.querySelector(".results__pages"),
};

//we can select loader like we did in "elements" above.Because, when "elements" runs loader is not in the page yet. So, it's can't select that.
//we also can change the css name "loader" later and we just have to change it here.
//It's overkill here though.
const elementStrings = {
  loader: "loader",
};

//loader
//we will attach the loader to the parent element. can be reusable.
export const renderLoader = (parent) => {
  const loader = `
      <div class="${elementStrings.loader}">
          <svg>
              <use href="img/icons.svg#icon-cw"></use>
          </svg>
      </div>
  `;
  parent.insertAdjacentHTML("afterbegin", loader);
};

//clear the loader after fetching the result
export const clearLoader = () => {
  const loader = document.querySelector(`.${elementStrings.loader}`);
  if (loader) loader.parentElement.removeChild(loader);
};
