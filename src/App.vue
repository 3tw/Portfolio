<template>
  <div>
    <background @animation-started="startTextAnimation($event)" @animation-status="recordAnimationState($event, state)" />
    <main-text :animationTriggered="textAnimationStarted" :animationState="animationState" />
  </div>
</template>

<script>
import MainText from './components/MainText.vue'
import Background from './components/Background.vue'

export default {
  name: 'App',
  components: {
    MainText,
    Background
  },
  data () {
    return {
      textAnimationStarted: false,
      animationState: 'passive'
    }
  },
  methods: {
    startTextAnimation: function (start) {
      this.textAnimationStarted = start === true
    },
    recordAnimationState: function (state) {
      this.animationState = state
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Lora:ital@1&display=swap');
</style>
