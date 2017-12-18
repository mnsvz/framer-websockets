# Command to include the Remote Control Module in our Remote Prototype
RemoteLayer = require "RemoteLayer"

# Create a remote control layer in a container layer and define the action it should do on swipes (left, right, up and down)
container = new Layer
 size: Screen.size
 backgroundColor: "EAEAEA"
myRemote = new RemoteLayer
 parent: container
 swipeUpAction: -> 
  ws.send("up")
 swipeDownAction: -> 
  ws.send("down")
 swipeLeftAction: -> 
  ws.send("left")
 swipeRightAction: -> 
  ws.send("right")