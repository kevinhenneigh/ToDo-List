var ToDoItem = (function () {
    function ToDoItem() {
    }
    return ToDoItem;
}());
window.onload = function () {
    var addItem = document.getElementById("addItem");
    addItem.onclick = main;
};
function main() {
    if (isAllValid()) {
        var item = getToDoItem();
        displayToDoItem(item);
    }
}
function isAllValid() {
    var isValid = true;
    var title = getInputById("title").value;
    var errTitle = document.getElementById("errTitle");
    if (title == "") {
        isValid = false;
        errTitle.innerText =
            "What are you doing? Please add a Title";
    }
    var due = getInputById("flatpickr").value;
    var errDate = document.getElementById("errDate");
    if (due == "") {
        isValid = false;
        errDate.innerText =
            "When are you gonna get 'er done? Please give a due date";
    }
    return true;
}
function getToDoItem() {
    var item = new ToDoItem();
    var titleInput = getInputById("title");
    item.title = titleInput.value;
    var dueDate = getInputById("flatpickr");
    item.due = new Date(dueDate.value);
    var done = getInputById("done");
    item.done = done.checked;
    return item;
}
function displayToDoItem(item) {
    var itemText = document.createElement("h2");
    itemText.innerText = item.title;
    var itemDate = document.createElement("p");
    itemDate.innerText = item.due.toDateString();
    var itemDiv = document.createElement("div");
    if (item.done) {
        itemDiv.classList.add("complete");
    }
    itemDiv.appendChild(itemText);
    itemDiv.appendChild(itemDate);
    if (item.done) {
        var completed = document.getElementById("complete");
        completed.appendChild(itemDiv);
    }
    else {
        var incomplete = document.getElementById("incomplete");
        incomplete.appendChild(itemDiv);
    }
}
function getInputById(id) {
    return document.getElementById(id);
}
