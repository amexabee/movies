import APIManager from './APIManager.js';

const likesAPI = new APIManager();
const url =
  'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/iHlRD6igKa8dHKAKUPYu/likes';

export default class Likes {
  manageAPI() {
    likesAPI
      .get(url)
      .then((users) => {
        users.forEach((user) => {
          document.getElementById(
            `p${user.item_id}`
          ).textContent = `${user.likes} likes`;
        });
      })
      .catch((err) => console.log(err));

    document.querySelectorAll('.fa-heart').forEach((element) => {
      element.addEventListener('click', (e) => {
        // e.target.classList.toggle('love');
        let data = { item_id: e.target.id };

        likesAPI.post(url, data).then(() => {
          likesAPI
            .get(url)
            .then((users) => {
              users.forEach((user) => {
                document.getElementById(
                  `p${user.item_id}`
                ).textContent = `${user.likes} likes`;
              });
            })
            .catch((err) => console.log(err));
        });
      });
    });
  }
}
