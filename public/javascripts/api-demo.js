(function () {
  "use strict";

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
    var apiEl = document.getElementById("api-demo");
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
