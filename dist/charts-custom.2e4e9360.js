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
})({"js/charts-custom.js":[function(require,module,exports) {
"use strict";

document.addEventListener("DOMContentLoaded", function () {
  // ------------------------------------------------------- //
  // Charts Gradients
  // ------------------------------------------------------ //
  var canvas = document.querySelector("canvas");
  var ctx1 = canvas.getContext("2d");
  var gradient1 = ctx1.createLinearGradient(150, 0, 150, 300);
  gradient1.addColorStop(0, "rgba(133, 180, 242, 0.91)");
  gradient1.addColorStop(1, "rgba(255, 119, 119, 0.94)");
  var gradient2 = ctx1.createLinearGradient(146.0, 0.0, 154.0, 300.0);
  gradient2.addColorStop(0, "rgba(104, 179, 112, 0.85)");
  gradient2.addColorStop(1, "rgba(76, 162, 205, 0.85)"); // ------------------------------------------------------- //
  // Line Chart
  // ------------------------------------------------------ //

  var LINECHARTEXMPLE = document.getElementById("lineChartExample");
  var lineChartExample = new Chart(LINECHARTEXMPLE, {
    type: "line",
    options: {
      legend: {
        labels: {
          fontColor: "#777",
          fontSize: 12
        }
      },
      scales: {
        xAxes: [{
          display: true,
          gridLines: {
            color: "#eee"
          }
        }],
        yAxes: [{
          display: true,
          gridLines: {
            color: "#eee"
          }
        }]
      }
    },
    data: {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [{
        label: "Data Set One",
        fill: true,
        lineTension: 0.3,
        backgroundColor: gradient1,
        borderColor: gradient1,
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        borderWidth: 1,
        pointBorderColor: gradient1,
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: gradient1,
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [30, 50, 40, 61, 42, 35, 40],
        spanGaps: false
      }, {
        label: "Data Set Two",
        fill: true,
        lineTension: 0.3,
        backgroundColor: gradient2,
        borderColor: gradient2,
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        borderWidth: 1,
        pointBorderColor: gradient2,
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: gradient2,
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [50, 40, 50, 40, 45, 40, 30],
        spanGaps: false
      }]
    }
  }); // ------------------------------------------------------- //
  // Doughnut Chart
  // ------------------------------------------------------ //

  var DOUGHNUTCHARTEXMPLE = document.getElementById("doughnutChartExample");
  var pieChartExample = new Chart(DOUGHNUTCHARTEXMPLE, {
    type: "doughnut",
    options: {
      cutoutPercentage: 70
    },
    data: {
      labels: ["A", "B", "C", "D"],
      datasets: [{
        data: [250, 50, 100, 40],
        borderWidth: 0,
        backgroundColor: ["#3eb579", "#49cd8b", "#54e69d", "#71e9ad"],
        hoverBackgroundColor: ["#3eb579", "#49cd8b", "#54e69d", "#71e9ad"]
      }]
    }
  });
  var pieChartExample = {
    responsive: true
  }; // ------------------------------------------------------- //
  // Line Chart 1
  // ------------------------------------------------------ //

  var LINECHART1 = document.getElementById("lineChartExample1");
  var myLineChart = new Chart(LINECHART1, {
    type: "line",
    options: {
      scales: {
        xAxes: [{
          display: true,
          gridLines: {
            display: false
          }
        }],
        yAxes: [{
          ticks: {
            max: 40,
            min: 0,
            stepSize: 0.5
          },
          display: false,
          gridLines: {
            display: false
          }
        }]
      },
      legend: {
        display: false
      }
    },
    data: {
      labels: ["A", "B", "C", "D", "E", "F", "G"],
      datasets: [{
        label: "Total Overdue",
        fill: true,
        lineTension: 0,
        backgroundColor: "transparent",
        borderColor: "#6ccef0",
        pointBorderColor: "#59c2e6",
        pointHoverBackgroundColor: "#59c2e6",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        borderWidth: 3,
        pointBackgroundColor: "#59c2e6",
        pointBorderWidth: 0,
        pointHoverRadius: 4,
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 0,
        pointRadius: 4,
        pointHitRadius: 0,
        data: [20, 28, 30, 22, 24, 10, 7],
        spanGaps: false
      }]
    }
  }); // ------------------------------------------------------- //
  // Line Chart 2
  // ------------------------------------------------------ //

  var LINECHART1 = document.getElementById("lineChartExample2");
  var myLineChart = new Chart(LINECHART1, {
    type: "line",
    options: {
      scales: {
        xAxes: [{
          display: true,
          gridLines: {
            display: false,
            color: "#eee"
          }
        }],
        yAxes: [{
          ticks: {
            max: 40,
            min: 0,
            stepSize: 0.5
          },
          display: false,
          gridLines: {
            display: false
          }
        }]
      },
      legend: {
        display: false
      }
    },
    data: {
      labels: ["A", "B", "C", "D", "E", "F", "G"],
      datasets: [{
        label: "Total Overdue",
        fill: true,
        lineTension: 0,
        backgroundColor: "transparent",
        borderColor: "#ff7676",
        pointBorderColor: "#ff7676",
        pointHoverBackgroundColor: "#ff7676",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        borderWidth: 3,
        pointBackgroundColor: "#ff7676",
        pointBorderWidth: 0,
        pointHoverRadius: 4,
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 0,
        pointRadius: 4,
        pointHitRadius: 0,
        data: [20, 8, 30, 22, 24, 17, 20],
        spanGaps: false
      }]
    }
  }); // ------------------------------------------------------- //
  // Pie Chart
  // ------------------------------------------------------ //

  var PIECHARTEXMPLE = document.getElementById("pieChartExample");
  var pieChartExample = new Chart(PIECHARTEXMPLE, {
    type: "pie",
    data: {
      labels: ["A", "B", "C", "D"],
      datasets: [{
        data: [300, 50, 100, 80],
        borderWidth: 0,
        backgroundColor: ["#44b2d7", "#59c2e6", "#71d1f2", "#96e5ff"],
        hoverBackgroundColor: ["#44b2d7", "#59c2e6", "#71d1f2", "#96e5ff"]
      }]
    }
  });
  var pieChartExample = {
    responsive: true
  }; // ------------------------------------------------------- //
  // Bar Chart
  // ------------------------------------------------------ //

  var BARCHARTEXMPLE = document.getElementById("barChartExample");
  var barChartExample = new Chart(BARCHARTEXMPLE, {
    type: "bar",
    options: {
      scales: {
        xAxes: [{
          display: true,
          gridLines: {
            color: "#eee"
          }
        }],
        yAxes: [{
          display: true,
          gridLines: {
            color: "#eee"
          }
        }]
      }
    },
    data: {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [{
        label: "Data Set 1",
        backgroundColor: [gradient1, gradient1, gradient1, gradient1, gradient1, gradient1, gradient1],
        hoverBackgroundColor: [gradient1, gradient1, gradient1, gradient1, gradient1, gradient1, gradient1],
        borderColor: [gradient1, gradient1, gradient1, gradient1, gradient1, gradient1, gradient1],
        borderWidth: 1,
        data: [65, 59, 80, 81, 56, 55, 40]
      }, {
        label: "Data Set 2",
        backgroundColor: [gradient2, gradient2, gradient2, gradient2, gradient2, gradient2, gradient2],
        hoverBackgroundColor: [gradient2, gradient2, gradient2, gradient2, gradient2, gradient2, gradient2],
        borderColor: [gradient2, gradient2, gradient2, gradient2, gradient2, gradient2, gradient2],
        borderWidth: 1,
        data: [35, 40, 60, 47, 88, 27, 30]
      }]
    }
  }); // ------------------------------------------------------- //
  // Bar Chart 1
  // ------------------------------------------------------ //

  var BARCHART1 = document.getElementById("barChart1");
  var barChartHome = new Chart(BARCHART1, {
    type: "bar",
    options: {
      scales: {
        xAxes: [{
          display: false
        }],
        yAxes: [{
          display: false
        }]
      },
      legend: {
        display: false
      }
    },
    data: {
      labels: ["A", "B", "C", "D", "E", "F", "G", "H"],
      datasets: [{
        label: "Data Set 1",
        backgroundColor: ["#44b2d7", "#44b2d7", "#44b2d7", "#44b2d7", "#44b2d7", "#44b2d7", "#44b2d7", "#44b2d7"],
        borderColor: ["#44b2d7", "#44b2d7", "#44b2d7", "#44b2d7", "#44b2d7", "#44b2d7", "#44b2d7", "#44b2d7"],
        borderWidth: 0,
        data: [35, 55, 65, 85, 30, 22, 18, 35]
      }, {
        label: "Data Set 1",
        backgroundColor: ["#59c2e6", "#59c2e6", "#59c2e6", "#59c2e6", "#59c2e6", "#59c2e6", "#59c2e6", "#59c2e6"],
        borderColor: ["#59c2e6", "#59c2e6", "#59c2e6", "#59c2e6", "#59c2e6", "#59c2e6", "#59c2e6", "#59c2e6"],
        borderWidth: 0,
        data: [49, 68, 85, 40, 27, 35, 20, 25]
      }]
    }
  }); // ------------------------------------------------------- //
  // Bar Chart 2
  // ------------------------------------------------------ //

  var BARCHART2 = document.getElementById("barChart2");
  var barChartHome = new Chart(BARCHART2, {
    type: "bar",
    options: {
      scales: {
        xAxes: [{
          display: false
        }],
        yAxes: [{
          display: false
        }]
      },
      legend: {
        display: false
      }
    },
    data: {
      labels: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O"],
      datasets: [{
        label: "Data Set 1",
        backgroundColor: ["#54e69d", "#54e69d", "#54e69d", "#54e69d", "#54e69d", "#54e69d", "#54e69d", "#54e69d", "#54e69d", "#54e69d", "#54e69d", "#54e69d", "#54e69d", "#54e69d", "#54e69d"],
        borderColor: ["#54e69d", "#54e69d", "#54e69d", "#54e69d", "#54e69d", "#54e69d", "#54e69d", "#54e69d", "#54e69d", "#54e69d", "#54e69d", "#54e69d", "#54e69d", "#54e69d", "#54e69d"],
        borderWidth: 1,
        data: [40, 33, 22, 28, 40, 25, 30, 40, 28, 27, 22, 15, 20, 24, 30]
      }]
    }
  }); // ------------------------------------------------------- //
  // Polar Chart
  // ------------------------------------------------------ //

  var POLARCHARTEXMPLE = document.getElementById("polarChartExample");
  var polarChartExample = new Chart(POLARCHARTEXMPLE, {
    type: "polarArea",
    options: {
      elements: {
        arc: {
          borderWidth: 0,
          borderColor: "#aaa"
        }
      }
    },
    data: {
      datasets: [{
        data: [11, 16, 12, 11, 7],
        backgroundColor: ["#e05f5f", "#e96a6a", "#ff7676", "#ff8b8b", "#fc9d9d"],
        label: "My dataset" // for legend

      }],
      labels: ["A", "B", "C", "D", "E"]
    }
  });
  var polarChartExample = {
    responsive: true
  }; // ------------------------------------------------------- //
  // Radar Chart
  // ------------------------------------------------------ //

  var RADARCHARTEXMPLE = document.getElementById("radarChartExample");
  var radarChartExample = new Chart(RADARCHARTEXMPLE, {
    type: "radar",
    data: {
      labels: ["A", "B", "C", "D", "E", "C"],
      datasets: [{
        label: "First dataset",
        backgroundColor: "rgba(84, 230, 157, 0.4)",
        borderWidth: 2,
        borderColor: "rgba(75, 204, 140, 1)",
        pointBackgroundColor: "rgba(75, 204, 140, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(75, 204, 140, 1)",
        data: [65, 59, 90, 81, 56, 55]
      }, {
        label: "Second dataset",
        backgroundColor: "rgba(255, 119, 119, 0.4)",
        borderWidth: 2,
        borderColor: "rgba(255, 119, 119, 1)",
        pointBackgroundColor: "rgba(255, 119, 119, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(255, 119, 119, 1)",
        data: [50, 60, 80, 45, 96, 70]
      }]
    }
  });
  var radarChartExample = {
    responsive: true
  };
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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/charts-custom.js"], null)
//# sourceMappingURL=/charts-custom.2e4e9360.js.map