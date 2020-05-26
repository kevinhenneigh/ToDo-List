
class ToDoItem{
    title:string;
    due: Date;
    done: boolean;


}

window.onload = function(){
    let addItem = document.getElementById("addItem");
    addItem.onclick = main;
}

function main(){
    if(isAllValid()){
        let item = getToDoItem();
        displayToDoItem(item);

    }
}

/**
 *  Check to make sure form  is valid
 */
function isAllValid():boolean{
    let isValid = true;
    // Check for a Title
    let title = getInputById("title").value;
    let errTitle = document.getElementById("errTitle")
    errTitle.innerText = "";
    if(title == ""){
        isValid = false;
        errTitle.innerText = 
            "What are you doing? Please add a Title";    
    }
    // Check for a due date
    let due = getInputById("flatpickr").value;
    let errDate = document.getElementById("errDate")
    errDate.innerText = "";
    if(due == ""){
        isValid = false;
        errDate.innerText = 
            "When are you gonna get 'er done? Please give a due date";
    }
    return isValid;
}

/**
 * Get input off form and wrap in a ToDoItem object
 */
function getToDoItem():ToDoItem{
    let item = new ToDoItem();

    // Get title off form
    let titleInput = getInputById("title");
    item.title = titleInput.value;

    // Get date from form
    let dueDate = getInputById("flatpickr");
    item.due = new Date(dueDate.value);

    // Get Done
    let done = getInputById("done");
    item.done = done.checked;

    return item;
}

/**
 * Display given ToDoItem on web page
 * @param item 
 */
function displayToDoItem(item:ToDoItem):void{

    // Displays title of todo item input
    let itemText = document.createElement("h2");
    itemText.innerText = item.title;

    // Displays selected due date from form
    let itemDate = document.createElement("p");
    itemDate.innerText = item.due.toDateString();

    // Decides whether item is placed in complete or incomplete <div>
    let itemDiv = document.createElement("div");
    itemDiv.onclick = markAsComplete;
    itemDiv.classList.add("todo");
    if(item.done){
        itemDiv.classList.add("complete");
    }

    itemDiv.appendChild(itemText);
    itemDiv.appendChild(itemDate);

    if(item.done){
        let completed = document.getElementById("complete");
        completed.appendChild(itemDiv);
    }
    else{
        let incomplete = document.getElementById("incomplete");
        incomplete.appendChild(itemDiv);
    }
}

/**
 * Just a helper function to save a little typing
 * @param id the id you are getting from form 
 */
function getInputById(id:string):HTMLInputElement{
    return <HTMLInputElement>document.getElementById(id);
}

function markAsComplete(){
    let itemDiv = <HTMLElement>this;
    itemDiv.classList.add("complete");

    let completeItems = document.getElementById("complete");
    completeItems.appendChild(itemDiv);
}


// Allow user to mark item as completed

// Store ToDoItems in web storage