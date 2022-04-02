<template>
  <v-img
    class="pulse"
    :width="$vuetify.breakpoint.width"
    :height="$vuetify.breakpoint.height"
    :lazy-src="src"
    eager
    alt="baseColor.png from material package"
  >
    <template v-slot:placeholder>
      <!-- don not use 'fill-height' class here cause problems on matlib.stvcis -->
      <v-row
        class="align-center justify-center"
        style="height: 100%"
      >
        <div style="min-width: 70%">
          <v-progress-linear
            height="25"
            rounded
            :value="isLoaded ? 100 : Math.ceil(100 / steps.length) * stepNumber"
          >
            <template v-slot:default>
              <h3 class="ma-5 text-center">
                {{ steps[stepNumber] }}
              </h3>
            </template>
          </v-progress-linear>
        </div>
      </v-row>
    </template>
  </v-img>
</template>

<script>
export default {
  name: "LoadingScreen",

  props: {
    steps: {
      type: Array,
      default: new Array()
    },
    src: {
      type: String
    }
  },

  data() {
    return {
      stepNumber: 1
    }
  },

  methods: {
    increment() { this.stepNumber++ },

    reset() { this.stepNumber = 1 }
  },

  computed: {
    isLoaded() { return this.stepNumber === this.steps.length }
  }
}
</script>

<style lang="scss">

.pulse.v-image .v-image__image {
  filter: blur(10px) !important;

  &::after {
    content: '';
    position: absolute;
    height: 140%;
    top: -40%; left: 0; bottom: 0; right: 0;
    animation: pulse 1s infinite alternate;
    background: radial-gradient(farthest-side at 50% -50%, transparent 50%, black 150%) no-repeat;
  }
}

@keyframes pulse {
  to {
    top: 0;
  }
}

</style>