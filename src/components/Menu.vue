<template>
    <div id="bar">
        <div v-if="logged" class="up_title">
        <h5 id="welcome">Bem vindo usuário {{logged}}</h5>
        <button id="logout_up" class="btn" @click="logout">Sair</button>
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
  color: red;
}
.up_title{
    margin-top: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
}

#welcome, #logout_up{
    margin-right: 1rem;
    display: block;
    margin-block: auto;
}

</style>