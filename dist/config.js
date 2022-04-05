"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const path = require('path');

_dotenv.default.config({
  path: path.join(__dirname, '../../.envrc')
});

var _default = {
  PORT: process.env.PORT
};
exports.default = _default;