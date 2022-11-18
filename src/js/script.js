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
    }
  };

  const templates = {
    book: Handlebars.compile(
      document.querySelector(select.templateOf.book).innerHTML
    )
  };

  function render() {
    for (let book of dataSource.books) {
      const generatedHTML = templates.book(book);

      const DOMElement = utils.createDOMFromHTML(generatedHTML);

      const bookListElement = document.querySelector(select.containerOf.list);

      bookListElement.appendChild(DOMElement);
    }
  }
  render();
}
