<template>
  <FormInput
    :id="id"
    v-model="valueProxy"
    :value="valueProxy"
    label="Phone"
    placeholder="+375 (XX) XXX-XX-XX"
    name="phone"
    type="tel"
    :has-error="error.isRequired || error.isIncorrect"
    @input="updateValue"
  >
    <small
      v-if="error.isRequired"
      class="helper-text invalid"
    >
      {{ error.errorMessage.isRequiredMessage }}
    </small>
    <small
      v-else-if="error.isIncorrect"
      class="helper-text invalid"
    >
      {{ error.errorMessage.isIncorrectMessage }}
    </small>
  </FormInput>
</template>

<script>
import FormInput from "@/components/atoms/FormInput/FormInput";

export default {
  name: "PhoneNumberInput",
  components: {FormInput},
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
    error: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data () {
    return {
      valueProxy: '',
      numberRegExp: /(\d{0,3})(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/
    }
  },
  watch: {
    value(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.valueProxy = this.value
      }
    }
  },
  methods: {
    updateValue () {
      if (this.valueProxy.length <= this.placeholder.length ) {
        const x = this.valueProxy.replace(/\D/g, '').match(this.numberRegExp)
        if (x[0]) {
          x[1] = '+375'
          this.valueProxy = !x[2] && x[0] ? x[1] + ' (' + x[0] + x[2]
              : x[1] + ' (' + x[2] + ') ' + x[3] + (x[4] ? '-' + x[4] : '') + (x[5] ? '-' + x[5] : '')
        }

          this.$emit('input', this.valueProxy)
      } else {
        this.valueProxy = this.value
      }
    }
  }
}
</script>

<style scoped>

</style>
