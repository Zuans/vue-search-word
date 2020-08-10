<template>
  <div id="app">
    <MyHeader />
    <div class="body container">
      <SearchInputAndList />
    </div>
    <MyFooter />
  </div>
</template>

<script>
import SearchInputAndList from "./components/SearchInputAndList.vue";
import MyHeader from "./components/MyHeader.vue";
import MyFooter from "./components/MyFooter.vue";
export default {
  name: "App",
  components: {
    SearchInputAndList,
    MyHeader,
    MyFooter,
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
