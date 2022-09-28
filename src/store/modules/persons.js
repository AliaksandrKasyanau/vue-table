import {
    SET_PERSONS,
    ADD_PERSON,
    REMOVE_PERSON,
    ADD_SELECTED_PERSON,
    REMOVE_SELECTED_PERSON,
    SELECT_ALL_PERSONS,
    UNSELECT_ALL_PERSONS,
    REMOVE_ALL_PERSONS,
    FILTER_PERSONS,
    REMOVE_FILTERED_PERSON
} from '../mutation-types'

export default {
    namespaced: true,
    state: {
        personsList: [],
        selectedPersons: [],
        filteredPersons: []
    },
    mutations: {
        [SET_PERSONS]: (state, persons) => {
            state.personsList = persons
        },
        [ADD_PERSON] (state, person) {
            state.personsList.push(person)
        },
        [REMOVE_PERSON] (state, person) {
            state.personsList.splice(state.personsList.indexOf(state.personsList.find(el => el.id === person.id)), 1);
        },
        [ADD_SELECTED_PERSON] (state, person) {
            state.selectedPersons.push(person)
        },
        [REMOVE_SELECTED_PERSON] (state, index) {
            state.selectedPersons.splice(index, 1)
        },
        [SELECT_ALL_PERSONS] (state) {
            state.selectedPersons = state.personsList
        },
        [UNSELECT_ALL_PERSONS] (state) {
            state.selectedPersons = []
        },
        [REMOVE_ALL_PERSONS] (state) {
            state.personsList = []
            state.selectedPersons = []
            state.filteredPersons = []
        },
        [FILTER_PERSONS] (state, persons) {
            state.filteredPersons = persons
        },
        [REMOVE_FILTERED_PERSON] (state, index) {
            state.filteredPersons.splice(index, 1)
        }
    },
    actions: {
         fetchAllPersonsAction ({ commit, state }) {
            fetch('https://jsonplaceholder.typicode.com/users')
                .then((response) => response.json())
                .then(data => commit(SET_PERSONS, data))
                .then(() => localStorage.setItem('persons', JSON.stringify(state.personsList)))
        },
        getAllPersonsFromStorageAction ({ commit }) {
            commit(SET_PERSONS, JSON.parse(localStorage.getItem('persons')))
        },
        getPersonsAction ({ dispatch }) {
             const personsListFromLocalStorage = JSON.parse(localStorage.getItem('persons'))
            if (personsListFromLocalStorage) {
                if (personsListFromLocalStorage.length) {
                    console.log('♻️ Loaded from Local Storage')
                    dispatch('getAllPersonsFromStorageAction')
                } else {
                    console.log('🚀 Loaded from from JSON Placeholder')
                    dispatch('fetchAllPersonsAction')
                }
            } else dispatch('fetchAllPersonsAction')
        },
        addPersonAction ({ commit, state }, person) {
            commit(ADD_PERSON, person)
            localStorage.setItem('persons', JSON.stringify(state.personsList))
        },
        removePersonsAction ({ commit, dispatch, state }) {
             if (state.selectedPersons.length === state.personsList.length) {
                 commit(REMOVE_ALL_PERSONS)
             } else {
                 state.selectedPersons.forEach(selectedPerson => {
                     const person = state.personsList.find(el => el.id === selectedPerson.id)
                     if (person) {
                         commit(REMOVE_PERSON, person)
                         dispatch('removeFilteredPersonAction', person)
                     }
                 })
                 commit (UNSELECT_ALL_PERSONS)
             }

            localStorage.setItem('persons', JSON.stringify(state.personsList))
        },
        addSelectedPersonAction ({ commit, state }, person) {
            if (!state.selectedPersons.some(el => el.id === person.id)) {
                commit(ADD_SELECTED_PERSON, person)
            }
        },
        removeSelectedPersonAction ({ commit, state }, person) {
            commit(REMOVE_SELECTED_PERSON, state.selectedPersons.findIndex(obj => obj.id === person.id))
        },
        allPersonsToggleAction ({ commit }, isSelected) {
            isSelected ? commit(SELECT_ALL_PERSONS) : commit(UNSELECT_ALL_PERSONS)
        },
        removeFilteredPersonAction ({ commit, state }, person) {
            commit(REMOVE_FILTERED_PERSON, state.filteredPersons.findIndex(obj => obj.id === person.id))
        }
    }
}
