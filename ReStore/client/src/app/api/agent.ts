import axios, { AxiosError, AxiosResponse } from "axios"
import { error } from "console";
import { resolve } from "path";
import { toast } from "react-toastify";
const sleep=()=> new Promise(resolve => setTimeout(resolve,500));

axios.defaults.baseURL = "http://localhost:5000/api/"
const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use( async response => {
    await sleep();
    return response
}, (error: AxiosError) => {
    const { data, status } = error.response as AxiosResponse;
    switch (status) {
        case 400:
            if(data.errors){
                const modelStateErrors:string[]=[];

            }
            toast.error(data.title);
            break;
        case 401:
            toast.error(data.title);
            break;
        case 404:
            toast.error(data.title);
            break;
        case 500:
            toast.error(data.title);
            break;
        default:
            break;


    }
    return Promise.reject(error.response);
})

const request = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url).then(responseBody),
    put: (url: string, body: {}) => axios.put(url).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
}

const Catalog = {
    list: () => request.get('products'),
    details: (id: number) => request.get(`products/${id}`)
}

const TestErrors = {
    get400Error: () => request.get('buggy/bad-request'),
    get401Error: () => request.get('buggy/unauthorised'),
    get404Error: () => request.get('buggy/not-found'),
    get500Error: () => request.get('buggy/server-error'),
    getValidationError: () => request.get('buggy/validation-error'),

}

const agent = {
    Catalog,
    TestErrors,
}

export default agent;