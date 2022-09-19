window.addEventListener('load', function () {
  const input_task_form = document.getElementById("input_task");
  input_task_form.addEventListener("keypress", function(stroke) {
    if (stroke.key == "Enter") {
      const task_location = document.getElementById('answers');
      const input_value = input_task_form.value;
      input_task_form.value = '';
      addTask(input_value, task_location);
    }
  });
  input_task_form.addEventListener("click", function(stroke) {
    input_task_form.value ='';
  });
})
function generateTask(task_num, input_value){
  const new_task = document.createElement('div');
  const pure_task_content = purify(input_value);
  const pure_task_num = purify(task_num);
  new_task.innerHTML = `
    
  <button type = "button" class = "unchk" id = "task${task_num}_btn" onclick = "moveTo(${task_num},document.getElementById('done_tasks_tab'))">Done!</button>
  
  <textarea class = "task_input" id = "val_task${task_num}">${pure_task_content}</textarea> 
  
  <button type = "button" class = "rmv" onclick = "removeTask(${pure_task_num})">remove</button>
  
  `;
  new_task.id = `task_${pure_task_num}`;
  new_task.classList.add("task");

  return new_task;
}
function addTask(input_value, task_location) { 
  const task_num = generateTaskNum();
  const new_task = generateTask(task_num, input_value);
  task_location.appendChild(new_task);
  document.getElementById("input_task").value = '';
  }
  //CR Major - each function should be responsible to do one thing,
  // this function fetches the data from the input,
  // generates a new Task element while caring about all the other tasks, adds the task to the DOM, and empties the input
function generateTaskNum(){
  const task_num = purify(document.getElementById("task_counter").innerHTML);
  document.getElementById("task_counter").innerHTML ++;
  return task_num;
}
function removeTask(id) {
  //CR Minor - if you are using num as an identifier, might want to call it ID
    const victim_div = document.getElementById(`task_${id}`);
    victim_div.remove();
  }
  
function moveTo(id, location) {
  const victim_div = document.getElementById(`task_${id}`);
  const re_born = victim_div.cloneNode(true);//https://stackoverflow.com/questions/19482076/how-to-duplicate-a-div-in-javascript
  location.appendChild(re_born); //adding
  victim_div.remove();
  taskModificaiton(id);
  }

function taskModificaiton(id){
  //this is so ugly
  const task = document.getElementById(`task_${id}`);
  const location = task.parentNode;
  if (location.id == 'done_tasks_tab'){
    document.getElementById(`task${id}_btn`).setAttribute("onclick", `moveTo(${id}, document.getElementById('answers'))`);
    document.getElementById(`task${id}_btn`).innerHTML = "Todo";
  }
  if (location.id == 'answers'){
    document.getElementById(`task${id}_btn`).setAttribute("onclick", `moveTo(${id}, document.getElementById('done_tasks_tab'))`);
    document.getElementById(`task${id}_btn`).innerHTML = "Done!";
  }
}

function hideDone(){

  isVisible = !!parseInt(document.getElementById("flag").innerHTML);
  document.getElementById("done_tasks_tab").style.display = isVisible ? "block" : "none";
  document.getElementById("hide/show_btn").innerHTML = isVisible ? "Hide" : "Show";
  document.getElementById("flag").innerHTML = isVisible ? 0 : 1;
}
//CR Minor - without changing the functionality at all (which I think you should), look how much more elegant this function could be

function purify(str){//from the web https://portswigger.net/web-security/cross-site-scripting/preventing
  return String(str).replace(/[^\w. ]/gi, function(c){
      return '&#'+c.charCodeAt(0)+';';
  });
}