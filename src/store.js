import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    lists: [],
    items: [],
  },
  mutations: {
    setUser(state, user){
      state.user = user;
    },
    setLists(state, lists){
      state.lists = lists;
    },
    setItems(state, items){
      state.items = items;
    }
  },
  actions: {
    async login(context, data){
      try{
        let response = await axios.post("/api/users/login", data);
        context.commit('setUser',response.data);
        return "";
      }catch(error){
        return error.response.data.message;
      }
    },
    async logout(context){
      try{
        await axios.delete("/api/users");
        context.commit('setUser',null);
        return "";
      }catch(error){
        return error.response.data.message;
      }
    },
    async getUser(context){
      try{
        let response = await axios.get("/api/users");
        context.commit('setUser',response.data);
        return "";
      }catch(error){
        return "";
      }
    },
    async getLists(context){
      try{
        let response = await axios.get("/api/list");
        context.commit('setLists',response.data);
        return "";
      }catch(error){
        return "";
      }
    },
    async getList(context, id){
      try{
        let response = await axios.get("/api/list/"+id);
        let lists = [];
        lists.push(response.data);
        context.commit('setLists',lists);
        return "";
      }catch(error){
        return "";
      }
    },
    async getTypeLists(context, t){
      try{
        let response = await axios.get("/api/list/type/"+t,);
        let lists = [];
        lists.push(response.data);
        context.commit('setLists',response.data);
        return "";
      } catch(error){
        return "";
      }
    },
    async addList(context, data){
      try{
        await axios.post('/api/list',{
          name: data.get('name'),
          type: data.get('type'),
        });
        return "";
      } catch(error){
        return "";
      }
    },
    async addItem(context, data){
      console.log("Post request for new item.");
      try{
        console.log("Submitting post request.");
        await axios.post('/api/list/item/'+data.get("list"),{
          name: data.get('name'),
          description: data.get('description'),
        });
        return "";
      } catch(error){
        console.log(error);
        return "";
      }
    },
    async getItems(context, id){
      try{
        let response = await axios.get('/api/list/item/'+id);
        context.commit('setItems',response.data);
        return "";
      }catch(error){
        return "There was an error.";
      }
    },
    async getAllItems(context){
      try{
        let items = [];
        for(let i=0; i < this.state.lists.length; i++){
          let response = await axios.get('/api/list/item/'+this.state.lists[i]._id);
          items = items.concat(response.data);
        }
        context.commit('setItems',items);
        return "";
      } catch(error){
        console.log(error);
        return "There was an error.";
      }
    },
  }
})
