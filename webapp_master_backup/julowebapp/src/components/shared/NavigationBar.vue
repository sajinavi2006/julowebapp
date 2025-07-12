<template>
  <div>
    <v-app>
      <v-toolbar app>This is navigation</v-toolbar>
      <v-navigation-drawer app></v-navigation-drawer>
    </v-app>
  </div>
</template>

<script>
export default {
  created() {
    console.log("navigation bar");
  }
};
</script>

<style scoped>
</style>
