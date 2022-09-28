<template>
  <div>
    <input
      class="a-checkbox"
      type="checkbox"
      :checked="isChecked"
      @click="onclick"
    >
    <span class="a-checkbox-checkmark" />
  </div>
</template>

<script>
export default {
  name: 'Checkbox',
  props: {
    isChecked: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onclick (event) {
      this.$emit('click', event.target.checked)
    }
  }
}
</script>
