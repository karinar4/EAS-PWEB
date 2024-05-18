<template>
  <button @click="home">Go!</button>
</template>

<script>
export default {
  name: 'LandingPage',
  methods: {
    home() {
      this.$router.push('/home');
    }
  }
}
</script>