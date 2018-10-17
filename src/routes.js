import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import Form from './components/Form.vue'
import JobList from './components/JobList.vue'
import Admin from './components/Admin.vue'

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home
		},
		{
			path: '/submitJob',
			name: 'submitJob',
			component: Form
		},
		{
			path: '/jobs',
			name: 'jobs',
			component: JobList
		},
		// {
		// 	path: '/admin',
		// 	name: 'admin',
		// 	component: Admin
		// }
	]
})
