<template>
    <div id="bar">
        <h1 class="center-title">Centro de Adoção de Animais</h1>
        <div  class="up_title">
        <img class="logo" src="@/assets/pet.png">    
        <h5 v-if="logged" id="welcome">Bem vindo usuário {{logged}}</h5>
        <button v-if="logged" id="logout_up" class="btn" @click="logout">Sair</button>
        </div>
     <div id="nav" class="container">
      <router-link to="/" >Home</router-link>
      <router-link v-if="logged" to="/add" >Cadastrar Animal</router-link>
      <router-link to="/login" >Login</router-link>
      <router-link v-if="logged" to="/profile" >Meus Dados</router-link>
      <router-link v-else to="/newuser" >Cadastrar Usuário</router-link>
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
  padding: 15px;
  background-color: lightseagreen;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  overflow-x: auto;
}

#nav a {
  font-weight: bold;
  font-size: x-large;
  color: beige;
  padding-inline: 1rem;
}

#nav a.router-link-exact-active {
  color: yellow;
}
.up_title{
    margin-block: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    min-height: 36px;
}

#welcome, #logout_up{
    margin-right: 1rem;
    display: block;
    margin-block: auto;
}

.center-title{
    margin-top: 1rem;
}

.logo{
    max-height: 50px;
    margin-inline: 1rem;
}

</style>