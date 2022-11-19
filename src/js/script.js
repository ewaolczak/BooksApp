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
      bookList: '.book-list'
    },
    book: {
      image: '.book-list .book__image'
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

      thisBooksList.render();
    }

    render() {
      const thisBooksList = this;

      for (let book of dataSource.books) {
        /* generate HTML based on template */
        const generatedHTML = templates.books(book);
        /* create emelement using utils.createElementFromHTML */
        thisBooksList.element = utils.createDOMFromHTML(generatedHTML);

        /* find books container */
        const booksListContainer = document.querySelector(
          select.containerOf.bookList
        );

        /* add element to books list */
        booksListContainer.appendChild(thisBooksList.element);
      }
    }
  }

  const app = new BooksList();
}
