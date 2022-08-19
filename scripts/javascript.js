window.addEventListener('load', function () {

  document.getElementById("input_task").addEventListener("keypress", function(stroke) { //CR Minor - could be an anonymous function
    if (stroke.key == "Enter") {
      add_task();
    }
  });
  document.getElementById("input_task").addEventListener("click", function(stroke) { //CR Minor - seperate getElementById from actual code logic. save the element as a const
    document.getElementById("input_task").value ='';
  });
})
function add_task() { 
  //CR Major - this function should get the data it needs as parameters, not look for it itself
  //CR Minor - naming conventions. function names should be in camelCase, not snake_case 
    const task_num = document.getElementById("answers").childElementCount; //the task identifier 
    const new_task = document.createElement('div');
    const input_value = document.getElementById("input_task").value; // the content
    new_task.innerHTML = `
    
  <button type = "button" class = "unchk" id = "task${task_num}_btn" onclick = "move_to_done(${task_num})">Done!</button>
  
  <textarea style = "width: 50%" id = "val_task${task_num}">${input_value}</textarea> 
  
  <button type = "button" class = "rmv" onclick = "remove_task(${task_num})">remove</button>
  
  `; //CR Minor - if you use CSS don't also use the style property
  //CR Major - don't add HTML directly as a string, this is just asking for XSS to happen
  new_task.id = `task_${task_num}`;
  new_task.classList.add("task");
  document.getElementById("input_task").value = '';
  document.getElementById("answers").appendChild(new_task);
  }
  //CR Major - each function should be responsible to do one thing, this function fetches the data from the input, generates a new Task element while caring about all the other tasks, adds the task to the DOM, and empties the input

function remove_task(num) {
  //CR Minor - if you are using num as an identifier, might want to call it ID
    const victim_div = document.getElementById(`task_${num}`);
    victim_div.remove();
  }
  
function move_to_done(num) {
    
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
    //it should mimic move_to_done, but in reverse. It's so similar, I wonder if I should  just add a "location" parameter and merge them
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
    re_born.children[0].setAttribute("onclick", `move_to_done(${num})`); //changign the button action
    re_born.children[0].innerHTML = "Done!"

    victim_div.remove();
  }

function hide_done(){
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

function hide_done2(){
  isVisible = !!document.getElementById("flag").innerHTML;
  document.getElementById("done_tasks_tab").style.display = isVisible ? "flex" : "none";
  document.getElementById("hide/show_btn").innerHTML = isVisible ? "Hide" : "Show";
  document.getElementById("flag").innerHTML = isVisible ? 0 : 1;
}
//CR Minor - without changing the functionality at all (which I think you should), look how much more elegant this function could be

