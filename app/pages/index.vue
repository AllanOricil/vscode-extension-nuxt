<template>
  <div>Fingerprint: {{ fingerprint }} </div>
</template>

<script>
export default {
    data: () => {
        return {
            fingerprint: null,
        }
    },
    mounted(){
        this.$axios.get(`${process.env.LOCALHOST_API}/vscode/fingerprint`).then((response) => {
            this.fingerprint = response.data;
        })
    }
}
</script>

<style></style>