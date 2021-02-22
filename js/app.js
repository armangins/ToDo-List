const DATE = new Date();
const dateBox = document.getElementById('date')
dateBox.innerText = DATE.toLocaleDateString();


const clear = document.querySelector('.clear');
const list = document.getElementById('list');
const input = document.getElementById('input');

// Classes for text and tasks
const CHECK = 'fa-check-circle';
const UNCHECK = 'fa-circle-thin';
const LINE = 'lineThrough';

// define variables for id and tasks 
let task, id;

// check if there is somthng in the local storage
let data = localStorage.getItem('toDo');
if (data) {
    task = JSON.parse(data);
    id = task.length;
    loadToDo(task);
} else {
    task = [];
    id = 0
};

// load the data from the local storage to the DOM
function loadToDo(array) {
    array.forEach((item) => {
        addToDo(item.name, item.id, item.done, item.trash);
    });
}


// gets the val and creates an object of a toDo
input.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
        const toDo = input.value;
        if (toDo) {
            addToDo(toDo, id, false, false);
            task.push({
                name: toDo,
                id: id,
                done: false,
                trash: false,
            });
            id++;
            localStorage.setItem('toDo', JSON.stringify(task))
        }
        input.value = '';
    }
});



//  Add to do to the DOM
function addToDo(toDo, id, done, trash) {
    if (trash) return;
    const CLASS = done ? CHECK : UNCHECK;
    const lineThrough = done ? LINE : '';
    const markup = ` <li class="item">
<i class="fa  ` + CLASS + ` co" job="complete" id="` + id + `"></i>
<p class="text ` + lineThrough + `">` + toDo + `</p>
<i class="fa fa-trash-o de" job="delete" id="` + id + `"></i> 
</li>`;
    const position = 'beforeend';
    list.insertAdjacentHTML(position, markup);
}


//  listen to Clicks in the parent element
list.addEventListener('click', (event) => {

    let element = event.target;
    console.log(element);
    const JOB = event.target.attributes.job.value;
    if (JOB === 'complete') {
        completeToDo(element);
    } else if (JOB === 'delete') {
        removeToDo(element);
    }
});


//  sets the To Do to a done state
function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector('.text').classList.toggle(LINE);
    if (task[element.id].done === false) {
        task[element.id].done = true
    } else if (task[element.id].done === true) {
        task[element.id].done = false;
    }
    localStorage.setItem('toDo', JSON.stringify(task))
};

// removes the To Do 
function removeToDo(element) {

    element.parentNode.parentNode.removeChild(element.parentNode);
    task[element.id].trash = true;
    localStorage.setItem('toDo', JSON.stringify(task))
}
clear.addEventListener('click', () => {
    localStorage.clear();
    location.reload();
})