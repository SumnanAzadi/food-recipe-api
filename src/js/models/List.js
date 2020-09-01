import uniqid from "uniqid"; //npm install uniqid

export default class List {
  constructor() {
    this.items = [];
  }

  addItem(count, unit, ingredient) {
    const item = {
      id: uniqid(),
      count,
      unit,
      ingredient,
    };
    this.items.push(item);
    return item;
  }

  deleteItem(id) {
    const index = this.items.findIndex((el) => el.id === id);
    // [2,4,8] splice(1, 2)[2 is how many elements we want to remove] -> returns [4, 8], original array is [2] so, mutate original array
    // [2,4,8] slice(1, 2)[2 is end index but excluded] -> returns [4], original array is [2,4,8]
    this.items.splice(index, 1);
  }

  updateCount(id, newCount) {
    //find return the element itself
    this.items.find((el) => el.id === id).count = newCount;
  }
}
