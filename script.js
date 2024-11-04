//This line create taskcounter that element called in html id that is task-counter
const taskCounter = document.getElementById('task-counter');
//This line create progress that element called in html id that is progressbar
const progressBar = document.getElementById('progress-bar');

//This line total task completedTasks confettiTriggered editInput all this function
let totalTasks = 0;
let completedTasks = 0;
let confettiTriggered = false;
let editInput = null;

//This taskcounter update the text and increase the ratio count
function updateTaskCounter() {
    taskCounter.textContent = `${completedTasks}/${totalTasks}`;
}
//This will update the progress bar if it is zero it will set to zero
function updateProgressBar() {
    const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
    progressBar.style.width = `${progress}%`;
    //Increase the progress value if it is zero it will set to zero
    if (totalTasks > 0 && completedTasks === totalTasks && !confettiTriggered) {
        triggerConfetti();
        confettiTriggered = true;
    } else if (completedTasks !== totalTasks) {
        confettiTriggered = false;
    }
}
//Check all the task are completed are not
function triggerConfetti(event) {
    const x = event ? event.clientX / window.innerWidth : 0.5;
    const y = event ? event.clientY / window.innerHeight : 0.5;
    //This a confetti animation for both directions
    confetti({
        particleCount: 150,
        angle: 60,
        spread: 70,
        origin: { x, y },
        colors: ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#F9FF33'],
        shapes: ['circle', 'square'],
        scalar: 1.2,
        drift: 0.5,
        gravity: 0.6
    });

    confetti({
        particleCount: 150,
        angle: 120,
        spread: 70,
        origin: { x, y },
        colors: ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#F9FF33'],
        shapes: ['circle', 'square'],
        scalar: 1.2,
        drift: 0.5,
        gravity: 0.6
    });
    confetti({
        particleCount: 150,
        angle: 180,
        spread: 70,
        origin: { x, y },
        colors: ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#F9FF33'],
        shapes: ['circle', 'square'],
        scalar: 1.2,
        drift: 0.5,
        gravity: 0.6
    });
    confetti({
        particleCount: 150,
        angle: 240,
        spread: 70,
        origin: { x, y },
        colors: ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#F9FF33'],
        shapes: ['circle', 'square'],
        scalar: 1.2,
        drift: 0.5,
        gravity: 0.6
    });
    confetti({
        particleCount: 150,
        angle: 300,
        spread: 70,
        origin: { x, y },
        colors: ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#F9FF33'],
        shapes: ['circle', 'square'],
        scalar: 1.2,
        drift: 0.5,
        gravity: 0.6
    });
    confetti({
        particleCount: 150,
        angle: 360,
        spread: 70,
        origin: { x, y },
        colors: ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#F9FF33'],
        shapes: ['circle', 'square'],
        scalar: 1.2,
        drift: 0.5,
        gravity: 0.6
    });
}
//Add new task element
function addTask(text = null, completed = false) {
    const taskText = text !== null ? text : document.getElementById('new-task').value;
    if (taskText === '') return;

    const li = document.createElement('li');
    li.draggable = true;
    //Create a check box
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'checkbox';
    checkbox.checked = completed;
    if (completed) li.classList.add('completed');

    //added a event listner in checkbox
    checkbox.addEventListener('change', function () {
        if (checkbox.checked) {
            li.classList.add('completed');
            completedTasks++;
        } else {
            li.classList.remove('completed');
            completedTasks--;
        }
        updateTaskCounter();
        updateProgressBar();
    });
    //edit or delete 
    const taskControls = document.createElement('div');
    taskControls.className = 'task-controls';
    //Store the task text in this
    const taskSpan = document.createElement('span');
    taskSpan.className = 'task-text';
    taskSpan.textContent = taskText;
    //Added a event listner for editing
    const editButton = document.createElement('button');
    editButton.innerHTML = '<i class="fas fa-edit"></i>';
    editButton.className = 'edit';
    editButton.addEventListener('click', function () {
        document.getElementById('new-task').value = taskSpan.textContent;
        document.getElementById('new-task').focus();
        editInput = taskSpan;
    });
    //delete the content
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.className = 'delete';
    deleteButton.addEventListener('click', function () {
        if (checkbox.checked) {
            completedTasks--;
        }
        totalTasks--;
        updateTaskCounter();
        updateProgressBar();
        li.remove();
    });

    taskControls.appendChild(taskSpan);
    taskControls.appendChild(editButton);
    taskControls.appendChild(deleteButton);

    li.appendChild(checkbox);
    li.appendChild(taskControls);

    li.addEventListener('dragstart', handleDragStart);
    li.addEventListener('dragover', handleDragOver);
    li.addEventListener('drop', handleDrop);
    li.addEventListener('dragend', handleDragEnd);

    document.getElementById('task-list').appendChild(li);

    if (text === null) {
        totalTasks++;
    }
    if (completed) {
        completedTasks++;
    }
    updateTaskCounter();
    updateProgressBar();

    if (text === null) {
        document.getElementById('new-task').value = '';
    }
}

//Add task working

document.getElementById('add-task-button').addEventListener('click', function () {
    if (editInput) {
        editInput.textContent = document.getElementById('new-task').value;
        editInput = null;
    } else {
        addTask();
    }
    document.getElementById('new-task').value = '';
});

document.getElementById('new-task').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        if (editInput) {
            editInput.textContent = document.getElementById('new-task').value;
            editInput = null;
        } else {
            addTask();
        }
        document.getElementById('new-task').value = '';
    }
});

document.body.addEventListener('click', function (event) {
    if (totalTasks > 0 && completedTasks === totalTasks && !confettiTriggered) {
        triggerConfetti(event);
        confettiTriggered = true;
    }
});
//progress
let draggedItem = null;
//Task list drag function track the styling
function handleDragStart(event) {
    draggedItem = this;
    setTimeout(() => this.classList.add('dragging'), 0);
}

function handleDragOver(event) {
    event.preventDefault();
    const draggingItem = document.querySelector('.dragging');
    const afterElement = getDragAfterElement(event.clientY);
    const taskList = document.getElementById('task-list');
    if (afterElement == null) {
        taskList.appendChild(draggingItem);
    } else {
        taskList.insertBefore(draggingItem, afterElement);
    }
}

function handleDrop() {
    this.classList.remove('dragging');
}

function handleDragEnd() {
    this.classList.remove('dragging');
}

function getDragAfterElement(y) {
    const taskList = document.getElementById('task-list');
    const draggableElements = [...taskList.querySelectorAll('li:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}