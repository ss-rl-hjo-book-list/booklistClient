'use strict';

(function(module) {

    // const User = module.User;

    const loginView = {};

    loginView.init = () => {
        console.log('loginViewFiring');
        $('#admin-view').show();
    };

    module.loginView = loginView;

})(window.module);