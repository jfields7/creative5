<template>
  <div class="research">
    <div v-for="list in lists" v-bind:key="list._id">
      <h1>{{list.name}}</h1>
      <hr/>
      <items :id="list._id"/>
    </div>
  </div>
</template>

<script>
import Items from '@/components/Items.vue'

export default{
  name: 'CV',
  components: {
    Items,
  },
  computed: {
    lists(){
      return this.$store.state.lists;
    },
  },
  async created(){
    await this.$store.dispatch("getTypeLists",0);
    await this.$store.dispatch("getAllItems");
  }
}
</script>

<style scoped>
li{
  list-style-type: none;
}

hr{
  border-style: solid;
}
</style>
