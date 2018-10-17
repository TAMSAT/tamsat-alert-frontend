<template>
<div id="app" class="container">
	<Header></Header>
	<router-view :apiUrl="apiUrl"></router-view>
	<Footer></Footer>
</div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
	name: 'app',
	data() {
		return {
			apiUrl: 'api/'
		}
	},
	components: {
		Header,
		Footer
	}
}
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	font-size: 0.9rem;
	max-width: 500px;
	padding: 0;
}
</style>
