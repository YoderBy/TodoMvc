
window.addEventListener('load', function () {
  const input_task_form = document.getElementById("input_box");

  input_task_form.addEventListener("keypress", function (stroke) {
    inputs = getInputValues();
    const title_input_value = inputs[0], body_input_value = inputs[1];

    if (stroke.key == "Enter") {
      addTask(title_input_value, body_input_value, document.getElementById('answers'));
      resetAllInputBoxs();
    }
  });
  WaitForInput("body_input_task");
  WaitForInput("title_input_task");
})

function WaitForInput(location) {
  //CR Minor - naming. a more indicative name (like setClearEventListener)
  document.getElementById(location).addEventListener("click", function (stroke) {
    //CR Minor - no need for stroke here
    MakeInputReady(location);
  });
}

function MakeInputReady(location) {
  //CR Minor - names should tell anyone who uses the function what the code inside does, this tells the code inside what its purpose is
  //           should probably be something like 'clearTextBox'
  document.getElementById(location).value = '';
  document.getElementById(location).style.fontStyle = "normal";
  document.getElementById(location).style.color = "black";
}
function ReturnInputToStyleNormal(location) {
  //CR Minor - why not just make this a CSS class?
  document.getElementById(location).style.fontStyle = "italic";
  document.getElementById(location).style.color = "lightgrey";
}
function hideDone() {
  isVisible = !!parseInt(document.getElementById("flag").innerHTML);
  document.getElementById("done_tasks_tab").style.display = isVisible ? "block" : "none";
  document.getElementById("hide/show_btn").innerHTML = isVisible ? "Hide" : "Show";
  document.getElementById("flag").innerHTML = isVisible ? 0 : 1;
  if(isVisible){
    document.getElementById("hide/show_btn").classList.add("yosef-mdc-button-outlined");
    document.getElementById("hide/show_btn").classList.remove("yosef-mdc-button");  
  }
  else{
    
    document.getElementById("hide/show_btn").classList.add("yosef-mdc-button");
    document.getElementById("hide/show_btn").classList.remove("yosef-mdc-button-outlined");
  }
}

function purify(str) {//from the web https://portswigger.net/web-security/cross-site-scripting/preventing
  return String(str).replace(/[^\w. ]/gi, function (c) {
    return '&#' + c.charCodeAt(0) + ';';
  });
}

function getInputValues() {
  const title_input_task_form = document.getElementById("title_input_task");
  const body_input_task_form = document.getElementById("body_input_task");

  const title_input_value = title_input_task_form.value;
  const body_input_value = body_input_task_form.value;

  return [title_input_value, body_input_value];
}

function resetAllInputBoxs() {
  const title_input_task_form = document.getElementById("title_input_task");
  const body_input_task_form = document.getElementById("body_input_task");

  title_input_task_form.value = 'Title ';
  body_input_task_form.value = 'Description';

  ReturnInputToStyleNormal("title_input_task");
  ReturnInputToStyleNormal("body_input_task");

}

function inputButtonAddTask() {
  inputs = getInputValues();
  const title_input_value = inputs[0], body_input_value = inputs[1];
  //CR Minor - could use this
  // const [title_input_value, body_input_value] = getInputValues();
  addTask(title_input_value, body_input_value, document.getElementById('answers'));
  resetAllInputBoxs();
}
function getTime() {
  var today = new Date();
  //CR Minor - use today.toLocaleTimeString.
  //CR Trivial - also, seeing as you only use the time part and not the date, 'today' is a weird name to use
  if (today.getMinutes() < 10) {
    var time = today.getHours() + ":0" + today.getMinutes();
  }
  else {
    var time = today.getHours() + ":" + today.getMinutes();
  }
  return time;
}
