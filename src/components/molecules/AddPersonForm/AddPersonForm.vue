<template>
  <form class="m-add-person-form">
    <FormInput
      v-model="$v.name.$model"
      label="Full Name"
      placeholder="Enter your name"
      name="fullName"
      type="text"
      :has-error="nameError.isRequired || nameError.isIncorrect"
    >
      <small
        v-if="nameError.isRequired"
        class="helper-text invalid"
      >{{ nameError.errorMessage.isRequiredMessage }}</small>
      <small
        v-else-if="nameError.isIncorrect"
        class="helper-text invalid"
      >{{ nameError.errorMessage.isIncorrectMessage }}</small>
    </FormInput>
    <FormInput
      v-model.trim="$v.email.$model"
      :value="email"
      label="Email"
      placeholder="Enter your email"
      name="email"
      type="email"
      :has-error="emailError.isRequired || emailError.isIncorrect"
    >
      <small
        v-if="emailError.isRequired"
        class="helper-text invalid"
      >{{ emailError.errorMessage.isRequiredMessage }}</small>
      <small
        v-else-if="emailError.isIncorrect"
        class="helper-text invalid"
      >{{ emailError.errorMessage.isIncorrectMessage }}</small>
    </FormInput>
    <PhoneNumberInput
      v-model.trim="$v.phone.$model"
      :value="phone"
      label="Phone"
      placeholder="+375 (XX) XXX-XX-XX"
      name="phone"
      :error="phoneError"
    />
    <Button
      type="submit"
      text="Add"
      @click="formSubmit"
    />
  </form>
</template>

<script>
import { helpers, required, minLength, maxLength, email } from 'vuelidate/lib/validators'

import Button from "@/components/atoms/Button/Button";
import FormInput from "@/components/atoms/FormInput/FormInput";
import PhoneNumberInput from "@/components/molecules/PhoneNumberInput/PhoneNumberInput";

const containsTwoNames = (param) =>
    helpers.withParams(
        { type: 'contains', value: param },
        (value) => !helpers.req(value) || value.indexOf(param) >= 2
    )

export default {
  name: "AddPersonForm",
  components: {
    FormInput,
    Button,
    PhoneNumberInput
  },
  data () {
    return {
      name: '',
      email: '',
      phone: ''
    }
  },
  validations: {
      name: {
        required,
        minLength: minLength(5),
        hasTwoNames: containsTwoNames(' ')
      },
      email: {
        required,
        email,
        minLength: minLength(4)
      },
      phone: {
        required,
        minLength: minLength(19),
        maxLength: maxLength(19)
      }
  },
  computed: {
    nameError () {
      return {
        isRequired: (this.$v.name.$dirty && !this.$v.name.required),
        isIncorrect: (this.$v.name.$dirty && !this.$v.name.required) ||
                     (this.$v.name.$dirty && !this.$v.name.hasTwoNames) ||
                     (this.$v.name.$dirty && !this.$v.name.minLength),
        errorMessage: {
          isRequiredMessage: 'This field is required',
          isIncorrectMessage: 'Please enter the correct full name'
        }
      }
    },
    emailError () {
      return {
        isRequired: (this.$v.email.$dirty && !this.$v.email.required),
        isIncorrect: (this.$v.email.$dirty && !this.$v.email.required) || (this.$v.email.$dirty && !this.$v.email.email),
        errorMessage: {
          isRequiredMessage: 'This field is required',
          isIncorrectMessage: 'Please enter the correct email'
        }
      }
    },
    phoneError () {
      return {
        isRequired: (this.$v.phone.$dirty && !this.$v.phone.required),
        isIncorrect: (this.$v.phone.$dirty &&
                (!this.$v.phone.required ||
                !this.$v.phone.minLength ||
                !this.$v.phone.maxLength) ||
                this.$v.phone.$error),
        errorMessage: {
          isRequiredMessage: 'This field is required',
          isIncorrectMessage: 'Please enter the correct phone'
        }
      }
    }

  },
  methods: {
    formSubmit () {
      const formData = {
        id: `${Math.random().toString(16).slice(2)}`,
        name: this.name,
        email: this.email,
        phone: this.phone
      }
      if (this.$v.$invalid) {
        this.$v.$touch()
      } else {
        this.$store.dispatch('persons/addPersonAction', formData)
        this.name = ''
        this.email = ''
        this.phone = ''
        this.$v.$reset()
      }
    }
  }
}
</script>

<style scoped>

</style>
