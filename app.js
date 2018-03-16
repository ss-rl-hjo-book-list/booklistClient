'use strict';

(function(module) {

    $('.icon-menu').on('click', () => {
        $('.icon-menu').toggleClass('   open');
        $('.nav-menu').slideToggle(350);
    });

    const resetView = () => {
        $('.view').hide();
        $('.icon-menu').removeClass('open');
        $('.nav-menu').slideUp(350);
    };

    const Book = module.Book;
    const bookView = module.bookView;
    const loginView = module.loginView;

    page('*', (ctx, next) => {
        resetView();
        next();
    });
    page('/', () => Book.fetchAll().then(bookView.initIndexPage));
    page('/login', loginView.init);
    page('/books/new', bookView.initNew);
    page('/books/:id/update', ctx => Book.fetchOne(ctx.params.id).then(bookView.initUpdate));
    page('/books/:id', ctx => Book.fetchOne(ctx.params.id).then(bookView.initDetail));
    page('/search-books', ctx => {
        const search = Qs.parse(ctx.querystring).search;
        Book.find(search).then(bookView.initSearch);
    });

    page('*', () => page.redirect('/'));

    page({ hashbang: true });

})(window.module);

