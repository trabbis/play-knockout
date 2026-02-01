(function () {
  "use strict";

  var nameInput = document.getElementById("name-input");
  var greetingEl = document.getElementById("greeting");
  var newItemInput = document.getElementById("new-item");
  var addBtn = document.getElementById("add-btn");
  var itemList = document.getElementById("item-list");

  function updateGreeting() {
    var name = nameInput.value.trim();
    greetingEl.textContent = name || "World";
  }

  function addItem() {
    var text = newItemInput.value.trim();
    if (!text) return;
    var li = document.createElement("li");
    li.innerHTML = "<span>" + escapeHtml(text) + "</span><button class=\"remove\">×</button>";
    li.querySelector(".remove").addEventListener("click", function () {
      li.remove();
    });
    itemList.appendChild(li);
    newItemInput.value = "";
  }

  function escapeHtml(s) {
    var div = document.createElement("div");
    div.textContent = s;
    return div.innerHTML;
  }

  if (nameInput) {
    nameInput.addEventListener("input", updateGreeting);
  }

  if (addBtn && newItemInput) {
    addBtn.addEventListener("click", addItem);
    newItemInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        addItem();
      }
    });
  }

  itemList.querySelectorAll(".remove").forEach(function (btn) {
    btn.addEventListener("click", function () {
      btn.closest("li").remove();
    });
  });
})();
