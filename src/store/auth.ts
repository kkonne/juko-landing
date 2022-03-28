import { reactive, computed } from 'vue';

type User = {
    id: string,
    email: string,
    name: string,
    role: number,
}

const state = reactive({
    user: null,
});

const getUser = computed((): User => {
    if (state.user) {
        return state.user;
    }

    if (sessionStorage.getItem('userData')) {
        return JSON.parse(sessionStorage.getItem('userData'));
    }

    return null;
});
const setUser = (userData): void => {
    state.user = userData;
    sessionStorage.setItem('userData', JSON.stringify(userData));
};

const authStore = {
    getUser,
    setUser,
};

export default authStore;
