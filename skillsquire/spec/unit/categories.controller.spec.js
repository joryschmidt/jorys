describe("categories controller", function() {
  
  var controller = require("../../controllers/categories.controller.js");
  
  it("should have get, add, and remove methods", function() {
    expect(controller.getAll).toBeFunction();
    expect(controller.addCategory).toBeFunction();
    expect(controller.removeCategory).toBeFunction();
  });
});