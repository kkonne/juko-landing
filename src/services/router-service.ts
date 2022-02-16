import router from "@/router";

export default new (class {
    myMixin = {
        created() {
            this.hello();
        },
        methods: {
            hello() {
                console.log('hello from mixin!');
            },
        },
    };

    routerLinkTo = (param: string) => {
        router.push(param);
    }
})();
