import axios, { AxiosRequestConfig } from 'axios';
import merge = require('lodash.merge');
import { defaultConfig } from './defaultConfig';
import { requestInterceptor } from './request.interceptor';
import {
    responseInterceptorOnError,
    responseInterceptorOnSuccess,
} from './response.interceptor';
import {
    InitFunctionInterface,
    RequestConfigInterface,
    BoAxiosInterface,
} from './interface';

export const create: InitFunctionInterface = (config = {}) => {
    const mergeConfig: RequestConfigInterface = merge(defaultConfig, config);
    const http: BoAxiosInterface = axios.create(mergeConfig);

    if (config.requestInterceptor) {
        http.interceptors.request.use(config.requestInterceptor);
    }

    if (config.responseInterceptor) {
        http.interceptors.response.use(config.responseInterceptor);
    }

    http.interceptors.request.use(requestInterceptor);
    http.interceptors.response.use(
        responseInterceptorOnSuccess,
        responseInterceptorOnError
    );

    http.get = function(
        url: string,
        data = {},
        config: AxiosRequestConfig = {}
    ) {
        return http.request({
            url,
            params: data,
            ...config,
        });
    };

    http.delete = function(
        url: string,
        data: any = {},
        config: AxiosRequestConfig = {}
    ) {
        return http.request({
            url,
            method: 'delete',
            data,
            ...config,
        });
    };

    return http;
};
