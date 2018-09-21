<template>
<div id="app">
	<Header>
		TAMSAT ALERT
	</Header>
	<Form></Form>
</div>
</template>

<script>
import Header from './components/Header.vue'
import Form from './components/Form.vue'

export default {
	name: 'app',
	data() {
		return {
			msg: 'Welcome to Your Vue.js App'
		}
	},
	components: {
		Header,
		Form
	}
}
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	font-size: 0.9rem;
}
</style>
