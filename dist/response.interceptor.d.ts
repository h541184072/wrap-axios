import { AxiosResponse } from 'axios';
import { RequestConfigInterface } from './interface';
interface SelfResponse extends AxiosResponse {
    config: RequestConfigInterface;
}
export declare const responseInterceptorOnSuccess: (response: SelfResponse) => any;
export declare const responseInterceptorOnError: (error: Error) => Promise<never>;
export {};
