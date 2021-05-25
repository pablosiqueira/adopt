<template>
<div id="new">
    <h1>Login</h1>
    <div class="new-user" id = "login_div">

    <form v-if="!this.$store.state.logged" v-on:submit.prevent="onSubmit" @submit="userLogin" class="form-group">
      <label class="form-label" for="input-example-1" >Login (Não pode incluir '.' ',' '/')</label>  
      <input class="form-input" type="text" v-model="users.login" placeholder="Login" required/>
      <label class="form-label" for="input-example-1">Senha</label>  
      <input class="form-input" type="password" v-model="users.password" placeholder="Senha" required/>
      <h3 :class="errorOrsucess">{{msgLogin}}</h3>
      <input type="submit" class="btn" value="Entrar"/>
    </form>

    <div v-if="this.$store.state.logged" >
        <h3 class="text-center">Usuário {{this.$store.state.logged}} logado</h3>
        <button  class="btn" @click="logout">Logout</button>
    </div>
    
    </div>

    <h1 v-if="!this.$store.state.logged">Cadastrar Novo Usuário</h1>
    <div v-if="!this.$store.state.logged" class="new-user" id="new_user_div">
    <form v-on:submit.prevent="onSubmit" @submit="checkIDExists()" class="form-group">
      <label class="form-label" for="input-example-1">Login (Não pode incluir '.' ',' '/')</label>  
      <input class="form-input" type="text" v-model="users.login" placeholder="Login" required/>
      <label class="form-label" for="input-example-1">Senha</label>  
      <input class="form-input" type="password" v-model="users.password" placeholder="Senha" required/>
      <label class="form-label" for="input-example-1">Nome</label>  
      <input class="form-input" type="text" v-model="users.name" placeholder="Nome" required/>
      <label class="form-label" for="input-example-1">E-mail</label>  
      <input class="form-input" type="text" v-model="users.mail" placeholder="E-mail" required/>
      <label class="form-label" for="input-example-1">Telefone</label>  
      <input class="form-input" type="text" v-model="users.tel" placeholder="Telefone" required/>
      <div class="divider text-center"></div>
      <label class="form-label" for="input-example-1">Endereço</label>  
      <label class="form-label" for="input-example-1">Rua</label>  
      <input class="form-input" type="text" v-model="users.adress.street" placeholder="Rua" required/>
      <label class="form-label" for="input-example-1">Número</label>  
      <input class="form-input" type="text" v-model="users.adress.number" placeholder="Número" required/>
      <label class="form-label" for="input-example-1">Cep</label>  
      <input class="form-input" type="text" v-model="users.adress.zip" placeholder="Cep" required/>
      <label class="form-label" for="input-example-1">Cidade</label>
      <input class="form-input" type="text" v-model="users.adress.city" placeholder="Cidade" required/>
      <label class="form-label" for="input-example-1">Selecione o Estado (UF)</label>
      <select v-model="users.adress.state" class="form-select" required>
        <option v-for="(brState,key) in brStates" :key="key" >{{brState}}</option>
      </select>
      <h3 :class="errorOrsucess">{{msg}}</h3> 
      <input type="submit" class="btn" value="Criar Usuário"/>   
    </form>
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
            name:'',
            login:'',
            password:'',
            mail:'',
            tel:'',
            pets:'',
                adress: {
                    street: '',
                    number:'',
                    zip:'',
                    city:'',
                    state:''
                },
            },

            msg: '',
            msgLogin: '',
            userLogged: [],
            errorOrsucess: '',
            brStates: ['AC', 'AL', 'AP', 'AM', 'BA' , 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB','PR','PE','PI',
            'RJ','RN','RS','RO','RR','SC','SP','SE','TO']
        }
    },
    methods:{
        logout: function(){
            this.$store.commit('isLogged',null) //logged user is null
            this.$store.commit('removeUser') //logged user is null
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
        addToID: function () { //add to Id (The username is the id)
                db.ref('users/' + this.users.login).set({ //add main fields
                login: this.users.login,
                password: this.users.password,
                name: this.users.name,
                mail: this.users.mail,
                tel: this.users.tel,
                adress: this.users.adress 
                })

                this.errorOrsucess = 'text-success'
                this.msg = 'Usuário Cadastrado com Sucesso'
                this.users.login = ''
                console.log('msg' + this.msg)
                console.log(this.users.login)
        },
        checkIDExists: function(){
            db.ref('users').child(this.users.login).get().then((snapshot) => {
            if (snapshot.exists()) {      
            console.log(snapshot.val());
            this.errorOrsucess = 'text-error'
            this.msg = 'Esse usuário já existe'
            } else {
            console.log("Login not in base, data will be added"); //
            this.addToID()
            }
            }).catch((error) => {
            console.error(error);
            });
        },

    }
}
</script>

<style>
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
.divider{
    border-color: gray!important;
}

h3{
    margin-top: 1rem
}

#new{
    margin-bottom: 50px;
}
.click{
    cursor: pointer;
}


</style>