'use strict';

(function(module) {
    const Book = module.Book;

    const errorView = module.errorView;
    const handleError = err => errorView.init(err);

    const booksTemplate = Handlebars.compile($('#books-template').html());
    const detailTemplate = Handlebars.compile($('#book-detail-template').html());

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
        $('.book-detail').empty();
        $('#book-detail').show();
        bookView.loadBookDetail();
    };
    
    bookView.initUpdate = () => {
        resetView();
        $('#add-book').show();

        const book = Book.detail;
        const id = book.id;

        $('h2.update-title').text('Update Book');

        $('input[name=title]').val(book.title);
        $('input[name=author]').val(book.author);
        $('input[name=isbn]').val(book.isbn);
        $('input[name=image_url]').val(book.image_url);
        $('input[name=description]').val(book.description);

        $('#add-book-form')
            .off('submit')
            .on('submit', event => {
                event.preventDefault();
                const data = {
                    id: id,
                    title: $('input[name=title]').val(),
                    author: $('input[name=author]').val(),
                    isbn: $('input[name=isbn]').val(),
                    image_url: $('input[name=image_url]').val(),
                    description: $('input[name=description]').val()
                };
                
                Book.update(data)
                    .then(book => {
                        $('#add-book-form')[0].reset();
                        page(`/books/${book.id}`);
                    })
                    .catch(handleError);
            });

    };

    bookView.initNew = () => {
        resetView();
        $('h2.update-title').text('Add Book');
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
                    description: $('input[name=description]').val()
                };

                Book.create(data)
                    .then(book => {
                        $('#add-book-form')[0].reset();
                        page(`/books/${book.id}`);
                    })
                    .catch(handleError);
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
        $('.book-detail').append(html);
        $('#book-delete').on('click', () => {
            Book.delete(Book.detail.id)
                .then(() => {
                    page('/home');
                })
                .catch(handleError);
        });
        $('#book-update').on('click', () => {
            page(`/books/${Book.detail.id}/update`);
        });
    };
    module.bookView = bookView;

})(window.module);