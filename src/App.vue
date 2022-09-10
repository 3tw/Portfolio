<template>
  <div class="relative">
    <Background
      @animation-started="startTextAnimation($event)"
      @animation-status="recordAnimationState($event, state)"
    />
    <ShortResume
      :animation-triggered="textAnimationStarted"
      :animation-state="animationState"
      :git-hub-url="gitHubUrl"
    />
  </div>
</template>

<script>
import ShortResume from './components/ShortResume.vue';
import Background from './components/Background.vue';

export default {
  name: 'App',
  components: {
    ShortResume,
    Background,
  },
  data() {
    return {
      textAnimationStarted: false,
      animationState: 'passive',
      gitHubUser: 'https://api.github.com/users/3tw',
      gitHubUrl: '',
    };
  },
  methods: {
    startTextAnimation: function (start) {
      this.textAnimationStarted = start === true;
    },
    recordAnimationState: function (state) {
      this.animationState = state;
    },
    getGitHubUser() {
      fetch(this.gitHubUser)
        .then((response) => response.json())
        .then((data) => {
          this.gitHubUrl = data.html_url;
        })
        .catch(function (e) {console.log(e)});
    },
  },
  mounted() {
    this.getGitHubUser();
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Lora:ital@1&display=swap');

#app {
  position: relative;
  min-height: 100vh;
}
</style>
