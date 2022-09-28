<template>
  <component
    :is="componentName"
  >
    {{ `${text}: ${getCount}` }}
  </component>
</template>

<script>
export default {
  name: "Counter",
  props: {
    componentName: {
      type: String,
      default: 'p'
    },
    text: {
      type: String,
      default: ''
    },
    countEntity: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    getCount () {
      return this.countEntity.length
    }
  }
}
</script>

<style scoped>

</style>
