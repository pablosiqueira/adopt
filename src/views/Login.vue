<template>
<div id="new">
    <h2 class="title">Login</h2>
    <div class="new-user" id = "login_div">

    <form v-if="!this.$store.state.logged" v-on:submit.prevent="onSubmit" @submit="userLogin" class="form-group">
      <label class="form-label" for="input-example-1" >Login</label>  
      <input class="form-input" type="text" v-model="users.login" placeholder="Login" required/>
      <label class="form-label" for="input-example-1">Senha</label>  
      <input class="form-input" type="password" v-model="users.password" placeholder="Senha" required/>
      <h3 :class="errorOrsucess">{{msgLogin}}</h3>
      <input type="submit" class="btn" value="Entrar"/>
    </form>

    <div v-if="this.$store.state.logged" >
        <h3 class="text-center title">Usuário {{this.$store.state.logged}} logado</h3>
        <button  class="btn" @click="logout">Logout</button>
    </div>
    
    </div>

</div>
</template>

<script>
import { db } from '@/firebase/db'
export default {
    name: 'login',
    data(){
        return{
            users: {
            login:'',
            password:'',
            },
            msgLogin: '',
            errorOrsucess: '',
        }
    },
    methods:{
        logout: function(){
            this.$store.commit('isLogged',null) //logged user is null
            this.$store.commit('removeUser') //logged user is null
            this.msgLogin = ''
            this.users.login = ''
            this.users.password = ''
        },
        userLogin: function(){
           db.ref('users/' + this.users.login + '/password')
            .once('value',snapshot => {
            const password = snapshot.val()
            if(password == null){
                this.errorOrsucess = 'text-error'
                this.msgLogin = 'Usuário não encontrado'
            }else{
                if(password == this.users.password){ // Login Sucess
                this.$store.commit('isLogged',this.users.login)
                this.$store.commit('changeUser',this.users.login) //sending login name to vuex store
                console.log('igual')
            }else{ // Wrong Password
                console.log('wrong password')
                this.errorOrsucess = 'text-error'
                this.msgLogin = 'Senha incorreta'
            }
            }
        })  
        },
    }
}
</script>

<style scoped>
.form-group{
    align-content: center;
}
.form-input{
    max-width: 500px;
    margin-block: .1rem;
}
.new-user{
    max-width: 500px;
    display: block;
    margin-inline: auto;
}

.title{
    margin-top: 1rem;
    min-height: 30px;
}

</style>