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
    publicPath:
        process.env.NODE_ENV === 'production' ? '/juko-landing-deploy/' : '/',
};
