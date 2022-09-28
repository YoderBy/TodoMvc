window.addEventListener('load', function () {
  const input_task_form = document.getElementById("input_box");
  input_task_form.addEventListener("keypress", function(stroke) {
    inputs = getInputValues();
    const title_input_value = inputs[0], body_input_value = inputs[1];  
    if (stroke.key == "Enter") {
      addTask(title_input_value,body_input_value,document.getElementById('answers'));
      resetInputBox();
    }
  });
  document.getElementById("title_input_task").addEventListener("click", function(stroke) {
    document.getElementById("title_input_task").value ='';
  });
  document.getElementById("body_input_task").addEventListener("click", function(stroke) {
    document.getElementById("body_input_task").value ='';
  });
})
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

function getInputValues(){
  const title_input_task_form = document.getElementById("title_input_task");
  const body_input_task_form = document.getElementById("body_input_task");

  const title_input_value = title_input_task_form.value;
  const body_input_value = body_input_task_form.value;

  return [title_input_value, body_input_value];
}

function resetInputBox(){
  const title_input_task_form = document.getElementById("title_input_task");
  const body_input_task_form = document.getElementById("body_input_task");

  title_input_task_form.value = 'Task Title ';
  body_input_task_form.value = 'Task body';
}

function inputButtonAddTask(){
  inputs = getInputValues();
  const title_input_value = inputs[0], body_input_value = inputs[1];
  addTask(title_input_value,body_input_value,document.getElementById('answers'));
  resetInputBox();
}
function getTime(){1
  var today = new Date();
  if(today.getMinutes() < 10){
    var time = today.getHours() + ":0" + today.getMinutes() + ":" + today.getSeconds();
  }
  else{
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  }
  return time;
}
