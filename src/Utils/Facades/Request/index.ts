import axios, {AxiosError, AxiosRequestConfig, Method} from 'axios';
import cookies from "js-cookie";
import CustomToast from "~/src/Utils/Helpers/CustomToast";
import ErrorHandler, {IErrorHandler} from "~/src/Utils/Handlers/ErrorHandler";
// import ErrorHandler, { IErrorHandler } from "~/src/Utils/Handlers/ErrorHandler";

const customAxios = axios.create({
    baseURL:'http://localhost:1337'
})

customAxios.interceptors.request.use(
    config => {
        const accessToken = cookies.get('bearerToken');
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    error => {
        Promise.reject(error.response || error.message);
    }
);


export interface IRequestOptions {
    showSuccess?: string;
    errorOptions?: Partial<IErrorHandler>;
}


export interface IApiCallParams {
    url: string;
    params?: any;
    method?: Method;
    data?: any;
    requestOptions?: AxiosRequestConfig | undefined;
}


export class Request<T = any> {
    url = '';

    params = undefined;
    data = undefined;
    method: Method | undefined = 'get';
    response!: T | any;
    errors: any = null;
    isSuccess: boolean = true;
    requestOptions: AxiosRequestConfig | undefined;
    status!: number;

    constructor(url: string, params: any, data: any, requestOptions: AxiosRequestConfig | undefined, method?: Method) {
        this.url = url;
        this.params = params;
        this.data = data;
        this.requestOptions = requestOptions;
        this.method = method;
    }

    showSuccess(msg: string) {
        CustomToast(msg,'success')
        return this;
    }

    async request() {
        try {
            const result = await customAxios({
                url: this.url,
                params: this.params,
                method: this.method,
                data: this.data,
                ...this.requestOptions,
            } as IApiCallParams);
            this.response = Boolean(result?.data?.result) ? result.data.result : result.data;
            this.status = 200;
        } catch (e) {
            this.errors = e ;
            if (this.errors?.response?.status) {
                this.status = this.errors.status;
            }
            this.isSuccess = false;
        }
        return this;
    }

    optionsHandler(options: IRequestOptions) {
        if (options.showSuccess) {
            this.showSuccess(options.showSuccess);
        }

        return this;
    }

    async retry(
        onRetry?: (res: Request<any>) => any,
        { reqOptions }: { reqOptions?: IRequestOptions } = {}
    ): Promise<Request> {
        const result = await Request.call(
            {
                url: this.url,
                params: this.params,
                method: this.method,
                data: this.data,
                requestOptions: this.requestOptions,
            },
            reqOptions
        );
        if (onRetry) {
            onRetry(result);
        }
        return result;
    }

    static call<U>(
        { url, params, method, data, requestOptions }: IApiCallParams,
        options?: IRequestOptions
    ): Promise<Request> {
        const api = new Request(url, params, data, requestOptions, method);
        return api.request().then(async req => {
            if (options) {
                req.optionsHandler(options);
            }
            if (req.errors) {
                await ErrorHandler.handle(
                    req.errors,
                    {
                        retry: async onRetry => (req = await req.retry(onRetry, { reqOptions: options })),
                    },
                    options?.errorOptions
                );
            }

            return req;
        });
    }
}