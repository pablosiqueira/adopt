import Vue from 'vue'
import Vuex from 'vuex'
import { db } from '@/firebase/db'

Vue.use(Vuex)

export default new Vuex.Store({
  state: { logged:null , userInSession: [],
  },
  mutations: {
    isLogged(state, payload){
      state.logged = payload
    },
    changeUser(state,payload){
      state.userInSession.push(db.ref('users/'+ payload)
      .once('value',snapshot => {
      const userData = snapshot.val()
      state.userInSession = userData
    }))
    },
    removeUser(state){
      state.userInSession = []
    },
  },
  actions: {

  },
  modules: {
  }
})
