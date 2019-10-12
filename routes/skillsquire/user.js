var express = require('express');
var router = express.Router();

var user_controller = require('../../skillsquire/controllers/user.controller');

// These routes require the a user to be logged in

router.delete('/:id', user_controller.deleteUser);

router.get('/profile', user_controller.getProfile);

router.put('/add_resource', user_controller.addResource);

router.put('/remove_resource', user_controller.removeResource);

router.put('/remove_custom_resource', user_controller.removeCustomResource);

router.post('/rate', user_controller.rate);

module.exports = router;