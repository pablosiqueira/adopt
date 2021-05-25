<template>
  <div class="home">
    <DataTable msg='Lista de Animais para Adoção' :pets="pets" category="full" idFilter= ""/>
    <DataTable v-if="logged" msg='Animais no seu Estado' :pets="petFilters" category="filter" idFilter= "_filter"/>
  </div>
</template>

<script>
import { db } from '@/firebase/db'
import DataTable from '@/components/DataTable.vue'
export default {
  name: 'Home',
  components:{
    DataTable
  },
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
  
}
</script>
