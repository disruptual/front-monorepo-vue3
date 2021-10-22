import { createStore as createVuexStore } from 'vuex';
import { merge } from 'lodash-es';

export const createStore = appContext => {
  return createVuexStore({
    state() {
      return {
        appContext
      };
    },

    getters: {
      appContext(state) {
        return state.appContext;
      },
      componentContext: state => name => {
        return state.appContext[name];
      }
    },

    mutations: {
      updateAppContext(state, payload) {
        merge(state.appContext, payload);
      }
    },

    actions: {
      updateAppContext: ({ commit }, payload) => {
        commit('updateAppContext', payload);
      }
    }
  });
};
