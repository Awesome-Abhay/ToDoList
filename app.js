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
    let div = document.createElement("div");
    div.innerHTML = `
        <p> ${value} </p>
        <i class="far fa-trash-alt"></i>
    `;
    div.className = "todos";
    document.querySelector(".box").append(div);
    tasks.push(value);
    // console.log(tasks);
    
    saveToLocalStorage(tasks);

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

}
function removeTask(target) {
    
    let removedElement=target.parentElement.textContent;  
      
    let newTasks= tasks.filter((element)=>{
        return JSON.stringify(element)!=JSON.stringify(removedElement);
    })
    console.log(newTasks);
    
    saveToLocalStorage(newTasks);
    target.parentElement.remove();

}
function saveToLocalStorage(tasks) {
    localStorage.setItem(`tasks`, JSON.stringify(tasks));
}

document.addEventListener("DOMContentLoaded", () => {
    const storedTasks = localStorage.getItem("tasks") || "[]";
    const retrievedTasks = JSON.parse(storedTasks);
    retrievedTasks.forEach(element => {
        updateTodo(element);
    });
});


// localStorage.removeItem("tasks");