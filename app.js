'use strict';

(function(module) {

    const Book = module.Book;
    const bookView = module.bookView;
    debugger;
    page('/home', () => Book.fetchAll(bookView.initIndexPage));
    page({ hashbang: true });


})(window.module);

