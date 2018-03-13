'use strict';

(function(module) {
    // What do you need (import or require) from prior modules?
    const Book = module.Book;

    function resetView() {
        $('.view').hide();
    }
    
    const bookView = {};
    
    bookView.initIndexPage = () => {
        resetView();
        $('#books').show();
        $('.books').empty();
        bookView.loadBooks();
    };
    
    bookView.loadBooks = () => {
        Book.all.forEach(book => {
            bookView.renderBook(book);
        });
    };

    bookView.renderBook = book => {
        $('.books').append(book.toHtml());
    };

    // What does your module export
    module.bookView = bookView;

})(window.module);