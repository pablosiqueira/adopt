<template>
    <div id="menu">
    <LoginBar :logged="logged"/>
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
import LoginBar from '@/components/LoginBar.vue'
export default {
    components:{
        LoginBar
        },
    computed:{
        logged(){
            return this.$store.state.logged;
        },  
    },
}
</script>

<style>
#menu{
    margin-top: 3rem;
}
#nav {
  padding: 15px;
  background-color: lightseagreen;
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

@media (max-width: 500px){
    #nav{
        flex-direction: column;
    }
}

</style>