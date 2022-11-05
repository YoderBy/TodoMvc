# git
- don't commit node_modules, it's a 33.4MB folder
- great commits, very indicative naming!

# Code Design
- last time I said all the code is in 1 file, now it's in 2 files. this is marginally better but it would be best if each file had only one responsibility (SRP)- 
  - for example, a component based design could have each component (each TODO item for example, the TODO container, the finished tasks container) be a different file, making it much easier to know exactly where to go when you want to add a new feature
  - alternativly, you could split the files so that one file only handles the logic of your app (adding a new TODO item, editing, enabling/disabling the history), and another only updating the DOM (that just recieves commands from the other file)
    - of course, these two files could also be split to multiple seperate responsibilities within these large ones
- don't use DOM elements to save your state

# Code Styling
- use camelCase for JS variable names

# UI/UX
- the text boxes are white on white, so you can't see where they are- change their color or add an outline/shadow
- when minimizing the done tasks, it still takes a lot of room. think where else the show button could be
- consider adding animations and transitions
- the delete button only appearing on hover is very nice

# Requirements
- make it so that you can't add empty todo items (or ones with just the default text) by clicking the add button a lot
- I asked you to use only vanillaJS without any npm packages so that you learn the basics (including  css)

# bugs
- by default, an item's description will be "description", but if you click the description textbox its empty- decide what is the wanted functionality and make it consistent

- clicking a full textbox clears it (selecting it via pressing TAB doesn't)