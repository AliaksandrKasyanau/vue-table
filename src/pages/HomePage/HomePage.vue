<template>
  <div class="home-page">
    <PersonsControl />
  </div>
</template>

<script>
import PersonsControl from '@/components/organisms/PersonsControl/PersonsControl'

export default {
  name: 'HomeView',
  components: {
    PersonsControl
  }
}
</script>
