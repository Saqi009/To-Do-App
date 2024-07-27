showTasks();
const formElement = document.querySelector("#form");
const messageSectionElement = document.querySelector("#message-section");

formElement.addEventListener("submit", function (event) {
    event.preventDefault();

    const addInputElement = document.querySelector("#add-input");
    let addInputValue = addInputElement.value;


    if (addInputValue == '' || addInputValue === undefined) {
        messageSectionElement.innerText = "Please Provide the task!";
        addInputElement.classList.add("red-border");
    } else {
        messageSectionElement.innerText = '';
        addInputElement.classList.remove("red-border");


        let tasks = [];

        let localTasks = JSON.parse(localStorage.getItem("localTasks"));

        if (localTasks) {
            tasks = localTasks;
        }

        tasks.push(addInputValue);

        localStorage.setItem("localTasks", JSON.stringify(tasks));

        showTasks();
        addInputElement.value = '';

    }
});

function showTasks() {
    let localTasks = JSON.parse(localStorage.getItem("localTasks"));

    tasksList = '';

    if (localTasks) {
        localTasks.forEach(function (value, index) {
            tasksList += ` <div class=" gx-2 mb-2 answer">
            <span class="text-white fs-3">${index + 1}. </span><input id="input-${index}" type="text" value="${value}" class="p-2 round" readonly>
            <button id="edit-${index}" class="btn btn-success p-2" onclick = "editTask(${index})">Edit</button>
            <button id="delete-${index}" class="btn btn-danger p-2" onclick = "deleteTasks(${index})">Delete</button>
        </div>`;
        });
    }

    const tasksSectionElement = document.querySelector("#tasks-section");

    tasksSectionElement.innerHTML = tasksList;
}

function editTask(id) {
    const editBtnElement = document.querySelector(`#edit-${id}`);
    const inputElement = document.querySelector(`#input-${id}`);

    let inputValue = inputElement.value;

    let inputLength = inputValue.length;

    if (editBtnElement.innerText == "Edit") {

        editBtnElement.innerText = "Save";
        inputElement.removeAttribute("readonly");
        inputElement.focus();
        inputElement.setSelectionRange(inputLength, inputLength);

        editBtnElement.innerText = "Save";

    } else {

        if (inputElement.value !== '') {

            inputElement.classList.add("red-border");
        } else {

            editBtnElement.innerText = "Edit";
            inputElement.setAttribute("readonly", true);

            let localTasks = JSON.parse(localStorage.getItem("localTasks"));

            localTasks[id] = inputValue;

            localStorage.setItem("localTasks", JSON.stringify(localTasks));
        }
    }

}

function deleteTasks(id) {

    let localTasks = JSON.parse(localStorage.getItem("localTasks"));
    localTasks.splice(id, 1);
    localStorage.setItem("localTasks", JSON.stringify(localTasks));
    showTasks();
}