<template>
  <div id="app">
    <img src="./assets/logo.png">
    <reading/>
  </div>
</template>

<script>
import Reading from './components/Reading'

export default {
  name: 'App',
  components: {
    Reading
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
div,h1,p {
  display: block;
}
input,button,select,textarea {
  outline:none ;
}
</style>
