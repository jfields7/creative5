<template>
  <div id="app">
    <div class="pure-menu pure-menu-horizontal">
      <span class="pure-menu-heading">Jacob Fields</span>
      <ul class="pure-menu-list">
        <li class="pure-menu-item">
          <router-link to="/" class="pure-menu-link">Home</router-link>
        </li>
        <li class="pure-menu-item">
          <router-link to="/research" class="pure-menu-link">Research</router-link>
        </li>
        <li class="pure-menu-item">
          <router-link to="/cv" class="pure-menu-link">CV</router-link>
        </li>
        <li class="pure-menu-item">
          <router-link to="/contact" class="pure-menu-link">Contact</router-link>
        </li>
        <li class="pure-menu-item">
          <a class="pure-menu-link" href="https://github.com/jfields7/creative5" target=":blank">GitHub</a>
        </li>
      </ul>
      <ul class="pure-menu-list admin">
        <div v-if="user">
          <li class="pure-menu-item">
            <router-link to="/admin" class="pure-menu-link">Admin</router-link>
          </li>
          <li class="pure-menu-item">
            <a href="#" @click="logout" class="pure-menu-link">Logout</a>
          </li>
        </div>
        <div v-else>
          <li class="pure-menu-item">
            <router-link to="/login" class="pure-menu-link">Admin Login</router-link>
          </li>
        </div>
      </ul>
    </div>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default{
  created(){
    this.$store.dispatch("getUser");
  },
  computed: {
    user(){
      return this.$store.state.user;
    }
  },
  methods: {
    async logout(){
      try{
        this.error = await this.$store.dispatch("logout");
      }catch(error){
        console.log(error);
      }
    }
  }
 
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  min-width: 100%;
}

.admin{
  float: right;
}

.date{
  float: right;
}

.pure-menu{
  display: inline-block;
  text-align: left;
  background: #333;
}

.pure-menu-list{
}

.pure-menu-heading{
  color: #fff;
  font-size: 1.2em;
  background-color: #2a3260;
}

button.pure-menu-item{
  all: unset;
}

.pure-menu-link{
  color: #fff;
  padding: 10px 20px;
  margin: 0;
  font-weight: 800;
}

.pure-menu-link:hover{
  background: #555;
}

.pure-menu-link.router-link-exact-active{
  background: #fff;
  color: #2a3260;
}

.content{
  margin: 50px 100px;
}

html{
  height: 100%;
  box-sizing: border-box;
}

body{
  height: 100%;
}

*,
*:before,
*:after{
  box-sizing: inherit;
}

.error{
  color: #2a3260;
}

.pure-button-primary{
  background-color: #36b1bf;
}

/* Modals */
.modal-mask{
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper{
  display: table-cell;
  vertical-align: middle;
}

.modal-container{
  width: 500px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h1{
  margin-bottom: 30px;
  font-size: 1.5em;
}

.modal-body{
  margin: 0;
}

.modal-body input{
  margin-bottom: 20px;
  height: 30px;
}

.modal-footer{
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

.modal-default-button{
  float: right;
}

.modal-enter{
  opacity: 0;
}

.modal-leave-active{
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container{
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
