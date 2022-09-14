window.addEventListener('load', function () {
  const input_task_form = document.getElementById("input_task");
  input_task_form.addEventListener("keypress", function(stroke) { //CR Minor - could be an anonymous function
    if (stroke.key == "Enter") {
      const task_num = document.getElementById("answers").childElementCount;
      const input_value = input_task_form.value;
      addTask(task_num , input_value);
    }
  });
  input_task_form.addEventListener("click", function(stroke) { //CR Minor - seperate getElementById from actual code logic. save the element as a const
    input_task_form.value ='';
  });
})
function addTask(task_num, input_value) { 
  const newTask = document.createElement('div');
  const pure_task_content = purify(input_value);
  const pure_task_num = purify(task_num);
    newTask.innerHTML = `
    
  <button type = "button" class = "unchk" id = "task${task_num}_btn" onclick = "moveToDone(${task_num})">Done!</button>
  
  <textarea style = "width: 50%" id = "val_task${task_num}">${pure_task_content}</textarea> 
  
  <button type = "button" class = "rmv" onclick = "removeTask(${pure_task_num})">remove</button>
  
  `; //CR Minor - if you use CSS don't also use the style property
  //CR Major - don't add HTML directly as a string, this is just asking for XSS to happen

  newTask.id = `task_${pure_task_num}`;
  newTask.classList.add("task");
  document.getElementById("input_task").value = '';
  document.getElementById("answers").appendChild(newTask);
  }
  //CR Major - each function should be responsible to do one thing, this function fetches the data from the input, generates a new Task element while caring about all the other tasks, adds the task to the DOM, and empties the input

function removeTask(num) {
  //CR Minor - if you are using num as an identifier, might want to call it ID
    const victim_div = document.getElementById(`task_${num}`);
    victim_div.remove();
  }
  
function moveToDone(num) {
    
    const victim_div = document.getElementById(`task_${num}`);
    const re_born = document.createElement('div');
    
    re_born.innerHTML  = document.getElementById(`task_${num}`).innerHTML;
    
    //preparing the done task
    document.getElementById("done_tasks_tab").appendChild(re_born); //adding
    re_born.classList.add("task_done"); //css
    re_born.setAttribute("id",`task_${num}`);
    re_born.children[1].classList.add("strike_through");
    re_born.children[0].setAttribute("onclick", `revive(${num})`); //changign the button action
    re_born.children[0].innerHTML = "ToDo"
    victim_div.remove();
  }
  
function revive(num) {
  //CR Minor - this is a fun name but not a very indicative one. this implies the function return a deleted task, not a done task
    //it should mimic moveToDone, but in reverse. It's so similar, I wonder if I should  just add a "location" parameter and merge them
    //CR - this is indeed code duplication

    const victim_div = document.getElementById(`task_${num}`);
    const re_born = document.createElement('div');
    
    re_born.innerHTML = document.getElementById(`task_${num}`).innerHTML;
    
    //preparing the task for moving to undone
    document.getElementById("answers").appendChild(re_born); //adding
    
    re_born.classList.add("task"); //css
    re_born.classList.remove('done_task');
    re_born.children[1].classList.remove('strike_through');
    
    re_born.setAttribute("id",`task_${num}`) 
    re_born.children[0].setAttribute("onclick", `moveToDone(${num})`); //changign the button action
    re_born.children[0].innerHTML = "Done!"

    victim_div.remove();
  }

function hideDone(){
  flag = document.getElementById("flag").innerHTML;
  //CR Minor - will you have no other flags? maybe the ID should be more unique
  if (flag == 0){
    //CR Minor - why not just use a boolean?
    //CR Minor - don't use ==
    document.getElementById("done_tasks_tab").style.display = "none";
    document.getElementById("hide/show_btn").innerHTML = "Show";
    document.getElementById("flag").innerHTML = 1;
  }
  if (flag == 1){
    document.getElementById("done_tasks_tab").style.display = "flex";
    document.getElementById("hide/show_btn").innerHTML = "Hide";
    document.getElementById("flag").innerHTML = 0;
  }
}

function hideDone2(){
  isVisible = !!document.getElementById("flag").innerHTML;
  document.getElementById("done_tasks_tab").style.display = isVisible ? "flex" : "none";
  document.getElementById("hide/show_btn").innerHTML = isVisible ? "Hide" : "Show";
  document.getElementById("flag").innerHTML = isVisible ? 0 : 1;
}
//CR Minor - without changing the functionality at all (which I think you should), look how much more elegant this function could be

function purify(str){//from the web https://portswigger.net/web-security/cross-site-scripting/preventing
  return String(str).replace(/[^\w. ]/gi, function(c){
      return '&#'+c.charCodeAt(0)+';';
  });
}