<script>
import { h } from 'vue'

export default {
  name: 'Indicator',
  data() {
    return {
      inidicatorsAreVisible: true,
    }
  },
  render: function () {
    return h(
      'div',
      {
        class: [
          'indicators',
          { 'indicators-visible': this.inidicatorsAreVisible },
        ],
      },
      Array.apply(null, { length: 40 }).map((item, i) => {
        return h(
          'span',
          {
            class: ['indicator'],
            style: [
              { animationDelay: this.calculateDelay(i+1) },
              { transform: this.transformElement() },
            ],
            onClickOnce: this.indicatorClicked,
          },
          'click'
        )
      })
    )
  },

  methods: {
    hideIndicators() {
      this.inidicatorsAreVisible = false
    },
    indicatorClicked() {
      this.hideIndicators()
      this.$emit('indicator-clicked', true)
    },
    getRandomFloat(correction) {
      return Math.round((Math.random() - correction) * 10) / 10
    },
    getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max))
    },
    calculateDelay(i) {
      const indexDelay = i/ i**2
      const totalDelay = 1.2 + indexDelay + this.getRandomFloat(0.2)
      return totalDelay + 's'
    },
    transformElement() {
      let operation = this.getRandomFloat(0) > 0.5 ? '-' : '+'
      let operation2 = this.getRandomFloat(0) > 0.5 ? '-' : '+'
      let operation3 = this.getRandomFloat(0) > 0.5 ? '-' : '+'
      let x = this.getRandomInt(50)
      let y = this.getRandomInt(50)
      let degree = this.getRandomInt(50)
      return `translate(calc(-50% ${operation} ${x}vw), calc(-50% ${operation2} ${y}vh)) rotate(${operation3}${degree}deg)`
    },
  },
}
</script>

<style lang='scss'>
/* Floating texts */

.indicator {
  position: fixed;
  bottom: 0;
  right: 0;
  width: auto;
  text-align: right;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #ffffffa1;
  -webkit-text-fill-color: transparent;
  color: #111;
  text-transform: uppercase;
  font-size: 24px;
  line-height: 24px;
  padding: 10px;
  opacity: 0;
}

.indicators.indicators-visible {
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
</style>
