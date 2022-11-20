/* eslint-disable no-unused-vars */
/* global Handlebars, utils, dataSource, event */ // eslint-disable-line no-unused-vars

// const { init } = require('browser-sync');

// const { render } = require('sass');

// const { active } = require('browser-sync');

{
  ('use strict');

  const select = {
    templateOf: {
      book: '#template-book'
    },
    containerOf: {
      booksList: '.books-list'
    },
    book: {
      image: '.book__image'
    }
  };

  const templates = {
    books: Handlebars.compile(
      document.querySelector(select.templateOf.book).innerHTML
    )
  };

  class BooksList {
    constructor() {
      const thisBooksList = this;

      thisBooksList.getElements();
      thisBooksList.render();
      thisBooksList.initAction();
    }

    getElements() {
      const thisBooksList = this;

      thisBooksList.booksList = document.querySelector(
        select.containerOf.booksList
      );
      thisBooksList.bookImage = document.querySelector(select.book.image);
    }

    render() {
      const thisBooksList = this;

      for (let book of dataSource.books) {
        /* generate HTML based on template */
        const generatedHTML = templates.books(book);
        /* create emelement using utils.createElementFromHTML */
        thisBooksList.element = utils.createDOMFromHTML(generatedHTML);

        /* add element to books list */
        thisBooksList.booksList.appendChild(thisBooksList.element);
      }
    }

    initAction() {
      const thisBooksList = this;

      const favoriteBooks = [];
      // console.log('favoriteBooks:', favoriteBooks);

      thisBooksList.booksList.addEventListener('dblclick', function (event) {
        event.preventDefault();
        const clickedBook = event.target;
        const clickedBookParent = clickedBook.offsetParent;
        if (clickedBookParent.classList.contains('book__image')) {
          const bookId = clickedBookParent.getAttribute('data-id');
          if (!favoriteBooks.includes(bookId)) {
            favoriteBooks.push(bookId);
            clickedBookParent.classList.add('favorite');
            // console.log('clickedBook:', clickedBook);
            // console.log('favoriteBooks:', favoriteBooks);
          }
        }
      });
    }
  }

  const app = new BooksList();
}
