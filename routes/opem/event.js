var express = require('express');
var router = express.Router();

var event_controller = require('../../opem/controllers/event.controller');

// Get all events
router.get('/all', event_controller.getAll);

// Event create, read, update, destroy
router.get('/:id', event_controller.getEvent);

router.post('/', event_controller.createEvent);

router.put('/', event_controller.updateEvent);

router.delete('/:id', event_controller.deleteEvent);

// Routes for specific actions

// Get all events hosted by user 
router.get('/hosted/:id', event_controller.hostedEvents);

// Add geocode to specific event
router.post('/geocode/:id', event_controller.addGeocode);

// Search for events with a specific name
router.post('/search/name', event_controller.eventSearchName);

module.exports = router;

// Need routes to add and remove users from event/waitlist