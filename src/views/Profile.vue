<template>
<!-- container -->
  <div class="container">
    <header class="jumbotron">
      <h3>
        <strong>{{ currentUser.username }}</strong> Profile
      </h3>
      <p>
        <strong>Id</strong>
        {{ currentUser.id }}
      </p>
      <p>
        <strong>Email</strong>
        {{ currentUser.email }}
      </p>
    </header>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "Profile",
  computed: {
    currentUser(){
      return this.$store.state.user;
    }
  },
  // 화면이 뜨자마자 실행되는 이벤트
  mounted() {
    if (!this.currentUser){
      this.$router.push("/login");
    }
  }
}
</script>

<style scoped>

</style>