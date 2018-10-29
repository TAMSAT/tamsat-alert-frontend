<template>
<div class="container">
	<div v-if="email && jobRef">
		<h5>Jobs for {{ email }} with reference "{{ jobRef }}"</h5>
		<p>
			Note that jobs will be deleted {{ daysAfterCompleted }} days after they have been completed, or {{ hoursAfterDownloaded }} hours after they have been downloaded for the first time.
		</p>
		<table class="table">
			<tr>
				<th>Description</th>
				<th>Status</th>
				<th>Time of status</th>
				<th>Link</th>
			</tr>
			<tr v-for="job in jobs">
				<td>{{ job.description }}</td>
				<td><span :title="job.error">{{ job.status }}</span></td>
				<td>{{ job.time }}</td>
				<td><a
					v-if="job.status=='COMPLETED' ||
						  job.status=='DOWNLOADED'"
					:href="getJobLink(job)">
						Download
					</a>
				</td>
			</tr>
		</table>
	</div>
	<div v-else>
		<!-- No details passed in query string -->
		<div class="row">
			<p>To see the list of jobs, please enter your details below</p>
		</div>
		<div class="form-group">
			<label for="email">Email address</label>
			<input type="email" :value="email" class="emailInput form-control" id="email" />
		</div>
		<div class="form-group">
			<label for="jobRefInput">Job reference</label>
			<input type="text" :value="jobRef" class="jobRefInput form-control" id="jobRefInput" />
		</div>
		<div class="text-center">
			<button class="btn btn-primary" @click="getDetails">Get job list</button>
		</div>
	</div>
	<!-- Space so that bottom doesn't go behind footer -->
	<br /><br /><br />
</div>
</template>

<script>
export default {
	props: ['apiUrl'],
	data() {
		return {
			// These are not bound - they just get populated on init
			email: this.$route.query.email,
			jobRef: this.$route.query.ref ? this.$route.query.ref : 'tamsat-alert',
			jobs: [],
			daysAfterCompleted: 7,
			hoursAfterDownloaded: 24
		}
	},
	methods: {
		getDetails() {
			if (!this.email || !this.jobRef) {
				let valid = false
				// The email address and job reference are not set
				// They may have been filled in in the input boxes

				// Check the input boxes
				let emailBox = this.$el.getElementsByClassName('emailInput')[0]
				let e = emailBox.value
				let j = this.$el.getElementsByClassName('jobRefInput')[0].value
				if (e && j) {
					// If both contain values, update the model...
					this.email = e
					this.jobRef = j
					// ...and the URL query params...
					this.$router.replace({
						query: {
							email: e,
							ref: j
						}
					})
					// Set the valid flag so that we make the query
					valid = true
				}

				if (!valid) {
					// We haven't managed to successfully get email/ref from inputs
					console.log('Not getting job list - we do not have email and job ref')
					return;
				}
			}
			// Request job list from the server
			fetch(`${this.apiUrl}jobs?email=${this.email}&ref=${this.jobRef}`)
				.then(resp => {
					if (resp.ok) {
						resp.json()
							.then(data => {
								// Job list received
								this.jobs = data.jobs
							})
					} else {
						resp.json()
							.then(errData => {
								// There has been a problem getting the job list
								// TODO redirect to an error page
							})
					}
				})
				.catch(err => {
					// This is a network error
					// TODO Redirect to error page, with a suitable message
				})
		},
		getJobLink(job) {
			if(job.status == 'COMPLETED' || job.status == 'DOWNLOADED') {
				return `${this.apiUrl}downloadResult?job_id=${job.job_id}`
			} else {
				return ''
			}
		}
	},
	mounted() {
		this.getDetails()
	}
}
</script>

<style scoped>
</style>
