<template>
  <div class="home">
    <DataTable msg='Lista de Animais para Adoção' :pets="pets" category="full" idFilter= ""/>
    <DataTable v-if="logged && !userInSession.pets" :msg="'Animais no seu Estado' + ' - ' + userInSession.adress.state" 
    :pets="petFilters" category="filter" idFilter= "_filter"/>
    <DataTable v-if="logged && userInSession.pets" :msg="'Animais no seu Estado' + ' - ' + userInSession.adress.state" 
    :pets="petFiltersinList" category="filter" idFilter= "_filter"/>
  </div>
</template>

<script>
import { db } from '@/firebase/db'
import DataTable from '@/components/DataTable.vue'
export default {
  name: 'Home',
  components:{
    DataTable,
  },
  data: () => ({
    pets: [],
    buttonMsg: 'Ver Contato',
  }),
  firebase: {
    pets: db.ref('pets')
  },
  computed:{
    logged(){
            return this.$store.state.logged;
        },
        userInSession:{
            set(v){
                this.$store.commit('changeUser',v)
            },
            get(){
                return this.$store.state.userInSession
            },
        },
    petFilters(){
        var filtered = this.pets
        filtered = filtered.filter(value => value.adress.state.includes(this.userInSession.adress.state))
        return filtered
    },
    petFiltersinList(){
        var filtered = this.pets
        filtered = filtered.filter(value => value.adress.state.includes(this.userInSession.adress.state))
        filtered = filtered.filter(value => !value.userName.includes(this.userInSession.name))
        return filtered
    },
  }
}
</script>
