document.querySelector("input").addEventListener('keyup',(e)=>{
    
    if(e.key=="Enter"){
        let value= document.querySelector("input").value.trim();
        if(value.length!=0){
            document.querySelector("input").value="";
            updateTodo(value);
        }
    }   
})


let tasks=[];

function updateTodo(value){
    let div= document.createElement("div");
    div.innerHTML=`
        <p> ${value} </p>
        <i class="far fa-trash-alt"></i>
    `;
    div.className="todos";
    document.querySelector(".box").append(div);
    tasks.push(div);
    
}

for(let task of tasks){
    task.addEventListener("click",doneTask);
}

let box=document.querySelector(".box");


box.addEventListener("click",(e)=>{
    if(e.target.className=="todos"){
        doneTask(e.target);
    }else if(e.target.className=="far fa-trash-alt"){
        removeTask(e.target);
    }
} )
function doneTask(target){
    target.classList.toggle("done");
    
}
function removeTask(target){
    target.parentElement.remove();
    
}



