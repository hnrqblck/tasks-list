const inputTask = document.querySelector('.input-task');
const btnTasks = document.querySelector('.btn-tasks');
const tasks = document.querySelector('.tasks');

btnTasks.addEventListener('click', function(e) {
    if (!inputTask) return;
    createTask(inputTask.value);
});

inputTask.addEventListener('keypress', function(e) {
    if (e.key === 'Enter')
    {
        if (!inputTask) return;
        createTask(inputTask.value);
    }   
})

function createsDelBtn(tRow) {
    const delBtn = document.createElement('button');
    const td = document.createElement('td');
    delBtn.innerHTML = `<img src="./assets/img/delete.png" alt="red bin" class="img-bin">`;
    delBtn.classList.add('del-btn');
    tRow.appendChild(td);
    td.appendChild(delBtn);
}

function clearsInput() {
    inputTask.value = '';
    inputTask.focus();
}

function createsTableRow() {
    const tr = document.createElement('tr');
    return tr;
}

function createTask(inputText) {
    const tRow = createsTableRow();
    tRow.innerHTML += `<td>${inputText}</td>`;
    tasks.appendChild(tRow);
    clearsInput();
    createsDelBtn(tRow);
    saveTasks();
}

function saveTasks() {
    const liTasks = tasks.querySelectorAll('td');
    const liTasksList = [];

    for (let task of liTasks) {
        let taskText = task.innerText;
        taskText = taskText.trim();
        liTasksList.push(taskText);
    }

    const tasksJSON = JSON.stringify(liTasksList);
    localStorage.setItem('tasks', tasksJSON);
}

function addSavedTasks() {
    const tasks = localStorage.getItem('tasks');
    const liTasksList = JSON.parse(tasks);
    
    for (let task of liTasksList) {
        createTask(task);
    }
}
addSavedTasks();

document.addEventListener('click', function(e) {
    const el = e.target;
    if (el.classList.contains('img-bin')) {
        el.parentNode.parentNode.parentNode.remove();
        saveTasks();
    }
})