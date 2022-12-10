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
    setClearEventListener("body_input_task");
    setClearEventListener("title_input_task");
  })
  
  function setClearEventListener(location) {
    //CR Minor - naming. a more indicative name (like setClearEventListener) Accepted
    document.getElementById(location).addEventListener("focus", function(stroke) {
      //CR Minor - no need for stroke here Accepted Actaully it does needed
      resetInputBoxes(location);
    });
  }

function resetInputBoxes(location) {
    //CR Minor - names should tell anyone who uses the function what the code inside does, this tells the code inside what its purpose is
    //           should probably be something like 'clearTextBox'
    document.getElementById(location).value = '';
    document.getElementById(location).classList.remove("input_style_default");
    document.getElementById(location).classList.add("input_style_writing");
  }
  function ReturnInputToStyleNormal(location) {
    //CR Minor - why not just make this a CSS class? Accepted
    document.getElementById(location).classList.add("input_style_default");
    document.getElementById(location).classList.remove("input_style_writing");
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
  
    title_input_task_form.value = 'Title';
    body_input_task_form.value = 'Description';
  
    ReturnInputToStyleNormal("title_input_task");
    ReturnInputToStyleNormal("body_input_task");
  
  }
  
  function inputButtonAddTask() {
    var [title_input_value, body_input_value] = getInputValues();
    if (body_input_value=='Description'){
        body_input_value = '';
    }
    //CR Minor - could use this
    // const [title_input_value, body_input_value] = getInputValues(); cool, accepted
    if(checkForInput()){  
        addTask(title_input_value, body_input_value, document.getElementById('answers'));
        resetAllInputBoxs();
    }
  }
function checkForInput(){
    const [title_input_value, body_input_value] = getInputValues();
    if (title_input_value == '' || title_input_value == "Title"){
        window.alert("please enter title for the task!");
        return false;
    }
    return true;
}
