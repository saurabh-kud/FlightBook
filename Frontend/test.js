const books = [
  {
    name: "testing book",
    author: "sonpal",
    price: "200",
  },
  {
    name: "testing book",
    author: "sonpal",
    price: "400",
  },
  {
    name: "testing book",
    author: "sonpal",
    price: "200",
  },
  {
    name: "testing book",
    author: "sonpal",
    price: "600",
  },
];

console.log(books);

const upper = books.filter((bk) => {
    return Number(bk.price) > 200;
})
console.log(upper);