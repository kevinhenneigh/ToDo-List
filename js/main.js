var ToDoItem = (function () {
    function ToDoItem() {
    }
    return ToDoItem;
}());
window.onload = function () {
    var addItem = document.getElementById("addItem");
    addItem.onclick = main;
    loadSavedItems();
};
function loadSavedItems() {
    var itemArray = getToDoItems();
    for (var i = 0; i < itemArray.length; i++) {
        displayToDoItem(itemArray[i]);
    }
}
function main() {
    if (isAllValid()) {
        var item = getToDoItem();
        displayToDoItem(item);
        saveToDo(item);
    }
}
function isAllValid() {
    var isValid = true;
    var title = getInputById("title").value;
    var errTitle = document.getElementById("errTitle");
    errTitle.innerText = "";
    if (title == "") {
        isValid = false;
        errTitle.innerText =
            "What are you doing? Please add a Title";
    }
    var due = getInputById("flatpickr").value;
    var errDate = document.getElementById("errDate");
    errDate.innerText = "";
    if (due == "") {
        isValid = false;
        errDate.innerText =
            "When are you gonna get 'er done? Please give a due date";
    }
    return isValid;
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
    var dueDate = new Date(item.due.toString());
    itemDate.innerText = dueDate.toDateString();
    var itemDiv = document.createElement("div");
    itemDiv.onclick = markAsComplete;
    itemDiv.classList.add("todo");
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
function markAsComplete() {
    var itemDiv = this;
    itemDiv.classList.add("complete");
    var completeItems = document.getElementById("complete");
    completeItems.appendChild(itemDiv);
}
function saveToDo(item) {
    var currItems = getToDoItems();
    if (currItems == null) {
        currItems = new Array();
    }
    currItems.push(item);
    var currItemsString = JSON.stringify(currItems);
    localStorage.setItem(todokey, currItemsString);
}
var todokey = "todo";
function getToDoItems() {
    var itemString = localStorage.getItem(todokey);
    var item = JSON.parse(itemString);
    return item;
}
