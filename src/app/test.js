(function () {
    'use strict';

    // Creating the module and factory we referenced in the beforeEach blocks in our test file
    angular.module('api.services', [])
        .factory('Users', function () {
            var Users = {};

            // Defining all to make our test pass. It doesn't need to do anything yet.
            Users.all = function () {

            };

            return Users;
        });
})();