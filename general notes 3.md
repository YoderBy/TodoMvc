# git
- less indicative commit names than before- ".", "x", and "ג" are not indicative

# Code Design
- several instances of code duplication'
- still storing data in DOM
  - NOT FIXED FROM LAST CR
- 88 lines long function

# Code Styling
- style should only be in CSS
  - NOT FIXED FROM LAST CR
- don't save space on variable names

# UI/UX
- the text boxes are white on white, so you can't see where they are- change their color or add an outline/shadow ((DONE))
  - the textbox part (the part you can click to insert text) is still unclear, especially if you click it and then click away
- when minimizing the ((DONE)) tasks, it still takes a lot of room. think where else the show button could be ((DONE))
  - the DONE TASKS container doesn't need to be visible at all if the user doesn't want to show it, move the button to the regular task container and remove the done tasks container completly when not required
- alert() is very agressive (makes the focus jump to the top of the screen, freezes the site while active by making JS not run, not alligned with the rest of the website's design) so we tend to avoid it. when using frameworks there are various libraries that handle alerts and prompts very nicely, but seeing as you can't use them adding a small red <\p> tag explaining the problem with the input is also good
- I don't really like the style of the checkbox on the left of the TODO items, it doesn't fit with the rest of the site. perhaps a purple square with a checkmark icon would fit better (like the add and edit buttons)? 

# Bugs
- time of posting is truncated

# Other
- removed packages still in the projects dependencies in package.json