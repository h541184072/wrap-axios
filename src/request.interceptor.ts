import { RequestInterceptorInterface } from './interface';

export const requestInterceptor: RequestInterceptorInterface = config => {
    if (config.cache) {
        config.params = config.params || {};
        config.params['__cache__'] = Math.random();
    }

    if (config.filter) {
        const { data = {} }: any = config;
        //过滤假值
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const item = data[key];
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
