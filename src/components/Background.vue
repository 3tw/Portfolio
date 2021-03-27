<template>
  <div class="background-wrap">

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

    <!-- <div
      :class=dotState
      class="message message-0"
    >
      we made
    </div> -->
    <div
      :class=dotState
      class="message message-1"
    >
       {{ circleCountOrdinal }} time
    </div>
    <div
      :class=dotState
      class="message message-2"
    >
    around the site
    </div>

  </div>
</template>

<script>
export default {
  name: 'Background',
  data() {
    return {
      dotState: 'initial-state',
      circleCount: 0,
      circleCountOrdinal: '',
    }
  },
  methods: {
    startTextAnimation: function () {
      this.$emit('animation-started', true)
    },
    changeAnimationStatus: function (state) {
      this.$emit('animation-status', state)
    },
    toggleDotState: function (dotSize) {
      if (this.dotState === 'passive' || this.dotState === 'initial-state') {
        this.dotState = 'active'
        this.changeAnimationStatus('active')
      } else if (this.dotState === 'active' && dotSize === 'dot-large') {
      } else {
        this.dotState = 'passive'
        this.updateCircleCount()
        this.changeAnimationStatus('passive')
      }
    },
    updateCircleCount: function () {
      this.circleCount++
      this.getGetOrdinal(this.circleCount)
    },
    // Credits go to : https://gist.github.com/jlbruno/1535691/db35b4f3af3dcbb42babc01541410f291a8e8fac
    getGetOrdinal: function (n) {
      let suffix = ['th', 'st', 'nd', 'rd']
      let v = n % 100
      this.circleCountOrdinal =
        n + (suffix[(v - 20) % 10] || suffix[v] || suffix[0])
    },
  },
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
  filter: blur(3px);
  &.initial-state {
    z-index: 9999;
    cursor: pointer;
    animation-name: dotPulse;
    animation-iteration-count: infinite;
    animation-duration: 0.7s;
    animation-timing-function: ease-in-out;
    animation-play-state: running;
    animation-direction: alternate;
  }
  &.passive {
    z-index: 9999;
    cursor: pointer;
    border-width: 20px;
    animation-name: largeDotShrink, dotPulse;
    animation-duration: 2s, 0.7s;
    animation-delay: 0s, 1.9s;
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
  border-width: 4px;
  background-color: $text-color;
  border-color: $text-color;
  &.initial-state {
    transform: translate(-50%, -120px);
  }
  &.active {
    z-index: 50;
    cursor: pointer;
    transform: translate(-50%, -50%);
    transition: transform 0.65s 1.2s cubic-bezier(0, 0.81, 0.63, 1.21);
  }
  &.passive {
    animation-duration: 2s;
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

.message {
  position: fixed;
  bottom: 0;
  right: 0;
  width: auto;
  text-align: right;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: white;
  -webkit-text-fill-color: transparent;
  color: #111;
  text-transform: uppercase;
  font-size: 24px;
  line-height: 24px;
  padding: 10px;
  opacity: 0;
}
// .message-0 {
//   bottom: 28px;
//   padding-right: 44px;
//   &.passive {
//     animation: 3.5s ease-in-out normal forwards 1 fadeInLeft;
//   }
// }
.message-1 {
  padding-right: 44px;
  &.passive {
    animation: 3.5s ease-in-out normal forwards 1 fadeInLeft;
  }
}
.message-2 {
  writing-mode: tb;
  text-align: right;
  padding-bottom: 13px;
  &.passive {
    animation: 4.5s ease-in-out normal forwards 1 fadeInTop;
  }
}

@keyframes fadeInLeft {
  0% {
    opacity: 0;
  }
  60% {
    opacity: 0;
    transform: translateX(-20px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes fadeInTop {
  0% {
    opacity: 0;
  }
  60% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
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

  100% {
    border-width: $large-dot-max-w;
  }
}

@keyframes dotPulse {
  from {
    border-width: $large-dot-max-w;
  }

  to {
    border-width: 10px;
  }
}
</style>
