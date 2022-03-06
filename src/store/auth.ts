import { reactive, computed } from 'vue';

const state = reactive({
    user: null,
});

const getUser = computed(() => state.user);
const setUser = (userData) => {
    state.user = userData;
};

const authStore = {
    getUser,
    setUser,
};

export default authStore;
