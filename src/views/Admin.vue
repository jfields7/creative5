<template>
<div>
  <div v-if="user">
    <lists :lists="lists"/>
    <div class="addList">
      <form @submit.prevent="addList" class="pure-form pure-form-aligned">
        <fieldset>
          <p class="pure-form-message-inline">Add a new list. Type 0 refers to research, type 1 to CV.</p>
          <div class="pure-control-group">
            <label>List Name</label>
            <input v-model="list" type="text" placeholder="Name">
          </div>
          <div class="pure-control-group">
            <label>List Type</label>
            <input v-model="type" type="number" min="0" max="1" placeholder="Type">
          </div>
          <div class="pure-controls">
            <button type="submit" class="pure-button pure-button-primary">Submit</button>
          </div>
        </fieldset>
      </form>
    </div>
  </div>
  <div v-else>
    <p>To use admin tools, please <router-link to="/login">login</router-link></p>
  </div>
</div>
</template>

<script>
import Lists from '@/components/Lists.vue'

export default{
  name: 'admin',
  components:{
    Lists,
  },
  data(){
    return{
      list: '',
      type: '',
    };
  },
  computed: {
    lists(){
      return this.$store.state.lists;
    },
    items(){
      return this.$store.state.items;
    },
    user(){
      return this.$store.state.user;
    }
  },
  async created() {
    await this.$store.dispatch("getLists");
  },
  methods:{
    async addList(){
      try{
        const formData = new FormData();
        formData.append('name',this.list);
        formData.append('type',this.type);
        let response = await this.$store.dispatch("addList",formData);
        if(!response){
          await this.$store.dispatch("getLists");
        }
      } catch(error){
        console.log(error);
      }
    },
  },
}
</script>

<style scoped>
form{
  border: 1px solid #ccc;
  background-color: #eee;
  border-radius: 4px;
  padding: 20px;
}

.pure-controls{
  display: flex;
}

.pure-controls button{
  margin-left: auto;
}
</style>
