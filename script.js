let container = document.querySelector(".container");
let btnContainer = document.querySelector(".btn-container");
let content = document.querySelector(".content");
const data = [];
// Insert random image in data .......
for (let index = 1; index <= 100; index++) {
  data.push(`https://picsum.photos/id/${index}/200/300`);
}
// No. of item per page .........
let perPageItem = 8;
// create button for show item per page
for (let index = 0; index < data.length / perPageItem; index++) {
  let button = document.createElement("button");
  button.innerText = index + 1;
  btnContainer.appendChild(button);
}

// slice data for show item per page
let sliceData = data.slice(0, perPageItem);
// show item function ..........
function showItem() {
  content.innerHTML = "";
  sliceData.forEach((item) => {
    // create dummy structure of image .....
    let imgPlaceholder = document.createElement("div");
    imgPlaceholder.classList.add("imgPlaceholder");

    let img = document.createElement("img");
    img.classList.add("box");
    img.src = item;

    content.appendChild(imgPlaceholder);

    img.addEventListener("load", () => {
      imgPlaceholder.replaceWith(img);
    });
    img.addEventListener("error", () => {
      let img = document.createElement("img");
      img.classList.add("box");
      img.alt = "Failed to load";
      imgPlaceholder.replaceWith(img);
    });
  });
}

showItem();
let buttons = document.querySelectorAll(".btn-container button");
buttons[0].classList.add("active");
btnContainer.addEventListener("click", (e) => {
  window.scroll(0, 0);
  let n = e.target.innerText;
  let targetBtn = e.target;
  // remove active class from all buttons
  buttons.forEach((button) => button.classList.remove("active"));
  targetBtn.classList.add("active");
  sliceData = data.slice(perPageItem * n - perPageItem, perPageItem * n);
  showItem();
});
