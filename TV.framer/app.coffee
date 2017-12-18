
 # Command to include the FocusEngine Module in our TV Prototype
fe = require "FocusEngine"
# Create App Icons and Build the TV UI in a container layer
container = new Layer
 width: Screen.width
 height: Screen.height
 backgroundColor: "EAEAEA"
 
container.center()
# An array to hold all the app icons of the TV
icons = []
# Create app icons of the TV in a loop and push them onto the array
for i in [0...5]
 icon = new Layer
  width: 200
  height: 200
  x: (280 * i) + 60
  y: 60
  borderRadius: 6
  backgroundColor: Utils.randomColor() 
  parent: container
 icons.push(icon)
 
 # Initialize the focus engine with the app icons, all the layers that can be controlled with the remote need to be fed into the focus engine
fe.initialize(icons)
# Set the first icon to be on focus at the beginning
fe.placeFocus(icons[0])

ws.onmessage = (event) ->
 if event.data == "left"
  fe.changeFocus("left")
 else if event.data == "right" 
  fe.changeFocus("right")
 else if event.data == "up" 
  fe.changeFocus("up")
 else if event.data == "down" 
  fe.changeFocus("down")

 
 
