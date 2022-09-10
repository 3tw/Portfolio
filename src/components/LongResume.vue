<template>
  <div :class="[animationState, 'main-wrap']">
    <div class="container">tset</div>
  </div>
</template>

<script>
export default {
  name: "ShortResume",
  props: {
    animationTriggered: Boolean,
    animationState: String,
  },
  data() {
    return {};
  },
  watch: {
    animationTriggered: function () {
      this.initText.status = this.animationTriggered ? "show" : "hidden";
    },
  },
  methods: {
    showTarget(target) {
      this[target].status = "show";
    },
    getGitHubUser() {
      fetch(this.gitHubUser)
        .then((response) => response.json())
        .then((data) => {
          this.bio.location = data.location;
          this.url.gitHub = data.html_url;
        })
        .catch(function () {});
    },
  },
  mounted() {},
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
