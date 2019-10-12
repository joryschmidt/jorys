var express = require('express');
var router = express.Router();
var path = require('path');

var user_controller = require('../../skillsquire/controllers/user.controller');
var resource_controller = require('../../skillsquire/controllers/resource.controller');

router.post('/', user_controller.register);

router.get('/resource', function(req, res) {
  res.sendFile(path.join(__dirname, '../../skillsquire/views/admin_views/resource.html'));
});

router.post('/resource', resource_controller.create);

router.delete('/resource/:id', resource_controller.deleteResource);

router.get('/resource/queue', resource_controller.getQueue);

router.delete('/resource/queue/:id', resource_controller.removeQueueItem);

router.put('/resource/add_category/:id', resource_controller.addCategory);

router.put('/resource/remove_category/:id', resource_controller.removeCategory);

router.get('/resource/:id', resource_controller.getOne);

router.put('/resource/edit/:id', resource_controller.editResource);

module.exports = router;