// selector
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo')

// addEventListener
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo)

// function
function addTodo(e) {
    // preventDefault form from submitting
    e.preventDefault();
    // Todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    // create li 
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    saveLocalTodo(todoInput.value);
    todoDiv.appendChild(newTodo);

    //CHECK MARK BUTTON
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<li class="fas fa-check"></li>';
    completeButton.classList.add('complete-btn');
    todoDiv.appendChild(completeButton);

    //TRASH BUTTON
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<li class="fas fa-trash"></li>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
    // APPEND TO LIST
    todoList.appendChild(todoDiv);
    // CLEAR INPUT VALUE 
    todoInput.value = '';
}
// delete check function
function deleteCheck(e) {
    const item = e.target;
    // DELETE BUTTON
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        todo.classList.add('fall');
        removeLocalTodos(todo)
        todo.addEventListener('transitionend', function () {
            todo.remove();
        })

    }
    // CHECK MARK BUTTON
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed')
    }
}

// filter todo function

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    })
}

// save local storage 

function saveLocalTodo(todo) {
    // check if something is there on local storage
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}
// display todos

function getTodos() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo) {
         // Todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    // create li 
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //CHECK MARK BUTTON
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<li class="fas fa-check"></li>';
    completeButton.classList.add('complete-btn');
    todoDiv.appendChild(completeButton);

    //TRASH BUTTON
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<li class="fas fa-trash"></li>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
    // APPEND TO LIST
    todoList.appendChild(todoDiv);
    })
}

// Delete form local storage

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos))
}