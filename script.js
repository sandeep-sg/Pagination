let container = document.querySelector(".container");
let btnContainer = document.querySelector(".btn-container");
let content = document.querySelector(".content");
let previousBtn = document.querySelector(".previous-btn");
let nextBtn = document.querySelector(".next-btn");
let smallScreenBtn = document.querySelector(".small-screen-btn");
const data = [];
// Insert random image in data .......
for (let index = 1; index <= 200; index++) {
  data.push(`https://picsum.photos/id/${index}/200/300`);
}
// No. of item per page .........
let perPageItem = 16;
console.log(data.length / perPageItem)
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
// change page function ..........................
function changePage(btnNumber) {
  buttons.forEach((button) => button.classList.remove("active"));
  buttons.forEach((button) => {
    if (button.innerText == btnNumber) {
      button.classList.add("active");
    }
  });
  sliceData = data.slice(
    perPageItem * btnNumber - perPageItem,
    perPageItem * btnNumber
  );
  showItem();
  window.scroll(0, 0);
}

showItem();
let btnNumber = 1;
let buttons = document.querySelectorAll(".btn-container button");
buttons[0].classList.add("active");
btnContainer.addEventListener("click", (e) => {
  btnNumber = e.target.innerText;
  // changepage function call when user click the button
  changePage(btnNumber);
});
// when user click on next button show next page......
nextBtn.addEventListener("click", () => {
  if(Math.floor(data.length / perPageItem) < btnNumber ) return
  btnNumber = Number(btnNumber) + 1;
  // changepage function call when user click the next button
  changePage(btnNumber);
});
// when user click on previous button show previous page......
previousBtn.addEventListener("click", () => {
  if (btnNumber == 1) return;
  btnNumber = Number(btnNumber) - 1;
  // changepage function call when user click the previous button
  changePage(btnNumber);
});

// small screen pagination logic  ...............
let n = 2;
smallScreenBtn.addEventListener("click", () => {
  n = n + 1;
  let smallperpage = 8;
  sliceData = data.slice(smallperpage * n - smallperpage, smallperpage * n);
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
});
