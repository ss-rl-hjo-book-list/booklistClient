'use strict';

(function(module) {
    // What do you need (import or require) from prior modules?
    const Book = module.Book;
    const booksTemplate = Handlebars.compile($('#books-template').html());
    const detailTemplate = Handlebars.compile($('#book-detail-template'));
    // Book.prototype.booksToHtml = function() {
    //     const booksTemplate = Handlebars.compile($('#books-template').html());
    //     return booksTemplate(this);
    // };

    // Book.prototype.detailToHtml = function() {
    //     const detailTemplate = Handlebars.compile($('#book-detail-template').html());
    //     return detailTemplate(this);
    // };

    // Book.prototype.toHtml = function() {
    //     return template(this);
    // };

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

    bookView.initDetail = () => {
        resetView();
        $('#book-detail').show();
    };
    
    bookView.loadBooks = () => {
        Book.all.forEach(book => {
            const html = booksTemplate(book);
            bookView.renderBook(html);
        });
    };

    bookView.renderBook = book => {
        $('.books').append(book.toHtml());
    };

    // What does your module export
    module.bookView = bookView;

})(window.module);