<template>
  <button
    :type="type"
    class="a-button"
    :class="buttonClass"
    @click.prevent="$emit('click')"
  >
    {{ text }}
  </button>
</template>
<script>
export default {
  name: "Button",
  props: {
    type: {
      type: String,
      default: ''
    },
    buttonClass: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    }
  }
}
</script>
