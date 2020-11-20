<template>
  <div class="background-wrap">
    <div class="background-content">

      <span
        @click="toggleDotState('dot-large')"
        @click.once="startTextAnimation()"
        :class=dotState
        class="dot dot-large"
      ></span>

      <div class="dot-wrap">
        <div class="dot-content">
          <span
            @click="toggleDotState('dot-small')"
            :class=dotState
            class="dot dot-small"
          ></span>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Background',
  data () {
    return {
      dotState: 'initial-state'
    }
  },
  methods: {
    startTextAnimation: function () {
      this.$emit('animation-started', true)
    },
    toggleDotState: function (dotSize) {
      if (this.dotState === 'passive' || this.dotState === 'initial-state') {
        this.dotState = 'active'
      } else if (this.dotState === 'active' && dotSize === 'dot-large') {
      } else {
        this.dotState = 'passive'
      }
    }
  }
}
</script>

<style scoped lang='scss'>
.background-wrap {
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: $text-color;
}

.background-content {
  position: relative;
  height: 100%;
  width: 100%;
}

.dot {
  display: block;
  border-radius: 50%;
  border-style: solid;
}

.dot-large {
  position: absolute;
  @include center-absolute;
  height: 0;
  width: 0;
  background-color: $bg-color;
  border-color: $bg-color;
  box-shadow: 0 0 2px 2px #fff;
  &.initial-state {
    z-index: 9999;
    cursor: pointer;
    animation-name: dotPulse;
    animation-iteration-count: infinite;
    animation-duration: 0.7s;
    animation-timing-function: ease-in-out;
    animation-play-state: running;
    animation-direction: alternate;
    &:hover::before {
      content: "";
    }
  }
  &.passive {
    z-index: 9999;
    cursor: pointer;
    border-width: 20px;
    animation-name: largeDotShrink, dotPulse;
    animation-duration: 3s, 0.7s;
    animation-delay: 0s, 3.2s;
    animation-timing-function: ease-in-out;
    animation-fill-mode: forwards;
    animation-play-state: running;
    animation-direction: normal, alternate;
    animation-iteration-count: 1, infinite;
    transition: z-index 3s step-end;
  }
  &.active {
    z-index: 0;
    animation-name: largeDotExpand;
    animation-fill-mode: forwards;
    animation-duration: 0.8s;
    animation-timing-function: ease-in-out;
  }
}

.dot-small {
  position: absolute;
  @include center-absolute;
  height: 0;
  width: 0;
  background-color: $text-color;
  border-color: $text-color;
  &.initial-state {
    transform: translate(-50%, -120px);
  }
  &.active {
    z-index: 50;
    cursor: pointer;
    transform: translate(-50%, -50%);
    transition: transform 0.8s 1.2s cubic-bezier(0, 0.81, 0.63, 1.21);
  }
  &.passive {
    animation-duration: 3s;
    animation-name: smallDotExpandAndShrink;
    // transition to passive after the animation is finished
    transform: translate(-50%, -120px);
    transition: transform 0.8s 2.5s ease;
  }
}

.dot-wrap {
  position: absolute;
  z-index: 50;
  top: 20px;
  right: 20px;
  width: 5px;
  height: 5px;
  .dot-content {
    position: relative;
    max-width: 5px;
    max-height: 5px;
  }
  @include breakpoint-up(md) {
    top: 40px;
    right: 40px;
  }
}

@keyframes smallDotExpandAndShrink {
  from {
    border-width: 5px;
  }

  50% {
    border-width: 300vh;
  }

  to {
    border-width: 5px;
  }
}

@keyframes largeDotExpand {
  from {
    border-width: 5px;
  }

  to {
    border-width: 300vh;
  }
}

@keyframes largeDotShrink {
  from {
    border-width: 300vh;
  }

  60% {
    border-width: 0px;
  }

  80% {
    border-width: 0px;
  }

  90% {
    border-width: 30px;
  }

  to {
    border-width: 20px;
  }
}

@keyframes dotPulse {
  from {
    border-width: 20px;
  }

  to {
    border-width: 30px;
  }
}
</style>
