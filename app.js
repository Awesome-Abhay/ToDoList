document.querySelector("input").addEventListener('keyup', (e) => {

    if (e.key == "Enter") {
        let value = document.querySelector("input").value.trim();
        if (value.length != 0) {
            document.querySelector("input").value = "";
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
    if(checkContain)
        return;

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

// localStorage.removeItem("done");
// localStorage.removeItem("tasks");