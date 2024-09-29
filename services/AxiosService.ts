import axios, { AxiosInstance, AxiosError } from 'axios';
import { removeToken } from './keychain';

const AxiosService = (() => {
    let instance: AxiosInstance | null = null;

    // Initialize Axios instance with default config
    const getAxiosInstance = () => {
        if (!instance) {
            instance = axios.create({
                timeout: 10000,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Response interceptor to handle 403 and other errors
            instance.interceptors.response.use(
                response => response,
                async (error: AxiosError) => {
                    if (error.response && error.response.status === 403) {
                        console.log('Received 403 error, logging out');
                        removeTokenAndLogout();
                    }
                    return Promise.reject(error);
                }
            );
        }
        return instance;
    };

    // Function to remove the token and log the user out
    const removeTokenAndLogout = async () => {
        removeToken()
    };

    return {
        getAxiosInstance,
    };
})();

export default AxiosService;
