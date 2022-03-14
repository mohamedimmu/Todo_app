const todoInput = document.querySelector(".todo__input");
const todoButton = document.querySelector(".todo__button");
const todoList = document.querySelector(".todo__list");
const filterOption = document.querySelector(".filter");

document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);


function addTodo(e){
    e.preventDefault();
    
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");

    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo__item');
    todoDiv.appendChild(newTodo);


    // Add to local storage
    SaveTolocalStorage(todoInput.value);

    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<ion-icon class="check" name="checkmark-done-circle"></ion-icon>';
    completedButton.classList.add("complete__btn");
    todoDiv.appendChild(completedButton);

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<ion-icon class="delete" name="close-circle"></ion-icon>';
    deleteButton.classList.add("delete__btn");
    todoDiv.appendChild(deleteButton);

    todoList.appendChild(todoDiv);

    // clear Input value
    todoInput.value = "";
}

function deleteCheck(e){
    const item = e.target;

    //Delete
    if(item.classList[0] === "delete__btn"){
        const todo = item.parentElement;
        todo.classList.add("drop");
        removeLocalTodos(todo)
        todo.addEventListener('transitionend', function(){
            todo.remove();
        })

    }

    //check
    if(item.classList[0] === "complete__btn"){
        const todo = item.parentElement;
        todo.classList.toggle('completed')
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    console.log(todos);
    todos.forEach(function(todo){
        console.log(todo)
        switch(e.target.value){
            case "all":
                todo.style.display ="flex"
                break;
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display ="flex"
                }else{
                    todo.style.display = "none"
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display ="flex"
                }else{
                    todo.style.display = "none"
                }
                break;
        }
    })

}

function SaveTolocalStorage(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
        console.log(todos)
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
        console.log(todos)
    }

    todos.forEach(function(todo){
        const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");

    const newTodo = document.createElement('li');
    newTodo.innerText = todo
    newTodo.classList.add('todo__item');
    todoDiv.appendChild(newTodo);


    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<ion-icon class="check" name="checkmark-done-circle"></ion-icon>';
    completedButton.classList.add("complete__btn");
    todoDiv.appendChild(completedButton);

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<ion-icon class="delete" name="close-circle"></ion-icon>';
    deleteButton.classList.add("delete__btn");
    todoDiv.appendChild(deleteButton);

    todoList.appendChild(todoDiv);

    })
}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
        console.log(todos)
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}