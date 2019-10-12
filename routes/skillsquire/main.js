var express = require('express');
var router = express.Router();

var user_controller = require('../../skillsquire/controllers/user.controller');
var resource_controller = require('../../skillsquire/controllers/resource.controller');
var categories_controller = require('../../skillsquire/controllers/categories.controller');

router.get('/the_user', user_controller.getUser);

router.post('/login', user_controller.login);

router.get('/logout', user_controller.logout);

router.post('/register', user_controller.register);

router.get('/resources', resource_controller.getAll);

router.get('/categories', categories_controller.getAll);

router.put('/categories/add', categories_controller.addCategory);

router.put('/categories/remove', categories_controller.removeCategory);

module.exports = router;