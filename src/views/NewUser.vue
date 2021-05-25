<template>
<div id="newUserPage">
    <h2 class="title">Cadastrar Novo Usuário</h2>
    <span class="obs">Obs: O login não não pode conter os caracteres , / * .</span>
    <div class="new-user" id="new_user_div">
    <form v-on:submit.prevent="onSubmit" @submit="checkIDExists()" class="form-group">

      <div v-for="(firstField,key) in firstFields" :key="key" class="input-group">  
      <label class="form-label" for="input-example-1">{{firstField[0]}}</label>  
      <input class="form-input" type="text" v-model="users[firstField[1]]" :placeholder="firstField[0]" required/>
      </div>

      <h5 class="title text-center">Endereço</h5>

      <div v-for="(secondField,key) in secondFields" :key="key" class="input-group">  
      <label class="form-label" for="input-example-1">{{secondField[0]}}</label>  
      <input class="form-input" type="text" v-model="users.adress[secondField[1]]" :placeholder="secondField[0]" required/>
      </div>

      <div class="input-group">  
      <label class="form-label" for="input-example-1">UF</label>
      <select v-model="users.adress.state" class="form-select" required>
        <option v-for="(brState,key) in brStates" :key="key" >{{brState}}</option>
      </select>
      </div>
      <h5 :class="errorOrsucess" id="status">{{msg}}</h5> 
      <input type="submit" class="btn" value="Criar Usuário"/>   
    </form>
    </div>
</div>    
</template>

<script>
import { db } from '@/firebase/db'
export default {
    name: 'NewUser',
    data(){
        return{
            users: {
            name:'',
            login:'',
            password:'',
            mail:'',
            tel:'',
                adress: {
                    street: '',
                    number:'',
                    zip:'',
                    city:'',
                    state:''
                },
            },
            msg: '',
            errorOrsucess: '',
            brStates: ['AC', 'AL', 'AP', 'AM', 'BA' , 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB','PR','PE','PI',
            'RJ','RN','RS','RO','RR','SC','SP','SE','TO'],
            firstFields: [["Login",'login'],['Senha','password'],
            ['Nome','name'],['E-mail','mail'],['Telefone','tel']],
            secondFields: [['Rua','street'],['Número','number'],['Cep','zip'],['Cidade','city']]
        }
    },
    methods:{
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
                this.clearFields() //cleaning fields
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
        clearFields(){ //clears all the props
            this.users.name = ''
            this.users.password = ''
            this.users.login = ''
            this.users.mail = ''
            this.users.tel = ''
            this.users.adress.street = ''
            this.users.adress.number = ''
            this.users.adress.zip = ''
            this.users.adress.city = ''
            this.users.adress.state = ''
        }

    }
}
</script>

<style scoped>

.title{
    margin-top: 1rem;
}
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
    padding-bottom: 1rem;
}

.form-select{
    max-width: 100px;
}

.input-group{
    margin-top: 1rem;
}

.form-label{
    min-width: 65px;
    margin-right: 1rem;
    font-weight: bold;
    text-align: left;
}
.obs{
    font-style: italic;
    font-size: large;
}

#status{
    min-height: 30px;
    margin-top: 1rem;
}

@media (max-width:500px) {
    .form-label{
        text-align: center;
    }
    .input-group{
        flex-direction: column;
        align-items: center;
    }
    .form-input{
        width: 100%!important;
    }
}
</style>