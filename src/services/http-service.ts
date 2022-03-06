import axios from 'axios';
import languageService from '@/services/language-service';
import userService from '@/services/user-service';

const defaultLang = languageService.getCurrentLang();
const userToken = userService.getUserToken();
const API_URL = process.env.API_BASEURL || 'http://babuka.xyz:8000/api/';

const httpService = axios.create({
    baseURL: API_URL,
    headers: {
        'x-localization': defaultLang,
        Authorization: `Bearer ${userToken}`,
    },
});

export default httpService;
