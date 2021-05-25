<template>
    <div>
    <h2>{{msg}}</h2>
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
        <td v-if="category == 'full'">{{pet.adress.city}}/{{pet.adress.state}}</td>
        <td v-else>{{pet.adress.city}}/{{pet.adress.state}}</td>
        <td>{{pet.user}} </td>

        <td><button class="btn" @click="expand(key,idFilter)" :id="'button_' + key + idFilter">Ver Contato</button></td>
        
        <tr :id="'tr_0_key_' + key + idFilter" class="contact-tr">
        <td colspan="8">Anunciante: {{pet.userName}}</td> 
        </tr>  

        <tr :id="'tr_1_key_' + key + idFilter" class="contact-tr">
        <td colspan="8">Telefone: {{pet.tel}} | E-mail: {{pet.mail}}</td>
        </tr>

        <tr :id="'tr_2_key_' + key + idFilter" class="contact-tr">
        <td colspan="8">Endereço: {{pet.adress.street}} N.º {{pet.adress.number}} | Cep: {{pet.adress.zip}}</td>
        </tr>

    </tbody>
    </table>
    </div>
    </div>
</template>

<script>
export default {
    name: 'DataTable',
    props:{
        msg: {type:String},
        pets: {type:Array},
        category: {type:String},
        idFilter: {type:String}
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

<style scoped>
.pets-table{
  width: 100%;
  margin-top: 1rem;
}
.table{
  text-align: center!important;
}
.contact-tr{
  display: none;
}
</style>