require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"FocusEngine":[function(require,module,exports){

/*
	 * USING THE FOCUSENGINE

	 * Require the module
	fe = require "FocusEngine"

	 * Customize focus and unfocused states
	fe.focusStyle.scale = <number>
	fe.focusStyle.shadowX = <number>
	fe.focusStyle.shadowY = <number>
	fe.focusStyle.shadowColor = <string> (hex or rgba)
	fe.focusStyle.shadowBlur = <number>
	fe.focusStyle.shadowSpread = <number>

	fe.unfocusStyle.shadowX = <number>
	fe.unfocusStyle.shadowY = <number>
	fe.unfocusStyle.shadowColor = <string> (hex or rgba)
	fe.unfocusStyle.shadowBlur = <number>
	fe.unfocusStyle.shadowSpread = <number>

	 * Customize state switch duration
	fe.time = <number>

	 * Collect layers which will participate into an array
	myFocusableLayers = [layerA, layerB, layerC]

	 * Initialize the engine with your array
	fe.initialize(myFocusableLayers)

	 * Add a layer created post-initialization
	fe.addLayer(layerA)

	 * Optionally attach changeFocus() to keyboard events
	document.addEventListener "keydown", (event) ->
		keyCode = event.which
		switch keyCode
			when 13 then fe.changeFocus("select")
			when 37 then fe.changeFocus("left")
			when 38 then fe.changeFocus("up")
			when 39 then fe.changeFocus("right")
			when 40 then fe.changeFocus("down")
			else null

	 * Place initial focus
	fe.placeFocus(layerA)

	 * focusPrevious() is available to use in conjunction with FlowComponent's showPrevious()
	fe.focusPrevious()

	 * Layers can trigger behavior upon receiving or losing focus, or being selected
	layerA.on "focus", ->
	layerA.on "unfocus", ->
	layerA.on "selected", ->

	 * Check the currently focused layer
	print fe.focus

	 * Check whether a layer has focus
	print layerA.focus

	 * Integration with RemoteLayer (https://github.com/bpxl-labs/RemoteLayer)
	RemoteLayer = require "RemoteLayer"
	myRemote = new RemoteLayer
		clickAction: -> fe.changeFocus("select")
		swipeUpAction: -> fe.changeFocus("up")
		swipeDownAction: -> fe.changeFocus("down")
		swipeLeftAction: -> fe.changeFocus("left")
		swipeRightAction: -> fe.changeFocus("right")

	 * Enable debug mode to log focus changes
	fe.debug = true
 */
var checkVisible, measureDistance, styleLayer, unfocusAll,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

exports.debug = false;

exports.focus = null;

exports.initialFocus = null;

exports.previousFocus = null;

exports.focusable = [];

exports.time = 0.25;

exports.focusStyle = {
  scale: 1.1,
  shadowBlur: 20,
  shadowColor: "rgba(0,0,0,0.3)",
  shadowX: 0,
  shadowY: 0,
  shadowSpread: 0
};

exports.unfocusStyle = {
  shadowBlur: 20,
  shadowColor: "rgba(0,0,0,0)",
  shadowX: 0,
  shadowY: 0,
  shadowSpread: 0
};

exports.initialize = function(focusableArray) {
  var i, layer, len, ref, results;
  exports.focusable = focusableArray;
  ref = exports.focusable;
  results = [];
  for (i = 0, len = ref.length; i < len; i++) {
    layer = ref[i];
    if (layer.overrides === void 0) {
      layer.overrides = {
        up: null,
        down: null,
        left: null,
        right: null
      };
    }
    layer.focus = false;
    results.push(styleLayer(layer));
  }
  return results;
};

checkVisible = function(layer) {
  var ancestor, i, isVisible, len, ref;
  isVisible = true;
  if (layer.visible === false) {
    isVisible = false;
    return isVisible;
  }
  ref = layer.ancestors();
  for (i = 0, len = ref.length; i < len; i++) {
    ancestor = ref[i];
    if ((ancestor != null ? ancestor.visible : void 0) === false) {
      isVisible = false;
      return isVisible;
    } else {
      isVisible = true;
    }
  }
  return isVisible;
};

exports.placeFocus = Utils.throttle(0.1, function(layer) {
  if (layer == null) {
    layer = null;
  }
  if (layer === null) {
    return;
  }
  if (exports.initialFocus === null) {
    exports.initialFocus = layer;
  }
  if (exports.focus !== null) {
    exports.previousFocus = exports.focus;
  }
  if (checkVisible(layer) === true && layer !== null) {
    exports.focus = layer;
    unfocusAll();
    layer.emit("focus");
    layer.focus = true;
    if (layer !== null && indexOf.call(exports.focusable, layer) >= 0) {
      return layer != null ? layer.animate("focus") : void 0;
    }
  }
});

unfocusAll = function() {
  var i, layer, len, ref, results;
  ref = exports.focusable;
  results = [];
  for (i = 0, len = ref.length; i < len; i++) {
    layer = ref[i];
    if (layer.focus === true) {
      layer.emit("unfocus");
      layer.focus = false;
      results.push(layer.animate("unfocus"));
    } else {
      results.push(void 0);
    }
  }
  return results;
};

exports.focusPrevious = function() {
  if (exports.previousFocus !== null) {
    return exports.placeFocus(exports.previousFocus);
  }
};

exports.addLayer = function(layer) {
  exports.focusable.push(layer);
  layer.focus = false;
  return styleLayer(layer);
};

styleLayer = function(layer) {
  layer.states.focus = {
    scale: layer.scale * exports.focusStyle.scale,
    shadowBlur: exports.focusStyle.shadowBlur,
    shadowSpread: exports.focusStyle.shadowSpread,
    shadowColor: exports.focusStyle.shadowColor,
    shadowX: exports.focusStyle.shadowX,
    shadowY: exports.focusStyle.shadowY,
    animationOptions: {
      time: exports.time
    }
  };
  layer.states.unfocus = {
    scale: layer.scale,
    shadowBlur: exports.unfocusStyle.shadowBlur,
    shadowSpread: exports.unfocusStyle.shadowSpread,
    shadowColor: exports.unfocusStyle.shadowColor,
    shadowX: exports.unfocusStyle.shadowX,
    shadowY: exports.unfocusStyle.shadowY,
    animationOptions: {
      time: exports.time
    }
  };
  return layer.animate("unfocus", {
    instant: true
  });
};

exports.changeFocus = Utils.throttle(0.1, function(direction) {
  var distance, focusMidX, focusMidY, i, j, k, l, layer, layerMidX, layerMidY, len, len1, len2, len3, len4, m, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8, shortestDistance, targetLayer, tempArray;
  if (exports.focus === null && exports.initialFocus === null) {
    print("No initial focus set. Use placeFocus(layer) to set.");
    return;
  }
  if (exports.debug === true) {
    print("focus was: " + (((ref = exports.focus) != null ? ref.name : void 0) || ((ref1 = exports.focus) != null ? (ref2 = ref1.__framerInstanceInfo) != null ? ref2.targetName : void 0 : void 0) || "unnamed layer") + "; direction: " + direction);
  }
  tempArray = [];
  if (exports.focus === null || exports.focus === void 0) {
    exports.placeFocus(exports.initialFocus);
  }
  if (((ref3 = exports.focus.overrides) != null ? ref3[direction] : void 0) !== void 0 && ((ref4 = exports.focus.overrides) != null ? ref4[direction] : void 0) !== null) {
    return exports.placeFocus(exports.focus.overrides[direction]);
  } else {
    focusMidX = exports.focus.screenFrame.x + exports.focus.screenFrame.width / 2;
    focusMidY = exports.focus.screenFrame.y + exports.focus.screenFrame.height / 2;
    if (direction === "up") {
      ref5 = exports.focusable;
      for (i = 0, len = ref5.length; i < len; i++) {
        layer = ref5[i];
        layerMidY = layer.screenFrame.y + layer.screenFrame.height / 2;
        if (layerMidY < focusMidY && checkVisible(layer) === true) {
          tempArray.push(layer);
        }
      }
    } else if (direction === "down") {
      ref6 = exports.focusable;
      for (j = 0, len1 = ref6.length; j < len1; j++) {
        layer = ref6[j];
        layerMidY = layer.screenFrame.y + layer.screenFrame.height / 2;
        if (layerMidY > focusMidY && checkVisible(layer) === true) {
          tempArray.push(layer);
        }
      }
    } else if (direction === "left") {
      ref7 = exports.focusable;
      for (k = 0, len2 = ref7.length; k < len2; k++) {
        layer = ref7[k];
        layerMidX = layer.screenFrame.x + layer.screenFrame.width / 2;
        if (layerMidX < focusMidX && checkVisible(layer) === true) {
          tempArray.push(layer);
        }
      }
    } else if (direction === "right") {
      ref8 = exports.focusable;
      for (l = 0, len3 = ref8.length; l < len3; l++) {
        layer = ref8[l];
        layerMidX = layer.screenFrame.x + layer.screenFrame.width / 2;
        if (layerMidX > focusMidX && checkVisible(layer) === true) {
          tempArray.push(layer);
        }
      }
    } else if (direction === "select") {
      exports.focus.emit("selected");
    }
    if (tempArray.length === 0) {
      return;
    }
    targetLayer = tempArray[0];
    shortestDistance = measureDistance(targetLayer, direction);
    for (m = 0, len4 = tempArray.length; m < len4; m++) {
      layer = tempArray[m];
      distance = measureDistance(layer, direction);
      if (distance < shortestDistance) {
        targetLayer = layer;
        shortestDistance = distance;
      }
    }
    return exports.placeFocus(targetLayer);
  }
});

measureDistance = function(target, direction) {
  var absoluteDistance, distanceX, distanceY, focusBottomCenter, focusLeftCenter, focusRightCenter, focusTopCenter, targetBottomCenter, targetLeftCenter, targetRightCenter, targetTopCenter;
  focusTopCenter = {
    x: exports.focus.screenFrame.x + exports.focus.screenFrame.width / 2,
    y: exports.focus.screenFrame.y
  };
  focusBottomCenter = {
    x: exports.focus.screenFrame.x + exports.focus.screenFrame.width / 2,
    y: exports.focus.screenFrame.y + exports.focus.screenFrame.height
  };
  focusLeftCenter = {
    x: exports.focus.screenFrame.x,
    y: exports.focus.screenFrame.y + exports.focus.screenFrame.height / 2
  };
  focusRightCenter = {
    x: exports.focus.screenFrame.x + exports.focus.screenFrame.width,
    y: exports.focus.screenFrame.y + exports.focus.screenFrame.height / 2
  };
  targetTopCenter = {
    x: target.screenFrame.x + target.screenFrame.width / 2,
    y: target.screenFrame.y
  };
  targetBottomCenter = {
    x: target.screenFrame.x + target.screenFrame.width / 2,
    y: target.screenFrame.y + target.screenFrame.height
  };
  targetLeftCenter = {
    x: target.screenFrame.x,
    y: target.screenFrame.y + target.screenFrame.height / 2
  };
  targetRightCenter = {
    x: target.screenFrame.x + target.screenFrame.width,
    y: target.screenFrame.y + target.screenFrame.height / 2
  };
  switch (direction) {
    case "up":
      distanceX = focusTopCenter.x - targetBottomCenter.x;
      distanceY = focusTopCenter.y - targetBottomCenter.y;
      break;
    case "down":
      distanceX = focusBottomCenter.x - targetTopCenter.x;
      distanceY = focusBottomCenter.y - targetBottomCenter.y;
      break;
    case "left":
      distanceX = focusLeftCenter.x - targetRightCenter.x;
      distanceY = focusLeftCenter.y - targetRightCenter.y;
      break;
    case "right":
      distanceX = focusRightCenter.x - targetLeftCenter.x;
      distanceY = focusRightCenter.y - targetLeftCenter.y;
  }
  absoluteDistance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
  return absoluteDistance;
};

Events.Focus = "focus";

Layer.prototype.onFocus = function(cb) {
  return this.on(Events.Focus, cb);
};

Events.Unfocus = "unfocus";

Layer.prototype.onUnfocus = function(cb) {
  return this.on(Events.Unfocus, cb);
};

Events.Selected = "selected";

Layer.prototype.onSelected = function(cb) {
  return this.on(Events.Selected, cb);
};


},{}],"myModule":[function(require,module,exports){
exports.myVar = "myVariable";

exports.myFunction = function() {
  return print("myFunction is running");
};

exports.myArray = [1, 2, 3];


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3JhdmlzaGFua2FyX2NvbnQxL0RvY3VtZW50cy9mcmFtZXIvVFYuZnJhbWVyL21vZHVsZXMvbXlNb2R1bGUuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvcmF2aXNoYW5rYXJfY29udDEvRG9jdW1lbnRzL2ZyYW1lci9UVi5mcmFtZXIvbW9kdWxlcy9Gb2N1c0VuZ2luZS5jb2ZmZWUiLCJub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiMgQWRkIHRoZSBmb2xsb3dpbmcgbGluZSB0byB5b3VyIHByb2plY3QgaW4gRnJhbWVyIFN0dWRpby4gXG4jIG15TW9kdWxlID0gcmVxdWlyZSBcIm15TW9kdWxlXCJcbiMgUmVmZXJlbmNlIHRoZSBjb250ZW50cyBieSBuYW1lLCBsaWtlIG15TW9kdWxlLm15RnVuY3Rpb24oKSBvciBteU1vZHVsZS5teVZhclxuXG5leHBvcnRzLm15VmFyID0gXCJteVZhcmlhYmxlXCJcblxuZXhwb3J0cy5teUZ1bmN0aW9uID0gLT5cblx0cHJpbnQgXCJteUZ1bmN0aW9uIGlzIHJ1bm5pbmdcIlxuXG5leHBvcnRzLm15QXJyYXkgPSBbMSwgMiwgM10iLCIjIyNcblx0IyBVU0lORyBUSEUgRk9DVVNFTkdJTkVcblxuXHQjIFJlcXVpcmUgdGhlIG1vZHVsZVxuXHRmZSA9IHJlcXVpcmUgXCJGb2N1c0VuZ2luZVwiXG5cblx0IyBDdXN0b21pemUgZm9jdXMgYW5kIHVuZm9jdXNlZCBzdGF0ZXNcblx0ZmUuZm9jdXNTdHlsZS5zY2FsZSA9IDxudW1iZXI+XG5cdGZlLmZvY3VzU3R5bGUuc2hhZG93WCA9IDxudW1iZXI+XG5cdGZlLmZvY3VzU3R5bGUuc2hhZG93WSA9IDxudW1iZXI+XG5cdGZlLmZvY3VzU3R5bGUuc2hhZG93Q29sb3IgPSA8c3RyaW5nPiAoaGV4IG9yIHJnYmEpXG5cdGZlLmZvY3VzU3R5bGUuc2hhZG93Qmx1ciA9IDxudW1iZXI+XG5cdGZlLmZvY3VzU3R5bGUuc2hhZG93U3ByZWFkID0gPG51bWJlcj5cblxuXHRmZS51bmZvY3VzU3R5bGUuc2hhZG93WCA9IDxudW1iZXI+XG5cdGZlLnVuZm9jdXNTdHlsZS5zaGFkb3dZID0gPG51bWJlcj5cblx0ZmUudW5mb2N1c1N0eWxlLnNoYWRvd0NvbG9yID0gPHN0cmluZz4gKGhleCBvciByZ2JhKVxuXHRmZS51bmZvY3VzU3R5bGUuc2hhZG93Qmx1ciA9IDxudW1iZXI+XG5cdGZlLnVuZm9jdXNTdHlsZS5zaGFkb3dTcHJlYWQgPSA8bnVtYmVyPlxuXG5cdCMgQ3VzdG9taXplIHN0YXRlIHN3aXRjaCBkdXJhdGlvblxuXHRmZS50aW1lID0gPG51bWJlcj5cblxuXHQjIENvbGxlY3QgbGF5ZXJzIHdoaWNoIHdpbGwgcGFydGljaXBhdGUgaW50byBhbiBhcnJheVxuXHRteUZvY3VzYWJsZUxheWVycyA9IFtsYXllckEsIGxheWVyQiwgbGF5ZXJDXVxuXG5cdCMgSW5pdGlhbGl6ZSB0aGUgZW5naW5lIHdpdGggeW91ciBhcnJheVxuXHRmZS5pbml0aWFsaXplKG15Rm9jdXNhYmxlTGF5ZXJzKVxuXG5cdCMgQWRkIGEgbGF5ZXIgY3JlYXRlZCBwb3N0LWluaXRpYWxpemF0aW9uXG5cdGZlLmFkZExheWVyKGxheWVyQSlcblxuXHQjIE9wdGlvbmFsbHkgYXR0YWNoIGNoYW5nZUZvY3VzKCkgdG8ga2V5Ym9hcmQgZXZlbnRzXG5cdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIgXCJrZXlkb3duXCIsIChldmVudCkgLT5cblx0XHRrZXlDb2RlID0gZXZlbnQud2hpY2hcblx0XHRzd2l0Y2gga2V5Q29kZVxuXHRcdFx0d2hlbiAxMyB0aGVuIGZlLmNoYW5nZUZvY3VzKFwic2VsZWN0XCIpXG5cdFx0XHR3aGVuIDM3IHRoZW4gZmUuY2hhbmdlRm9jdXMoXCJsZWZ0XCIpXG5cdFx0XHR3aGVuIDM4IHRoZW4gZmUuY2hhbmdlRm9jdXMoXCJ1cFwiKVxuXHRcdFx0d2hlbiAzOSB0aGVuIGZlLmNoYW5nZUZvY3VzKFwicmlnaHRcIilcblx0XHRcdHdoZW4gNDAgdGhlbiBmZS5jaGFuZ2VGb2N1cyhcImRvd25cIilcblx0XHRcdGVsc2UgbnVsbFxuXG5cdCMgUGxhY2UgaW5pdGlhbCBmb2N1c1xuXHRmZS5wbGFjZUZvY3VzKGxheWVyQSlcblxuXHQjIGZvY3VzUHJldmlvdXMoKSBpcyBhdmFpbGFibGUgdG8gdXNlIGluIGNvbmp1bmN0aW9uIHdpdGggRmxvd0NvbXBvbmVudCdzIHNob3dQcmV2aW91cygpXG5cdGZlLmZvY3VzUHJldmlvdXMoKVxuXG5cdCMgTGF5ZXJzIGNhbiB0cmlnZ2VyIGJlaGF2aW9yIHVwb24gcmVjZWl2aW5nIG9yIGxvc2luZyBmb2N1cywgb3IgYmVpbmcgc2VsZWN0ZWRcblx0bGF5ZXJBLm9uIFwiZm9jdXNcIiwgLT5cblx0bGF5ZXJBLm9uIFwidW5mb2N1c1wiLCAtPlxuXHRsYXllckEub24gXCJzZWxlY3RlZFwiLCAtPlxuXG5cdCMgQ2hlY2sgdGhlIGN1cnJlbnRseSBmb2N1c2VkIGxheWVyXG5cdHByaW50IGZlLmZvY3VzXG5cblx0IyBDaGVjayB3aGV0aGVyIGEgbGF5ZXIgaGFzIGZvY3VzXG5cdHByaW50IGxheWVyQS5mb2N1c1xuXG5cdCMgSW50ZWdyYXRpb24gd2l0aCBSZW1vdGVMYXllciAoaHR0cHM6Ly9naXRodWIuY29tL2JweGwtbGFicy9SZW1vdGVMYXllcilcblx0UmVtb3RlTGF5ZXIgPSByZXF1aXJlIFwiUmVtb3RlTGF5ZXJcIlxuXHRteVJlbW90ZSA9IG5ldyBSZW1vdGVMYXllclxuXHRcdGNsaWNrQWN0aW9uOiAtPiBmZS5jaGFuZ2VGb2N1cyhcInNlbGVjdFwiKVxuXHRcdHN3aXBlVXBBY3Rpb246IC0+IGZlLmNoYW5nZUZvY3VzKFwidXBcIilcblx0XHRzd2lwZURvd25BY3Rpb246IC0+IGZlLmNoYW5nZUZvY3VzKFwiZG93blwiKVxuXHRcdHN3aXBlTGVmdEFjdGlvbjogLT4gZmUuY2hhbmdlRm9jdXMoXCJsZWZ0XCIpXG5cdFx0c3dpcGVSaWdodEFjdGlvbjogLT4gZmUuY2hhbmdlRm9jdXMoXCJyaWdodFwiKVxuXG5cdCMgRW5hYmxlIGRlYnVnIG1vZGUgdG8gbG9nIGZvY3VzIGNoYW5nZXNcblx0ZmUuZGVidWcgPSB0cnVlXG4jIyNcblxuZXhwb3J0cy5kZWJ1ZyA9IGZhbHNlXG5cbiMgZm9jdXMgc3RvcmVcbmV4cG9ydHMuZm9jdXMgPSBudWxsXG5leHBvcnRzLmluaXRpYWxGb2N1cyA9IG51bGxcbmV4cG9ydHMucHJldmlvdXNGb2N1cyA9IG51bGxcbmV4cG9ydHMuZm9jdXNhYmxlID0gW11cbmV4cG9ydHMudGltZSA9IDAuMjVcblxuIyBmb2N1cyBzdHlsZVxuZXhwb3J0cy5mb2N1c1N0eWxlID1cblx0c2NhbGU6IDEuMVxuXHRzaGFkb3dCbHVyOiAyMFxuXHRzaGFkb3dDb2xvcjogXCJyZ2JhKDAsMCwwLDAuMylcIlxuXHRzaGFkb3dYOiAwXG5cdHNoYWRvd1k6IDBcblx0c2hhZG93U3ByZWFkOiAwXG5cbmV4cG9ydHMudW5mb2N1c1N0eWxlID1cblx0c2hhZG93Qmx1cjogMjBcblx0c2hhZG93Q29sb3I6IFwicmdiYSgwLDAsMCwwKVwiXG5cdHNoYWRvd1g6IDBcblx0c2hhZG93WTogMFxuXHRzaGFkb3dTcHJlYWQ6IDBcblxuIyBwcmVwIGZvY3VzIHN0YXRlc1xuZXhwb3J0cy5pbml0aWFsaXplID0gKGZvY3VzYWJsZUFycmF5KSAtPlxuXHRleHBvcnRzLmZvY3VzYWJsZSA9IGZvY3VzYWJsZUFycmF5XG5cdGZvciBsYXllciBpbiBleHBvcnRzLmZvY3VzYWJsZVxuXHRcdGlmIGxheWVyLm92ZXJyaWRlcyA9PSB1bmRlZmluZWRcblx0XHRcdGxheWVyLm92ZXJyaWRlcyA9XG5cdFx0XHRcdHVwOiBudWxsXG5cdFx0XHRcdGRvd246IG51bGxcblx0XHRcdFx0bGVmdDogbnVsbFxuXHRcdFx0XHRyaWdodDogbnVsbFxuXHRcdGxheWVyLmZvY3VzID0gZmFsc2Vcblx0XHRzdHlsZUxheWVyKGxheWVyKVxuXG4jIGxheWVyIHZpc2liaWxpdHlcbmNoZWNrVmlzaWJsZSA9IChsYXllcikgLT5cblx0aXNWaXNpYmxlID0gdHJ1ZVxuXHRpZiBsYXllci52aXNpYmxlID09IGZhbHNlXG5cdFx0aXNWaXNpYmxlID0gZmFsc2Vcblx0XHRyZXR1cm4gaXNWaXNpYmxlXG5cdGZvciBhbmNlc3RvciBpbiBsYXllci5hbmNlc3RvcnMoKVxuXHRcdGlmIGFuY2VzdG9yPy52aXNpYmxlID09IGZhbHNlXG5cdFx0XHRpc1Zpc2libGUgPSBmYWxzZVxuXHRcdFx0cmV0dXJuIGlzVmlzaWJsZVxuXHRcdGVsc2Vcblx0XHRcdGlzVmlzaWJsZSA9IHRydWVcblx0cmV0dXJuIGlzVmlzaWJsZVxuXG4jIGZvY3VzIGNoYW5nZVxuZXhwb3J0cy5wbGFjZUZvY3VzID0gVXRpbHMudGhyb3R0bGUgMC4xLCAobGF5ZXIgPSBudWxsKSAtPlxuXHRpZiBsYXllciA9PSBudWxsXG5cdFx0cmV0dXJuXG5cdCMgc3RvcmUgaW5pdGlhbCBmb2N1cyBvbiBmaXJzdCBydW5cblx0aWYgZXhwb3J0cy5pbml0aWFsRm9jdXMgPT0gbnVsbFxuXHRcdGV4cG9ydHMuaW5pdGlhbEZvY3VzID0gbGF5ZXJcblx0IyBzdG9yZSBjdXJyZW50IGZvY3VzIGZvciByZXR1cm5pbmcgZWFzaWx5XG5cdGlmIGV4cG9ydHMuZm9jdXMgIT0gbnVsbFxuXHRcdGV4cG9ydHMucHJldmlvdXNGb2N1cyA9IGV4cG9ydHMuZm9jdXNcblx0aWYgY2hlY2tWaXNpYmxlKGxheWVyKSA9PSB0cnVlIGFuZCBsYXllciAhPSBudWxsXG5cdFx0ZXhwb3J0cy5mb2N1cyA9IGxheWVyXG5cdFx0dW5mb2N1c0FsbCgpXG5cdFx0bGF5ZXIuZW1pdCBcImZvY3VzXCJcblx0XHRsYXllci5mb2N1cyA9IHRydWVcblx0XHRpZiBsYXllciAhPSBudWxsIGFuZCBsYXllciBpbiBleHBvcnRzLmZvY3VzYWJsZVxuXHRcdFx0bGF5ZXI/LmFuaW1hdGUoXCJmb2N1c1wiKVxuXG51bmZvY3VzQWxsID0gKCkgLT5cblx0Zm9yIGxheWVyIGluIGV4cG9ydHMuZm9jdXNhYmxlXG5cdFx0aWYgbGF5ZXIuZm9jdXMgPT0gdHJ1ZVxuXHRcdFx0bGF5ZXIuZW1pdCBcInVuZm9jdXNcIlxuXHRcdFx0bGF5ZXIuZm9jdXMgPSBmYWxzZVxuXHRcdFx0bGF5ZXIuYW5pbWF0ZShcInVuZm9jdXNcIilcblxuZXhwb3J0cy5mb2N1c1ByZXZpb3VzID0gKCkgLT5cblx0aWYgZXhwb3J0cy5wcmV2aW91c0ZvY3VzICE9IG51bGxcblx0XHRleHBvcnRzLnBsYWNlRm9jdXMoZXhwb3J0cy5wcmV2aW91c0ZvY3VzKVxuXG5leHBvcnRzLmFkZExheWVyID0gKGxheWVyKSAtPlxuXHRleHBvcnRzLmZvY3VzYWJsZS5wdXNoKGxheWVyKVxuXHRsYXllci5mb2N1cyA9IGZhbHNlXG5cdHN0eWxlTGF5ZXIobGF5ZXIpXG5cbnN0eWxlTGF5ZXIgPSAobGF5ZXIpIC0+XG5cdGxheWVyLnN0YXRlcy5mb2N1cyA9XG5cdFx0c2NhbGU6IGxheWVyLnNjYWxlICogZXhwb3J0cy5mb2N1c1N0eWxlLnNjYWxlXG5cdFx0c2hhZG93Qmx1cjogZXhwb3J0cy5mb2N1c1N0eWxlLnNoYWRvd0JsdXJcblx0XHRzaGFkb3dTcHJlYWQ6IGV4cG9ydHMuZm9jdXNTdHlsZS5zaGFkb3dTcHJlYWRcblx0XHRzaGFkb3dDb2xvcjogZXhwb3J0cy5mb2N1c1N0eWxlLnNoYWRvd0NvbG9yXG5cdFx0c2hhZG93WDogZXhwb3J0cy5mb2N1c1N0eWxlLnNoYWRvd1hcblx0XHRzaGFkb3dZOiBleHBvcnRzLmZvY3VzU3R5bGUuc2hhZG93WVxuXHRcdGFuaW1hdGlvbk9wdGlvbnM6IHRpbWU6IGV4cG9ydHMudGltZVxuXHRsYXllci5zdGF0ZXMudW5mb2N1cyA9XG5cdFx0c2NhbGU6IGxheWVyLnNjYWxlXG5cdFx0c2hhZG93Qmx1cjogZXhwb3J0cy51bmZvY3VzU3R5bGUuc2hhZG93Qmx1clxuXHRcdHNoYWRvd1NwcmVhZDogZXhwb3J0cy51bmZvY3VzU3R5bGUuc2hhZG93U3ByZWFkXG5cdFx0c2hhZG93Q29sb3I6IGV4cG9ydHMudW5mb2N1c1N0eWxlLnNoYWRvd0NvbG9yXG5cdFx0c2hhZG93WDogZXhwb3J0cy51bmZvY3VzU3R5bGUuc2hhZG93WFxuXHRcdHNoYWRvd1k6IGV4cG9ydHMudW5mb2N1c1N0eWxlLnNoYWRvd1lcblx0XHRhbmltYXRpb25PcHRpb25zOiB0aW1lOiBleHBvcnRzLnRpbWVcblx0bGF5ZXIuYW5pbWF0ZShcInVuZm9jdXNcIiwgaW5zdGFudDogdHJ1ZSlcblxuZXhwb3J0cy5jaGFuZ2VGb2N1cyA9IFV0aWxzLnRocm90dGxlIDAuMSwgKGRpcmVjdGlvbikgLT5cblx0IyBpZiBmb2N1cyB3YXMgbmV2ZXIgcGxhY2VkLCBnaXZlIHVwXG5cdGlmIGV4cG9ydHMuZm9jdXMgPT0gbnVsbCBhbmQgZXhwb3J0cy5pbml0aWFsRm9jdXMgPT0gbnVsbFxuXHRcdHByaW50IFwiTm8gaW5pdGlhbCBmb2N1cyBzZXQuIFVzZSBwbGFjZUZvY3VzKGxheWVyKSB0byBzZXQuXCJcblx0XHRyZXR1cm5cblx0aWYgZXhwb3J0cy5kZWJ1ZyA9PSB0cnVlXG5cdFx0cHJpbnQgXCJmb2N1cyB3YXM6IFwiICsgKGV4cG9ydHMuZm9jdXM/Lm5hbWUgb3IgZXhwb3J0cy5mb2N1cz8uX19mcmFtZXJJbnN0YW5jZUluZm8/LnRhcmdldE5hbWUgb3IgXCJ1bm5hbWVkIGxheWVyXCIpICsgXCI7IGRpcmVjdGlvbjogXCIgKyBkaXJlY3Rpb25cblx0dGVtcEFycmF5ID0gW11cblx0IyBpZiB3ZSd2ZSBsb3N0IGFsbCBmb2N1cywgcmVzZXRcblx0aWYgZXhwb3J0cy5mb2N1cyA9PSBudWxsIG9yIGV4cG9ydHMuZm9jdXMgPT0gdW5kZWZpbmVkXG5cdFx0ZXhwb3J0cy5wbGFjZUZvY3VzKGV4cG9ydHMuaW5pdGlhbEZvY3VzKVxuXHRpZiBleHBvcnRzLmZvY3VzLm92ZXJyaWRlcz9bZGlyZWN0aW9uXSAhPSB1bmRlZmluZWQgYW5kIGV4cG9ydHMuZm9jdXMub3ZlcnJpZGVzP1tkaXJlY3Rpb25dICE9IG51bGwgIyBvdmVycmlkZVxuXHRcdGV4cG9ydHMucGxhY2VGb2N1cyhleHBvcnRzLmZvY3VzLm92ZXJyaWRlc1tkaXJlY3Rpb25dKVxuXHRlbHNlXG5cdFx0Zm9jdXNNaWRYID0gZXhwb3J0cy5mb2N1cy5zY3JlZW5GcmFtZS54ICsgZXhwb3J0cy5mb2N1cy5zY3JlZW5GcmFtZS53aWR0aC8yXG5cdFx0Zm9jdXNNaWRZID0gZXhwb3J0cy5mb2N1cy5zY3JlZW5GcmFtZS55ICsgZXhwb3J0cy5mb2N1cy5zY3JlZW5GcmFtZS5oZWlnaHQvMlxuXHRcdGlmIGRpcmVjdGlvbiA9PSBcInVwXCJcblx0XHRcdGZvciBsYXllciBpbiBleHBvcnRzLmZvY3VzYWJsZVxuXHRcdFx0XHRsYXllck1pZFkgPSBsYXllci5zY3JlZW5GcmFtZS55ICsgbGF5ZXIuc2NyZWVuRnJhbWUuaGVpZ2h0LzJcblx0XHRcdFx0aWYgbGF5ZXJNaWRZIDwgZm9jdXNNaWRZIGFuZCBjaGVja1Zpc2libGUobGF5ZXIpID09IHRydWVcblx0XHRcdFx0XHR0ZW1wQXJyYXkucHVzaChsYXllcilcblx0XHRlbHNlIGlmIGRpcmVjdGlvbiA9PSBcImRvd25cIlxuXHRcdFx0Zm9yIGxheWVyIGluIGV4cG9ydHMuZm9jdXNhYmxlXG5cdFx0XHRcdGxheWVyTWlkWSA9IGxheWVyLnNjcmVlbkZyYW1lLnkgKyBsYXllci5zY3JlZW5GcmFtZS5oZWlnaHQvMlxuXHRcdFx0XHRpZiBsYXllck1pZFkgPiBmb2N1c01pZFkgYW5kIGNoZWNrVmlzaWJsZShsYXllcikgPT0gdHJ1ZVxuXHRcdFx0XHRcdHRlbXBBcnJheS5wdXNoKGxheWVyKVxuXHRcdGVsc2UgaWYgZGlyZWN0aW9uID09IFwibGVmdFwiXG5cdFx0XHRmb3IgbGF5ZXIgaW4gZXhwb3J0cy5mb2N1c2FibGVcblx0XHRcdFx0bGF5ZXJNaWRYID0gbGF5ZXIuc2NyZWVuRnJhbWUueCArIGxheWVyLnNjcmVlbkZyYW1lLndpZHRoLzJcblx0XHRcdFx0aWYgbGF5ZXJNaWRYIDwgZm9jdXNNaWRYIGFuZCBjaGVja1Zpc2libGUobGF5ZXIpID09IHRydWVcblx0XHRcdFx0XHR0ZW1wQXJyYXkucHVzaChsYXllcilcblx0XHRlbHNlIGlmIGRpcmVjdGlvbiA9PSBcInJpZ2h0XCJcblx0XHRcdGZvciBsYXllciBpbiBleHBvcnRzLmZvY3VzYWJsZVxuXHRcdFx0XHRsYXllck1pZFggPSBsYXllci5zY3JlZW5GcmFtZS54ICsgbGF5ZXIuc2NyZWVuRnJhbWUud2lkdGgvMlxuXHRcdFx0XHRpZiBsYXllck1pZFggPiBmb2N1c01pZFggYW5kIGNoZWNrVmlzaWJsZShsYXllcikgPT0gdHJ1ZVxuXHRcdFx0XHRcdHRlbXBBcnJheS5wdXNoKGxheWVyKVxuXHRcdGVsc2UgaWYgZGlyZWN0aW9uID09IFwic2VsZWN0XCJcblx0XHRcdGV4cG9ydHMuZm9jdXMuZW1pdCBcInNlbGVjdGVkXCJcblx0XHRpZiB0ZW1wQXJyYXkubGVuZ3RoID09IDBcblx0XHRcdHJldHVyblxuXHRcdHRhcmdldExheWVyID0gdGVtcEFycmF5WzBdXG5cdFx0c2hvcnRlc3REaXN0YW5jZSA9IG1lYXN1cmVEaXN0YW5jZSh0YXJnZXRMYXllciwgZGlyZWN0aW9uKVxuXHRcdGZvciBsYXllciBpbiB0ZW1wQXJyYXlcblx0XHRcdGRpc3RhbmNlID0gbWVhc3VyZURpc3RhbmNlKGxheWVyLCBkaXJlY3Rpb24pXG5cdFx0XHRpZiBkaXN0YW5jZSA8IHNob3J0ZXN0RGlzdGFuY2Vcblx0XHRcdFx0dGFyZ2V0TGF5ZXIgPSBsYXllclxuXHRcdFx0XHRzaG9ydGVzdERpc3RhbmNlID0gZGlzdGFuY2Vcblx0XHRleHBvcnRzLnBsYWNlRm9jdXModGFyZ2V0TGF5ZXIpXG5cbm1lYXN1cmVEaXN0YW5jZSA9ICh0YXJnZXQsIGRpcmVjdGlvbikgLT5cblx0Zm9jdXNUb3BDZW50ZXIgPVxuXHRcdHg6IGV4cG9ydHMuZm9jdXMuc2NyZWVuRnJhbWUueCArIGV4cG9ydHMuZm9jdXMuc2NyZWVuRnJhbWUud2lkdGgvMlxuXHRcdHk6IGV4cG9ydHMuZm9jdXMuc2NyZWVuRnJhbWUueVxuXHRmb2N1c0JvdHRvbUNlbnRlciA9XG5cdFx0eDogZXhwb3J0cy5mb2N1cy5zY3JlZW5GcmFtZS54ICsgZXhwb3J0cy5mb2N1cy5zY3JlZW5GcmFtZS53aWR0aC8yXG5cdFx0eTogZXhwb3J0cy5mb2N1cy5zY3JlZW5GcmFtZS55ICsgZXhwb3J0cy5mb2N1cy5zY3JlZW5GcmFtZS5oZWlnaHRcblx0Zm9jdXNMZWZ0Q2VudGVyID1cblx0XHR4OiBleHBvcnRzLmZvY3VzLnNjcmVlbkZyYW1lLnhcblx0XHR5OiBleHBvcnRzLmZvY3VzLnNjcmVlbkZyYW1lLnkgKyBleHBvcnRzLmZvY3VzLnNjcmVlbkZyYW1lLmhlaWdodC8yXG5cdGZvY3VzUmlnaHRDZW50ZXIgPVxuXHRcdHg6IGV4cG9ydHMuZm9jdXMuc2NyZWVuRnJhbWUueCArIGV4cG9ydHMuZm9jdXMuc2NyZWVuRnJhbWUud2lkdGhcblx0XHR5OiBleHBvcnRzLmZvY3VzLnNjcmVlbkZyYW1lLnkgKyBleHBvcnRzLmZvY3VzLnNjcmVlbkZyYW1lLmhlaWdodC8yXG5cdHRhcmdldFRvcENlbnRlciA9XG5cdFx0eDogdGFyZ2V0LnNjcmVlbkZyYW1lLnggKyB0YXJnZXQuc2NyZWVuRnJhbWUud2lkdGgvMlxuXHRcdHk6IHRhcmdldC5zY3JlZW5GcmFtZS55XG5cdHRhcmdldEJvdHRvbUNlbnRlciA9XG5cdFx0eDogdGFyZ2V0LnNjcmVlbkZyYW1lLnggKyB0YXJnZXQuc2NyZWVuRnJhbWUud2lkdGgvMlxuXHRcdHk6IHRhcmdldC5zY3JlZW5GcmFtZS55ICsgdGFyZ2V0LnNjcmVlbkZyYW1lLmhlaWdodFxuXHR0YXJnZXRMZWZ0Q2VudGVyID1cblx0XHR4OiB0YXJnZXQuc2NyZWVuRnJhbWUueFxuXHRcdHk6IHRhcmdldC5zY3JlZW5GcmFtZS55ICsgdGFyZ2V0LnNjcmVlbkZyYW1lLmhlaWdodC8yXG5cdHRhcmdldFJpZ2h0Q2VudGVyID1cblx0XHR4OiB0YXJnZXQuc2NyZWVuRnJhbWUueCArIHRhcmdldC5zY3JlZW5GcmFtZS53aWR0aFxuXHRcdHk6IHRhcmdldC5zY3JlZW5GcmFtZS55ICsgdGFyZ2V0LnNjcmVlbkZyYW1lLmhlaWdodC8yXG5cdHN3aXRjaCBkaXJlY3Rpb25cblx0XHR3aGVuIFwidXBcIlxuXHRcdFx0ZGlzdGFuY2VYID0gZm9jdXNUb3BDZW50ZXIueCAtIHRhcmdldEJvdHRvbUNlbnRlci54XG5cdFx0XHRkaXN0YW5jZVkgPSBmb2N1c1RvcENlbnRlci55IC0gdGFyZ2V0Qm90dG9tQ2VudGVyLnlcblx0XHR3aGVuIFwiZG93blwiXG5cdFx0XHRkaXN0YW5jZVggPSBmb2N1c0JvdHRvbUNlbnRlci54IC0gdGFyZ2V0VG9wQ2VudGVyLnhcblx0XHRcdGRpc3RhbmNlWSA9IGZvY3VzQm90dG9tQ2VudGVyLnkgLSB0YXJnZXRCb3R0b21DZW50ZXIueVxuXHRcdHdoZW4gXCJsZWZ0XCJcblx0XHRcdGRpc3RhbmNlWCA9IGZvY3VzTGVmdENlbnRlci54IC0gdGFyZ2V0UmlnaHRDZW50ZXIueFxuXHRcdFx0ZGlzdGFuY2VZID0gZm9jdXNMZWZ0Q2VudGVyLnkgLSB0YXJnZXRSaWdodENlbnRlci55XG5cdFx0d2hlbiBcInJpZ2h0XCJcblx0XHRcdGRpc3RhbmNlWCA9IGZvY3VzUmlnaHRDZW50ZXIueCAtIHRhcmdldExlZnRDZW50ZXIueFxuXHRcdFx0ZGlzdGFuY2VZID0gZm9jdXNSaWdodENlbnRlci55IC0gdGFyZ2V0TGVmdENlbnRlci55XG5cdCMgUHl0aGFnb3JlYW4gdGhlb3JlbSB0byBtZWFzdXJlIHRoZSBoeXBvdGVuZXVzZVxuXHRhYnNvbHV0ZURpc3RhbmNlID0gTWF0aC5zcXJ0KGRpc3RhbmNlWCAqIGRpc3RhbmNlWCArIGRpc3RhbmNlWSAqIGRpc3RhbmNlWSlcblx0cmV0dXJuIGFic29sdXRlRGlzdGFuY2VcblxuRXZlbnRzLkZvY3VzID0gXCJmb2N1c1wiXG5MYXllcjo6b25Gb2N1cyA9IChjYikgLT4gQG9uKEV2ZW50cy5Gb2N1cywgY2IpXG5FdmVudHMuVW5mb2N1cyA9IFwidW5mb2N1c1wiXG5MYXllcjo6b25VbmZvY3VzID0gKGNiKSAtPiBAb24oRXZlbnRzLlVuZm9jdXMsIGNiKVxuRXZlbnRzLlNlbGVjdGVkID0gXCJzZWxlY3RlZFwiXG5MYXllcjo6b25TZWxlY3RlZCA9IChjYikgLT4gQG9uKEV2ZW50cy5TZWxlY3RlZCwgY2IpXG4iLCIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUVBQTs7QURBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBQSxxREFBQTtFQUFBOztBQXlFQSxPQUFPLENBQUMsS0FBUixHQUFnQjs7QUFHaEIsT0FBTyxDQUFDLEtBQVIsR0FBZ0I7O0FBQ2hCLE9BQU8sQ0FBQyxZQUFSLEdBQXVCOztBQUN2QixPQUFPLENBQUMsYUFBUixHQUF3Qjs7QUFDeEIsT0FBTyxDQUFDLFNBQVIsR0FBb0I7O0FBQ3BC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
