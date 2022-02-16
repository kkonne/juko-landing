module.exports = {
    css: {
        loaderOptions: {
            sass: {
                data: `
                    @import "@/assets/styles/_theme.scss";
                    @import "@/assets/styles/_global.scss";
                `,
            },
        },
    },
};
