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
      <button type = "button" class = "unchk" id = "task${pure_task_num}_btn" onclick = "moveTo(${pure_task_num},document.getElementById('done_tasks_tab'))">
      </button>
      <div class = "task_input">
        <input class = "task_title" disabled="disabled" id = "title_val_task${pure_task_num}" value = '${pure_title_task_content}'/> 
        <input class = "task_value" disabled="disabled" id = "text_val_task${pure_task_num}" value = '${pure_body_task_content}'/> 
      </div>
      <button type = "button" class = "edt yosef-mdc-button-outlined" id = "edit_btn${pure_task_num}" onclick = "editTask(${pure_task_num})">Edit
      </button>
      <div class = "time_box">
        <label class = "task_time_description" id = "task_time_description${pure_task_num}">Added at:
        </label>
        <label class = "task_time" id = "task_time${pure_task_num}">${cur_time}
        </label>
      </div>
      <button type = "button" class = "rmv" onclick = "removeTask(${pure_task_num})"></button>
    </div>
    `;
  new_task.id = `task_${pure_task_num}`;
  new_task.classList.add("task");
  //CR Major - this works as a way to avoid XSS, but it's better to avoid writing HTML as strings. use document.createElement
  return new_task;
}

function addTask(titleInputValue, bodyInputValue, taskLocation) {
  //CR Minor - use camelCase for parameter names Fixed
  //CR Minor - no need for InputValue, this function only needs to know what the title is and that the description is
  //           (in general, a function should know only what it does, not how it's used)
  const task_num = generateTaskNum();
  const new_task = generateTask(task_num, titleInputValue, bodyInputValue);
  taskLocation.appendChild(new_task);
}

function generateTaskNum() {
  const task_num = purify(document.getElementById("task_counter").innerHTML);
  document.getElementById("task_counter").innerHTML++;
  return task_num;
}

function removeTask(id) {
  const victim_div = document.getElementById(`task_${id}`);
  victim_div.remove();
}

function moveTo(id, location) {
  const victim_div = document.getElementById(`task_${id}`);
  const re_born = victim_div.cloneNode(true);//https://stackoverflow.com/questions/19482076/how-to-duplicate-a-div-in-javascript
  location.appendChild(re_born);
  victim_div.remove();
  modifyTask(id);
}

function modifyTask(id) {
  //CR Minor - function names should be verbs //ok miss kugel
  //this is so ugly
  //CR Minor - it is. consider adding a generateTask function that returns a task div without adding it to the DOM OK

  const task = document.getElementById(`task_${id}`);
  const location = task.parentNode;
  switch(location.id){
    case 'answers':
      modifyTaskForToDo(id);
      break;
    case 'done_tasks_tab':
      modifyTaskForDone(id);
      break;
    }
    document.getElementById(`task_time${id}`).innerHTML = `${getTime()}`;
  //CR Major - using many if statements is bad design. consider using a switch case statement instead
  //           even better- make all the style changes set in the CSS.
  //           then, consider whether there will be more than 2 locations for the TODO items. if no- you can have a boolean for whether the task is done
  //           if you want to future-proof your code for a possibility of another task location, add a 'location' or 'state' parameter (that can be 'TODO' or 'DONE' or anything else) 
  //and handle each option accordingly 
  }
  
function modifyTaskForDone(id){
  document.getElementById(`task${id}_btn`).setAttribute("onclick", `moveTo(${id}, document.getElementById('answers'))`);
  document.getElementById(`task${id}_btn`).style.backgroundColor = "lightcoral";
  document.getElementById(`task_time_description${id}`).innerHTML = "Finished At: ";
}

function modifyTaskForToDo(id){
  document.getElementById(`task${id}_btn`).setAttribute("onclick", `moveTo(${id}, document.getElementById('done_tasks_tab'))`);
  document.getElementById(`task${id}_btn`).style.backgroundColor = "lightsteelblue";
  document.getElementById(`task_time_description${id}`).innerHTML = "Added At: ";
}

function editTask(id) {
  isEditAble = !!parseInt(document.getElementById(`${id}_is_editable`).innerHTML);// 1 return True, 0 return False
  document.getElementById(`title_val_task${id}`).disabled = isEditAble ? 0 : 1;
  document.getElementById(`text_val_task${id}`).disabled = isEditAble ? 0 : 1;
  document.getElementById(`edit_btn${id}`).innerHTML = isEditAble ? "Save" : "Edit";
  document.getElementById(`title_val_task${id}`).style.fontStyle = isEditAble ? "italic" : "normal";
  document.getElementById(`text_val_task${id}`).style.fontStyle = isEditAble ? "italic" : "normal";
  document.getElementById(`edit_btn${id}`).style.backgroundColor = isEditAble ? "rgb(185, 243, 198)" : "rgb(255, 255, 255)";
  document.getElementById(`${id}_is_editable`).innerHTML = isEditAble ? 0 : 1;
}