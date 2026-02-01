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
      new Item("JavaScript")
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
      if (event.key === "Enter") {
        self.addItem();
        event.preventDefault();
      }
      return true;
    };

    self.removeItem = function (item) {
      self.items.remove(item);
    };
  }

  function init() {
    var appEl = document.getElementById("app");
    if (appEl && typeof ko !== "undefined") {
      ko.applyBindings(new AppViewModel(), appEl);
    }
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
