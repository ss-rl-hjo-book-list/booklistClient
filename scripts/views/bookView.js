'use strict';

(function(module) {
    // What do you need (import or require) from prior modules?
    const Book = module.Book;

    const bookView = {};
    
    bookView.initIndexPage = () => {
        bookView.loadBooks();
        bookView.renderBook();
    };
    
    bookView.loadBooks = () => {
        Book.all.forEach(book => {
            bookView.loadBook(book);
        });
    };

    bookView.renderBook = book => {
        $('#books').append(book.toHtml());
    };

    // What does your module export
    module.bookView = bookView;

})(window.app || (window.app = {}));