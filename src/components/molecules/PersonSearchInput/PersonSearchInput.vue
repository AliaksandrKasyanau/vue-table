<template>
  <FormInput
    :id="id"
    v-model="valueProxy"
    :value="valueProxy"
    :label="label"
    placeholder="Search for persons"
    name="search"
    type="tel"
    @input="updateValue"
  />
</template>

<script>
import FormInput from "@/components/atoms/FormInput/FormInput";
import { FILTER_PERSONS } from '@/store/mutation-types'

export default {
  name: "PersonSearchInput",
  components: { FormInput },
  props: {
    id: {
      type: String,
      default () {
        return `${Math.random().toString(16).slice(2)}`
      }
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    personsList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      valueProxy: '',
      filteredPersons: []
    }
  },
  watch: {
    value(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.valueProxy = this.value
        this.filteredPersons = this.getFilteredPersons()
        this.$store.commit(`persons/${FILTER_PERSONS}`, this.filteredPersons)
      }
    }
  },
  methods: {
    updateValue () {
      this.$emit('input', this.valueProxy)
      this.valueProxy = this.value
    },
    getFilteredPersons () {
      let arr = [...this.personsList]
          return arr.filter(person => {
        return person.name.toLowerCase().includes(this.valueProxy.toLowerCase())
      })
    }
  }

}
</script>

<style scoped>

</style>
