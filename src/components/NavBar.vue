<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark p-0">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand h1 mb-0 ms-2 me-4" href="#">MARKET</router-link>
      <button class="navbar-toggler my-1" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-lg-0">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Управление</a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><router-link class="dropdown-item" href="#" to="/control-category">Категорий</router-link></li>
              <li><router-link class="dropdown-item" href="#" to="/control-product">Продукты</router-link></li>
              <li><router-link class="dropdown-item" href="#" to="/control-order">Заказы</router-link></li>
            </ul>
          </li>
          <li class="nav-item ">
            <router-link class="nav-link" href="#" role="button" aria-expanded="false" to="/analytics">Аналитика</router-link>
          </li>
        </ul>
        <div class="navbar-input-group input-group d-flex justify-content-center py-2">
          <input type="text" class="form-control" aria-describedby="button-addon2" :value="name" disabled>
          <button class="btn btn-outline-secondary" type="button" id="button-addon2" @click="logOut()"><i @click="logOut()" class="pi pi-sign-out" style="color: white"></i></button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "NavBar",
  data(){
    return{
      name: 'Жунусов Мади',
      dataUser: {
        login: null,
        password: null,
      }
    }
  },
  methods: {
    ...mapActions('auth', ['POST_LOGOUT']),

    submit() {
      this.$emit('navClick')
    },
    async logOut() {
      try {
        await this.$router.push('/auth')
        localStorage.clear()
        return true
      } catch (e) {
        console.log(e)
        return false
      }
    }
  },
  mounted() {

  }
}
</script>

<style scoped>
.navbar-input-group{
  width: 18%;
}

@media screen and (max-width: 991px) {
  .navbar-input-group{
    width: 30%;
  }
}

.navbar-input-group input{
  background: initial;
  color: #FFFFFF;
  border: rgba(255, 255, 255, 0.55) solid 1px;
}

.nav-item{
  font-size: 18px;
}

.navbar-input-group input::placeholder{
  background: initial;
  color: rgba(255, 255, 255, 0.55);
}

.navbar-input-group button{
  background: initial;
  color: rgba(255, 255, 255, 0.55);
  border: rgba(255, 255, 255, 0.55) solid 1px;
}
</style>