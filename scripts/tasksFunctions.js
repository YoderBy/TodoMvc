function generateTask(task_num, title_input_value, body_input_value) {
  const cur_time = getTime();
  const new_task = document.createElement('div');
  const pure_title_task_content = purify(title_input_value);
  const pure_body_task_content = purify(body_input_value);
  const pure_task_num = purify(task_num);
  new_task.innerHTML = `
    <div class = "visible_task">
      <div id = "${pure_task_num}_is_editable" style = "display:none">1
      </div>
      <button type = "button" class = "unchk mdc-button--outlined" id = "task${pure_task_num}_btn" onclick = "moveTo(${pure_task_num},document.getElementById('done_tasks_tab'))">
      </button>
      <div class = "task_input">
        <input class = "task_title" disabled="disabled" id = "title_val_task${pure_task_num}" value = '${pure_title_task_content}'/> 
        <input class = "task_value" disabled="disabled" id = "text_val_task${pure_task_num}" value = '${pure_body_task_content}'/> 
      </div>
      <button type = "button" class = "edt mdc-button--outlined" id = "edit_btn${pure_task_num}" onclick = "editTask(${pure_task_num})">Edit
      </button>
      <div class = "time_box">
        <label class = "task_time_description" id = "task_time_description${pure_task_num}">added at:
        </label>
        <label class = "task_time" id = "task_time${pure_task_num}">${cur_time}
        </label>
      </div>
      <button type = "button" class = "rmv mdc-button--outlined" onclick = "removeTask(${pure_task_num})">remove</button>
    </div>
    `;
  new_task.id = `task_${pure_task_num}`;
  new_task.classList.add("task");

  return new_task;
}

function addTask(title_input_value, body_input_value, task_location) {
  const task_num = generateTaskNum();
  const new_task = generateTask(task_num, title_input_value, body_input_value);
  task_location.appendChild(new_task);
}
//CR Major - each function should be responsible to do one thing,
// this function fetches the data from the input,
// generates a new Task element while caring about all the other tasks, adds the task to the DOM, and empties the input
function generateTaskNum() {
  const task_num = purify(document.getElementById("task_counter").innerHTML);
  document.getElementById("task_counter").innerHTML++;
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

function taskModificaiton(id) {
  //this is so ugly
  const task = document.getElementById(`task_${id}`);
  const location = task.parentNode;
  if (location.id == 'done_tasks_tab') {
    document.getElementById(`task${id}_btn`).setAttribute("onclick", `moveTo(${id}, document.getElementById('answers'))`);
    document.getElementById(`task${id}_btn`).style.backgroundColor = "lightcoral";
    document.getElementById(`task_time_description${id}`).innerHTML = "Finished At: ";
  }
  if (location.id == 'answers') {
    document.getElementById(`task${id}_btn`).setAttribute("onclick", `moveTo(${id}, document.getElementById('done_tasks_tab'))`);
    document.getElementById(`task${id}_btn`).style.backgroundColor = "lightsteelblue";
    document.getElementById(`task_time_description${id}`).innerHTML = "Added At: ";
  
  }
  document.getElementById(`task_time${id}`).innerHTML = `${getTime()}`;
}
function editTask(id) {
  isEditAble = !!parseInt(document.getElementById(`${id}_is_editable`).innerHTML);// 1 return True, 0 return False
  document.getElementById(`title_val_task${id}`).disabled = isEditAble ? 0 : 1;
  document.getElementById(`text_val_task${id}`).disabled = isEditAble ? 0 : 1;
  document.getElementById(`edit_btn${id}`).innerHTML = isEditAble ? "Save" : "Edit";
  document.getElementById(`title_val_task${id}`).style.fontStyle = isEditAble ? "italic" : "normal";
  document.getElementById(`text_val_task${id}`).style.fontStyle = isEditAble ? "italic" : "normal";
  document.getElementById(`edit_btn${id}`).style.backgroundColor = isEditAble ? "rgb(185, 243, 198)" : "rgb(199, 185, 243)";
  document.getElementById(`${id}_is_editable`).innerHTML = isEditAble ? 0 : 1;
}