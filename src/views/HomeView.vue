<template>
  <Button @click="lol">Logout</Button>
</template>
<script>
import {mapActions} from "vuex";

export default {
  methods: {
    ...mapActions('auth', ['POST_LOGOUT']),

    lol(){

    }
  }
}
</script>
<style scoped></style>
