<template>
  <div class="a-form-input">
    <label
      v-if="label"
      :for="id"
      class="a-form-input__label"
    >
      {{ label }}
    </label>
    <input
      :id="id"
      :value="value"
      :placeholder="placeholder"
      :type="type"
      class="a-form-input__input"
      :class="{ 'a-form-input__invalid': hasError }"
      @input="onInput"
    >
    <slot />
  </div>
</template>

<script>

export default {
  name: 'FormInput',
  props: {
    id: {
      type: String,
      default () {
        return `${Math.random().toString(16).slice(2)}`
      }
    },
    type: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    pattern: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    hasError: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onInput (event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>

<style />
