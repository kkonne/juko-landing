const state = {
    user: null,
};

const getters = {
    getUser: (state) => {
        return state.user;
    },
};

const actions = {
    setUser({ commit }, user) {
        commit('SET_USER', user);
    },
};

const mutations = {
    SET_USER(state, user) {
        state.user = user;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
