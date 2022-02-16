export default new (class {
    getCurrentLang = ():string => {
        if (localStorage.getItem("lang")) {
            return localStorage.getItem("lang");
        }

        const lang: string = navigator.language.slice(0,2) || "en";
        this.setCurrentLang(lang);
        return lang;
    }

    setCurrentLang = (langCode: string):void => {
        const lang = (langCode || "en");
        localStorage.setItem("lang", lang);
    }
})();
