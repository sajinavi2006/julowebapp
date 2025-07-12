<template>
    <div>
        <label for="text"></label>
        <input type="text" name="text" id="text">
    </div>
</template>

<script>
export default {
  props: {
    type: String,
    hint: String
  }
};
</script>

<style scoped>
</style>
