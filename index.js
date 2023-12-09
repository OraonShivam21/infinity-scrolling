let postsURL = "https://jsonplaceholder.typicode.com/posts";

let mainSection = document.getElementById("posts-card");

let pageNumber = 1;
let pageLimit = 20;

window.addEventListener("load", function () {
  fetchLoadPostsData();
});

async function fetchLoadPostsData() {
  try {
    let newURL = `${postsURL}?_page=${pageNumber}&_limit=${pageLimit}`;
    let res = await fetch(newURL);
    let data = await res.json();
    if (data && data.length) {
      createPostsCardSection(data);
      console.log(data);
    }
  } catch (error) {
    console.log(error);
  }
}

function createPostsCardSection(data) {
  let posts_card = document.createElement("div");
  posts_card.setAttribute("class", "posts-card");

  data.forEach((item) => {
    posts_card.appendChild(createPostsCard(item));
  });

  mainSection.appendChild(posts_card);
}

function createPostsCard(data) {
  let card = document.createElement("div");
  card.setAttribute("class", "card");

  let card_title = document.createElement("h3");
  card_title.setAttribute("class", "card-title");
  card_title.innerText = data.title;
  card.appendChild(card_title);

  let card_body = document.createElement("p");
  card_body.setAttribute("class", "card-body");
  card_body.innerText = data.body;
  card.appendChild(card_body);

  return card;
}

window.addEventListener("scroll", function () {
  let { clientHeight, scrollHeight, scrollTop } = document.documentElement;

  if (scrollHeight - clientHeight <= Math.ceil(scrollTop)) {
    if (pageNumber === 1) {
      pageNumber = 2;
    }
    pageNumber++;
    pageLimit = 10;
    fetchLoadPostsData();
  }
});
