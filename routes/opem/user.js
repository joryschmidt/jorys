var express = require('express');
var router = express.Router();

var user_controller = require('../../opem/controllers/user.controller');

// User read, update, delete
router.get('/', user_controller.getUser);

router.get('/current/', user_controller.getCurrentUser);

router.post('/event/:id', user_controller.eventSignup);

router.put('/', user_controller.updateUser);

router.delete('/:id', user_controller.deleteUser);

module.exports = router;

// Need routes to add and remove events from users