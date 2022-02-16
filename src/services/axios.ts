import axios from 'axios';
import languageService from '@/services/language-service';

const defaultLang = languageService.getCurrentLang();

const tempUrl = 'http://192.168.0.40:8000/' + 'api/';
axios.defaults.baseURL = process.env.API_BASEURL || tempUrl;
axios.defaults.headers.common['x-localization'] = defaultLang;

export default axios;
