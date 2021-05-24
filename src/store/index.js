import Vue from 'vue'
import Vuex from 'vuex'
import { db } from '@/firebase/db'

Vue.use(Vuex)

export default new Vuex.Store({
  state: { logged:null , userInSession: [], dbpets: []
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
    getPets(state){
      //var dados
      state.userInSession.push(db.ref('pets')
      .once('value',snapshot => {
      const userData = snapshot.val()
      state.dbpets = userData
      //dados = snapshot.val()
    }))
    },
    cleandbpets(state){
      state.dbpets = []
    },
  },
  actions: {

  },
  modules: {
  }
})
