// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/front.js":[function(require,module,exports) {
'use strict';

document.addEventListener('DOMContentLoaded', function () {
  // ------------------------------------------------------- //
  // Search Box
  // ------------------------------------------------------ //
  var navBar = document.querySelector('.navbar');
  var searchBtn = document.getElementById('search'),
      searchBox = document.querySelector('.search-box'),
      searchClose = document.querySelector('.dismiss');

  if (navBar) {
    searchBtn.addEventListener('click', function (e) {
      e.preventDefault();
      searchBox.classList.add('fadedIn');
    });
    searchClose.addEventListener('click', function () {
      return searchBox.classList.remove('fadedIn');
    });
  } // ------------------------------------------------------- //
  // Card Close
  // ------------------------------------------------------ //


  var closeCardBtn = document.querySelectorAll('.card-close a.remove');
  closeCardBtn.forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      el.closest('.card').style.opacity = '0';
      setTimeout(function () {
        el.closest('.card').classList.add('d-none');
      }, 300);
    });
  }); // ------------------------------------------------------- //
  // Card Close dropdown
  // ------------------------------------------------------ //

  var cardSettingsToggle = document.querySelectorAll('.card-close .dropdown-toggle');
  cardSettingsToggle.forEach(function (el) {
    el.addEventListener('click', function () {
      if (el.classList.contains('show')) {
        setTimeout(function () {
          el.nextElementSibling.classList.add('is-visible');
        }, 100);
      }
    });
  });
  document.addEventListener('click', function (e) {
    cardSettingsToggle.forEach(function (el) {
      if (e.target == el) {
        setTimeout(function () {
          el.nextElementSibling.classList.add('is-visible');
        }, 100);
      } else {
        el.nextElementSibling.classList.remove('is-visible');
      }
    });
  }); // ------------------------------------------------------- //
  // Tooltips init
  // ------------------------------------------------------ //

  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  }); // ------------------------------------------------------- //
  // Sidebar Functionality
  // ------------------------------------------------------ //

  var sbToggleBtn = document.getElementById('toggle-btn'),
      sideNavbar = document.querySelector('.side-navbar'),
      innerContent = document.querySelector('.content-inner'),
      smBrand = document.querySelector('.navbar-header .brand-small'),
      lgBrand = document.querySelector('.navbar-header .brand-big');

  if (sideNavbar) {
    sbToggleBtn.addEventListener('click', function (e) {
      e.preventDefault();
      this.classList.toggle('active');
      sideNavbar.classList.toggle('shrinked');
      innerContent.classList.toggle('active');
      document.dispatchEvent(new Event('sidebarChanged'));
      /* THIS IS NOT THERE ANY MORE [UTILITY CLASSES USED] */
      // if (window.outerWidth > 1183) {
      //     if (sbToggleBtn.classList.contains('active')) {
      //         smBrand.style.display = 'none';
      //         lgBrand.style.display = 'block';
      //     } else {
      //         smBrand.style.display = 'block';
      //         lgBrand.style.display = 'none';
      //     }
      // }
      //
      // if (window.outerWidth < 1183) {
      //     smBrand.style.display = 'block';
      // }
    });
  } // ------------------------------------------------------- //
  // Footer
  // ------------------------------------------------------ //


  var footer = document.querySelector('#footer');

  if (footer) {
    document.addEventListener('sidebarChanged', function () {
      adjustFooter();
    });
    window.addEventListener('resize', function () {
      adjustFooter();
    });
  }

  function adjustFooter() {
    var footerBlockHeight = document.querySelector('#footer').outerHeight;
    innerContent.style.paddingBottom = "".concat(footerBlockHeight, "px");
  } // ------------------------------------------------------- //
  // External links to new window
  // ------------------------------------------------------ //


  document.querySelectorAll('.external').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      window.open(el.getAttribute('href'));
    });
  }); // ------------------------------------------------------- //
  // Material Inputs
  // ------------------------------------------------------ //

  var materialInputs = document.querySelectorAll('input.input-material');
  var materialLabel = document.querySelectorAll('label.label-material'); // activate labels for prefilled values

  var filledMaterialInputs = Array.from(materialInputs).filter(function (input) {
    return input.value !== '';
  });
  filledMaterialInputs.forEach(function (input) {
    return input.parentElement.lastElementChild.setAttribute('class', 'label-material active');
  }); // move label on focus

  materialInputs.forEach(function (input) {
    input.addEventListener('focus', function () {
      input.parentElement.lastElementChild.setAttribute('class', 'label-material active');
    });
  }); // remove/keep label on blur

  materialInputs.forEach(function (input) {
    input.addEventListener('blur', function () {
      if (input.value !== '') {
        input.parentElement.lastElementChild.setAttribute('class', 'label-material active');
      } else {
        input.parentElement.lastElementChild.setAttribute('class', 'label-material');
      }
    });
  });

  function bsValidationBehavior(errorInputs, form) {
    function watchError() {
      errorInputs.forEach(function (input) {
        if (input.classList.contains('js-validate-error-field')) {
          input.classList.add('is-invalid');
          input.classList.remove('is-valid');
        } else {
          input.classList.remove('is-invalid');
          input.classList.add('is-valid');
        }
      });
    }

    watchError();
  } // ------------------------------------------------------- //
  // Login Form Validation
  // ------------------------------------------------------ //


  var loginForm = document.querySelector('.login-form');

  if (loginForm) {
    new window.JustValidate('.login-form', {
      rules: {
        loginUsername: {
          required: true,
          email: true
        },
        loginPassword: {
          required: true
        }
      },
      messages: {
        loginUsername: 'Please enter a valid email',
        loginPassword: 'Please enter your password'
      },
      invalidFormCallback: function invalidFormCallback() {
        var errorInputs = document.querySelectorAll('.login-form input[required]');
        bsValidationBehavior(errorInputs, loginForm);
        loginForm.addEventListener('keyup', function () {
          return bsValidationBehavior(errorInputs, loginForm);
        });
      }
    });
  } // ------------------------------------------------------- //
  // Register Form Validation
  // ------------------------------------------------------ //


  var registerForm = document.querySelector('.register-form');

  if (registerForm) {
    new window.JustValidate('.register-form', {
      rules: {
        registerUsername: {
          required: true
        },
        registerEmail: {
          required: true,
          email: true
        },
        registerPassword: {
          required: true
        },
        registerAgree: {
          required: true
        }
      },
      messages: {
        registerUsername: 'Please enter your username',
        registerEmail: 'Please enter a valid email address',
        registerPassword: 'Please enter your password',
        registerAgree: 'Your agreement is required'
      },
      invalidFormCallback: function invalidFormCallback() {
        var errorInputs = document.querySelectorAll('.register-form input[required]');
        bsValidationBehavior(errorInputs, registerForm);
        registerForm.addEventListener('keyup', function () {
          return bsValidationBehavior(errorInputs, registerForm);
        });
        registerForm.addEventListener('change', function () {
          return bsValidationBehavior(errorInputs, registerForm);
        });
      }
    });
  } // ------------------------------------------------------- //
  // Profile page choices
  // ------------------------------------------------------ //


  function injectClassess(x) {
    var pickerCustomClass = x.dataset.customclass;
    var pickerSevClasses = pickerCustomClass.split(' ');
    x.parentElement.classList.add.apply(x.parentElement.classList, pickerSevClasses);
  }

  var profileCountryChoices = document.querySelector('.profile-country-choices');

  if (profileCountryChoices) {
    var countryChoices = new Choices(profileCountryChoices, {
      searchEnabled: false,
      placeholder: false,
      callbackOnInit: function callbackOnInit() {
        return injectClassess(profileCountryChoices);
      }
    });
  }
});
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55143" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/front.js"], null)
//# sourceMappingURL=/front.4522333e.js.map