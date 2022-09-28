<template>
  <div class="o-persons-control">
    <AddPersonForm />
    <PersonsTable
      :persons-list="getPersons"
    />
    <div class="o-persons-control__footer">
      <Button
        text="Delete"
        :button-class="'danger'"
        @click="onRemove"
      />
      <div class="o-persons-control__footer-persons-search">
        <PersonSearchInput
          v-model="searchValue"
          :persons-list="personsList"
        />
        <Counter
          text="Persons count"
          :count-entity="getPersons"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AddPersonForm from "@/components/molecules/AddPersonForm/AddPersonForm";
import PersonsTable from "@/components/molecules/PersonsTable/PersonsTable";
import Button from "@/components/atoms/Button/Button";
import { mapState } from "vuex";
import PersonSearchInput from "@/components/molecules/PersonSearchInput/PersonSearchInput";
import Counter from "@/components/atoms/Counter/Counter";

export default {
  name: "PersonsControl",
  components: {
    PersonSearchInput,
    AddPersonForm,
    PersonsTable,
    Button,
    Counter
  },
  data() {
    return {
      searchValue: ''
    }
  },
  computed: {
    ...mapState('persons', ['personsList', 'filteredPersons']),

    getPersons () {
      return this.filteredPersons.length ? this.filteredPersons : this.personsList
    }
  },
  mounted() {
    this.$store.dispatch('persons/getPersonsAction')
  },
  methods: {
    onRemove () {
      if (this.filteredPersons) {
        this.searchValue = ''
      }
      this.$store.dispatch('persons/removePersonsAction', this.personsList)
    }
  }
}
</script>

<style scoped>

</style>
