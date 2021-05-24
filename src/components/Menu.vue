<template>
    <div id="bar">
        <div v-if="logged" class="up_title">
        <h5>Bem vindo usuário {{this.$store.state.logged}}</h5>
        <button class="btn" @click="logout">Sair</button>
        </div>
     <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link v-if="logged" to="/add">Cadastrar Animal</router-link> |
      <router-link to="/login">Login/Cadastro</router-link> |
      <router-link v-if="logged" to="/profile">Meus Dados</router-link> |
    </div>
  </div>
</template>

<script>
export default {
    computed:{
        logged(){
            return this.$store.state.logged;
        },
        userInSession:{
            set(v){
                this.$store.commit('changeUser',v)
            },
            get(){
                return this.$store.state.userInSession
            },
        },
        userLogged:{
            set(v){
                this.$store.commit('theuserLogged',v)
            },
            get(){
                return this.$store.state.userLogged
            },
        }    
    },
    methods:{
        logout: function(){
            this.$store.commit('isLogged',null) //logged user is null
            this.$store.commit('removeUser') //logged user is null
        }
    }
}
</script>

<style>
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.up_title{
    margin-top: 1rem;
}

</style>