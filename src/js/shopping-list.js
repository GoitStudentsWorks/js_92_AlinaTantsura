import imgUrl from '../img/appleBook@1x-min.png';
const bookList = document.querySelector('.books-list');
const deleteForm = document.querySelector('.delete-form');
const noBooks = document.querySelector('.no-books');
const shoppingList = JSON.parse(localStorage.getItem('shoppingList'));
/*Creation of markup*/
bookList.insertAdjacentHTML('beforeend', shoppingMarkup(shoppingList));
/*Eventlisteners on each button*/
const books = [...bookList.children];
books.forEach(book => {
  book.children[2].addEventListener('click', handlerDelete);
});
/*function for deliting elements*/
function handlerDelete(evt) {
  const bookId = evt.currentTarget.dataset.bookId;
  const shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];

  const newBooks = [];

  shoppingList.filter(elem => {
    if (elem._id !== bookId) {
      newBooks.push(elem);
    }
  });
  console.log(newBooks);
  localStorage.setItem('shoppingList', JSON.stringify(newBooks));
}
/*Checking if I have elements in section*/
if (bookList.children.length === 0) {
  noBooks.classList.remove('hidden');
} else {
  noBooks.classList.add('hidden');
}

/*Function for card markup*/
function shoppingMarkup(arr) {
  const newDescription = 'Description will be added sooner';

  return arr
    .map(
      ({
        _id,
        book_image,
        title,
        list_name,
        description,
        author,
        buy_links,
      }) => {
        return `
      <li class="shopping-element">
        <img
          src="${book_image}"
          alt="${title}"
          class="book-image"
        />
        <div class="text-content">
          <h2 class="book-title">${title}</h2>
          <p class="book-category">${list_name}</p>
          <p class="book-description">
            ${description || newDescription}
          </p>
          <div class="author-buy">
            <p class="author-name">${author}</p>
            <ul class="buy-links">
              <li class="buy-link">
                <a href="${buy_links[0].url}" class="amazon-link book-link ">
                  <img
                    src="../img/amazon@1x-min.png"
                    alt="Amazon"
                    width="32"
                    height="11"
                    class="buy-amazon"
                  />
                </a>
              </li>
              <li class="buy-link">
                <a href="${buy_links[1].url}" class="apple-book-link book-link ">
                  <img
                    src="${imgUrl}"
                    alt="Apple Books"
                    width="16"
                    class="buy-apple"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <button type="submit" class="delete-item" data-book-id="${_id}">
          <svg class="remove-bin" width="16" height="16">
            <use href="./img/InlineSprite.svg#trash-min"></use>
          </svg>
        </button>
      </li>
    `;
      }
    )
    .join('');
}
