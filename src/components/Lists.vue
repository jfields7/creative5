<template>
<div>
  <div class="list" v-for="list in lists" v-bind:key="list._id">
    <router-link class="pure-link" :to="{ name: 'list', params: {id: list._id}}">{{list.name}}</router-link>
    <p>Type: {{list.type}}</p>
  </div>
</div>
</template>

<script>

export default{
  name: 'Lists',
  props:{
    lists: Array
  },
  methods: {
    
  },
}
</script>

<style scoped>
.pure-link{
  text-decoration: none;
}
</style>
