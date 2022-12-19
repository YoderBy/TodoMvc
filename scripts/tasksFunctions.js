
window.localStorage.setItem("id_counter", "0");
window.localStorage.setItem("is_hidden", "0");


function moveTo(id, location) {
  const victim_div = document.getElementById(`task_${id}`);
  const re_born = victim_div.cloneNode(true);//https://stackoverflow.com/questions/19482076/how-to-duplicate-a-div-in-javascript
  location.appendChild(re_born);
  victim_div.remove();
  //CR Minor - no need to delete and recreate, you can just move the node
  modifyTask(id);
}

function hideDone() {
  isVisible = !!parseInt(window.localStorage.getItem("isHidden"))
  //CR Minor - good use of localStorage, but seeing as this is global for the entire app this should have a more indicative name
  document.getElementById("done_tasks_tab").style.display = isVisible ? "block" : "none";
  document.getElementById("hide/show_btn").innerHTML = isVisible ? "Hide" : "Show";
  isHidden= isVisible ? "0" : "1";
  window.localStorage.setItem("isHidden", isHidden)
  
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
  return String(str)
} //CR Major - is this necessary?