<template>
  <div class="home">
    <h2>Lista de Animais para Adoção</h2>
    <div class="pets-table">
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th>Tipo</th>
          <th>Nome</th>
          <th>Raça</th>
          <th>Idade</th>
          <th>Peso(Kg)</th>
          <th>Cidade</th>
          <th>Anunciante</th>
          <th>Info</th>
        </tr>
      </thead>
      <tbody v-for="(pet,key) in pets" :key="key">
        <td>{{pet.type}}</td>
        <td>{{pet.name}}</td>
        <td>{{pet.breed}}</td>
        <td>{{pet.age}}</td>
        <td>{{pet.weight}}</td>
        <td>{{pet.adress.city}}/{{pet.adress.state}}</td>
        <td>{{pet.user}} </td>
        <td><button class="btn" @click="expand(key,'')" :id="'button_' + key">Ver Contato</button></td>
        <tr :id="'tr_0_key_' + key" class="contact-tr">
        <td colspan="8">Anunciante: {{pet.userName}}</td> 
        </tr>  
        <tr :id="'tr_1_key_' + key" class="contact-tr">
        <td colspan="8">Telefone: {{pet.tel}} | E-mail: {{pet.mail}}</td>
        </tr>
        <tr :id="'tr_2_key_' + key" class="contact-tr">
        <td colspan="8">Endereço: {{pet.adress.street}} N.º {{pet.adress.number}} | Cep: {{pet.adress.zip}}</td>
        </tr>
    </tbody>
    </table>
    </div>
    <div v-if="logged" class="user_table">
      <h2>Animais No Seu Estado</h2>
      <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th>Tipo</th>
          <th>Nome</th>
          <th>Raça</th>
          <th>Idade</th>
          <th>Peso(Kg)</th>
          <th>Cidade</th>
          <th>Anunciante</th>
          <th>Info</th>
        </tr>
      </thead>
      <tbody v-for="(pet,key) in petFilters" :key="key">
        <td>{{pet.type}}</td>
        <td>{{pet.name}}</td>
        <td>{{pet.breed}}</td>
        <td>{{pet.age}}</td>
        <td>{{pet.weight}}</td>
        <td>{{pet.adress.city}}</td>
        <td>{{pet.user}} </td>
        <td><button class="btn" @click="expand(key,'_filter')" :id="'button_' + key + '_filter'">Ver Contato</button></td>
        <tr :id="'tr_0_key_' + key + '_filter'" class="contact-tr">
        <td colspan="8">Anunciante: {{pet.userName}}</td> 
        </tr>  
        <tr :id="'tr_1_key_' + key + '_filter'" class="contact-tr">
        <td colspan="8">Telefone: {{pet.tel}} | E-mail: {{pet.mail}}</td>
        </tr>
        <tr :id="'tr_2_key_' + key + '_filter'" class="contact-tr">
        <td colspan="8">Endereço: {{pet.adress.street}} N.º {{pet.adress.number}} | Cep: {{pet.adress.zip}}</td>
        </tr>
    </tbody>
    </table>

    </div>
  </div>
</template>

<script>
import { db } from '@/firebase/db'
export default {
  name: 'Home',
  data: () => ({
    pets: [],
    buttonMsg: 'Ver Contato'
  }),
  firebase: {
    pets: db.ref('pets')
  },
  computed:{
    logged(){
            return this.$store.state.logged;
        },
    petFilters(){
      var filtered = this.pets
      filtered = filtered.filter(value => value.adress.state.includes(this.$store.state.userInSession.adress.state))
      filtered = filtered.filter(value => !value.userName.includes(this.$store.state.userInSession.name))
      return filtered
    }    
  },
  methods:{
    expand: function(id,comp){ //Button function to show and hide contact
      var index =  id + comp
      var button = document.getElementById('button_' + index)
      var display = ''
      if(button.textContent == 'Ver Contato'){
        button.innerHTML = 'Ocultar'
        display = 'table-row'
      }else{
        button.innerHTML = 'Ver Contato'
        display = 'none'
      }
      console.log(display)
      for(var i = 0; i<3; i++){
          document.getElementById('tr_' + i + '_key_'+ index).style.display = display
        }
    }
  }
}
</script>

<style>
.pets-table{
  width: 100%;
}
.table{
  text-align: center!important;
}
.contact-tr{
  display: none;
}
.user_table{
  margin-top: 1rem;
}
</style>