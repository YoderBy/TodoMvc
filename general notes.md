# git
- don't commit the .vscode directory, put it in a .gitignore file done
- good small commit size, could have more indicative naming done

# Code Design
- all the code is in one file, this greatly reduces readabilty and will make your code more an more messy as you expand it done
- you are saving all your data in the DOM. it's much better to have an array save the task and perform all ypur operations on it. only then should you render the data to DOM elements
- many functions do multiple things and data access is happening all over the place. try to make more of your functions pure or close to pure

# UI/UX
- having draggble boxes for the title is a bit weird 
- hovering on a task makes the whole text box jump to the left Done
- Minor UI improvements
  - change the font to something better, a sans-serif font maybe
  - it's weird that sometimes contextual buttons are to the right and sometimes to the left, be more consistent done
  - titles could be centered as well done
- despite this, the site looks much better than what I expected from you, good job!

# Requirements
- good thinking about UX features like hiding what's done 
- Tasks should have a title and an optional description next
- Tasks should show when they were added and if they are done, when the became done next 
- Existing tasks should not be editable without explicitly asking for them to be edited. add an edit button next

# bugs
- clicking the new task textbox while typing deletes what you typed