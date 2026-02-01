(function () {
  "use strict";

  function Item(name) {
    this.name = name;
  }

  function AppViewModel() {
    var self = this;
    self.name = ko.observable("");
    self.greeting = ko.computed(function () {
      return self.name() || "World";
    });

    self.items = ko.observableArray([
      new Item("Play Framework"),
      new Item("Knockout.js")
    ]);
    self.newItem = ko.observable("");

    self.addItem = function () {
      var value = self.newItem().trim();
      if (value) {
        self.items.push(new Item(value));
        self.newItem("");
      }
    };

    self.addItemOnEnter = function (data, event) {
      if (event.keyCode === 13) {
        self.addItem();
      }
      return true;
    };

    self.removeItem = function (item) {
      self.items.remove(item);
    };
  }

  ko.applyBindings(new AppViewModel(), document.getElementById("app"));
})();
