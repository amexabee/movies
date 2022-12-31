import _ from 'lodash';
import './style.css';
import { comment } from './modules/comments';
import Likes from './modules/likes';

const likes = new Likes();
const movies = [];

async function getUsers() {
  const response = await fetch('https://api.tvmaze.com/shows');
  const data = await response.json();
  return data;
}

getUsers()
  .then((data) => {
    for (let i = 0; i < 8; i++) {
      movies.push(data[i]);
    }

    return movies;
  })
  .then((movies) => {
    movies.forEach((movie, index) => {
      const poster = document.querySelectorAll('.poster')[index];
      const image = `<img src="${movie.image.medium}" alt="" />`;
      const love = `<i id=${index + 1} class="fa fa-heart love"></i>`;
      const name = `<div class="likes"><p class="movie-name">${movie.name}</p>${love}</div>`;
      poster.innerHTML = `${image}${name}`;
    });

    return movies;
  })
  .then((movies) => {
    comment(movies);
    likes.manageAPI();
  });

for (let i = 1; i <= 8; i++) {
  document.querySelector(
    '.grid-container'
  ).innerHTML += `<div class="grid-item">
  <div class="poster"></div>
  <p id="p${i}" style="margin: 0; text-align: right">0 likes</p>
  <div><button id="btn${i}" class="commentBtn">Comments</button></div>
</div>`;
}
