<template>
  <ul
    class="m-persons-table__row"
    :class="{'selected': isSelectedProxy}"
    @click="onClick"
  >
    <li class="m-persons-table__row__item">
      <Checkbox
        :is-checked="isSelectedProxy"
      />
    </li>
    <li class="m-persons-table__row__item">
      {{ person.name }}
    </li>
    <li class="m-persons-table__row__item">
      {{ person.email }}
    </li>
    <li class="m-persons-table__row__item">
      {{ person.phone }}
    </li>
  </ul>
</template>

<script>
import Checkbox from "@/components/atoms/Checkbox/Checkbox";
export default {
  name: "PersonsTableRow",
  components: {Checkbox},
  props: {
    person: {
      type: Object,
      default () {
        return {}
      }
    },
    isSelected: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isSelectedProxy: this.isSelected || false
    }
  },
  watch: {
    isSelected(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.isSelectedProxy = newVal
      }
    }
  },
  mounted() {
    if (this.isSelectedProxy) {
      this.$store.dispatch('persons/addSelectedPersonAction', this.person)
    }
  },
  methods: {
    onClick () {
      this.isSelectedProxy = !this.isSelectedProxy
      if (this.isSelectedProxy) {
        this.$store.dispatch('persons/addSelectedPersonAction', this.person)
      } else {
        this.$store.dispatch('persons/removeSelectedPersonAction', this.person)
      }
    }
  }
}

</script>

<style scoped>

</style>
