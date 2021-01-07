<template>
  <div :class="[animationState, 'main-wrap']">
    <div class="container">

      <!-- Paragrahp 1 -->

      <span :class="[initText.status, 'target delayed-initial']">{{ initText.txt.p1 }}</span>
      <span :class="[initText.status, 'target break delayed-initial']">{{ initText.txt.p2 }}</span>
      <span :class="[initText.status, 'target break delayed-initial']">{{ initText.txt.p3 }}</span>

      <span
        @click="target01.status = 'show'"
        :class="[initText.status, 'trigger target break delayed-2 animation-slow']"
      >{{ initText.txt.p4 }}</span>

      <span class="spacer"></span>

      <!-- Paragrahp 2 -->
      <!-- 
      <div class="break">
        <span :class="[target01.status, 'target']">{{ target01.txt.p1 }}</span>
        <span :class="[target01.status, 'target delayed-1']">{{ target01.txt.p2 }}</span>
      </div>

      <div class="break">
        <span :class="[target01.status, 'target']">{{ target01.txt.p3 }}</span>
        <span :class="[target01.status, 'target delayed-1']">{{ target01.txt.p4 }}</span>
      </div> -->

      <div :class="[target01.status, 'target']">
        <div class="break">
          <span class="pr-1">{{ target01.txt.p1 }}</span>
          <span>{{ target01.txt.p2 }}</span>
        </div>

        <div class="break">
          <span class="pr-1">{{ target01.txt.p3 }}</span>
          <span>{{ target01.txt.p4 }}</span>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'MainText',
  props: {
    animationTriggered: Boolean,
    animationState: String,
  },
  data() {
    return {
      gitHubUser: 'https://api.github.com/users/3tw',
      gitHubUserRepos: 'https://api.github.com/users/3tw/repos',
      skills: {
        languages: ['JavaScript', 'PHP', 'CSS', 'HTML'],
        tools: ['Git', 'Sass', 'jQuery', 'Bootstrap', 'Laravel mix'],
        frameworks: ['Laravel', 'Vue.js'],
        cms: ['Twill', 'Wordpress'],
      },
      bio: {
        location: 'fetch',
      },
      links: {
        gitHub: 'fetch',
      },
      starredRepos: {},

      initText: {
        status: 'hidden',
        txt: {
          p1: 'This can be short ',
          p2: 'very very short',
          p3: 'presentation',
          p4: 'or not.',
        },
      },

      target01: {
        status: 'hidden',
        txt: {
          p1: 'name: ',
          p2: 'Teo Winkler',
          p3: 'types: ',
          p4: 'frontend code',
          p5: '',
        },
      },
    }
  },
  watch: {
    animationTriggered: function () {
      this.initText.status = this.animationTriggered ? 'show' : 'hidden'
    },
  },
  methods: {
    getGitHubUser() {
      fetch(this.gitHubUser)
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          this.bio.location = data.location
          this.links.gitHub = data.html_url
        })
        .catch(function () {})
    },
    getGitHubRepos() {
      fetch(this.gitHubRepos)
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
        })
        .catch(function () {})
    },
  },
  mounted() {
    this.getGitHubUser()
    this.getGitHubRepos()
  },
}
</script>

<style scoped lang="scss">
.main-wrap {
  position: relative;
  z-index: 10;
  font-size: 1.3rem;
  line-height: 1.5rem;
  width: 100vw;
  text-align: left;
  &.passive {
    user-select: none;
    pointer-events: none;
  }
}

.container {
  margin-top: auto;
  margin-bottom: auto;
}

span {
  display: inline-block;
}

.break {
  display: block;
}
.target.break {
  display: flex;
}

.spacer {
  height: 1.5rem;
  width: 100%;
}

.pr-1 {
  padding-right: 4px;
}

/* Animation trigger */

.trigger {
  font-family: 'Lora', serif;
  cursor: pointer;
}

/* Animation target */

// Credits for creating the core of this animation go to Mattia Astorino
// https://codepen.io/equinusocio/details/PoNYGGX

.target {
  display: inline-flex;
  flex-wrap: wrap;
  visibility: hidden;
  max-width: 0;
  max-height: 0;
  padding-right: 0;
  transition: max-width 1s 0.4s ease-in, padding-right 1s 0.4s ease-in;
}

.target.show,
.target.show::after {
  animation-duration: 1.5s;
  animation-delay: 0.6s;
  animation-fill-mode: both;
  animation-iteration-count: 1;
  animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
}

.target.show {
  position: relative;
  visibility: visible;
  max-width: $container-max-width;
  max-height: none;
  padding-right: 4px;
  white-space: nowrap;
  animation-name: clip-text;

  &::after {
    content: '';
    position: absolute;
    z-index: 999;
    background-color: $text-color;
    background: #ff5445;
    background: #ffe40a;
    background: #4abdac;
    // background: linear-gradient(60deg, #000, #000 20%, #8b8b8b 70%, #fff 90%);
    background: linear-gradient(
      60deg,
      #fff,
      #fff 20%,
      #8b8b8b 50%,
      #000 90%,
      #000
    );
    background: linear-gradient(
      60deg,
      #fff,
      #fff 10%,
      #4abdac 60%,
      #ff2e93 80%,
      #ff2e93
    );
    background: linear-gradient(
      60deg,
      #fff,
      #fff 10%,
      #cbff83 50%,
      #8affe1 75%,
      #8affe1
    );
    top: -1px;
    left: 0;
    right: 0;
    bottom: -1px;
    transform: scaleX(0);
    transform-origin: 0 50%;
    animation-name: text-revealer;
    pointer-events: none;
  }
}

@keyframes clip-text {
  from {
    clip-path: inset(0 100% 0 0);
  }
  to {
    clip-path: inset(0 0 0 0);
  }
}

@keyframes text-revealer {
  0% {
    opacity: 1;
    transform: scaleX(0);
    transform-origin: 0 50%;
  }

  50% {
    transform-origin: 0 50%;
  }

  60% {
    transform: scaleX(1);
    transform-origin: 100% 50%;
  }
  75% {
    opacity: 1;
  }
  80% {
    opacity: 0.6;
  }
  95% {
    opacity: 0;
    transform: scaleX(0.4);
  }
  100% {
    opacity: 0;
    transform: scaleX(0);
    transform-origin: 100% 50%;
  }

  // 60% {
  //   transform: scaleX(1);
  // }

  // 100% {
  //   // transform: scaleX(0);
  // }
}

/* Animation helpers */

.target.show {
  &.delayed-initial,
  &.delayed-initial::after {
    animation-delay: 1s;
  }
  &.delayed-1,
  &.delayed-1::after {
    animation-delay: 2s;
  }
  &.delayed-2,
  &.delayed-2::after {
    animation-delay: 2.8s;
  }
  &.delayed-3,
  &.delayed-3::after {
    animation-delay: 3.8s;
  }
  &.delayed-4,
  &.delayed-4::after {
    animation-delay: 4.8s;
  }
}

.target.show {
  &.animation-slow::after {
    animation-duration: 1.8s;
  }
}
</style>
