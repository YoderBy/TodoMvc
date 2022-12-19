
function modifyTask(id) {

    const task = document.getElementById(`task_${id}`);
    const new_location = task.parentNode;

    switch(new_location.id){
      case 'answers':
        ChangedTaskDesignTo(id, 'answers')
        break;
      case 'done_tasks_tab':
        ChangedTaskDesignTo(id, 'done_tasks_tab')
        break;
      }
    updateTaskTime(id);
    
}
function updateTaskTime(id){
  document.getElementById(`task_time${id}`).innerHTML = `${getTime()}`;
}
function ChangedTaskDesignTo(id, new_location){
    switch(new_location){
        case 'answers':
            document.getElementById(`task${id}_btn`).setAttribute("onclick", `moveTo(${id}, document.getElementById('done_tasks_tab'))`);
            document.getElementById(`task${id}_btn`).style.backgroundColor = "lightsteelblue";
            document.getElementById(`task_time_description${id}`).innerHTML = "Added At: ";
            break;
        case 'done_tasks_tab':
            document.getElementById(`task${id}_btn`).setAttribute("onclick", `moveTo(${id}, document.getElementById('answers'))`);
            document.getElementById(`task${id}_btn`).style.backgroundColor = "lightcoral";
            document.getElementById(`task_time_description${id}`).innerHTML = "Finished At: ";
            break;
    }
} 

function getTime() {
    var time = new Date();
    trimmed_time = time.toLocaleTimeString().substring(0, 4)+" " + time.toLocaleTimeString().substring(8,10); 
    //CR Minor - not a good way to do this, very fragile (as can be seen by the bug)
    return trimmed_time;
}
  