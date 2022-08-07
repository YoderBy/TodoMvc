function add_task() {
    const task_num = document.getElementById("answers").childElementCount; //the task identifier
    const new_task = document.createElement('div');
    const input_value = document.getElementById("input_task").value; // the content
    new_task.innerHTML = `
    
  <button type = "button" class = "unchk" id = "task${task_num}_btn" onclick = "move_to_done(${task_num})"></button>
  
  <input type = "text" id = "val_task${task_num}" value = "${input_value}""> 
  
  <button type = "button" class = "rmv" onclick = "remove_task(${task_num})">remove</button>
  
  <p>  ${task_num} </p>
  `;
  
    new_task.id = `task_${task_num}`;
    new_task.classList.add("task");
    document.getElementById("input_task").value = '';
    document.getElementById("answers").appendChild(new_task);
  }
  
  function remove_task(num) {
    const victim_div = document.getElementById(`task_${num}`);
    victim_div.remove();
  }
  
  function move_to_done(num) {
    
    const victim_div = document.getElementById(`task_${num}`);
    const re_born = document.createElement('div');
    
    re_born.innerHTML  = document.getElementById(`task_${num}`).innerHTML;
    
    //preparing the done task
    document.getElementById("done").appendChild(re_born); //adding
    re_born.classList.add("task_done"); //css
    re_born.setAttribute("id",`task_${num}`);
    re_born.children[1].classList.add("strike_through");
    re_born.children[0].setAttribute("onclick", `revive(${num})`); //changign the button action
    
    victim_div.remove();
  }
  
  function revive(num) {
    //it should mimic move_to_done, but in reverse. It's so similar, I wonder if I should  just add a "location" parameter and merge them
    
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
    
    victim_div.remove();
  }
  
  //Enter adds tasks
  document.getElementById("input_task").addEventListener("keypress", function(stroke) {
    if (stroke.key == "Enter") {
      add_task();
    }
  });
  