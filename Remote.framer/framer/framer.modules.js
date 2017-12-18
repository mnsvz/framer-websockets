require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"RemoteLayer":[function(require,module,exports){
var RemoteLayer, borderThickness, createBase, createCommonButtonInner, createCommonCircleButton, createGlossEffect, createGroove, createGrooveHightlight, createHomeButton, createHomeButtonInner, createInertSurface, createMenuButton, createMenuButtonInner, createMicButton, createMicButtonInner, createMicSlot, createPlayPauseButton, createPlayPauseButtonInner, createTouchSurface, createVolumeButton, createVolumeButtonDown, createVolumeButtonInner, createVolumeButtonUp, defaultOptions, noop,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

borderThickness = 2;

noop = function() {};

createCommonCircleButton = function() {
  return new Layer({
    width: 76,
    height: 76,
    borderRadius: 38,
    style: {
      background: '-webkit-linear-gradient(top, #999999, #1A1A1A)',
      boxShadow: '0 0 0 2pt rgba(0, 0, 0, 0.5)'
    }
  });
};

createCommonButtonInner = function() {
  return new Layer({
    x: 1,
    y: 1,
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: '#3D3D3D'
  });
};

createBase = function(parent) {
  var layer;
  layer = new Layer({
    width: 228,
    height: 740,
    backgroundColor: '#1A1A1A',
    style: {
      background: '-webkit-linear-gradient(top, #404040, #333333)'
    },
    borderRadius: 42,
    shadowColor: '#808080',
    shadowBlur: 0,
    shadowSpread: 2,
    name: 'base',
    parent: parent,
    clip: true
  });
  layer.states.animationOptions = {
    time: 0.5
  };
  layer.states.add({
    hide: {
      opacity: 0
    },
    show: {
      opacity: 1
    },
    up: {
      y: 0
    },
    down: {
      y: Screen.height + borderThickness
    }
  });
  return layer;
};

createTouchSurface = function(parent) {
  return new Layer({
    x: 0,
    y: 0,
    width: 228,
    height: 322,
    backgroundColor: 'gray',
    opacity: 0,
    name: 'touchSurface',
    parent: parent
  });
};

createInertSurface = function(parent) {
  return new Layer({
    x: 0,
    y: 323,
    width: 228,
    height: 417,
    style: {
      background: '-webkit-linear-gradient(-60deg, #333333, #1A1A1A)'
    },
    name: 'inertSurface',
    parent: parent
  });
};

createGlossEffect = function(parent) {
  return new Layer({
    x: 0,
    y: 323,
    width: 228,
    height: 417,
    backgroundColor: 'transparent',
    html: '<svg width="228" height="417" viewBox="0 0 228 417"><defs><linearGradient id="a" x1="128" x2="128" y2="436.11" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="gray"/><stop offset=".72" stop-color="#1a1a1a"/></linearGradient></defs><path fill="url(#a)" d="M228 0H28l166.8 417H228V0"/></svg>',
    name: 'glossEffect',
    visible: false,
    parent: parent
  });
};

createGroove = function(parent) {
  return new Layer({
    x: 0,
    y: 322,
    width: 228,
    height: 1,
    backgroundColor: '#262626',
    name: 'groove',
    parent: parent
  });
};

createGrooveHightlight = function(parent) {
  return new Layer({
    x: 0,
    y: 323,
    width: 228,
    height: 1,
    backgroundColor: '#595959',
    name: 'grooveHighlight',
    parent: parent
  });
};

createMicSlot = function(parent) {
  return new Layer({
    x: 106,
    y: 23,
    width: 16,
    height: 6,
    backgroundColor: 'transparent',
    borderColor: '#141414',
    borderWidth: 2,
    borderRadius: 3,
    shadowX: 0,
    shadowY: 1,
    shadowColor: '#4D4D4D',
    name: "micSlot",
    parent: parent
  });
};

createMenuButton = function(parent) {
  var layer;
  layer = createCommonCircleButton();
  layer.x = 25;
  layer.y = 238;
  layer.name = 'menuButton';
  layer.parent = parent;
  return layer;
};

createMenuButtonInner = function(parent) {
  var layer;
  layer = createCommonButtonInner();
  layer.name = 'menuButtonInner';
  layer.parent = parent;
  layer.html = '<svg width="74" height="74" viewBox="0 0 74 74"><g fill="none" stroke="#d8d8d8" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M25 42V32l-5 9.5-5-9.5v10M35 32h-6v10h6M39 42V32l8 10V32M35 37h-6M59 32v6a4 4 0 0 1-4 4 4 4 0 0 1-4-4v-6"/></g></svg>';
  return layer;
};

createHomeButton = function(parent) {
  var layer;
  layer = createCommonCircleButton();
  layer.x = 127;
  layer.y = 238;
  layer.name = 'homeButton';
  layer.parent = parent;
  return layer;
};

createHomeButtonInner = function(parent) {
  var layer;
  layer = createCommonButtonInner();
  layer.name = 'homeButtonInner';
  layer.parent = parent;
  layer.html = '<svg width="74" height="74" viewBox="0 0 74 74"><g fill="#d8d8d8"><path d="M48 29v13H24V29h24m0-2H24a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V29a2 2 0 0 0-2-2z"/><rect x="31" y="46" width="10" height="2" rx="1" ry="1"/></g></svg>';
  return layer;
};

createMicButton = function(parent) {
  var layer;
  layer = createCommonCircleButton();
  layer.x = 25;
  layer.y = 334;
  layer.name = 'micButton';
  layer.parent = parent;
  return layer;
};

createMicButtonInner = function(parent) {
  var layer;
  layer = createCommonButtonInner();
  layer.name = 'micButtonInner';
  layer.parent = parent;
  layer.html = '<svg width="74" height="74" viewBox="0 0 74 74"><rect x="32" y="22" width="8" height="20" rx="4" ry="4" fill="#d8d8d8"/><rect x="30" y="48" width="12" height="2" rx="1" ry="1" fill="#d8d8d8"/><path d="M29 33v5a7 7 0 0 0 7 7 7 7 0 0 0 7-7v-5" fill="none" stroke="#d8d8d8" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"/><path fill="#d8d8d8" d="M35 45h2v3h-2z"/></svg>';
  return layer;
};

createPlayPauseButton = function(parent) {
  var layer;
  layer = createCommonCircleButton();
  layer.x = 25;
  layer.y = 430;
  layer.name = 'playPauseButton';
  layer.parent = parent;
  return layer;
};

createPlayPauseButtonInner = function(parent) {
  var layer;
  layer = createCommonButtonInner();
  layer.name = 'playPauseButtonInner';
  layer.parent = parent;
  layer.html = '<svg width="74" height="74" viewBox="0 0 74 74"><g fill="#d8d8d8"><rect x="42" y="30" width="3" height="13" rx="1.5" ry="1.5"/><rect x="48" y="30" width="3" height="13" rx="1.5" ry="1.5"/><path d="M25 30.29v12.42a1 1 0 0 0 1.52.85l10.09-6.21a1 1 0 0 0 0-1.7l-10.09-6.21a1 1 0 0 0-1.52.85z"/></g></svg>';
  return layer;
};

createVolumeButton = function(parent) {
  return new Layer({
    x: 130,
    y: 334,
    width: 70,
    height: 172,
    borderRadius: 38,
    style: {
      background: '-webkit-linear-gradient(top, #999999, #1A1A1A)',
      boxShadow: '0 0 0 2pt rgba(0, 0, 0, 0.5)'
    },
    name: 'volumeButton',
    parent: parent
  });
};

createVolumeButtonInner = function(parent) {
  return new Layer({
    x: 1,
    y: 1,
    width: 68,
    height: 170,
    borderRadius: 37,
    backgroundColor: '#3D3D3D',
    name: 'volumeButtonInner',
    parent: parent,
    html: '<svg width="70" height="172" viewBox="0 0 70 172"><g fill="#d8d8d8"><rect x="25" y="36" width="20" height="2" rx="1" ry="1"/><rect x="25" y="36" width="20" height="2" rx="1" ry="1" transform="rotate(90 35 37)"/><rect x="24" y="132" width="20" height="2" rx="1" ry="1"/></g></svg>'
  });
};

createVolumeButtonUp = function(parent) {
  return new Layer({
    width: 70,
    height: 86,
    backgroundColor: 'gray',
    opacity: 0,
    name: 'volumeButtonUp',
    parent: parent
  });
};

createVolumeButtonDown = function(parent) {
  return new Layer({
    y: 86,
    width: 70,
    height: 86,
    backgroundColor: 'gray',
    opacity: 0,
    name: 'volumeButtonDown',
    parent: parent
  });
};

defaultOptions = {
  gloss: false,
  transition: 'fade',
  hide: false,
  align: 'right',
  margin: 50,
  fromBottom: 550,
  autoHide: false,
  backgroundColor: 'transparent',
  highlightColor: 'rgba(74, 144, 226, 0.5)',
  width: 228,
  height: 740,
  clip: false,
  homeAction: noop,
  menuAction: noop,
  micAction: noop,
  playPauseAction: noop,
  volumeUpAction: noop,
  volumeDownAction: noop,
  clickAction: noop,
  swipeUpAction: noop,
  swipeDownAction: noop,
  swipeLeftAction: noop,
  swipeRightAction: noop
};

RemoteLayer = (function(superClass) {
  extend(RemoteLayer, superClass);

  RemoteLayer.define('hidden', {
    get: function() {
      return this._hidden;
    }
  });

  RemoteLayer.define('transition', {
    get: function() {
      return this.options.transition;
    }
  });

  function RemoteLayer(options) {
    var button, glossEffect, groove, grooveHighlight, highlight, homeButton, homeButtonInner, i, inertSurface, innerButtons, j, k, len, len1, len2, menuButton, menuButtonInner, micButton, micButtonInner, micSlot, playPauseButton, playPauseButtonInner, roundButtons, touchSurface, volumeButton, volumeButtonDown, volumeButtonInner, volumeButtonUp, volumeButtons;
    if (options == null) {
      options = {};
    }
    this.options = _.defaults(options, defaultOptions);
    this._hidden = this.options.hide;
    RemoteLayer.__super__.constructor.call(this, this.options);
    this.base = createBase(this);
    touchSurface = createTouchSurface(this.base);
    inertSurface = createInertSurface(this.base);
    glossEffect = createGlossEffect(this.base);
    groove = createGroove(this.base);
    grooveHighlight = createGrooveHightlight(this.base);
    micSlot = createMicSlot(this.base);
    menuButton = createMenuButton(this.base);
    menuButtonInner = createMenuButtonInner(menuButton);
    homeButton = createHomeButton(this.base);
    homeButtonInner = createHomeButtonInner(homeButton);
    micButton = createMicButton(this.base);
    micButtonInner = createMicButtonInner(micButton);
    playPauseButton = createPlayPauseButton(this.base);
    playPauseButtonInner = createPlayPauseButtonInner(playPauseButton);
    volumeButton = createVolumeButton(this.base);
    volumeButtonInner = createVolumeButtonInner(volumeButton);
    volumeButtonUp = createVolumeButtonUp(volumeButton);
    volumeButtonDown = createVolumeButtonDown(volumeButton);
    menuButton.onClick((function(_this) {
      return function() {
        return _this.options.menuAction();
      };
    })(this));
    homeButton.onClick((function(_this) {
      return function() {
        return _this.options.homeAction();
      };
    })(this));
    micButton.onClick((function(_this) {
      return function() {
        return _this.options.micAction();
      };
    })(this));
    playPauseButton.onClick((function(_this) {
      return function() {
        return _this.options.playPauseAction();
      };
    })(this));
    volumeButtonUp.onClick((function(_this) {
      return function() {
        return _this.options.volumeUpAction();
      };
    })(this));
    volumeButtonDown.onClick((function(_this) {
      return function() {
        return _this.options.volumeDownAction();
      };
    })(this));
    touchSurface.onClick((function(_this) {
      return function() {
        return _this.options.clickAction();
      };
    })(this));
    touchSurface.onSwipeUp((function(_this) {
      return function() {
        return _this.options.swipeUpAction();
      };
    })(this));
    touchSurface.onSwipeDown((function(_this) {
      return function() {
        return _this.options.swipeDownAction();
      };
    })(this));
    touchSurface.onSwipeLeft((function(_this) {
      return function() {
        return _this.options.swipeLeftAction();
      };
    })(this));
    touchSurface.onSwipeRight((function(_this) {
      return function() {
        return _this.options.swipeRightAction();
      };
    })(this));
    if (this.options.gloss) {
      glossEffect.visible = true;
      inertSurface.style.background = '';
      inertSurface.backgroundColor = '#1A1A1A';
    }
    if (this.options.autoHide || this.options.hide) {
      this._hidden = true;
      this.onMouseOver(this.showCautiously);
      this.onMouseOut(this.hideCautiously);
      switch (this.transition) {
        case 'fade':
          this.base.states.switchInstant('hide');
          break;
        case 'pop':
          this.base.states.switchInstant('down');
          break;
        default:
          return;
      }
    }
    this.align();
    roundButtons = [menuButton, homeButton, micButton, playPauseButton, volumeButton];
    innerButtons = [menuButtonInner, homeButtonInner, micButtonInner, playPauseButtonInner];
    volumeButtons = [volumeButtonUp, volumeButtonDown];
    highlight = this.options.highlightColor;
    for (i = 0, len = roundButtons.length; i < len; i++) {
      button = roundButtons[i];
      button.onMouseOver(function() {
        return this.style = {
          boxShadow: "0 0 0 2pt rgba(0, 0, 0, 0.5), 0 0 0 5pt " + highlight
        };
      });
      button.onMouseOut(function() {
        return this.style = {
          boxShadow: '0 0 0 2pt rgba(0, 0, 0, 0.5)'
        };
      });
    }
    for (j = 0, len1 = innerButtons.length; j < len1; j++) {
      button = innerButtons[j];
      button.onMouseDown(function() {
        return this.brightness = 70;
      });
      button.onMouseUp(function() {
        return this.brightness = 100;
      });
      button.onMouseOut(function() {
        return this.brightness = 100;
      });
    }
    for (k = 0, len2 = volumeButtons.length; k < len2; k++) {
      button = volumeButtons[k];
      button.onMouseDown(function() {
        return volumeButtonInner.brightness = 70;
      });
      button.onMouseUp(function() {
        return volumeButtonInner.brightness = 100;
      });
    }
  }

  RemoteLayer.prototype.align = function(align, margin, fromBottom) {
    if (align == null) {
      align = this.options.align;
    }
    if (margin == null) {
      margin = this.options.margin;
    }
    if (fromBottom == null) {
      fromBottom = this.options.fromBottom;
    }
    if (align === 'left') {
      this.x = margin + borderThickness;
      return this.y = Screen.height + borderThickness - fromBottom;
    } else if (align === 'center') {
      this.centerX();
      return this.y = Screen.height + borderThickness - fromBottom;
    } else {
      this.x = Screen.width - this.width - margin - borderThickness;
      return this.y = Screen.height + borderThickness - fromBottom;
    }
  };

  RemoteLayer.prototype.show = function() {
    this._hidden = false;
    switch (this.transition) {
      case 'fade':
        return this.base.states["switch"]('show');
      case 'pop':
        return this.base.states["switch"]('up');
    }
  };

  RemoteLayer.prototype.hide = function() {
    this._hidden = true;
    switch (this.transition) {
      case 'fade':
        return this.base.states["switch"]('hide');
      case 'pop':
        return this.base.states["switch"]('down');
    }
  };

  RemoteLayer.prototype.showCautiously = Utils.debounce(0.1, function() {
    return this.show();
  });

  RemoteLayer.prototype.hideCautiously = Utils.debounce(1.0, function() {
    return this.hide();
  });

  return RemoteLayer;

})(Layer);

module.exports = RemoteLayer;


},{}],"myModule":[function(require,module,exports){
exports.myVar = "myVariable";

exports.myFunction = function() {
  return print("myFunction is running");
};

exports.myArray = [1, 2, 3];


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3JhdmlzaGFua2FyX2NvbnQxL0RvY3VtZW50cy9mcmFtZXIvcmVtb3RlLmZyYW1lci9tb2R1bGVzL215TW9kdWxlLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3JhdmlzaGFua2FyX2NvbnQxL0RvY3VtZW50cy9mcmFtZXIvcmVtb3RlLmZyYW1lci9tb2R1bGVzL1JlbW90ZUxheWVyLmNvZmZlZSIsIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIyBBZGQgdGhlIGZvbGxvd2luZyBsaW5lIHRvIHlvdXIgcHJvamVjdCBpbiBGcmFtZXIgU3R1ZGlvLiBcbiMgbXlNb2R1bGUgPSByZXF1aXJlIFwibXlNb2R1bGVcIlxuIyBSZWZlcmVuY2UgdGhlIGNvbnRlbnRzIGJ5IG5hbWUsIGxpa2UgbXlNb2R1bGUubXlGdW5jdGlvbigpIG9yIG15TW9kdWxlLm15VmFyXG5cbmV4cG9ydHMubXlWYXIgPSBcIm15VmFyaWFibGVcIlxuXG5leHBvcnRzLm15RnVuY3Rpb24gPSAtPlxuXHRwcmludCBcIm15RnVuY3Rpb24gaXMgcnVubmluZ1wiXG5cbmV4cG9ydHMubXlBcnJheSA9IFsxLCAyLCAzXSIsIiMgY29tbW9ubHkgdXNlZCBib3JkZXIgdGhpY2tuZXNzXG5ib3JkZXJUaGlja25lc3MgPSAyXG5cbm5vb3AgPSAoKSAtPlxuXG5jcmVhdGVDb21tb25DaXJjbGVCdXR0b24gPSAoKSAtPlxuICBuZXcgTGF5ZXJcbiAgICB3aWR0aDogNzZcbiAgICBoZWlnaHQ6IDc2XG4gICAgYm9yZGVyUmFkaXVzOiAzOFxuICAgIHN0eWxlOlxuICAgICAgYmFja2dyb3VuZDogJy13ZWJraXQtbGluZWFyLWdyYWRpZW50KHRvcCwgIzk5OTk5OSwgIzFBMUExQSknXG4gICAgICBib3hTaGFkb3c6ICcwIDAgMCAycHQgcmdiYSgwLCAwLCAwLCAwLjUpJ1xuXG5jcmVhdGVDb21tb25CdXR0b25Jbm5lciA9ICgpIC0+XG4gIG5ldyBMYXllclxuICAgIHg6IDFcbiAgICB5OiAxXG4gICAgd2lkdGg6IDc0XG4gICAgaGVpZ2h0OiA3NFxuICAgIGJvcmRlclJhZGl1czogMzdcbiAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjM0QzRDNEJ1xuXG5jcmVhdGVCYXNlID0gKHBhcmVudCkgLT5cbiAgbGF5ZXIgPSBuZXcgTGF5ZXJcbiAgICB3aWR0aDogMjI4XG4gICAgaGVpZ2h0OiA3NDBcbiAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjMUExQTFBJ1xuICAgIHN0eWxlOiBiYWNrZ3JvdW5kOiAnLXdlYmtpdC1saW5lYXItZ3JhZGllbnQodG9wLCAjNDA0MDQwLCAjMzMzMzMzKSdcbiAgICBib3JkZXJSYWRpdXM6IDQyXG4gICAgc2hhZG93Q29sb3I6ICcjODA4MDgwJ1xuICAgIHNoYWRvd0JsdXI6IDBcbiAgICBzaGFkb3dTcHJlYWQ6IDJcbiAgICBuYW1lOiAnYmFzZSdcbiAgICBwYXJlbnQ6IHBhcmVudFxuICAgIGNsaXA6IHRydWVcblxuICBsYXllci5zdGF0ZXMuYW5pbWF0aW9uT3B0aW9ucyA9IHRpbWU6IDAuNVxuICBsYXllci5zdGF0ZXMuYWRkXG4gICAgaGlkZTogb3BhY2l0eTogMFxuICAgIHNob3c6IG9wYWNpdHk6IDFcbiAgICB1cDogeTogMFxuICAgIGRvd246IHk6IFNjcmVlbi5oZWlnaHQgKyBib3JkZXJUaGlja25lc3NcblxuICByZXR1cm4gbGF5ZXJcblxuY3JlYXRlVG91Y2hTdXJmYWNlID0gKHBhcmVudCkgLT5cbiAgbmV3IExheWVyXG4gICAgeDogMFxuICAgIHk6IDBcbiAgICB3aWR0aDogMjI4XG4gICAgaGVpZ2h0OiAzMjJcbiAgICBiYWNrZ3JvdW5kQ29sb3I6ICdncmF5J1xuICAgIG9wYWNpdHk6IDBcbiAgICBuYW1lOiAndG91Y2hTdXJmYWNlJ1xuICAgIHBhcmVudDogcGFyZW50XG5cbmNyZWF0ZUluZXJ0U3VyZmFjZSA9IChwYXJlbnQpIC0+XG4gIG5ldyBMYXllclxuICAgIHg6IDBcbiAgICB5OiAzMjNcbiAgICB3aWR0aDogMjI4XG4gICAgaGVpZ2h0OiA0MTdcbiAgICBzdHlsZTogYmFja2dyb3VuZDogJy13ZWJraXQtbGluZWFyLWdyYWRpZW50KC02MGRlZywgIzMzMzMzMywgIzFBMUExQSknXG4gICAgbmFtZTogJ2luZXJ0U3VyZmFjZSdcbiAgICBwYXJlbnQ6IHBhcmVudFxuXG5jcmVhdGVHbG9zc0VmZmVjdCA9IChwYXJlbnQpIC0+XG4gIG5ldyBMYXllclxuICAgIHg6IDBcbiAgICB5OiAzMjNcbiAgICB3aWR0aDogMjI4XG4gICAgaGVpZ2h0OiA0MTdcbiAgICBiYWNrZ3JvdW5kQ29sb3I6ICd0cmFuc3BhcmVudCdcbiAgICBodG1sOiAnPHN2ZyB3aWR0aD1cIjIyOFwiIGhlaWdodD1cIjQxN1wiIHZpZXdCb3g9XCIwIDAgMjI4IDQxN1wiPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD1cImFcIiB4MT1cIjEyOFwiIHgyPVwiMTI4XCIgeTI9XCI0MzYuMTFcIiBncmFkaWVudFVuaXRzPVwidXNlclNwYWNlT25Vc2VcIj48c3RvcCBvZmZzZXQ9XCIwXCIgc3RvcC1jb2xvcj1cImdyYXlcIi8+PHN0b3Agb2Zmc2V0PVwiLjcyXCIgc3RvcC1jb2xvcj1cIiMxYTFhMWFcIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHBhdGggZmlsbD1cInVybCgjYSlcIiBkPVwiTTIyOCAwSDI4bDE2Ni44IDQxN0gyMjhWMFwiLz48L3N2Zz4nXG4gICAgbmFtZTogJ2dsb3NzRWZmZWN0J1xuICAgIHZpc2libGU6IGZhbHNlXG4gICAgcGFyZW50OiBwYXJlbnRcblxuY3JlYXRlR3Jvb3ZlID0gKHBhcmVudCkgLT5cbiAgbmV3IExheWVyXG4gICAgeDogMFxuICAgIHk6IDMyMlxuICAgIHdpZHRoOiAyMjhcbiAgICBoZWlnaHQ6IDFcbiAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjMjYyNjI2J1xuICAgIG5hbWU6ICdncm9vdmUnXG4gICAgcGFyZW50OiBwYXJlbnRcblxuY3JlYXRlR3Jvb3ZlSGlnaHRsaWdodCA9IChwYXJlbnQpIC0+XG4gIG5ldyBMYXllclxuICAgIHg6IDBcbiAgICB5OiAzMjNcbiAgICB3aWR0aDogMjI4XG4gICAgaGVpZ2h0OiAxXG4gICAgYmFja2dyb3VuZENvbG9yOiAnIzU5NTk1OSdcbiAgICBuYW1lOiAnZ3Jvb3ZlSGlnaGxpZ2h0J1xuICAgIHBhcmVudDogcGFyZW50XG5cbmNyZWF0ZU1pY1Nsb3QgPSAocGFyZW50KSAtPlxuICBuZXcgTGF5ZXJcbiAgICB4OiAxMDZcbiAgICB5OiAyM1xuICAgIHdpZHRoOiAxNlxuICAgIGhlaWdodDogNlxuICAgIGJhY2tncm91bmRDb2xvcjogJ3RyYW5zcGFyZW50J1xuICAgIGJvcmRlckNvbG9yOiAnIzE0MTQxNCdcbiAgICBib3JkZXJXaWR0aDogMlxuICAgIGJvcmRlclJhZGl1czogM1xuICAgIHNoYWRvd1g6IDBcbiAgICBzaGFkb3dZOiAxXG4gICAgc2hhZG93Q29sb3I6ICcjNEQ0RDREJ1xuICAgIG5hbWU6IFwibWljU2xvdFwiXG4gICAgcGFyZW50OiBwYXJlbnRcblxuY3JlYXRlTWVudUJ1dHRvbiA9IChwYXJlbnQpIC0+XG4gIGxheWVyID0gY3JlYXRlQ29tbW9uQ2lyY2xlQnV0dG9uKClcbiAgbGF5ZXIueCA9IDI1XG4gIGxheWVyLnkgPSAyMzhcbiAgbGF5ZXIubmFtZSA9ICdtZW51QnV0dG9uJ1xuICBsYXllci5wYXJlbnQgPSBwYXJlbnRcbiAgcmV0dXJuIGxheWVyXG5cbmNyZWF0ZU1lbnVCdXR0b25Jbm5lciA9IChwYXJlbnQpIC0+XG4gIGxheWVyID0gY3JlYXRlQ29tbW9uQnV0dG9uSW5uZXIoKVxuICBsYXllci5uYW1lID0gJ21lbnVCdXR0b25Jbm5lcidcbiAgbGF5ZXIucGFyZW50ID0gcGFyZW50XG4gIGxheWVyLmh0bWwgPSAnPHN2ZyB3aWR0aD1cIjc0XCIgaGVpZ2h0PVwiNzRcIiB2aWV3Qm94PVwiMCAwIDc0IDc0XCI+PGcgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCIjZDhkOGQ4XCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCIgc3Ryb2tlLXdpZHRoPVwiMlwiPjxwYXRoIGQ9XCJNMjUgNDJWMzJsLTUgOS41LTUtOS41djEwTTM1IDMyaC02djEwaDZNMzkgNDJWMzJsOCAxMFYzMk0zNSAzN2gtNk01OSAzMnY2YTQgNCAwIDAgMS00IDQgNCA0IDAgMCAxLTQtNHYtNlwiLz48L2c+PC9zdmc+J1xuICByZXR1cm4gbGF5ZXJcblxuY3JlYXRlSG9tZUJ1dHRvbiA9IChwYXJlbnQpIC0+XG4gIGxheWVyID0gY3JlYXRlQ29tbW9uQ2lyY2xlQnV0dG9uKClcbiAgbGF5ZXIueCA9IDEyN1xuICBsYXllci55ID0gMjM4XG4gIGxheWVyLm5hbWUgPSAnaG9tZUJ1dHRvbidcbiAgbGF5ZXIucGFyZW50ID0gcGFyZW50XG4gIHJldHVybiBsYXllclxuXG5jcmVhdGVIb21lQnV0dG9uSW5uZXIgPSAocGFyZW50KSAtPlxuICBsYXllciA9IGNyZWF0ZUNvbW1vbkJ1dHRvbklubmVyKClcbiAgbGF5ZXIubmFtZSA9ICdob21lQnV0dG9uSW5uZXInXG4gIGxheWVyLnBhcmVudCA9IHBhcmVudFxuICBsYXllci5odG1sID0gJzxzdmcgd2lkdGg9XCI3NFwiIGhlaWdodD1cIjc0XCIgdmlld0JveD1cIjAgMCA3NCA3NFwiPjxnIGZpbGw9XCIjZDhkOGQ4XCI+PHBhdGggZD1cIk00OCAyOXYxM0gyNFYyOWgyNG0wLTJIMjRhMiAyIDAgMCAwLTIgMnYxM2EyIDIgMCAwIDAgMiAyaDI0YTIgMiAwIDAgMCAyLTJWMjlhMiAyIDAgMCAwLTItMnpcIi8+PHJlY3QgeD1cIjMxXCIgeT1cIjQ2XCIgd2lkdGg9XCIxMFwiIGhlaWdodD1cIjJcIiByeD1cIjFcIiByeT1cIjFcIi8+PC9nPjwvc3ZnPidcbiAgcmV0dXJuIGxheWVyXG5cbmNyZWF0ZU1pY0J1dHRvbiA9IChwYXJlbnQpIC0+XG4gIGxheWVyID0gY3JlYXRlQ29tbW9uQ2lyY2xlQnV0dG9uKClcbiAgbGF5ZXIueCA9IDI1XG4gIGxheWVyLnkgPSAzMzRcbiAgbGF5ZXIubmFtZSA9ICdtaWNCdXR0b24nXG4gIGxheWVyLnBhcmVudCA9IHBhcmVudFxuICByZXR1cm4gbGF5ZXJcblxuY3JlYXRlTWljQnV0dG9uSW5uZXIgPSAocGFyZW50KSAtPlxuICBsYXllciA9IGNyZWF0ZUNvbW1vbkJ1dHRvbklubmVyKClcbiAgbGF5ZXIubmFtZSA9ICdtaWNCdXR0b25Jbm5lcidcbiAgbGF5ZXIucGFyZW50ID0gcGFyZW50XG4gIGxheWVyLmh0bWwgPSAnPHN2ZyB3aWR0aD1cIjc0XCIgaGVpZ2h0PVwiNzRcIiB2aWV3Qm94PVwiMCAwIDc0IDc0XCI+PHJlY3QgeD1cIjMyXCIgeT1cIjIyXCIgd2lkdGg9XCI4XCIgaGVpZ2h0PVwiMjBcIiByeD1cIjRcIiByeT1cIjRcIiBmaWxsPVwiI2Q4ZDhkOFwiLz48cmVjdCB4PVwiMzBcIiB5PVwiNDhcIiB3aWR0aD1cIjEyXCIgaGVpZ2h0PVwiMlwiIHJ4PVwiMVwiIHJ5PVwiMVwiIGZpbGw9XCIjZDhkOGQ4XCIvPjxwYXRoIGQ9XCJNMjkgMzN2NWE3IDcgMCAwIDAgNyA3IDcgNyAwIDAgMCA3LTd2LTVcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cIiNkOGQ4ZDhcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLW1pdGVybGltaXQ9XCIxMFwiIHN0cm9rZS13aWR0aD1cIjJcIi8+PHBhdGggZmlsbD1cIiNkOGQ4ZDhcIiBkPVwiTTM1IDQ1aDJ2M2gtMnpcIi8+PC9zdmc+J1xuICByZXR1cm4gbGF5ZXJcblxuY3JlYXRlUGxheVBhdXNlQnV0dG9uID0gKHBhcmVudCkgLT5cbiAgbGF5ZXIgPSBjcmVhdGVDb21tb25DaXJjbGVCdXR0b24oKVxuICBsYXllci54ID0gMjVcbiAgbGF5ZXIueSA9IDQzMFxuICBsYXllci5uYW1lID0gJ3BsYXlQYXVzZUJ1dHRvbidcbiAgbGF5ZXIucGFyZW50ID0gcGFyZW50XG4gIHJldHVybiBsYXllclxuXG5jcmVhdGVQbGF5UGF1c2VCdXR0b25Jbm5lciA9IChwYXJlbnQpIC0+XG4gIGxheWVyID0gY3JlYXRlQ29tbW9uQnV0dG9uSW5uZXIoKVxuICBsYXllci5uYW1lID0gJ3BsYXlQYXVzZUJ1dHRvbklubmVyJ1xuICBsYXllci5wYXJlbnQgPSBwYXJlbnRcbiAgbGF5ZXIuaHRtbCA9ICc8c3ZnIHdpZHRoPVwiNzRcIiBoZWlnaHQ9XCI3NFwiIHZpZXdCb3g9XCIwIDAgNzQgNzRcIj48ZyBmaWxsPVwiI2Q4ZDhkOFwiPjxyZWN0IHg9XCI0MlwiIHk9XCIzMFwiIHdpZHRoPVwiM1wiIGhlaWdodD1cIjEzXCIgcng9XCIxLjVcIiByeT1cIjEuNVwiLz48cmVjdCB4PVwiNDhcIiB5PVwiMzBcIiB3aWR0aD1cIjNcIiBoZWlnaHQ9XCIxM1wiIHJ4PVwiMS41XCIgcnk9XCIxLjVcIi8+PHBhdGggZD1cIk0yNSAzMC4yOXYxMi40MmExIDEgMCAwIDAgMS41Mi44NWwxMC4wOS02LjIxYTEgMSAwIDAgMCAwLTEuN2wtMTAuMDktNi4yMWExIDEgMCAwIDAtMS41Mi44NXpcIi8+PC9nPjwvc3ZnPidcbiAgcmV0dXJuIGxheWVyXG5cbmNyZWF0ZVZvbHVtZUJ1dHRvbiA9IChwYXJlbnQpIC0+XG4gIG5ldyBMYXllclxuICAgIHg6IDEzMFxuICAgIHk6IDMzNFxuICAgIHdpZHRoOiA3MFxuICAgIGhlaWdodDogMTcyXG4gICAgYm9yZGVyUmFkaXVzOiAzOFxuICAgIHN0eWxlOlxuICAgICAgYmFja2dyb3VuZDogJy13ZWJraXQtbGluZWFyLWdyYWRpZW50KHRvcCwgIzk5OTk5OSwgIzFBMUExQSknXG4gICAgICBib3hTaGFkb3c6ICcwIDAgMCAycHQgcmdiYSgwLCAwLCAwLCAwLjUpJ1xuICAgIG5hbWU6ICd2b2x1bWVCdXR0b24nXG4gICAgcGFyZW50OiBwYXJlbnRcblxuY3JlYXRlVm9sdW1lQnV0dG9uSW5uZXIgPSAocGFyZW50KSAtPlxuICBuZXcgTGF5ZXJcbiAgICB4OiAxXG4gICAgeTogMVxuICAgIHdpZHRoOiA2OFxuICAgIGhlaWdodDogMTcwXG4gICAgYm9yZGVyUmFkaXVzOiAzN1xuICAgIGJhY2tncm91bmRDb2xvcjogJyMzRDNEM0QnXG4gICAgbmFtZTogJ3ZvbHVtZUJ1dHRvbklubmVyJ1xuICAgIHBhcmVudDogcGFyZW50XG4gICAgaHRtbDogJzxzdmcgd2lkdGg9XCI3MFwiIGhlaWdodD1cIjE3MlwiIHZpZXdCb3g9XCIwIDAgNzAgMTcyXCI+PGcgZmlsbD1cIiNkOGQ4ZDhcIj48cmVjdCB4PVwiMjVcIiB5PVwiMzZcIiB3aWR0aD1cIjIwXCIgaGVpZ2h0PVwiMlwiIHJ4PVwiMVwiIHJ5PVwiMVwiLz48cmVjdCB4PVwiMjVcIiB5PVwiMzZcIiB3aWR0aD1cIjIwXCIgaGVpZ2h0PVwiMlwiIHJ4PVwiMVwiIHJ5PVwiMVwiIHRyYW5zZm9ybT1cInJvdGF0ZSg5MCAzNSAzNylcIi8+PHJlY3QgeD1cIjI0XCIgeT1cIjEzMlwiIHdpZHRoPVwiMjBcIiBoZWlnaHQ9XCIyXCIgcng9XCIxXCIgcnk9XCIxXCIvPjwvZz48L3N2Zz4nXG5cbmNyZWF0ZVZvbHVtZUJ1dHRvblVwID0gKHBhcmVudCkgLT5cbiAgbmV3IExheWVyXG4gICAgd2lkdGg6IDcwXG4gICAgaGVpZ2h0OiA4NlxuICAgIGJhY2tncm91bmRDb2xvcjogJ2dyYXknXG4gICAgb3BhY2l0eTogMFxuICAgIG5hbWU6ICd2b2x1bWVCdXR0b25VcCdcbiAgICBwYXJlbnQ6IHBhcmVudFxuXG5jcmVhdGVWb2x1bWVCdXR0b25Eb3duID0gKHBhcmVudCkgLT5cbiAgbmV3IExheWVyXG4gICAgeTogODZcbiAgICB3aWR0aDogNzBcbiAgICBoZWlnaHQ6IDg2XG4gICAgYmFja2dyb3VuZENvbG9yOiAnZ3JheSdcbiAgICBvcGFjaXR5OiAwXG4gICAgbmFtZTogJ3ZvbHVtZUJ1dHRvbkRvd24nXG4gICAgcGFyZW50OiBwYXJlbnRcblxuZGVmYXVsdE9wdGlvbnMgPVxuICBnbG9zczogZmFsc2VcbiAgdHJhbnNpdGlvbjogJ2ZhZGUnXG4gIGhpZGU6IGZhbHNlXG4gIGFsaWduOiAncmlnaHQnXG4gIG1hcmdpbjogNTBcbiAgZnJvbUJvdHRvbTogNTUwXG4gIGF1dG9IaWRlOiBmYWxzZVxuICBiYWNrZ3JvdW5kQ29sb3I6ICd0cmFuc3BhcmVudCdcbiAgaGlnaGxpZ2h0Q29sb3I6ICdyZ2JhKDc0LCAxNDQsIDIyNiwgMC41KSdcbiAgd2lkdGg6IDIyOFxuICBoZWlnaHQ6IDc0MFxuICBjbGlwOiBmYWxzZVxuICBob21lQWN0aW9uOiBub29wXG4gIG1lbnVBY3Rpb246IG5vb3BcbiAgbWljQWN0aW9uOiBub29wXG4gIHBsYXlQYXVzZUFjdGlvbjogbm9vcFxuICB2b2x1bWVVcEFjdGlvbjogbm9vcFxuICB2b2x1bWVEb3duQWN0aW9uOiBub29wXG4gIGNsaWNrQWN0aW9uOiBub29wXG4gIHN3aXBlVXBBY3Rpb246IG5vb3BcbiAgc3dpcGVEb3duQWN0aW9uOiBub29wXG4gIHN3aXBlTGVmdEFjdGlvbjogbm9vcFxuICBzd2lwZVJpZ2h0QWN0aW9uOiBub29wXG5cbmNsYXNzIFJlbW90ZUxheWVyIGV4dGVuZHMgTGF5ZXJcbiAgQGRlZmluZSAnaGlkZGVuJywgZ2V0OiAoKSAtPiBAX2hpZGRlblxuICBAZGVmaW5lICd0cmFuc2l0aW9uJywgZ2V0OiAoKSAtPiBAb3B0aW9ucy50cmFuc2l0aW9uXG5cbiAgIyBpbml0aWFsaXphdGlvblxuICBjb25zdHJ1Y3RvcjogKG9wdGlvbnM9e30pIC0+XG4gICAgQG9wdGlvbnMgPSBfLmRlZmF1bHRzIG9wdGlvbnMsIGRlZmF1bHRPcHRpb25zXG4gICAgQF9oaWRkZW4gPSBAb3B0aW9ucy5oaWRlO1xuICAgIHN1cGVyIEBvcHRpb25zXG5cbiAgICAjIGJhc2UgbGF5ZXIgdG8gY29udGFpbiBhbGwgdmlzdWFsIGVsZW1lbnRzXG4gICAgQGJhc2UgPSBjcmVhdGVCYXNlKEApXG5cbiAgICAjIGxheWVyIGNvbnN0cnVjdGlvblxuICAgIHRvdWNoU3VyZmFjZSA9IGNyZWF0ZVRvdWNoU3VyZmFjZShAYmFzZSlcbiAgICBpbmVydFN1cmZhY2UgPSBjcmVhdGVJbmVydFN1cmZhY2UoQGJhc2UpXG4gICAgZ2xvc3NFZmZlY3QgPSBjcmVhdGVHbG9zc0VmZmVjdChAYmFzZSlcbiAgICBncm9vdmUgPSBjcmVhdGVHcm9vdmUoQGJhc2UpXG4gICAgZ3Jvb3ZlSGlnaGxpZ2h0ID0gY3JlYXRlR3Jvb3ZlSGlnaHRsaWdodChAYmFzZSlcbiAgICBtaWNTbG90ID0gY3JlYXRlTWljU2xvdChAYmFzZSlcbiAgICBtZW51QnV0dG9uID0gY3JlYXRlTWVudUJ1dHRvbihAYmFzZSlcbiAgICBtZW51QnV0dG9uSW5uZXIgPSBjcmVhdGVNZW51QnV0dG9uSW5uZXIobWVudUJ1dHRvbilcbiAgICBob21lQnV0dG9uID0gY3JlYXRlSG9tZUJ1dHRvbihAYmFzZSlcbiAgICBob21lQnV0dG9uSW5uZXIgPSBjcmVhdGVIb21lQnV0dG9uSW5uZXIoaG9tZUJ1dHRvbilcbiAgICBtaWNCdXR0b24gPSBjcmVhdGVNaWNCdXR0b24oQGJhc2UpXG4gICAgbWljQnV0dG9uSW5uZXIgPSBjcmVhdGVNaWNCdXR0b25Jbm5lcihtaWNCdXR0b24pXG4gICAgcGxheVBhdXNlQnV0dG9uID0gY3JlYXRlUGxheVBhdXNlQnV0dG9uKEBiYXNlKVxuICAgIHBsYXlQYXVzZUJ1dHRvbklubmVyID0gY3JlYXRlUGxheVBhdXNlQnV0dG9uSW5uZXIocGxheVBhdXNlQnV0dG9uKVxuICAgIHZvbHVtZUJ1dHRvbiA9IGNyZWF0ZVZvbHVtZUJ1dHRvbihAYmFzZSlcbiAgICB2b2x1bWVCdXR0b25Jbm5lciA9IGNyZWF0ZVZvbHVtZUJ1dHRvbklubmVyKHZvbHVtZUJ1dHRvbilcbiAgICB2b2x1bWVCdXR0b25VcCA9IGNyZWF0ZVZvbHVtZUJ1dHRvblVwKHZvbHVtZUJ1dHRvbilcbiAgICB2b2x1bWVCdXR0b25Eb3duID0gY3JlYXRlVm9sdW1lQnV0dG9uRG93bih2b2x1bWVCdXR0b24pXG5cbiAgICAjIGFzc2lnbiBhY3Rpb25zIHRvIGJ1dHRvbnNcbiAgICBtZW51QnV0dG9uLm9uQ2xpY2sgPT4gQG9wdGlvbnMubWVudUFjdGlvbigpXG4gICAgaG9tZUJ1dHRvbi5vbkNsaWNrID0+IEBvcHRpb25zLmhvbWVBY3Rpb24oKVxuICAgIG1pY0J1dHRvbi5vbkNsaWNrID0+IEBvcHRpb25zLm1pY0FjdGlvbigpXG4gICAgcGxheVBhdXNlQnV0dG9uLm9uQ2xpY2sgPT4gQG9wdGlvbnMucGxheVBhdXNlQWN0aW9uKClcbiAgICB2b2x1bWVCdXR0b25VcC5vbkNsaWNrID0+IEBvcHRpb25zLnZvbHVtZVVwQWN0aW9uKClcbiAgICB2b2x1bWVCdXR0b25Eb3duLm9uQ2xpY2sgPT4gQG9wdGlvbnMudm9sdW1lRG93bkFjdGlvbigpXG4gICAgdG91Y2hTdXJmYWNlLm9uQ2xpY2sgPT4gQG9wdGlvbnMuY2xpY2tBY3Rpb24oKVxuICAgIHRvdWNoU3VyZmFjZS5vblN3aXBlVXAgPT4gQG9wdGlvbnMuc3dpcGVVcEFjdGlvbigpXG4gICAgdG91Y2hTdXJmYWNlLm9uU3dpcGVEb3duID0+IEBvcHRpb25zLnN3aXBlRG93bkFjdGlvbigpXG4gICAgdG91Y2hTdXJmYWNlLm9uU3dpcGVMZWZ0ID0+IEBvcHRpb25zLnN3aXBlTGVmdEFjdGlvbigpXG4gICAgdG91Y2hTdXJmYWNlLm9uU3dpcGVSaWdodCA9PiBAb3B0aW9ucy5zd2lwZVJpZ2h0QWN0aW9uKClcblxuICAgICMgc2hvdyBvciBoaWRlIGdsb3NzIGVmZmVjdHMgZGVwZW5kaW5nIG9uIHVzZXIgc2V0dGluZ1xuICAgIGlmIEBvcHRpb25zLmdsb3NzXG4gICAgICBnbG9zc0VmZmVjdC52aXNpYmxlID0gdHJ1ZVxuICAgICAgaW5lcnRTdXJmYWNlLnN0eWxlLmJhY2tncm91bmQgPSAnJ1xuICAgICAgaW5lcnRTdXJmYWNlLmJhY2tncm91bmRDb2xvciA9ICcjMUExQTFBJ1xuXG4gICAgIyBzaG93L2hpZGUgYnV0dG9uIGFyZWFcbiAgICBpZiBAb3B0aW9ucy5hdXRvSGlkZSB8fCBAb3B0aW9ucy5oaWRlXG4gICAgICBAX2hpZGRlbiA9IHRydWVcbiAgICAgIEBvbk1vdXNlT3ZlciBAc2hvd0NhdXRpb3VzbHlcbiAgICAgIEBvbk1vdXNlT3V0IEBoaWRlQ2F1dGlvdXNseVxuICAgICAgc3dpdGNoIEB0cmFuc2l0aW9uXG4gICAgICAgIHdoZW4gJ2ZhZGUnIHRoZW4gQGJhc2Uuc3RhdGVzLnN3aXRjaEluc3RhbnQoJ2hpZGUnKVxuICAgICAgICB3aGVuICdwb3AnIHRoZW4gQGJhc2Uuc3RhdGVzLnN3aXRjaEluc3RhbnQoJ2Rvd24nKVxuICAgICAgICBlbHNlIHJldHVyblxuXG4gICAgQGFsaWduKClcblxuICAgICMgYXJyYXlzIG9mIGJ1dHRvbnMgZm9yIGludGVyYWN0aW9uIHN0YXRlc1xuICAgIHJvdW5kQnV0dG9ucyA9IFttZW51QnV0dG9uLCBob21lQnV0dG9uLCBtaWNCdXR0b24sIHBsYXlQYXVzZUJ1dHRvbiwgdm9sdW1lQnV0dG9uXVxuICAgIGlubmVyQnV0dG9ucyA9IFttZW51QnV0dG9uSW5uZXIsIGhvbWVCdXR0b25Jbm5lciwgbWljQnV0dG9uSW5uZXIsIHBsYXlQYXVzZUJ1dHRvbklubmVyXVxuICAgIHZvbHVtZUJ1dHRvbnMgPSBbdm9sdW1lQnV0dG9uVXAsIHZvbHVtZUJ1dHRvbkRvd25dXG4gICAgaGlnaGxpZ2h0ID0gQG9wdGlvbnMuaGlnaGxpZ2h0Q29sb3JcblxuICAgICMgYnV0dG9uIG1vdXNlb3ZlciBlZmZlY3RzXG4gICAgZm9yIGJ1dHRvbiBpbiByb3VuZEJ1dHRvbnNcbiAgICAgIGJ1dHRvbi5vbk1vdXNlT3ZlciAtPlxuICAgICAgICB0aGlzLnN0eWxlID1cbiAgICAgICAgICBib3hTaGFkb3c6IFwiMCAwIDAgMnB0IHJnYmEoMCwgMCwgMCwgMC41KSwgMCAwIDAgNXB0ICN7aGlnaGxpZ2h0fVwiXG4gICAgICBidXR0b24ub25Nb3VzZU91dCAtPlxuICAgICAgICB0aGlzLnN0eWxlID1cbiAgICAgICAgICBib3hTaGFkb3c6ICcwIDAgMCAycHQgcmdiYSgwLCAwLCAwLCAwLjUpJ1xuXG4gICAgIyBidXR0b24gbW91c2Vkb3duIGVmZmVjdHNcbiAgICBmb3IgYnV0dG9uIGluIGlubmVyQnV0dG9uc1xuICAgICAgYnV0dG9uLm9uTW91c2VEb3duIC0+IEBicmlnaHRuZXNzID0gNzBcbiAgICAgIGJ1dHRvbi5vbk1vdXNlVXAgLT4gQGJyaWdodG5lc3MgPSAxMDBcbiAgICAgIGJ1dHRvbi5vbk1vdXNlT3V0IC0+IEBicmlnaHRuZXNzID0gMTAwXG5cbiAgICBmb3IgYnV0dG9uIGluIHZvbHVtZUJ1dHRvbnNcbiAgICAgIGJ1dHRvbi5vbk1vdXNlRG93biAtPiB2b2x1bWVCdXR0b25Jbm5lci5icmlnaHRuZXNzID0gNzBcbiAgICAgIGJ1dHRvbi5vbk1vdXNlVXAgLT4gdm9sdW1lQnV0dG9uSW5uZXIuYnJpZ2h0bmVzcyA9IDEwMFxuXG4gIGFsaWduOiAoYWxpZ24gPSBAb3B0aW9ucy5hbGlnbiwgbWFyZ2luID0gQG9wdGlvbnMubWFyZ2luLCBmcm9tQm90dG9tID0gQG9wdGlvbnMuZnJvbUJvdHRvbSkgLT5cbiAgICBpZiBhbGlnbiA9PSAnbGVmdCdcbiAgICAgIEB4ID0gbWFyZ2luICsgYm9yZGVyVGhpY2tuZXNzXG4gICAgICBAeSA9IFNjcmVlbi5oZWlnaHQgKyBib3JkZXJUaGlja25lc3MgLSBmcm9tQm90dG9tXG4gICAgZWxzZSBpZiBhbGlnbiA9PSAnY2VudGVyJ1xuICAgICAgQGNlbnRlclgoKVxuICAgICAgQHkgPSBTY3JlZW4uaGVpZ2h0ICsgYm9yZGVyVGhpY2tuZXNzIC0gZnJvbUJvdHRvbVxuICAgIGVsc2VcbiAgICAgIEB4ID0gU2NyZWVuLndpZHRoIC0gQHdpZHRoIC0gbWFyZ2luIC0gYm9yZGVyVGhpY2tuZXNzXG4gICAgICBAeSA9IFNjcmVlbi5oZWlnaHQgKyBib3JkZXJUaGlja25lc3MgLSBmcm9tQm90dG9tXG5cbiAgc2hvdzogKCkgLT5cbiAgICBAX2hpZGRlbiA9IGZhbHNlXG4gICAgc3dpdGNoIEB0cmFuc2l0aW9uXG4gICAgICB3aGVuICdmYWRlJyB0aGVuIEBiYXNlLnN0YXRlcy5zd2l0Y2goJ3Nob3cnKVxuICAgICAgd2hlbiAncG9wJyB0aGVuIEBiYXNlLnN0YXRlcy5zd2l0Y2goJ3VwJylcbiAgICAgIGVsc2UgcmV0dXJuXG5cbiAgaGlkZTogKCkgLT5cbiAgICBAX2hpZGRlbiA9IHRydWVcbiAgICBzd2l0Y2ggQHRyYW5zaXRpb25cbiAgICAgIHdoZW4gJ2ZhZGUnIHRoZW4gQGJhc2Uuc3RhdGVzLnN3aXRjaCgnaGlkZScpXG4gICAgICB3aGVuICdwb3AnIHRoZW4gQGJhc2Uuc3RhdGVzLnN3aXRjaCgnZG93bicpXG4gICAgICBlbHNlIHJldHVyblxuXG4gIHNob3dDYXV0aW91c2x5OiBVdGlscy5kZWJvdW5jZSAwLjEsIC0+IEBzaG93KClcbiAgaGlkZUNhdXRpb3VzbHk6IFV0aWxzLmRlYm91bmNlIDEuMCwgLT4gQGhpZGUoKVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlbW90ZUxheWVyXG4iLCIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUVBQTtBRENBLElBQUEs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
