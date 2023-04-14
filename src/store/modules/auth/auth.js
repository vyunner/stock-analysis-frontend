import {createStore} from 'vuex'
import authService from "@/services/auth/auth.service";

const auth = {
    namespaced: true,
    actions: {
        async POST_AUTH({commit}, data) {
            try {
                const response = await authService.postAuth(data)
                console.log(response)
                commit('SET_DATA_USER', response.data.data, {root: true});
                return response
            } catch (e) {
                console.log(e)
                return e.response
            }
        },
        async POST_REGISTER({commit}, data) {
            try {
                const response = await authService.postRegister(data)
                commit('SET_DATA_USER', response.data.data, {root: true});
                return response
            } catch (e) {
                console.log(e)
                return e.response
            }
        },
        async POST_LOGOUT(){
            try {
                const response = await authService.postLogout()
                console.log(response)
                return response
            } catch (e) {
                console.log(e)
                return e.response
            }
        }
    },
    mutations: {},
    state: {}
}

export default auth;
