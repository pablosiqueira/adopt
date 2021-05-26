<template>
<div id="profile">
    <div class="my_data">
    <h4>Usuário <i>{{logged}}</i></h4>
          <div>
            <ul class="list-norm">
                <li><b>Nome: </b>{{userInSession.name}}</li>
                <li><b>Telefone: </b>{{userInSession.tel}}</li>
                <li><b>E-mail: </b>{{userInSession.mail}}</li>
                <li><b>Endereço</b></li>

                      <li>{{userInSession.adress.street}}</li>
                      <li><b>Número: </b>{{userInSession.adress.number}}</li>
                      <li><b>Cep: </b>{{userInSession.adress.zip}}</li>
                      <li>{{userInSession.adress.city}} / {{userInSession.adress.state}}</li>       

            </ul>  
            </div>
            <h4>Animais Cadastrados</h4>
            <div class="profile-table">
            <table class="my_pets table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Tipo</th>
                    <th>Nome</th>
                    <th>Raça</th>
                    <th>Idade</th>
                    <th>Peso</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(pet,key) in petFilters" :key="key">
                    <td>{{pet.type}}</td>
                    <td>{{pet.name}}</td>
                    <td>{{pet.breed}}</td>
                    <td>{{pet.age}}</td>
                    <td>{{pet.weight}}</td>
                  </tr>
                </tbody>
            </table>  
            </div>
    </div>       
</div>
</template>

<script>
import { db } from '@/firebase/db'
export default {
  computed:{
    userInSession:{
            set(v){
                this.$store.commit('changeUser',v)
            },
            get(){
                return this.$store.state.userInSession
            },
        },
        logged(){
            return this.$store.state.logged;
        },
      petFilters(){
      var filtered = this.pets
      filtered = filtered.filter(value => value.user.includes(this.logged))
      return filtered
    }   
  },
  data: () => ({
    pets: [],
  }),
  firebase: {
    pets: db.ref('pets')
  },
}
</script>

<style>
.my_data{
  margin-top: 1rem;
}
.list-norm{
  list-style-type: none;
}
.profile-table{
  overflow-x: auto;
}
tr{
  text-align: center;
}
</style>