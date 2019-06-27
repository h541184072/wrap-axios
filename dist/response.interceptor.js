"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var systemStatus = {
    '310': {
        msg: '无session信息!',
        path: '/403',
    },
    '405': {
        msg: 'session过期',
        path: '/403',
    },
    '406': {
        msg: '用户已在其他地方登陆!!',
        path: '/403',
    },
    '506': {
        msg: '系统其它异常错误!',
        path: '/500',
    },
};
exports.responseInterceptorOnSuccess = function (response) {
    var data = response.data;
    var message;
    var code;
    if (data) {
        if (data instanceof Blob) {
            var contentD = response.headers['content-disposition'];
            var realFileName = contentD.split('filename=')[1];
            return {
                success: true,
                data: {
                    file: data,
                    fileName: realFileName,
                },
            };
        }
        if (data.success) {
            return data.data;
        }
        var errors = data.errors;
        if (Array.isArray(errors) && errors.length) {
            var firstError = errors[0];
            message = firstError.message;
            code = firstError.code;
            if (code in systemStatus) {
                var msg = systemStatus[code].msg;
                if (response.config.message) {
                    response.config.message.error(msg, 3, function () {
                        window.location.href = '/login/';
                    });
                    return;
                }
                alert(msg);
                window.location.href = '/login/';
                return;
            }
        }
    }
    return Promise.reject({
        message: message,
        code: code,
    });
};
exports.responseInterceptorOnError = function (error) {
    var defaultMessage = '网络错误 稍后再试';
    if (error) {
        return Promise.reject({
            message: error.message || defaultMessage,
            code: null,
        });
    }
    return Promise.reject({
        message: defaultMessage,
        code: null,
    });
};
