"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestInterceptor = function (config) {
    if (config.cache) {
        config.params = config.params || {};
        config.params['__cache__'] = Math.random();
    }
    if (config.filter) {
        var _a = config.data, data = _a === void 0 ? {} : _a;
        //过滤假值
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                var item = data[key];
                if (item === null || item === undefined) {
                    delete data[key];
                }
            }
        }
    }
    if (config.method === 'get' && config.data) {
        config.params = config.data;
        delete config.data;
    }
    return config;
};
