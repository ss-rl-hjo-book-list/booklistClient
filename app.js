'use strict';

(function(module) {

    $('.icon-menu').on('click', () => {
        $('.icon-menu').toggleClass('open');
        $('.nav-menu').slideToggle(350);
    });

    const menu = () => {
        $('.view').hide();
        $('.icon-menu').removeClass('open');
        $('.nav-menu').slideUp(350);
    };

    const Book = module.Book;
    const bookView = module.bookView;
    page('*', (ctx, next) => {
        menu();
        next();
    });
    page('/home', () => Book.fetchAll(bookView.initIndexPage));
    page('/books/new', () => bookView.initNew());
    page('/books/:id', ctx => Book.fetchOne(ctx.params.id, bookView.initDetail));

    // page('*', () => page.redirect('/home'));

    page({ hashbang: true });

})(window.module);

