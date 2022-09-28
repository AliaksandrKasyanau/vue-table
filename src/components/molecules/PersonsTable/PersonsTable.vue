<template>
  <div class="m-persons-table">
    <div class="m-persons-table__wrapper">
      <ul class="m-persons-table__header">
        <li class="m-persons-table__header__item">
          <Checkbox
            :is-checked="isAllPersonsSelected"
            @click="onSelectAll"
          />
        </li>
        <li class="m-persons-table__header__item">
          Name
        </li>
        <li class="m-persons-table__header__item">
          Email
        </li>
        <li class="m-persons-table__header__item">
          Phone
        </li>
      </ul>
      <div
        v-if="!sortedPersons.length"
        class="m-persons-table__no-persons"
      >
        <h1>No persons</h1>
        <Button
          text="Load Persons"
          @click="fetchPersons"
        />
      </div>
      <div
        v-else
        class="m-persons-table__body"
      >
        <PersonTableRow
          v-for="person in sortedPersons"
          :key="person.id"
          :person="person"
          :is-selected="isAllPersonsSelected"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PersonTableRow from "@/components/molecules/PersonsTable/PersonsTableRow/PersonsTableRow";
import Checkbox from "@/components/atoms/Checkbox/Checkbox";
import Button from "@/components/atoms/Button/Button";

export default {
  name: "PersonsTable",
  components: {Button, Checkbox, PersonTableRow },
  props: {
    personsList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      sortedPersons: [],
      isAllPersonsSelected: false
    }
  },
  watch: {
    personsList() {
      if (this.personsList.length !== this.sortedPersons.length) {
        let newArr = [...this.personsList]
        this.sortedPersons = newArr.sort((a, b) => a.name.localeCompare(b.name))
      }
    }
  },
  methods: {
    fetchPersons () {
      this.$store.dispatch('persons/fetchAllPersonsAction')
      this.isAllPersonsSelected = false
    },
    onSelectAll (isChecked) {
      this.isAllPersonsSelected = isChecked
      this.$store.dispatch('persons/allPersonsToggleAction', this.isAllPersonsSelected)
    }
  }
}
</script>

<style scoped>

</style>
