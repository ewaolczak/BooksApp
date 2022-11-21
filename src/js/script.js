/* eslint-disable no-unused-vars */
/* global Handlebars, utils, dataSource, event */ // eslint-disable-line no-unused-vars

// const { name } = require('browser-sync');

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
      booksList: '.books-list',
      filters: '.filters'
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

      thisBooksList.form = document.querySelector(select.containerOf.filters);

      thisBooksList.favoriteBooks = [];
      // console.log('favoriteBooks:', favoriteBooks);
      thisBooksList.filters = [];
      console.log('filtes:', thisBooksList.filters);

      thisBooksList.booksList.addEventListener('dblclick', function (event) {
        event.preventDefault();
        const clickedBook = event.target;
        const clickedBookParent = clickedBook.offsetParent;
        if (clickedBookParent.classList.contains('book__image')) {
          const bookId = clickedBookParent.getAttribute('data-id');
          if (!thisBooksList.favoriteBooks.includes(bookId)) {
            thisBooksList.favoriteBooks.push(bookId);
            clickedBookParent.classList.add('favorite');
            // console.log('clickedBook:', clickedBook);
            // console.log('favoriteBooks:', thisBooksList.favoriteBooks);
          } else {
            clickedBookParent.classList.remove('favorite');
            const unlikedBookIndex =
              thisBooksList.favoriteBooks.indexOf(bookId);
            thisBooksList.favoriteBooks.splice(unlikedBookIndex, 1);
            // console.log('clickedBook:', clickedBook);
            // console.log('favoriteBooks:', thisBooksList.favoriteBooks);
          }
        }
      });

      thisBooksList.form.addEventListener('click', function (event) {
        if (
          event.target.tagName == 'INPUT' &&
          event.target.type == 'checkbox' &&
          event.target.name == 'filter'
        ) {
          console.log(event.target.value);
        }
        if (event.target.checked == true) {
          thisBooksList.filters.push(event.target.value);
        } else {
          thisBooksList.filters.splice(
            thisBooksList.filters.indexOf(event.target.value),
            1
          );
        }
        console.log('thisBookList.filters:', thisBooksList.filters);
        
        thisBooksList.filterBooks();
      });
    }

    filterBooks() {
      const thisBooksList = this;

      for (let book of dataSource.books) {
        let shouldBeHidden = false;

        for (const filter of thisBooksList.filters) {
          if (!book.details[filter]) {
            shouldBeHidden = true;
            break;
          }
        }
        const filteredBookImage = document.querySelector(
          '.book__image[data-id="' + book.id + '"]'
        );

        if (shouldBeHidden == true) {
          filteredBookImage.classList.add('hidden');
        } else {
          filteredBookImage.classList.remove('hidden');
        }
      }
    }
  }

  const app = new BooksList();
  console.log(app);
}
