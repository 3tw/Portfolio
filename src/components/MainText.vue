<template>
  <div class="main-wrap">
    <div class="container">

      <span :class="[openingTextStatus, 'target delayed-initial']">{{ openingText01 }}</span>
      <span :class="[openingTextStatus, 'target break delayed-initial']">{{ openingText02 }}</span>
      <span :class="[openingTextStatus, 'target break delayed-initial']">{{ openingText03 }}</span>

      <span
        @click="targetStatus01 = 'show'"
        :class="[openingTextStatus, 'trigger target break delayed-3 animation-slow']"
      >{{trigger01}}</span>

      <span class="spacer"></span>

      <span :class="[targetStatus02, 'target']">{{ target02_1 }}</span>

      <span
        @click="targetStatus02 = 'show'"
        :class="[targetStatus01, 'trigger target']"
      >{{target01_1}}</span>
      <span :class="[targetStatus01, 'target']">{{ target01_2 }}</span>
      <span :class="[targetStatus01, 'target delayed-1']">{{ target01_2p1 }}</span>
      <span :class="[targetStatus01, 'target delayed-2']">{{ target01_2p2 }}</span>

      <span
        :class="[targetStatus01, 'trigger target delayed-1']"
        @click="targetStatus03 = 'show'"
      >{{ target01_3 }}</span>

      <span :class="[targetStatus03, 'target']">{{ target03_1 }}</span>

      <span :class="[targetStatus01, 'target delayed-2']">{{ target01_4 }}</span>

    </div>
  </div>
</template>

<script>
export default {
  name: 'MainText',
  props: {
    animationTriggered: Boolean
  },
  data () {
    return {
      user: '',
      openingTextStatus: 'hidden',
      targetStatus01: 'hidden',
      targetStatus02: 'hidden',
      targetStatus03: 'hidden',

      openingText01: 'This can be short ',
      openingText02: 'very very short',
      openingText03: 'presentation',
      trigger01: ' or not. ',

      target01_1: 'I ',
      target02_1: 'My name is Teo Winkler. ',
      target01_2: 'am a ',
      target01_2p1: 'frontend ',
      target01_2p2: ' developer. ',
      target01_3: 'Lorem ipsum arem. ',
      target03_1: 'Minon firum sinun. ',
      target01_4: 'Oro gracius et tu. '
    }
  },
  watch: {
    animationTriggered: function () {
      this.openingTextStatus = this.animationTriggered ? 'show' : 'hidden'
    }
  },
  methods: {
    getUser () {}
  },
  mounted () {
    this.getUser()
  }
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

/* Animation trigger */

.trigger {
  font-family: 'Lora', serif;
  cursor: pointer;
}

/* Animation target */

// Credits for creating this animation go to Mattia Astorino
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
  animation-duration: 1.2s;
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
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
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
  0%,
  50% {
    transform-origin: 0 50%;
  }

  60%,
  100% {
    transform-origin: 100% 50%;
  }

  60% {
    transform: scaleX(1);
  }

  100% {
    transform: scaleX(0);
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
