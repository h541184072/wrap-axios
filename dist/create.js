"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var merge = require("lodash.merge");
var defaultConfig_1 = require("./defaultConfig");
var request_interceptor_1 = require("./request.interceptor");
var response_interceptor_1 = require("./response.interceptor");
exports.create = function (config) {
    if (config === void 0) { config = {}; }
    var mergeConfig = merge(defaultConfig_1.defaultConfig, config);
    var http = axios_1.default.create(mergeConfig);
    if (config.requestInterceptor) {
        http.interceptors.request.use(config.requestInterceptor);
    }
    if (config.responseInterceptor) {
        http.interceptors.response.use(config.responseInterceptor);
    }
    http.interceptors.request.use(request_interceptor_1.requestInterceptor);
    http.interceptors.response.use(response_interceptor_1.responseInterceptorOnSuccess, response_interceptor_1.responseInterceptorOnError);
    http.get = function (url, data, config) {
        if (data === void 0) { data = {}; }
        if (config === void 0) { config = {}; }
        return http.request(__assign({ url: url, params: data }, config));
    };
    http.delete = function (url, data, config) {
        if (data === void 0) { data = {}; }
        if (config === void 0) { config = {}; }
        return http.request(__assign({ url: url, method: 'delete', data: data }, config));
    };
    return http;
};
