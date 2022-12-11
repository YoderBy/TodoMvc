
function editTask(id) {
    isEditAble = !!parseInt(document.getElementById(`${id}_is_editable`).innerHTML);// 1 return True, 0 return False
    document.getElementById(`title_val_task${id}`).disabled = isEditAble ? 0 : 1;
    document.getElementById(`text_val_task${id}`).disabled = isEditAble ? 0 : 1;
    document.getElementById(`edit_btn${id}`).innerHTML = isEditAble ? "Save" : "Edit";
    document.getElementById(`title_val_task${id}`).style.fontStyle = isEditAble ? "italic" : "normal";
    document.getElementById(`text_val_task${id}`).style.fontStyle = isEditAble ? "italic" : "normal";
    document.getElementById(`edit_btn${id}`).style.backgroundColor = isEditAble ? "rgb(185, 243, 198)" : "rgb(255, 255, 255)";
    document.getElementById(`${id}_is_editable`).innerHTML = isEditAble ? 0 : 1;
}

function removeTask(id) {
    const victim_div = document.getElementById(`task_${id}`);
    victim_div.remove();
}

  

