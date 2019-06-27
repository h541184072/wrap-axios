import { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';
export interface RequestInterceptorInterface {
    (config: RequestConfigInterface): RequestConfigInterface;
}
export interface BoAxiosInterface extends AxiosInstance {
    get<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    delete<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    create?: InitFunctionInterface;
}
export interface RequestConfigInterface extends AxiosRequestConfig {
    filter?: boolean;
    cache?: boolean;
    message?: any;
    responseInterceptor?: (response: AxiosResponse) => any;
    requestInterceptor?: RequestInterceptorInterface;
}
export interface InitFunctionInterface {
    (config?: RequestConfigInterface): BoAxiosInterface;
}
