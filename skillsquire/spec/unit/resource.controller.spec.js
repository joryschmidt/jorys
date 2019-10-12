describe("resource controller", function() {
  
  var controller = require('../../controllers/resource.controller.js');
  it("should have a create method", function() {
    expect(controller.create).toBeFunction();
  });
  
  it("should have queue methods", function() {
    expect(controller.queue).toBeFunction();
    expect(controller.getQueue).toBeFunction();
    expect(controller.removeQueueItem).toBeFunction();
  });
  
  it("should have resource methods", function() {
    expect(controller.getAll).toBeFunction();
    expect(controller.getOne).toBeFunction();
    expect(controller.deleteResource).toBeFunction();
    expect(controller.editResource).toBeFunction();
  });
  
  it("should have category methods", function() {
    expect(controller.addCategory).toBeFunction();
    expect(controller.removeCategory).toBeFunction();
  });
});