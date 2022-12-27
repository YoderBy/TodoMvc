
window.localStorage.setItem("id_counter", "0");
window.localStorage.setItem("is_hidden", "0");


function moveTo(id, location) {
  const victim_div = document.getElementById(`task_${id}`);
  const re_born = victim_div.cloneNode(true);//https://stackoverflow.com/questions/19482076/how-to-duplicate-a-div-in-javascript
  location.appendChild(re_born); 
  victim_div.remove();
  //CR Minor - no need to delete and recreate, you can just move the node ((searched for methid for this. not found))
  modifyTask(id);
}

function hideDone() {
  hide_toggle_state = !!parseInt(window.localStorage.getItem("isHidden"))
  //CR Minor - good use of localStorage, but seeing as this is global for the entire app this should have a more indicative name ((FIXED))
  document.getElementById("done_tasks_tab").style.display = hide_toggle_state ? "block" : "none";
  document.getElementById("hide/show_btn").innerHTML = hide_toggle_state ? "Hide" : "Show";
  isHidden= hide_toggle_state ? "0" : "1";
  window.localStorage.setItem("isHidden", isHidden)
  
  if(hide_toggle_state){
    document.getElementById("hide/show_btn").classList.add("yosef-mdc-button-outlined");
    document.getElementById("hide/show_btn").classList.remove("yosef-mdc-button");  
  }
  else{
    
    document.getElementById("hide/show_btn").classList.add("yosef-mdc-button");
    document.getElementById("hide/show_btn").classList.remove("yosef-mdc-button-outlined");
  }
}
