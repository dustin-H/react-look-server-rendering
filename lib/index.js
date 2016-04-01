'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.reset = reset;
exports.renderToString = renderToString;

var _reactLook = require('react-look');

var classes = {};

var plugin = {
  mode: 'force',
  plugin: function plugin(_ref) {
    var styles = _ref.styles;
    var newProps = _ref.newProps;

    if (newProps != null && newProps.className != null && typeof newProps.className === 'string') {
      var classNames = newProps.className.split(' ');
      for (var i in classNames) {
        classes[classNames[i]] = true;
      }
    }
    return styles;
  }
};

var selectorRegExp = new RegExp(/^\.(([a-z]|[0-9]|-|_)*)/i);

var selectorUsed = function selectorUsed(selector) {
  if (selector[0] !== '.') {
    return true;
  }
  var match = selectorRegExp.exec(selector);
  if (match == null || match.length < 2) {
    return true;
  }
  var cl = match[1];
  if (classes[cl] === true) {
    return true;
  }
  return false;
};

exports.plugin = plugin;

function reset() {
  for (var i in classes) {
    classes[i] = false;
  }
}

function renderToString() {
  var prefixer = arguments[0] === undefined ? new _reactLook.Prefixer() : arguments[0];

  var css = '';

  _reactLook._StyleContainer.fonts.forEach(function (font) {
    return css += font;
  });
  _reactLook._StyleContainer.statics.forEach(function (staticStyles) {
    return css += staticStyles;
  });

  _reactLook._StyleContainer.selectors.forEach(function (styles, selector) {
    if (selectorUsed(selector) === true) {
      css += selector + _reactLook._StyleContainer._renderCSS(prefixer, styles);
    }
  });
  _reactLook._StyleContainer.mediaQueries.forEach(function (selectors, query) {
    css += '@media' + query + '{';
    selectors.forEach(function (styles, selector) {
      if (selectorUsed(selector) === true) {
        css += selector + _reactLook._StyleContainer._renderCSS(prefixer, styles);
      }
    });
    css += '}';
  });
  _reactLook._StyleContainer.keyframes.forEach(function (frames, name) {
    css += prefixer.getKeyframesPrefix().reduce(function (keyframes, prefix) {
      keyframes += '@' + prefix + 'keyframes ' + name + _reactLook._StyleContainer._renderCSS(prefixer, frames);
      return keyframes;
    }, '');
  });

  reset();

  return css;
}