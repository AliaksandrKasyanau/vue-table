<template>
  <div id="app">
    <HomeView />
  </div>
</template>

<script>
import HomeView from "@/pages/HomePage/HomePage";
export default {
  components: { HomeView }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
  font-family: 'Montserrat', sans-serif;
}
#app {
  height: 100vh;
}
</style>
