describe("user controller", function() {
  
  var controller = require("../../controllers/user.controller.js");
  
  it("should have register, login, and logout methods", function() {
    expect(controller.register).toBeFunction();
    expect(controller.login).toBeFunction();
    expect(controller.logout).toBeFunction();
  });
  
  it("should have get and delete methods", function() {
    expect(controller.getUser).toBeFunction();
    expect(controller.getProfile).toBeFunction();
    expect(controller.deleteUser).toBeFunction();
  });
  
  it("should have resource methods", function() {
    expect(controller.addResource).toBeFunction();
    expect(controller.removeResource).toBeFunction();
    expect(controller.removeCustomResource).toBeFunction();
  });
  
  it("should have rating methods", function() {
    expect(controller.rate).toBeFunction();
  });
});