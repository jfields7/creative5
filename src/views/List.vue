<template>
<div>
  <lists :lists="lists"/>
  <items :id="this.$route.params.id"/>
  <div v-if="user" class="commentForm">
    <form @submit.prevent="addItem" class="pure-form pure-form-aligned">
      <fieldset>
        <p class="pure-form-message-inline">Add a new item. Use HTML tags to format the name and description.</p>
        <div class="pure-control-group">
          <label for="name">Name</label>
          <input v-model="name" placeholder="Name">
        </div>
        <div class="pure-control-group">
          <label for="description">Description</label>
          <textarea v-model="description" rows="5" placeholder="Description"></textarea>
        </div>
        <div class="pure-controls">
          <button type="submit" class="pure-button pure-button-primary">Submit</button>
        </div>
      </fieldset>
    </form>
  </div>
</div>
</template>

<script>
import Lists from '@/components/Lists.vue'
import Items from '@/components/Items.vue'

export default{
  name: 'list',
  components: {
    Lists,
    Items,
  },
  data(){
    return{
      name: '',
      description: '',
    };
  },
  computed: {
    user(){
      return this.$store.state.user;
    },
    lists(){
      return this.$store.state.lists;
    },
  },
  async created(){
    await this.$store.dispatch("getUser");
    await this.$store.dispatch("getList",this.$route.params.id);
    await this.$store.dispatch("getAllItems",this.$route.params.id);
  },
  methods:{
    async addItem(){
      try{
        const formData = new FormData();
        formData.append('name',this.name);
        formData.append('list',this.$route.params.id);
        formData.append('description',this.description);
        let error = await this.$store.dispatch("addItem",formData);
        if(!error){
          await this.$store.dispatch("getAllItems",this.$route.params.id);
        }
      } catch(error){
        console.log(error);
      }
    }
  }
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

textarea{
  width: 50%;
}
</style>
