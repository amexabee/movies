import APIManager from './APIManager.js';

const commentsAPI = new APIManager();
const url =
  'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/iHlRD6igKa8dHKAKUPYu/comments?item_id=';

export function comment(movies) {
  document.querySelectorAll('.commentBtn').forEach((btn) => {
    btn.addEventListener('click', displayComment);
  });

  function commentSent(item_id) {
    document.querySelector('form').addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.querySelector('input[type="text"]').value;
      document.querySelector('input[type="text"]').value = '';
      const comment = document.querySelector('textarea').value;
      document.querySelector('textarea').value = '';
      const data = {
        item_id,
        username,
        comment,
      };
      commentsAPI.post(url, data).then(() => {
        commentsAPI.get(`${url}${item_id}`).then((comments) => {
          document.querySelector(
            '.comment-num'
          ).textContent = `Comments (${comments.length})`;
          const comment = comments.filter(
            (c) => c.username == data.username && c.comment == data.comment
          );
          comment.map((c) => {
            const p = document.createElement('p');
            p.textContent = `${c.creation_date} ${c.username}: ${c.comment}`;
            document.querySelector('.comment-list').appendChild(p);
          });
        });
      });
    });
  }

  function displayComment(e) {
    commentsAPI
      .get(`${url}${e.target.id}`)
      .then((comments) => {
        if (!comments.error) {
          document.querySelector(
            '.comment-num'
          ).textContent = `Comments (${comments.length})`;
          comments.forEach((comment) => {
            const p = document.createElement('p');
            p.textContent = `${comment.creation_date} ${comment.username}: ${comment.comment}`;
            document.querySelector('.comment-list').appendChild(p);
          });
        }
        return e.target.id;
      })
      .then((id) => commentSent(id))
      .catch((err) => console.log(err));

    movies.forEach((movie) => {
      if (`btn${movie.id}` == e.target.id) {
        const newComment = document.createElement('div');
        newComment.id = 'comment-container';
        newComment.innerHTML = `
        <div class="img-close"><img src="${movie.image.original}" alt="" />
        <i class="fa fa-times fa-3x"></i></div>
        <h2>${movie.name}</h2>
        <div class="img-close"><p>rating: ${movie.rating.average}</p>
        <p>genre: ${movie.genres[0]}</p></div>
        <div class="img-close"><p>premiered: ${movie.premiered}</p>
        <p>ended: ${movie.ended || 'Still on air'}</p></div>
        <div class="comment-list"><h2 class="comment-num">Comments (0)</h2></div>
        <h2>Add a Comment</h2> 
        <form>
           <input type="text" class="full-name" name="full-name" placeholder="Your name"/>
           <br /> <br />
           <textarea class="insights" name="insights" rows="4" cols="50" placeholder="Your insights"></textarea>
           <br /> <br />
           <input class="comment-input" type="submit" value="Comment" />
           <br /> <br />
        </form>
        `;
        document.body.appendChild(newComment);

        document.querySelector('.fa-times').addEventListener('click', () => {
          document.body.removeChild(newComment);
        });
      }
    });
  }
}
