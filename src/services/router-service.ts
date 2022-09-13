import router from '@/router';

export default new (class {
    routerLinkTo = (param: string): void => {
        router.push(param);
    };
})();
