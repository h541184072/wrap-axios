import { AxiosResponse } from 'axios';
import { RequestConfigInterface } from './interface';

const systemStatus: any = {
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

interface SelfResponse extends AxiosResponse {
    config: RequestConfigInterface;
}

export const responseInterceptorOnSuccess = (response: SelfResponse): any => {
    const { data } = response;
    let message: string;
    let code: string;
    if (data) {
        if (data instanceof Blob) {
            const contentD: string = response.headers['content-disposition'];
            const realFileName: string = contentD.split('filename=')[1];
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

        const { errors } = data;

        if (Array.isArray(errors) && errors.length) {
            const firstError = errors[0];

            message = firstError.message as string;
            code = firstError.code as string;

            if (code in systemStatus) {
                const { msg } = systemStatus[code];

                if (response.config.message) {
                    response.config.message.error(msg, 3, () => {
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
        message,
        code,
    });
};

export const responseInterceptorOnError = (error: Error) => {
    const defaultMessage = '网络错误 稍后再试';

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
