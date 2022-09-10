<template>
  <div :class="[animationState, 'main-wrap']">
    <div class="container">
      <!-- Intro -->

      <h1 :class="[initText, 'target delayed-initial']">Teo Winkler</h1>
      <span :class="[initText, 'target break delayed-2']">
        - very very brief
      </span>

      <span
        @click="showTarget('target01')"
        :class="[initText, 'underlined trigger target break delayed-2']"
      >
        presentation
      </span>

      <span class="spacer"></span>

      <!-- Target 01 -->

      <span :class="[target01, 'target break']"> I'm a self-taught </span>
      <span
        @click="showTarget('target02')"
        :class="[target01, 'underlined trigger target break']"
      >
        frontend developer
      </span>

      <div :class="[target01, 'target']" class="break">
        <span class="mr-space">"with an </span>
        <span
          class="underlined trigger"
          @click="showTarget('target05')"
          >MA in Philosophy*</span>
      </div>
      <span class="spacer"></span>

      <!-- Target 02 -->

      <span :class="[target02, 'target break']"> At the moment, </span>
      <span :class="[target02, 'target break']">I am working with JS,</span>

      <span :class="[target02, 'target delayed-1']">- Vue.js/Nuxt.js -</span>
      <span :class="[target02, 'target  break delayed-2']">
        and learning Rust 🦀.
      </span>

      <!-- Target 03 -->

      <ul>
        <li v-for="skill in skills" :key="skill">
          <span :class="[target03, 'target break']">{{ skill }}</span>
        </li>
        <li><span class="target break">...</span></li>
      </ul>

      <!-- Target 02 -->

      <div class="break">
        <span :class="[target02, ' target  delayed-4']">It's easy to</span>
        <span
          @click="showTarget('target04')"
          :class="[target02, 'underlined trigger target delayed-4']"
        >
          find me
        </span>
      </div>

      <!-- Target 04 -->

      <span :class="[target04, 'target']">on</span>

      <a
        :href="linkedInUrl"
        :class="[target04, 'trigger target underlined']"
        target="_blank"
        rel="noopener noreferrer"
        >LinkedIn,
      </a>
      <a
        :href="gitHubUrl"
        :key="gitHubUrl"
        :class="[target04, 'trigger target underlined']"
        target="_blank"
        rel="noopener noreferrer"
        >GitHub</a
      >
      <div class="break">
        <span :class="[target04, 'target delayed-1']"> or via </span>
        <a
          :href="emailUrl"
          :key="emailUrl"
          :class="[target04, 'trigger target underlined delayed-1']"
          target="_blank"
          rel="noopener noreferrer"
          >email.</a
        >
      </div>

      <div :class="[target05, 'footnote']">
        <p>
          * I wrote my thesis on
          <a :href="hegelUrl" class="underlined">Hegel</a>
          , his theory of action, to be precise, at the University of Amsterdam
          <a :href="uvaUrl" class="underlined">(UvA)</a>
          .
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShortResume",
  props: {
    animationTriggered: { type: Boolean, required: true },
    animationState: { type: String, required: true },
    gitHubUrl: { type: String, required: false, default: "" },
  },
  data() {
    return {
      linkedInUrl: "https://www.linkedin.com/in/teo-winkler",
      emailUrl: "mailto:teo.winkler@gmail.com",
      hegelUrl: "https://en.wikipedia.org/wiki/Georg_Wilhelm_Friedrich_Hegel",
      uvaUrl: "https://www.uva.nl/en",

      initText: "hidden",
      target01: "hidden",
      target02: "hidden",
      target03: "hidden",
      target04: "hidden",
      target05: "hidden",

      skills: ["PHP", "Laravel", "Wordpress", "jQuery"],
    };
  },
  watch: {
    animationTriggered: function () {
      this.initText = this.animationTriggered ? "show" : "hidden";
    },
  },
  methods: {
    showTarget(target) {
      this[target] = "show";
    },
  },
};
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
    content: " ";
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
  font-family: "Lora", serif;
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
  font-family: "Lora", serif;
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
    content: "";
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
