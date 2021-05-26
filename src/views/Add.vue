<template>
<div id="new-pet">
    <h1>Cadastrar Animal</h1>
    <div class="new-user"> 
    <form @submit="checkIDExists" v-on:submit.prevent="onSubmit" class="form-group">
      <div v-for="(field,key) in fields" :key=key>
          <label class="form-label text-left"><b>{{field[0]}}</b></label>
          <input class="form-input" type="text" v-model="pets[field[1]]" :placeholder="field[0]" required/> 
      </div>      
      <div class="form-group" id="radios">
        <label class="form-label" id="type"><b>Tipo:</b></label>
        <label class="form-radio">
        <input type="radio" v-model="pets.catdog" value="Cachorro">
        <i class="form-icon"></i> Cachorro
        </label>
        <label class="form-radio">
        <input type="radio" v-model="pets.catdog" value="Gato">
        <i class="form-icon"></i> Gato
        </label>
    </div>
        <h3 :class="errorOrsucess">{{msg}}</h3>
      <input class="btn" type="submit" value="Cadastrar"/>
    </form>
    </div>
</div>
</template>

<script>
import { db } from '@/firebase/db'
export default {
    name: 'add', firebase: {
    people : db.ref('pets')},
    data(){
        return{
            pets: {
            name:'',
            breed:'',
            age:'',
            weight:'',
            catdog: ''
            },
            fields: [['Nome','name'],['Idade','age'],['Raça','breed'],['Peso','weight']],
            petId: 0,
            msg: '',
            errorOrsucess: ''
        }
    },

    methods:{
        addToID: function () { //add to Id (The username is the id)
                db.ref('pets/' + this.petId).set({ //add main fields
                name: this.pets.name,
                age: this.pets.age,
                breed: this.pets.breed,
                weight: this.pets.weight,
                type: this.pets.catdog,
                adress: this.$store.state.userInSession.adress,
                user: this.$store.state.logged,
                mail: this.$store.state.userInSession.mail,
                tel: this.$store.state.userInSession.tel,
                userName: this.$store.state.userInSession.name
                });
                this.errorOrsucess = 'text-success'
                this.msg = 'Animal cadastrado com sucesso'
        },
        addToUser: function(){
            db.ref('users/' + this.$store.state.logged +'/pets/' + this.petId).set({ //add pet to user
                name: this.pets.name,
                age: this.pets.age,
                breed: this.pets.breed,
                weight: this.pets.weight,
                type: this.pets.catdog,
                petId: this.petId,
                });
        },
         checkIDExists: function(){
             if(!this.pets.catdog){
                 this.errorOrsucess = 'text-error'
                 this.msg = 'Selecione o tipo de animal'
             }else{
            db.ref('pets').get().then((snapshot) => {
            console.log(snapshot.val());
            var a = snapshot.val().length
            console.log(a)
            this.petId = a
            this.addToID()
            this.addToUser()
            this.clearFields()
            this.$store.commit('changeUser',this.$store.state.logged)
            }).catch((error) => {
            console.error(error);
            });
            } 
        },
        clearFields: function(){
            this.pets.name = ''
            this.pets.age = ''
            this.pets.breed = ''
            this.pets.weight = ''
            this.pets.catdog = ''
        },
    }
}
</script>

<style>
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

#radios{
    display: flex;
    flex-direction: row;
}
#type{
    margin-right: 1rem;
}
</style>