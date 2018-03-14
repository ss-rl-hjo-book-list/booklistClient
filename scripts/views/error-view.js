'use strict';

(function (module) {
    const errorView = {};

    const errorTemplate = Handlebars.compile($('#error-template').text());

    errorView.init = function(err) {
        const html = errorTemplate(err);

        $('#error-view')
            .empty()
            .append(html)
            .show();
    };

    module.errorView = errorView;

})(window.module);