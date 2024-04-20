document.querySelector(".addTask").addEventListener('keyup', (e) => {

    if (e.key == "Enter") {
        let value = document.querySelector(".addTask").value.trim();
        if (value.length != 0) {
            document.querySelector(".addTask").value = "";
            updateTodo(value);
        }
    }
})


let tasks = [];
const taskCount=0;
function updateTodo(value) {
    let checkContain=false;
    tasks.forEach(e=>{
        if(e==value)
            checkContain=true;
    })
    if(checkContain){
        alert("This is already added");
        return;
    }

    let div = document.createElement("div");
    div.innerHTML = `
    <p> ${value} </p>
    <i class="far fa-trash-alt"></i>`;
    div.className = "todos";
    document.querySelector(".box").append(div);
    tasks.push(value);
    localStorage.setItem(`tasks`, JSON.stringify(tasks));
    

}

let box = document.querySelector(".box");


box.addEventListener("click", (e) => {
    if (e.target.classList.contains("todos")) {
        doneTask(e.target);
    } else if (e.target.className == "far fa-trash-alt") {
        removeTask(e.target);        
    }
})

function doneTask(target) {
    
    target.classList.toggle("done");
    let arrayOfTasks= Array.from(document.querySelectorAll('.todos'));
    let done= arrayOfTasks.map(e=>{
        if(e.classList.contains('done')){            
            return e.firstElementChild.innerText;
        }
    });
    localStorage.setItem('done', JSON.stringify(done));
    
}
function removeTask(target) {
    
    let removedElement=target.parentElement.textContent.trim();  
      
    let newTasks= tasks.filter((element)=>{
        return JSON.stringify(element)!=JSON.stringify(removedElement);
    })
    localStorage.setItem('tasks', JSON.stringify(newTasks));    
    target.parentElement.remove();
    location.reload();
}

document.addEventListener("DOMContentLoaded", () => {
    const storedTasks = localStorage.getItem("tasks") || "[]";
    const retrievedTasks = JSON.parse(storedTasks);
    retrievedTasks.forEach(element => {
        updateTodo(element);
    });

    const storedDones= localStorage.getItem("done") || "[]";
    const retriedDones= JSON.parse(storedDones);    
    retriedDones.forEach(element=>{
        updateDones(element);
    })
    
});
function updateDones(element){
    let arrayOfTasks= document.querySelectorAll('.todos');
    arrayOfTasks.forEach(e=>{
        if(e.firstElementChild.innerText==element)
            e.classList.add("done");
        
    })
    
}

document.querySelector(".searchbox").addEventListener('keyup', (e)=>{
    if (e.key == "Enter") {
        let value = document.querySelector(".searchbox").value.trim();
        if (value.length != 0) {
            document.querySelector(".searchbox").value = "";
            search(value);
        }
    }
})

function search(value){
    let todoNodeList= document.querySelectorAll(".todos");
    let todos= Array.from(todoNodeList);
    todos.forEach((e)=>{
        if(e.firstElementChild.textContent.trim()==value){
            doneTask(e);
            e.scrollIntoView();
        }
    })
    
    
}
// localStorage.removeItem("done");
// localStorage.removeItem("tasks");