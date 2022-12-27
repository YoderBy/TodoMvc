

function editTask(id) {
    //i thhink it can be rep;aced with something much smaller
    isEditAble = !!parseInt(window.localStorage.getItem(`${id}_is_editable`));// 1 return True, 0 return False
    //CR Major - I already told you not to store data in the DOM K
    document.getElementById(`title_val_task${id}`).disabled = isEditAble ? 0 : 1;
    document.getElementById(`text_val_task${id}`).disabled = isEditAble ? 0 : 1;
    document.getElementById(`edit_btn${id}`).innerHTML = isEditAble ? "Save" : "Edit";

    //CR Major - don't set style in the JS 
    document.getElementById(`${id}_is_editable`).innerHTML = isEditAble ? 0 : 1;
}

function removeTask(id) {
    const victim_div = document.getElementById(`task_${id}`);
    victim_div.remove();
}

  

