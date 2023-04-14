<template>
  <router-view/>
  <Toast position="bottom-right"/>

</template>

<script>
import {mapMutations, mapState} from "vuex";

export default {
  name: 'App',
  components: {},
  methods: {
    ...mapMutations(['SET_DATA_USER_FROM_LOCAL_STORAGE'])
  },
  computed: {
    ...mapState(['dataUser'])
  },
  async mounted() {
    if (localStorage.getItem('dataUser')) {
      await this.SET_DATA_USER_FROM_LOCAL_STORAGE();
    }
    else {
      this.$router.push({path: '/auth'})
    }
  }
}
</script>

<style lang="scss">
</style>
