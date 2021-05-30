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
        this.$axios.get(`${process.env.LOCALHOST_API}/vscode/fingerprint`)
        .then((response) => {
            this.fingerprint = JSON.stringify(response.data);
        })
        .catch((error) => {
            this.fingerprint = "error"
        })
    }
}
</script>

<style></style>