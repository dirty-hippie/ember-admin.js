module('unit tests: Navigation DSL', {
  setup: function(){
    window.Admin.DSL.Navigation.map(function() {
      this.navigate("Dashboard", {
        route: "",
        divider: true
      });
      this.navigate("System", function() {
        this.navigate("Users");
        this.navigate("Addresses", function() {
          this.navigate("Work");
          this.navigate("Home");
        });
        this.navigate("Cars", {
          divider: true
        });
      });
    });
  },
  teardown: function() {
  }
});

test('Nested navigation', function(){
  expect(3);
  equal(window.Admin.DSL.Navigation.content.length, 2);
  equal(Admin.DSL.Navigation.content[1].children.length, 3);
  equal(Admin.DSL.Navigation.content[1].children[1].children.length, 2);
});

test('Params exist', function(){
  expect(3);
  item = Admin.DSL.Navigation.content[0];
  equal(item.title, 'Dashboard');
  equal(item.route, '');
  equal(item.divider, true);
});

test('Check namespace', function(){
  expect(1);
  Admin.DSL.Navigation.namespace = "admin";
  equal(Admin.DSL.Navigation.namespace, 'admin');
});

test('hasParent', function(){
  expect(1);
  item = Admin.DSL.Navigation.content[1];
  child = Admin.DSL.Navigation.content[1].children[0];
  equal(child.parentId, item.id)
});

test('findParent', function(){
  expect(1);
  child = Admin.DSL.Navigation.content[1].children[0];
  equal(Admin.DSL.Navigation.findParent(child), Admin.DSL.Navigation.content[1]);
});