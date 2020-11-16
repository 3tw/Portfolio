<template>
  <Background />
  <HelloWorld />
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Background from './components/Background.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    Background
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@800&display=swap');

#app {
  text-align: center;
  color: $text-color;
}
</style>
