import router from '@/router';

export default new (class {
    afterLoginUrl: string = null;

    routerLinkTo = (param: string): void => {
        router.push(param);
    };

    setAfterLoginUrl = (param: string): void => {
        this.afterLoginUrl = param;
    };

    getAfterLoginUrl = (): string => {
        return this.afterLoginUrl || '';
    };
})();
