'use strict';

(function (module) {
    
    function Book(data) {
        Object.keys(data).forEach(key => this[key] = data[key]);
    }

    // Define "instance" data methods
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
    
    Book.fetchAll = function(callback) {
        $.getJSON(`${API_URL}/books`)
            .then(data => {
                Book.all = data.map(each => new Book(each));
                if(callback) callback();
            })
            .catch(console.log);
    };

    Book.detail = null;

    // Book.fetchOne = function(id, callback) {
    //     $.getJSON(`${API_URL}/books/${id}`)
    //         .then(data => {
    //             Book.detail = new Book(data);
    //             if(callback) callback();
    //         })
    //         .catch(console.log);
    // };

    Book.fetchOne = (id) => {
        return $.getJSON(`${API_URL}/books/${id}`)
            .then(data => {
                Book.detail = new Book(data);
            });
    };

    Book.create = data => {
        return $.post(`${API_URL}/books`, data);
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