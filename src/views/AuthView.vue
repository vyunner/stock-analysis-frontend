<template>
  <Toast position="bottom-right"/>
  <div class="container">
    <div class="login-form-container">
      <div class="p-grid p-fluid col-md-4">
        <div class="p-col-8 p-mx-auto">
          <div class="p-field">
            <label for="username">Имя пользователя:</label>
            <InputText id="username" v-model="dataUser.login"/>
          </div>
          <div class="p-field">
            <label for="password">Пароль:</label>
            <Password id="password" v-model="dataUser.password"/>
          </div>
          <div class="p-field d-flex flex-row">
            <Button label="Войти" @click="login"/>
            <Button label="Зарегистрироваться" class="p-button-secondary" @click="register"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import axios from "axios";

export default {
  name: "HomeView",
  data() {
    return {
      dataUser: {
        login: null,
        password: null,
      }
    }
  },
  methods: {
    ...mapActions('auth', ['POST_REGISTER', 'POST_AUTH']),

    async login() {
      const {status} = await this.POST_AUTH(this.dataUser)

      if (status === 200) {
        this.$router.replace('/')
      } else {
        this.$toast.add({
          severity: 'error',
          summary: 'Неправильный логин или пароль!',
          life: 3000
        });
      }
    },
    async register() {
        const {status} = await this.POST_REGISTER(this.dataUser)

      if (status === 200) {
        this.$toast.add({
          severity: 'success',
          summary: 'Успешная регистрация!',
          life: 3000
        });
      } else {
        this.$toast.add({
          severity: 'error',
          summary: 'Данный логин занят!',
          life: 3000
        });
      }
    }
  },
  computed: {},
  async mounted() {
  }
}
</script>

<style scoped>
.login-form-container {
  height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.p-field {
  margin-bottom: 0.5rem;
}
</style>
