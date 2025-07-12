<template>
    <div>
        <input type="checkbox" name="checkbox" id="checkbox">
        <label for="checkbox">{{label}}</label>
    </div>
</template>

<script>
export default { props: { label: String } };
</script>
