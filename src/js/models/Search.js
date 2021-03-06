// Data for the search is just query and search results.

import axios from "axios";

export default class Search {
  constructor(query) {
    this.query = query;
  }
  //async function return a promise by default
  async getResults() {
    /* //When we use proxy with key. In here we don't need these.
    const proxy = "https://cors-anywhere.herokuapp.com/";
    const key = "462b1cc8d4f2730081462fbc65136320"; */
    try {
      /* const res = await axios(
        `${proxy}http://food2fork.com/api/search?key=${key}&q=${this.query}`
      ); */
      const res = await axios(
        `https://forkify-api.herokuapp.com/api/search?&q=${this.query}`
      );
      this.result = res.data.recipes;
    } catch (error) {
      alert(error);
    }
  }
}
