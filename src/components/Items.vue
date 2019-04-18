<template>
<div>
  <div class="item" v-for="item in items" v-bind:key="item._id">
    <p v-html="item.name"></p>
    <blockquote>
      <div v-html="item.description">
      </div>
    </blockquote>
    <br/>
  </div>
</div>
</template>

<script>

export default{
  name: 'ListItems',
  props: {
    id: String,
  },
  computed: {
    items(){
      
      return this.$store.state.items.filter( el => {
        return el.list === this.id;
      });
    }
  },
}
</script>

<style scoped>
</style>
