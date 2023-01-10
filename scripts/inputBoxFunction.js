window.addEventListener('load', function () {
    const input_task_form = document.getElementById("input_box");
    input_task_form.addEventListener("keypress", function (stroke) {
      input_box = getInputValues();
      const title_input_value = input_box.title, body_input_value = input_box.description;
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
    var title_input_task_form = document.getElementById("title_input_task");
    var body_input_task_form = document.getElementById("body_input_task");
    //CR Minor - why not define these constants outside the scope of the function so that the other functions could access it as well? ((they can by calling this function - I ant it to update]))
    
    var title_input_value = title_input_task_form.value;
    var body_input_value = body_input_task_form.value;

    if (body_input_value=='Description'){
      body_input_value = '';
    }
    return {"title":title_input_value, "description": body_input_value}
    //CR Minor - you could also make this an object with {"title": "the title", "description": "the description"}
    //    this way it's more open to additions in the future ((Nice))
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
    var input_box = getInputValues();
    if (input_box.description == 'Description'){
        input_box.description = '';
    }
    if(checkForInput()){  
        addTask(document.getElementById('answers'));
        resetAllInputBoxs();
    }
}
function validateInput(){
  const input_box  = getInputValues();
  if (input_box.title == '' || input_box.title == "Title"){
    return false;
  }
  return true;

}

function checkForInput(){
    //CR Minor - why get the values twice instead of making a function named "validateInput" that recieves it as a parameter? better SRP and more testable //((done))
    if (!validateInput()){
      //CR Minor - look how much work just to avoid adding these to the css ((Meaning ?))
      raiseAlert("empty_input", "Error");
      //CR Minor - see comment about alerts in the general notes ((FIXED))
      return false;
    }
    return true;
}
function raiseAlert(error_name, error_text){
  alertbox = create_alert_box(error_name, error_text);
  document.getElementById("input_box").appendChild(alertbox);
}


function create_alert_box(error_name, error_text){
  alertbox = document.createElement('div');
  alertbox.id = `${error_name}_alert_box`;
  
  h1 = alertbox.appendChild(document.createElement("h1"));
  text = alertbox.appendChild(document.createElement("p"));
  text.innerHTML = error_text;

  alertbox_button = alertbox.appendChild(document.createElement("button"));
  alertbox_button.id = "close_alertbox_button";
  alertbox_button.href = "#";
  alertbox_button.innerHTML= "gdas";
  alertbox_button.classList.add("alertbox_button");
  alertbox_button.onclick = function() {removeCustomAlert();}

  alertbox.classList.add("alertbox");

  return alertbox;
}
function removeCustomAlert(error_name) {
  input_box = document.getElementById("input_box");
  input_box.removeChild(input_box.children[input_box.children.length-1]);
}