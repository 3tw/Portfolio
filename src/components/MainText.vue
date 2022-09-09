<template>
  <div :class="[animationState, 'main-wrap']">
    <div class="container">

      <!-- Paragrahp 1 -->

      <h1 :class="[initText.status, 'target delayed-initial']">{{ initText.txt.p1 }}</h1>
      <span :class="[initText.status, 'target break delayed-2']">{{ initText.txt.p2 }}</span>

      <span
        @click="showTarget('target01')"
        :class="[initText.status, 'underlined trigger target break delayed-2']"
      ><span>
          {{ initText.txt.p3 }}</span>
      </span>

      <span class="spacer"></span>

      <!-- Target 01 -->

      <span :class="[target01.status, 'target break']">{{ target01.txt.p1 }}</span>
      <span
        @click="showTarget('target02')"
        :class="[target01.status, 'underlined trigger target break']"
      >{{ target01.txt.p2 }}</span>

      <div
        :class="[target01.status, 'target']"
        class="break"
      >
        <span class="mr-space">{{ target01.txt.phil1 }}</span>
        <a
          href="#footnote"
          @click="showTarget('target05')"
          class="underlined trigger"
        >{{ target01.txt.phil2}}</a>
      </div>
      <span class="spacer"></span>

      <!-- Target 02 -->

      <span :class="[target02.status, 'target break']">{{ target02.txt.p1 }}</span>
      <span :class="[target02.status, 'target break']">{{ target02.txt.p2 }}</span>

      <span :class="[target02.status, 'target delayed-1']">{{ target02.txt.p3}}</span>
      <span
        :class="[target02.status, 'target  break delayed-2']"
      >
      {{ target02.txt.p4 }}
      </span>

      <!-- Target 03 -->

      <ul>
        <li
          v-for="text in target03.txt"
          :key="text"
        >
          <span :class="[target03.status, 'target break']">{{ text }}</span>
        </li>
      </ul>

      <!-- Target 02 -->

      <div class="break">
        <span :class="[target02.status, ' target  delayed-4']">{{ target02.txt.contact1 }}</span>
        <span
          @click="showTarget('target04')"
          :class="[target02.status, 'underlined trigger target delayed-4']"
        >{{ target02.txt.contact2 }}</span>
      </div>

      <!-- Target 04 -->

      <span :class="[target04.status, 'target']">{{ target04.txt.p1 }}</span>

      <!-- LinkedIn -->
      <a
        :href="url.linkedIn"
        :class="[target04.status, 'trigger target underlined']"
        target="_blank"
        rel="noopener noreferrer"
      >{{ target04.txt.p2 }}</a>

      <div class="break">

        <!-- Github -->
        <a
          :href="url.gitHub"
          :key="url.gitHub"
          :class="[target04.status, 'trigger target underlined']"
          target="_blank"
          rel="noopener noreferrer"
        >{{ target04.txt.p3 }}</a>

        <!-- CodePen -->
        <a
          :href="url.codePen"
          :class="[target04.status, 'trigger target underlined']"
          target="_blank"
          rel="noopener noreferrer"
        >{{ target04.txt.p4 }}</a>

      </div>

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

      <div
        id="footnote"
        :class="[target05.status,'footnote']"
      >
        <p>
          {{ target05.txt.footnote1 }}
          <a
            :href="url.hegel"
            class="underlined"
          >{{ target05.txt.hegel1 }}</a>
          {{ target05.txt.footnote2 }}
          <a
            :href="url.uva"
            class="underlined"
          >{{ target05.txt.uva }}</a>
          {{ target05.txt.footnote3 }}
        </p>
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
        codePen: 'https://codepen.io/3tw',
        email: 'mailto:teo.winkler@gmail.com',
        hegel: 'https://en.wikipedia.org/wiki/Georg_Wilhelm_Friedrich_Hegel',
        uva: 'https://www.uva.nl/en',
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
          // p1: 'I\'m currently working as a',
          p1: "I'm a self-taught",
          p2: 'frontend developer',
          phil1: 'with an ',
          phil2: 'MA in Philosophy*',
        },
      },
      target02: {
        status: 'hidden',
        txt: {
          p1: 'At the moment, ',
          p2: 'I am working with JS,',
          p3: '- Vue.js/Nuxt.js -',
          p4: 'and learning Rust 🦀.',
          contact1: "It's easy to",
          contact2: 'find me',
        },
      },
      target03: {
        status: 'hidden',
        txt: {
          p1: 'PHP',
          p2: 'Laravel',
          p3: 'Wordpress',
          p4: 'jQuery',
          p5: '...',
        },
      },
      target04: {
        status: 'hidden',
        txt: {
          p1: 'on ',
          p2: 'LinkedIn,',
          p3: 'GitHub,',
          p4: 'CodePen',
          p5: 'or via',
          p6: 'email.',
        },
      },
      target05: {
        status: 'hidden',
        txt: {
          footnote1: '* I wrote my thesis on',
          hegel1: 'Hegel',
          footnote2:
            ', his theory of action, to be precise, at the University of Amsterdam',
          uva: '(UvA)',
          footnote4: '.',
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
          this.bio.location = data.location
          this.url.gitHub = data.html_url
        })
        .catch(function () {})
    },
    // getGitHubRepos() {
    //   fetch(this.gitHubRepos)
    //     .then((response) => response.json())
    //     .then((data) => {
    //     })
    //     .catch(function () {})
    // },
  },
  mounted() {
    this.getGitHubUser()
    // this.getGitHubRepos()
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

.mr-space {
  margin-right: 4px;
}

.main-wrap.active {
  .underlined::before {
    transform: scaleY(1);
    transition: transform 1.1s 0.5s cubic-bezier(0.25, 0.1, 0, 1.09);
  }
}

/* Footnote */

.footnote {
  font-family: 'Lora', serif;
  visibility: hidden;
  opacity: 0;
  padding-top: 50px;
  font-size: 1rem;
  line-height: 1.3rem;
  pointer-events: none;
  user-select: none;
  transition: opacity 1.2s cubic-bezier(0.32, 0.01, 0.19, 1.09);
  &.show {
    visibility: visible;
    opacity: 1;
    pointer-events: auto;
    user-select: auto;
  }
}

/* Animation trigger */

.trigger {
  font-family: 'Lora', serif;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

/* Animation target */

// Credits for creating the core of this animation go to Mattia Astorino
// https://codepen.io/equinusocio/details/KNYOxJ

.target {
  overflow: hidden;
  display: inline-flex;
  flex-wrap: wrap;
  visibility: hidden;
  max-width: 0;
  max-height: 0;
  padding-right: 0;
  transition: padding-right 1s 0.4s ease-in;
  width: max-content;
  will-change: max-width;
}
.target::after {
  will-change: transform, transform-origin;
}

.target.show,
.target.show::after {
  animation-duration: 1.6s;
  animation-delay: 0.5s;
  animation-fill-mode: both;
  animation-iteration-count: 1;
  animation-timing-function: cubic-bezier(0.69, 0.03, 0.25, 1.08);
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
  0% {
    max-width: 0;
  }
  15% {
    max-width: 0;
  }
  100% {
    max-width: 500px;
  }
}

@keyframes text-revealer {
  0% {
    opacity: 1;
    transform: scaleX(0);
    transform-origin: 0 50%;
  }

  15% {
    transform: scaleX(1);
    transform-origin: 0 50%;
  }

  50% {
    transform: scaleX(1);
    transform-origin: 100% 50%;
  }

  75% {
    opacity: 1;
  }

  80% {
    opacity: 0.8;
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
    animation-delay: 2.6s;
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
</style>
