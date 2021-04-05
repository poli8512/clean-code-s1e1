//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

var taskInput=document.getElementById("new-task");//Add a new task.
var addButton=document.getElementsByTagName("button")[0];//first button
var incompleteTaskHolder=document.getElementById("incomplete-tasks");//ul of #incomplete-tasks
var completedTasksHolder=document.getElementById("completed-tasks");//completed-tasks
//console.log(taskInput,addButton,incompleteTaskHolder,completedTasksHolder)

//New task list item
var createNewTaskElement=function(taskString){

    var listItem=document.createElement("li");
    listItem.classList.add("task-list__item")
    //input (checkbox)
    var checkBox=document.createElement("input");//checkbx
    checkBox.classList.add("task__input")
    checkBox.classList.add("task-list__item-checkbox")
    checkBox.type="checkbox";
    //label
    var label=document.createElement("label");//label
    label.innerText=taskString;
    label.classList.add("task")
    label.classList.add("task-list__item-label")
    //input (text)
    var editInput=document.createElement("input");//text

    editInput.classList.add("task")
    editInput.classList.add("task__input")
    editInput.classList.add("input-text")
    editInput.classList.add("task-list__item-text")
    //button.edit
    var editButton=document.createElement("button");//edit button
    editButton.classList.add("edit")
    editButton.classList.add("task__button")
    editButton.classList.add("task-list__item-button")

    //button.delete
    var deleteButton=document.createElement("button");//delete button
    //var deleteButtonImg=document.createElement("svg");//delete button image
    deleteButton.classList.add("delete")
    deleteButton.classList.add("task__button")
    deleteButton.classList.add("task-list__item-button")
    deleteButton.classList.add("button-delete")

    //Each elements, needs appending

    editInput.type="text";

    editButton.innerText="Edit"; //innerText encodes special characters, HTML does not.

    deleteButton.innerHTML=` <svg  class="button-delete__img" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 489.425 489.425" style="enable-background:new 0 0 489.425 489.425;" xml:space="preserve"><g><g>
<path d="M122.825,394.663c17.8,19.4,43.2,30.6,69.5,30.6h216.9c44.2,0,80.2-36,80.2-80.2v-200.7c0-44.2-36-80.2-80.2-80.2h-216.9c-26.4,0-51.7,11.1-69.5,30.6l-111.8,121.7c-14.7,16.1-14.7,40.3,0,56.4L122.825,394.663z M29.125,233.063l111.8-121.8c13.2-14.4,32-22.6,51.5-22.6h216.9c30.7,0,55.7,25,55.7,55.7v200.6c0,30.7-25,55.7-55.7,55.7h-217c-19.5,0-38.3-8.2-51.5-22.6l-111.7-121.8C23.025,249.663,23.025,239.663,29.125,233.063z"/>
<path d="M225.425,309.763c2.4,2.4,5.5,3.6,8.7,3.6s6.3-1.2,8.7-3.6l47.8-47.8l47.8,47.8c2.4,2.4,5.5,3.6,8.7,3.6s6.3-1.2,8.7-3.6 c4.8-4.8,4.8-12.5,0-17.3l-47.9-47.8l47.8-47.8c4.8-4.8,4.8-12.5,0-17.3s-12.5-4.8-17.3,0l-47.8,47.8l-47.8-47.8 c-4.8-4.8-12.5-4.8-17.3,0s-4.8,12.5,0,17.3l47.8,47.8l-47.8,47.8C220.725,297.263,220.725,304.962,225.425,309.763z"/>
</g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>
</svg>`;

    //deleteButtonImg.classList.add("button-delete__img")
    //deleteButton.appendChild(deleteButtonImg);


    //and appending.
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}



var addTask=function(){
    console.log("Add Task...");
    //Create a new list item with the text from the #new-task:
    if (!taskInput.value) return;
    var listItem=createNewTaskElement(taskInput.value);

    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value="";

}

//Edit an existing task.

var editTask=function(){
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");


    var listItem=this.parentNode;
    var editInput=listItem.querySelector("input[type=text]");
    var label=listItem.querySelector("label");
    var editBtn=listItem.querySelector(".edit");
    var containsClass=listItem.classList.contains("edit-mode");
    //If class of the parent is .editmode
    console.log(listItem)
    if(containsClass){
        //switch to .editmode
        //label becomes the inputs value.
        label.innerText=editInput.value;
        editBtn.innerText="Edit";
        label.style.display="block"
    }else{
        editInput.value=label.innerText;
        editBtn.innerText="Save";
        label.style.display="none"
    }

    //toggle .editmode on the parent.
    listItem.classList.toggle("edit-mode");
};


//Delete task.
var deleteTask=function(){
    console.log("Delete Task...");

    var listItem=this.parentNode;
    var ul=listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

}


//Mark task completed
var taskCompleted=function(){
    console.log("Complete Task...");
    //Append the task list item to the #completed-tasks
    var listItem=this.parentNode;
    listItem.classList.add("completed-tasks__label")
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete=function(){
    console.log("Incomplete Task...");
//Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #incomplete-tasks.
    var listItem=this.parentNode;
if(listItem.classList.contains("completed-tasks__label")){
    listItem.classList.remove("completed-tasks__label")
}
    //listItem.classList.remove("completed-tasks__label")
     listItem.childNodes.forEach(child=>{
        if(child.classList && child.classList.contains("completed-tasks__label")){

            child.classList.remove("completed-tasks__label")
        }
     })
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}



var ajaxRequest=function(){
    console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
    console.log("bind list item events");
//select ListItems children
    var checkBox=taskListItem.querySelector("input[type=checkbox]");
    var editButton=taskListItem.querySelector(".edit");
    var deleteButton=taskListItem.querySelector(".delete");


    //Bind editTask to edit button.
    editButton.onclick=editTask;
    //Bind deleteTask to delete button.
    deleteButton.onclick=deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i=0; i<incompleteTaskHolder.children.length;i++){

    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (var i=0; i<completedTasksHolder.children.length;i++){
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}




// Issues with usability don"t get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.