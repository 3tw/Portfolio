<template>
  <div :class="[animationState, 'main-wrap']">
    <div class="container">

      <!-- Paragrahp 1 -->

      <h1 :class="[initText.status, 'target delayed-initial']">{{ initText.txt.p1 }}</h1>
      <span :class="[initText.status, 'target break delayed-2']">{{ initText.txt.p2 }}</span>

      <span
        @click="showTarget('target01')"
        :class="[initText.status, 'underlined trigger target break delayed-2 animation-slow']"
      >{{ initText.txt.p3 }}</span>

      <span class="spacer"></span>

      <!-- Target 01 -->

      <span :class="[target01.status, 'target break']">{{ target01.txt.p1 }}</span>
      <span
        @click="showTarget('target02')"
        :class="[target01.status, 'underlined trigger target break']"
      >{{ target01.txt.p2 }}</span>

      <!-- Target 02 -->

      <span :class="[target02.status, 'target break']">{{ target02.txt.p1 }}</span>
      <span :class="[target02.status, 'target break']">{{ target02.txt.p2 }}</span>

      <span :class="[target02.status, 'target delayed-1']">{{ target02.txt.p3}}</span>
      <span
        @click="showTarget('target03')"
        :class="[target02.status, 'underlined trigger target  delayed-2']"
      >{{ target02.txt.p4 }}</span>

      <!-- Target 03 -->

      <ul>
        <li>
          <span
            v-for="text in target03.txt"
            :key="text"
            :class="[target03.status, 'target break']"
          >{{ text }}</span>
        </li>
      </ul>

      <!-- Target 02 -->

      <div class="break">
        <span :class="[target02.status, ' target  delayed-4']">{{ target02.txt.p5 }}</span>
        <span
          @click="showTarget('target04')"
          :class="[target02.status, 'underlined trigger target delayed-4']"
        >{{ target02.txt.p6 }}</span>
      </div>

      <!-- Target 04 -->

      <span :class="[target04.status, 'target']">{{ target04.txt.p1 }}</span>

      <!-- LinkedIn -->
      <a
        :href="url.linkedIn"
        :key="url.linkedIn"
        :class="[target04.status, 'trigger target underlined']"
        target="_blank"
        rel="noopener noreferrer"
      >{{ target04.txt.p2 }}</a>
      <span :class="[target04.status, 'target']">{{ target04.txt.p3 }}</span>

      <!-- Github -->
      <a
        :href="url.gitHub"
        :key="url.gitHub"
        :class="[target04.status, 'trigger target underlined']"
        target="_blank"
        rel="noopener noreferrer"
      >{{ target04.txt.p4 }}</a>

      <div class="break">
        <span :class="[target04.status, 'target delayed-1']">{{ target04.txt.p5 }}</span>
        <!-- Email -->
        <a
          :href="url.email"
          :key="url.email"
          :class="[target04.status, 'trigger target underlined delayed-1']"
          target="_blank"
          rel="noopener noreferrer"
        >{{ target04.txt.p6 }}</a>

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
      bio: {
        location: null,
      },
      url: {
        gitHub: null,
        linkedIn: 'https://www.linkedin.com/in/teo-winkler',
        email: 'mailto:teo.winkler@gmail.com'
      },

      initText: {
        status: 'hidden',
        txt: {
          p1: 'Teo Winkler',
          p2: '- very very brief',
          p3: 'presentation',
        },
      },

      target01: {
        status: 'hidden',
        txt: {
          p1: "I'm currently working as a",
          p2: 'frontend developer',
        },
      },
      target02: {
        status: 'hidden',
        txt: {
          p1: 'with JavaScript,',
          p2: '(a lot of) CSS',
          p3: 'and a bunch of ',
          p4: 'other stuff.',
          p5: "It's easy to",
          p6: 'find me',
        },
      },
      target03: {
        status: 'hidden',
        txt: {
          p1: 'Laravel',
          p2: 'PHP',
          p3: 'Vue.js',
          p4: 'Git',
          p5: 'Sass',
          p6: 'Wordpress',
          p7: 'Twill',
          p8: 'Laravel mix',
          p9: 'Bootstrap',
          p10: 'jQuery',
          p11: '...',
        },
      },
      target04: {
        status: 'hidden',
        txt: {
          p1: 'on ',
          p2: 'LinkedIn',
          p3: 'and',
          p4: 'GitHub.',
          p5: 'or via',
          p6: 'email.',
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
    showTarget(target) {
      this[target].status = 'show'
    },
    getGitHubUser() {
      fetch(this.gitHubUser)
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          this.bio.location = data.location
          this.url.gitHub = data.html_url
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

.underlined {
  position: relative;
  &::before {
    content: ' ';
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    background: linear-gradient(to top, #ff544582 35%, #0000 35%);
    transform: scaleY(0);
    transform-origin: bottom center;
    transition: transform 1.1s 0.1s;
  }
}

.main-wrap.active {
  .underlined::before {
    transform: scaleY(1);
    transition: transform 1.1s 0.5s cubic-bezier(0.25, 0.1, 0, 1.09);
  }
}
/* Animation trigger */

.trigger {
  font-family: 'Lora', serif;
  cursor: pointer;
}

/* Animation target */

// Credits for creating the core of this animation go to Mattia Astorino
// https://codepen.io/equinusocio/details/KNYOxJ

.target {
  display: inline-flex;
  flex-wrap: wrap;
  visibility: hidden;
  max-width: 0;
  max-height: 0;
  padding-right: 0;
  transition: max-width 1s 0.4s ease-in, padding-right 1s 0.4s ease-in;
  width: max-content;
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
  max-width: 100%;
  max-height: none;
  padding-right: 0;
  margin-right: 4px;
  white-space: nowrap;
  animation-name: clip-text;

  &::after {
    content: '';
    position: absolute;
    z-index: 999;
    background-color: $text-color;
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
    opacity: 0.8;
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
