<template>
  <div class="background-wrap">

    <span
      @click="toggleDotState('dot-large')"
      @click.once="startTextAnimation(); showCircleCount() "
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

    <div
      :class="[counterState, dotState]"
      class="message message-1"
    >
      {{ circleCountOrdinal }} time
    </div>
    <div
      :class="[counterState, dotState]"
      class="message message-2"
    >
      around the site
    </div>

    <div
      :class=dotState
      class="indicators"
    >

      <span
        v-for="n in 10"
        :key="n"
        @click="toggleDotState('dot-large')"
        @click.once="startTextAnimation()"
        class="indicator"
      >
        click
      </span>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Background',
  data() {
    return {
      dotState: 'initial-state',
      counterState: 'hide-message',
      circleCount: 0,
      circleCountOrdinal: '',
    }
  },
  methods: {
    startTextAnimation() {
      this.$emit('animation-started', true)
    },
    changeAnimationStatus(state) {
      this.$emit('animation-status', state)
    },
    toggleDotState(dotSize) {
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
    updateCircleCount() {
      this.circleCount++
      window.localStorage.setItem('circleCount', this.circleCount)
      this.getGetOrdinal(this.circleCount)
    },
    // Credits go to : https://gist.github.com/jlbruno/1535691/db35b4f3af3dcbb42babc01541410f291a8e8fac
    getGetOrdinal(n) {
      let suffix = ['th', 'st', 'nd', 'rd']
      let v = n % 100
      this.circleCountOrdinal =
        n + (suffix[(v - 20) % 10] || suffix[v] || suffix[0])
    },
    showCircleCount() {
      this.counterState = ''
    },
  },
  mounted: function () {
    if (window.localStorage.getItem('circleCount')) {
      this.circleCount = window.localStorage.getItem('circleCount')
      this.circleCount ++
      this.getGetOrdinal(this.circleCount)
      this.showCircleCount()
    } else {
      this.circleCount = 0
    }
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
  border-width: 8px;
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

/* Floating texts */

.indicator,
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

.message-1 {
  padding-right: 44px;
  &.initial-state,
  &.passive {
    animation: fadeInLeft 3.5s ease-in-out normal forwards;
  }
  &.hide-message {
    animation: none;
  }
}
.message-2 {
  writing-mode: tb;
  text-align: right;
  padding-bottom: 13px;
  &.initial-state,
  &.passive {
    animation: fadeInTop 4.5s ease-in-out normal forwards;
  }
  &.hide-message {
    animation: none;
  }
}

.indicators.initial-state {
  .indicator {
    visibility: visible;
    pointer-events: auto;
    animation-duration: 0.1s;
    animation-name: fadeIn;
    animation-fill-mode: forwards;
  }
}
.indicator {
  opacity: 0;
  visibility: hidden;
  user-select: none;
  pointer-events: none;
  top: 50%;
  left: 50%;
  right: auto;
  height: min-content;
  transform: translate(-50%, -50%);
  &:nth-child(1) {
    animation-delay: 2.5s;
    transform: translate(calc(-50% - 64px), calc(-50% - 30px)) rotate(15deg);
  }
  &:nth-child(2) {
    animation-delay: 3.2s;
    transform: translate(calc(-50% - 52px), calc(-50% + 40px)) rotate(23deg);
  }
  &:nth-child(3) {
    animation-delay: 3.5s;
    transform: translate(calc(-50% + 23px), calc(-50% - 40px)) rotate(35deg);
  }
  &:nth-child(4) {
    animation-delay: 2.8s;
    transform: translate(calc(-50% + 18px), calc(-50% - 50px)) rotate(-17deg);
  }
  &:nth-child(5) {
    animation-delay: 4.2s;
    transform: translate(calc(-50% + 60px), calc(-50% + 10px)) rotate(-42deg);
  }
  &:nth-child(6) {
    animation-delay: 4.4s;

    transform: translate(calc(-50% + 80px), calc(-50% + 50px)) rotate(-20deg);
  }
  &:nth-child(7) {
    animation-delay: 4.8s;

    transform: translate(calc(-50% - 15px), calc(-50% + 65px)) rotate(170deg);
  }
  &:nth-child(8) {
    animation-delay: 5.2s;

    transform: translate(calc(-50% - 78px), calc(-50% + 12px)) rotate(-47deg);
  }
  &:nth-child(9) {
    animation-delay: 5.4s;

    transform: translate(calc(-50% - 21px), calc(-50% - 55px)) rotate(-12deg);
  }
  &:nth-child(10) {
    animation-delay: 6.4s;

    transform: translate(calc(-50% + 23px), calc(-50% + 58px)) rotate(8deg);
  }
}

/* Keyframes */

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  60% {
    opacity: 0;
  }
  100% {
    opacity: 1;
    cursor: pointer;
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
