"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var create_1 = require("./create");
var $http = create_1.create();
$http.create = create_1.create;
exports.default = $http;
