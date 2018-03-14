'use strict';

(function(module) {

    const Book = module.Book;
    const bookView = module.bookView;
    page('/home', () => Book.fetchAll(bookView.initIndexPage));
    page('/books/:id', ctx => Book.fetchOne(ctx.params.id, bookView.initDetail));
    page('/books/new', () => bookView.initNew());

    // page('*', () => page.redirect('/home'));

    page({ hashbang: true });

})(window.module);

