<template>
<div class="row">
	<a href="../"><img src="../assets/img/header.png" alt="TAMSAT ALERT" class="col-auto"></a>
	<nav class="navbar navbar-expand navbar-light bg-light">
		<a class="navbar-brand">TAMSAT-ALERT</a>
		<div class="navbar-nav">
			<router-link class="nav-item nav-link active" :to="{ name: 'home'}">
				Home
			</router-link>
			<router-link class="nav-item nav-link active" :to="{ name: 'submitJob'}">
				Submit Job
			</router-link>
			<router-link class="nav-item nav-link active" :to="{ name: 'jobs'}">
				Job List
			</router-link>
		</div>
	</nav>
</div>
</template>

<script>
export default {}
</script>

<style scoped>
nav {
	width: 100%;
	margin-left: 15px;
	margin-right: 15px;
	/* height: 158px;
	background-image: url('../assets/img/header.png') */
}

img {
	margin-top: 5px;
	margin-bottom: 5px;
}

/* .main {
	height: 158px;
	width: 500px;
} */

.navbar-light {
	/* opacity: 0.9; */
}
</style>
