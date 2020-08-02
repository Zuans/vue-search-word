<template>
  <div id="app">
    <Header />
    <div class="body container">
      <search />
    </div>
    <Footer />
  </div>
</template>

<script>
import search from "./components/search.vue";
import Header from "./components/header.vue";
import Footer from "./components/Footer.vue";
export default {
  name: "App",
  components: {
    search,
    Header,
    Footer,
  },
};
</script>

<style lang=scss >
body {
  @import url("https://fonts.googleapis.com/css2?family=Recursive:wght@700&display=swap");
}

.body {
  min-height: 69vh;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.title {
  font-family: "Recursive", sans-serif;
}
</style>
