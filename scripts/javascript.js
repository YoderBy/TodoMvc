window.addEventListener('load', function () {
  const input_task_form = document.getElementById("input_task");
  input_task_form.addEventListener("keypress", function(stroke) {
    if (stroke.key == "Enter") {
      const task_location = document.getElementById('answers');
      const input_value = input_task_form.value;
      addTask(document.getElementById('input_task').value,document.getElementById('answers'))
      input_task_form.value = '';
      //addTask(input_value, task_location);
    }
  });
  input_task_form.addEventListener("click", function(stroke) {
    input_task_form.value ='';
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