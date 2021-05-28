<template>
    <div id="bar">
        <h1 class="center-title">Centro de Adoção de Animais</h1>
        <div  class="up_title">
        <img class="logo" src="@/assets/pet.png">    
        <h5 v-if="logged" id="welcome">Bem vindo usuário {{logged}}</h5>
        <button v-if="logged" id="logout_up" class="btn" @click="logout">Sair</button>
        </div>
    </div>    
</template>

<script>
export default {
    props:{
        logged: {type:String}
    },
    methods:{
        logout: function(){
            this.$store.commit('isLogged',null) //logged user is null
            this.$store.commit('removeUser') //logged user is null
        }
    }
}
</script>

<style scoped>
.up_title{
    margin-block: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    min-height: 36px;
}
.logo{
    max-height: 50px;
    margin-inline: 1rem;
}
.center-title{
    margin-top: 1rem;
}
#welcome, #logout_up{
    margin-right: 1rem;
    display: block;
    margin-block: auto;
}
</style>