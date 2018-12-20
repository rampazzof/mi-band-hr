"use strict";

require("@babel/polyfill");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var MiBand = require("miband");

var bluetooth = require("webbluetooth").bluetooth;

var log = console.log;
(function () {
  var _main = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var device, server, miband;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            log("Requesting Bluetooth Device...");
            _context.next = 4;
            return bluetooth.requestDevice({
              filters: [{
                services: [MiBand.advertisementService]
              }],
              optionalServices: MiBand.optionalServices
            });

          case 4:
            device = _context.sent;
            _context.next = 7;
            return device.gatt.connect();

          case 7:
            server = _context.sent;
            log("Device connected");
            miband = new MiBand(server);
            _context.next = 12;
            return miband.init();

          case 12:
            _context.t0 = console;
            _context.next = 15;
            return miband.showNotification("message");

          case 15:
            _context.t1 = _context.sent;

            _context.t0.log.call(_context.t0, _context.t1);

            _context.next = 22;
            break;

          case 19:
            _context.prev = 19;
            _context.t2 = _context["catch"](0);
            console.error(_context.t2);

          case 22:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 19]]);
  }));

  function main() {
    return _main.apply(this, arguments);
  }

  return main;
})()();