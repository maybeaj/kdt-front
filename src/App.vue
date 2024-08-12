<template>
  <div class="container">
<nav class="navbar navbar-expand-lg navbar-light bg-light" style="background-color: #e3f2fd;">
  <a class="navbar-brand" href="#">KDT-MultiCampus BootCamp(feat. with jslim)</a>

  <ul class="navbar-nav mr-auto">
	<li class="nav-item active">
      <router-link class="nav-link" :to="{ name : 'Home'}">Home <span class="sr-only"></span></router-link>
    </li>
    <li class="nav-item active">
      <router-link class="nav-link" to="/todos">Todos <span class="sr-only"></span></router-link>
    </li>
    <li class="nav-item active">
      <router-link class="nav-link" :to="{ name : 'Login'}">Login<span class="sr-only"></span></router-link>
    </li>
  </ul>
</nav>
</div>
<router-view/>
</template>

<script>

export default {
  setup(){

  }
}
</script>

<style>

</style>
