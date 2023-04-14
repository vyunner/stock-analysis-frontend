<template>
  <Button @click="POST_LOGOUT">Logout</Button>
</template>
<script>
import {mapActions} from "vuex";

export default {
  methods: {
    ...mapActions('auth', ['POST_LOGOUT']),
  }
}
</script>
<style scoped></style>
