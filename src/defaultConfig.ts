import { RequestConfigInterface } from './interface';

export const defaultConfig: RequestConfigInterface = {
    method: 'get',
    baseURL: '/',
    withCredentials: true,
    timeout: 5000,
    responseType: 'json',
    maxContentLength: 1024 * 1024 * 1024,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json;charset=utf-8',
        Accept: 'application/json;version=3.0;compress=false;',
    },
    filter: false,
    cache: false,
};
