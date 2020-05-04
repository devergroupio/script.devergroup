import axios, { AxiosError, AxiosInstance } from "axios";
import { CONFIG } from "~@/core/utils";
class HttpModule {
    public axios: AxiosInstance;
    public axiosDefault: AxiosInstance;
    constructor() {
        this.axios = axios.create({
            headers: this.getHeaders()
        });
        this.axiosDefault = axios.create({
            headers: this.getDefaultHeaders
        });
        this.initInterceptor(this.axios);
        this.initInterceptor(this.axiosDefault);
    }
    initInterceptor(client: AxiosInstance) {
        client.interceptors.response.use(
            res => res,
            (error: AxiosError) => {
                if (error && error.response && error.response.status) {
                    throw new Error(
                        `error when fetch request url  ${error.request.path}: ${JSON.stringify(error.response.data)}`
                    );
                } else {
                    throw error;
                }
            }
        );
    }
    getHeaders() {
        return {
            Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            charset: "utf-8",
            "Accept-Language": "en-US;q=0.2,en;q=0.2",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
            Cookie: CONFIG.FREELANCER_APP_COOKIE,
            Pragma: "no-cache",
            "Upgrade-Insecure-Requests": 1,
            "User-Agent": CONFIG.FREELANCER_USER_AGENT
        };
    }
    getDefaultHeaders() {
        return {
            Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            charset: "utf-8",
            "Accept-Language": "en-US;q=0.2,en;q=0.2",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
            "User-Agent": CONFIG.FREELANCER_USER_AGENT
        };
    }
}
const httpModule = new HttpModule();
export default httpModule;
