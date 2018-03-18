'use strict';

(function(module) {
    const Book = module.Book;
    const User = module.User;

    const errorView = module.errorView;
    const handleError = err => errorView.init(err);

    const booksTemplate = Handlebars.compile($('#books-template').html());
    const detailTemplate = Handlebars.compile($('#book-detail-template').html());
    
    const bookView = {};
    
    bookView.initIndexPage = () => {
        $('#books').show();
        $('.books').empty();
        bookView.loadBooks();
    };
    
    bookView.initDetail = () => {
        $('.book-detail').empty();
        $('#book-detail').show();
        bookView.loadBookDetail();

        if(User.current && User.current.isAdmin) {
            $('#book-delete').on('click', () => {
                Book.delete(Book.detail.id)
                    .then (() => {
                        page('/');
                    })
                    .catch(handleError);
            });
            $('#book-update').on('click', () => {
                page(`/books/${Book.detail.id}/update`);
            });
        }
        else {
            $('#book-actions').hide();
        }
    };
    
    bookView.initUpdate = () => {
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
    // <section id="search-view" class="view">
    //         <h2>Search for a book!</h2>
    //         <form id="book-search">
    //             <input required name="search">
    //             <button>Search</button>
    //         </form>
    //         <ul id="book-api"></ul>
    //     </section>

    bookView.initSearch = () => {
        $('#search-view').show();
        console.log('initsearch is being called');
        $('#book-api')
            .empty()
            .off('click')
            .append(Book.found.map(booksTemplate))
            .on('click', 'button', handleAdd);
        $('#book-search input[name=search]').val(Book.search);

        $('#book-search')
            .off('submit')
            .on('submit', handleSubmit);
    };

    const handleAdd = function() {
        console.log('works??!?!?!');
        const id = $(this).data('id');
        Book.addBook(id)
            .then(book => page(`books/${book.id}`));
    };

    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const search  = form.elements.search.value;
        page(`/books/find?q=${encodeURIComponent(search)}`);
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