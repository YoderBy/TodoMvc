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
    document.getElementById(location).addEventListener("focus", function(stroke) {
      //CR Minor - no need for stroke here.(( Actaully it does needed))
      //JS doesn't require you to specify the paramaters you recieve if you don't use them. you can even make this an anonymous function by changing it to
      // addEventListener("focus", () => resetInputBoxes(location);
      resetInputBoxes(location);
    });
}

function resetInputBoxes(location) {
    document.getElementById(location).value = '';
    document.getElementById(location).classList.remove("input_style_default");
    document.getElementById(location).classList.add("input_style_writing");
}

  function ReturnInputToStyleNormal(location) {
    //CR Minor - if these classes are mutually exclusive why not use css's :not()?
    document.getElementById(location).classList.add("input_style_default");
    document.getElementById(location).classList.remove("input_style_writing");

}
 
function getInputValues() {
    const title_input_task_form = document.getElementById("title_input_task");
    const body_input_task_form = document.getElementById("body_input_task");
    //CR Minor - why not define these constants outside the scope of the function so that the other functions could access it as well? 
    
    const title_input_value = title_input_task_form.value;
    const body_input_value = body_input_task_form.value;
  
    if (body_input_value=='Description'){
      body_input_value = '';
    }
    
    return [title_input_value, body_input_value];
    //CR Minor - you could also make this an object with {"title": "the title", "description": "the description"}
    //           this way it's more open to additions in the future
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
    if(checkForInput()){  
        addTask(document.getElementById('answers'));
        resetAllInputBoxs();
    }
}
function checkForInput(){
    const [title_input_value, body_input_value] = getInputValues();
    //CR Minor - why get the values twice instead of making a function named "validateInput" that recieves it as a parameter? better SRP and more testable
    if (title_input_value == '' || title_input_value == "Title"){
      //CR Minor - look how much work just to avoid adding these to the css
        window.alert("Please enter title for the task!");
        //CR Minor - see comment about alerts in the general notes
        return false;
    }
    return true;
}
