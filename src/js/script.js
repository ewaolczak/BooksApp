/* eslint-disable no-unused-vars */
/* global Handlebars, utils, dataSource, event */ // eslint-disable-line no-unused-vars

{
  ('use strict');

  const select = {
    templateOf: {
      book: '#template-book'
    },
    containerOf: {
      list: '.books-list'
    },
    all: {
      bookImage: '.bookList.book__image'
    }
  };

  const templates = {
    book: Handlebars.compile(
      document.querySelector(select.templateOf.book).innerHTML
    )
  };

  const render = function () {
    for (let book of dataSource.books) {
      const generatedHTML = templates.book(book);

      const DOMElement = utils.createDOMFromHTML(generatedHTML);

      const bookListElement = document.querySelector(select.containerOf.list);

      bookListElement.appendChild(DOMElement);
    }
  };

  const favoriteBooks = [];

  const initAction = function () {
    const bookList = select.all.bookImage;

    bookList.addEventListener('dblclick', function (event) {
      event.preventDefault();
      const clickedBook = event.target;
      const clickedBookParent = clickedBook.offsetParent;
      if (clickedBookParent.classList.containst('book__image')) {
        clickedBookParent.classList.add('favorite');
        const dataID = clickedBookParent.getAttribute('data-id');
        favoriteBooks.push(dataID);
      }
    });
  };

  render();
  initAction();
}
