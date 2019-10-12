var express = require('express');
var router = express.Router();

var resource_controller = require('../../skillsquire/controllers/resource.controller');

router.get('/:id', resource_controller.getOne);

router.post('/queue', resource_controller.queue);

router.post('/review', resource_controller.writeReview);

router.get('/reviews/:id', resource_controller.getReviews);

module.exports = router;