'use strict';

(function(module) {
    // What do you need (import or require) from prior modules?
    const Book = module.Book;
    const booksTemplate = Handlebars.compile($('#books-template').html());
    const detailTemplate = Handlebars.compile($('#book-detail-template').html());
   
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
        bookView.loadBookDetail();
    };

    bookView.initNew = () => {
        resetView();
        $('#add-book').show();

        $('#add-book-form')
            .off('submit')
            .on('submit', event => {
                event.preventDefault();

                const data = {
                    title: $('input[name=title]').val(),
                    author: $('input[name=author]').val(),
                    isbn: $('input[name=isbn]').val(),
                    image_url: $('input[name=image_url]').val(),
                    description: $('input[name=description]').val(),
                };

                Book.create(data, (book) => {
                    $('#add-book-form')[0].reset();
                    page(`/books/${book.id}`);
                });
            });
    };
    
    bookView.loadBooks = () => {
        Book.all.forEach(book => {
            const html = booksTemplate(book);
            $('.books').append(html);
        });
    };

    bookView.loadBookDetail = () => {
        const html = detailTemplate(Book.detail);
        $('#book-detail').append(html);
    };

    // bookView.renderBook = book => {
    //     $('.books').append(book.toHtml());
    // };

    // What does your module export
    module.bookView = bookView;

})(window.module);