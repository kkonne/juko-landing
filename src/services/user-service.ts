import httpService from './http-service';
import routerService from './router-service';

export default new (class {
    setUserToken = (token): void => {
        sessionStorage.setItem('user-auth-token', token);
    };

    getUserToken = (): string => {
        return sessionStorage.getItem('user-auth-token');
    };

    isUserLoggedIn = (): boolean => {
        return !!this.getUserToken();
    };

    login = async (payload): Promise<any> => {
        const API_URL = 'login';
        return httpService.post(API_URL, payload);
    };

    logout = async (): Promise<any> => {
        sessionStorage.removeItem('user-auth-token');
        routerService.routerLinkTo('/');
        const API_URL = 'logout';
        return httpService.post(API_URL);
    };
})();
