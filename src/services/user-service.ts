import routerService from "@/services/router-service";

export default new (class {
    isUserLoggedIn = () => {
        return !!sessionStorage.getItem("user-auth-token");
    };

    setUserToken = (token) => {
        sessionStorage.setItem("user-auth-token", token);
    };

    getUserToken = () => {
        return sessionStorage.getItem("user-auth-token");
    };

    logout = () => {
        sessionStorage.removeItem("user-auth-token");
        routerService.routerLinkTo("/");
    };
})();
