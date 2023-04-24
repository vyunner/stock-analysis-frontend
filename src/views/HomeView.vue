<template>
  <div>
    <nav-bar @nav-click="(value) => navData = value"></nav-bar>
    {{navData}}
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
  components: {NavBar},
  data(){
    return{
      navData: null,
    }
  },
  methods: {

  },
  mounted() {

  }
}
</script>

<style scoped>

</style>

