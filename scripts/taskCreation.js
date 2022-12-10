function generateTask(taskNum, titleInputValue, bodyInputValue) {

    const cur_time = getTime();
    const new_task = document.createElement('div');
    const pure_title_task_content = purify(titleInputValue);
    const pure_body_task_content = purify(bodyInputValue);
    const pure_task_num = purify(taskNum);
  
    const visible_task = document.createElement('div');
    visible_task.classList.add("visible_task");
    new_task.appendChild(visible_task);
    
    const div_task_iseditable = document.createElement('div');
    div_task_iseditable.setAttribute('id', `${pure_task_num}_is_editable`);
    div_task_iseditable.style.display = 'none';
    div_task_iseditable.innerHTML = 1;
    visible_task.appendChild(div_task_iseditable);
  
    const uncheck_button = document.createElement('button');
    uncheck_button.classList.add("unchk");
    uncheck_button.setAttribute('id',`task${pure_task_num}_btn`);
    uncheck_button.setAttribute('onclick',`moveTo(${pure_task_num},document.getElementById('done_tasks_tab'))`);
    visible_task.appendChild(uncheck_button);
  
    const task_input = document.createElement('div');
    task_input.classList.add('task_input');
  
    visible_task.appendChild(task_input);
  
    const task_title = document.createElement('input');
    task_title.classList.add('task_title');
    task_title.setAttribute('disabled','disabled');
    task_title.setAttribute('id', `title_val_task${pure_task_num}`);
    task_title.setAttribute('value', pure_title_task_content);
  
    const task_value = document.createElement('input');
    task_value.classList.add('task_value');
    task_value.setAttribute('disabled','disabled');
    task_value.setAttribute('id', `text_val_task${pure_task_num}`);
    task_value.setAttribute('value', pure_body_task_content);
    
    task_input.appendChild(task_title);
    task_input.appendChild(task_value);
  
    
    const edit_button = document.createElement('button');
    edit_button.classList.add("edt");
    edit_button.classList.add("yosef-mdc-button-outlined");
    edit_button.setAttribute('id',`edit_btn${pure_task_num}`);
    edit_button.setAttribute('onclick',`editTask(${pure_task_num})`);
    edit_button.innerHTML = "EDIT";
    visible_task.appendChild(edit_button);
  
    const time_box = document.createElement('div');
    time_box.classList.add("time_box");
    
    const time_box_des = document.createElement('label');
    time_box_des.classList.add('task_time_description');
    time_box_des.setAttribute('id', `task_time_description${pure_task_num}`)
    time_box_des.innerHTML = 'Added at:';
  
    const time_box_time = document.createElement('label');
    time_box_time.classList.add('task_time');
    time_box_time.setAttribute('id', `task_time${pure_task_num}`)
    time_box_time.innerHTML = cur_time;
  
    time_box.appendChild(time_box_des);
    time_box.appendChild(time_box_time);
  
    visible_task.appendChild(time_box);
  
    const remove_button = document.createElement('button');
    remove_button.classList.add("rmv");
    remove_button.setAttribute('onclick',`removeTask(${pure_task_num})`);
    remove_button.setAttribute('type',`button`);
    visible_task.appendChild(remove_button);
  
  
    new_task.id = `task_${pure_task_num}`;
    new_task.classList.add("task");
  
    //CR Major - this works as a way to avoid XSS, but it's better to avoid writing HTML as strings. use document.createElement
    //I hope your'e happy now. couse I'm not
  
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
    const task_num = parseInt(window.localStorage.getItem("id_counter"));
    window.localStorage.setItem("id_counter",""+(task_num + 1));
    return task_num;
}

