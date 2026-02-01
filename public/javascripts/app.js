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

  function ApiViewModel() {
    var self = this;
    self.loading = ko.observable(false);
    self.error = ko.observable("");
    self.resultTitle = ko.observable("");
    self.resultBody = ko.observable("");
    self.resultAuthor = ko.observable("");
    self.resultText = ko.computed(function () {
      var title = self.resultTitle();
      var body = self.resultBody();
      return title ? (body ? title + "\n\n" + body : title) : (body || "");
    });
    self.authorDisplay = ko.computed(function () {
      var author = self.resultAuthor();
      return author ? "— " + author : "";
    });
    self.fetchPost = function () {
      self.loading(true);
      self.error("");
      fetch("/api-demo/quote")
        .then(function (res) { return res.json(); })
        .then(function (data) {
          self.loading(false);
          if (data.error) {
            self.error(data.error);
          } else {
            self.resultTitle(data.title || "");
            self.resultBody(data.body || data.content || "");
            self.resultAuthor(data.author || "");
          }
        })
        .catch(function () {
          self.loading(false);
          self.error("Failed to fetch. Check your connection.");
        });
    };
  }

  function init() {
    if (typeof ko === "undefined") return;
    var appEl = document.getElementById("app");
    var apiEl = document.getElementById("api-demo");
    if (appEl) {
      ko.applyBindings(new AppViewModel(), appEl);
    }
    if (apiEl) {
      ko.applyBindings(new ApiViewModel(), apiEl);
    }
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
