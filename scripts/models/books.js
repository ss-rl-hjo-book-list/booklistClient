'use strict';

(function (module) {
    
    function Book(data) {
        Object.keys(data).forEach(key => this[key] = data[key]);
    }

    Book.prototype.insert = function(callback) {
        $.post(`${API_URL}/books`, {
            title: this.title,
            author: this.author,
            isbn: this.isbn,
            image_url: this.image_url,
            description: this.description
        })
            .then(data => {
                Object.keys(data).forEach(key => this[key] = data[key]);
                if(callback) callback();
            });
    };
    
    Book.all = [];
    
    Book.fetchAll = () => {
        return $.getJSON(`${API_URL}/books`)
            .then(data => {
                Book.all = data.map(each => new Book(each));
            });
    };

    Book.detail = null;

    Book.fetchOne = (id) => {
        return $.getJSON(`${API_URL}/books/${id}`)
            .then(data => {
                Book.detail = new Book(data);
            });
    };

    Book.create = data => {
        return $.post(`${API_URL}/books`, data);
    };

    Book.found = null;
    Book.total = 0;
    Book.search = '';

    Book.find = search => {
        Book.search = search;
        // TODO need to import books from google books api to our API, and need to call this put...
        return $.getJSON(`${API_URL}/books/find?q=${encodeURIComponent(search)}`)
        // return $.getJSON(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(search)}`)
            .then(result => {
                console.log(result);
                Book.found = result.books;
                console.log(Book.found);
            });
    };
    
    Book.update = data => {
        return $.ajax({
            url: `${API_URL}/books/${data.id}`,
            method: 'PUT',
            data: data
        });
    };

    Book.delete = id => {
        return $.ajax({
            url: `${API_URL}/books/${id}`,
            method: 'DELETE'
        });
    };

    module.Book = Book;

})(window.module);