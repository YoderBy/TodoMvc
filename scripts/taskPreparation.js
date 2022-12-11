
function modifyTask(id) {
    //CR Minor - function names should be verbs //((ok miss kugel))
    //this is so ugly
    //CR Minor - it is. consider adding a generateTask function that returns a task div without adding it to the DOM ((OK))
  
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
      document.getElementById(`task_time${id}`).innerHTML = `${getTime()}`;
    //CR Major - using many if statements is bad design. consider using a switch case statement instead
    //           even better- make all the style changes set in the CSS. ((great idea, done))
    //           then, consider whether there will be more than 2 locations for the TODO items. if no- you can have a boolean for whether the task is done
    //           if you want to future-proof your code for a possibility of another task location, add a 'location' or 'state' parameter (that can be 'TODO' or 'DONE' or anything else) 
    //and handle each option accordingly  ((Accepted))
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
    return trimmed_time;
    //CR Minor - use today.toLocaleTimeString. ((ACCEPTED))
    //CR Trivial - also, seeing as you only use the time part and not the date, 'today' is a weird name to use ((ACCEPTED))
  
  }
  