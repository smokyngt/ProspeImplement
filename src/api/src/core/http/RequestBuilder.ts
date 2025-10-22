import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export class RequestBuilder {
    private config: AxiosRequestConfig;

    constructor(baseURL: string) {
        this.config = {
            baseURL,
            headers: {
                'Content-Type': 'application/json',
            },
        };
    }

    public setHeader(name: string, value: string): this {
        this.config.headers[name] = value;
        return this;
    }

    public setQueryParams(params: Record<string, any>): this {
        this.config.params = { ...this.config.params, ...params };
        return this;
    }

    public async get<T>(url: string): Promise<AxiosResponse<T>> {
        return axios.get(url, this.config);
    }

    public async post<T>(url: string, data: any): Promise<AxiosResponse<T>> {
        return axios.post(url, data, this.config);
    }

    public async put<T>(url: string, data: any): Promise<AxiosResponse<T>> {
        return axios.put(url, data, this.config);
    }

    public async delete<T>(url: string): Promise<AxiosResponse<T>> {
        return axios.delete(url, this.config);
    }
}