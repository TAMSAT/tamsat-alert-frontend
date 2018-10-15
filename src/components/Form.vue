<template>
<div>
	<form method="POST" action="tamsatAlertTask" @submit.prevent="submitForm">
		<fieldset class="form-group">
			<legend>Location</legend>
			<!-- The TAMSAT alert system takes -->
			<input class="form-control" type="hidden" name="locationType" value="point" />
			<div class="row form-group" id="pointSelection">
				<div class="col">
					<small class="form-text text-muted">Latitude</small>
					<input class="form-control" id="lat" type="number" name="lat" min=-35 max=39 v-model="latitude" step="any" />
				</div>
				<div class="col">
					<small class="form-text text-muted">Longitude</small>
					<input class="form-control" id="lon" type="number" name="lon" min=-20 max=52 v-model="longitude" step="any" />
				</div>
			</div>
		</fieldset>
		<fieldset class="form-group">
			<legend>Time</legend>
			<div class="form-group">
				<label for="forecastDate">Forecast Date</label>
				<input class="form-control" type="date" id="forecastDate" name="initDate" v-model="forecastDate" required>
			</div>
			<div class="form-group">
				Period of interest
				<div class="row">
					<div class="col">
						<small class="form-text text-muted">Start</small>
						<DayMonthPicker name-day="poiStartDay" name-month="poiStartMonth" v-model="poiStartDayMonth"></DayMonthPicker>
					</div>
					<div class="col">
						<small class="form-text text-muted">End</small>
						<DayMonthPicker name-day="poiEndDay" name-month="poiEndMonth" v-model="poiEndDayMonth"></DayMonthPicker>
					</div>
				</div>
			</div>
		</fieldset>
		<fieldset class="form-group">
			<legend>Metric</legend>
			<div class="form-group">
				<div class="form-check">
					<input class="form-check-input" type="radio" id="cumRain" name="metric" value="cumRain" checked v-model="metric">
					<label class="form-check-label" for="cumRain">Cumulative Rainfall</label>
				</div>
				<!-- <div class="form-check">
					<input class="form-check-input" type="radio" id="soilmoisture" name="metric" value="soilMoisture" v-model="metric">
					<label class="form-check-label" for="soilmoisture">Soil Moisture</label>
				</div>
				<div class="form-check">
					<input class="form-check-input" type="radio" id="wrsi" name="metric" value="wrsi" v-model="metric">
					<label class="form-check-label" for="wrsi">WRSI</label>
				</div> -->
			</div>
		</fieldset>
		<fieldset class="form-group">
			<legend>Meteorological Forecast</legend>
			<div class="form-group">
				Forecast period
				<div class="row">
					<div class="col">
						<small class="form-text text-muted">Start</small>
						<DayMonthPicker name-day="fcStartDay" name-month="fcStartMonth" v-model="fcStartDayMonth"></DayMonthPicker>
					</div>
					<div class="col">
						<small class="form-text text-muted">End</small>
						<DayMonthPicker name-day="fcEndDay" name-month="fcEndMonth" v-model="fcEndDayMonth"></DayMonthPicker>
					</div>
				</div>
			</div>
			<div class="form-group">
				Tercile Probabilities
				<div class="row">
					<div class="col">
						<small class="form-text text-muted">Tercile 1</small>
						<input class="form-control" type="number" step="0.01" name="tercileLow" v-model="t1" id="terciles">
					</div>
					<div class="col">
						<small class="form-text text-muted">Tercile 2</small>
						<input class="form-control" type="number" step="0.01" name="tercileMid" v-model="t2">
					</div>
					<div class="col">
						<small class="form-text text-muted">Tercile 3</small>
						<input class="form-control" type="number" step="0.01" name="tercileHigh" v-model="t3">
					</div>
				</div>
			</div>
			<div class="form-group">
				<label>Probability distribution for percentile calculations</label>
				<select class="form-control" name="stat" v-model="statType">
					<option value="normal">Normal</option>
					<option value="ecdf">ECDF</option>
				</select>
			</div>
		</fieldset>
		<fieldset class="form-group">
			<legend>User details</legend>
			<div class="form-group">
				<label for="email">Email address</label>
				<input class="form-control" id="email" type="email" name="email" placeholder="Enter email" v-model="email" required />
			</div>
			<div class="form-group">
				<label for="ref">Job/Group Reference&nbsp;<img src="../assets/img/info.png" title="This is an extra reference for the subset job, or a group of subset jobs.  You will need to provide this and your email address when you want to download the data.  You can use the same reference for different jobs.  It is there to prevent other people from downloading your data just by knowing your email address, but is not as secure as a password."/></label>
				<input class="form-control" id="ref" type="text" name="ref" v-model="jobRef" required/>
			</div>
		</fieldset>
		<div class="text-center">
			<button class="btn btn-primary" type="submit">Submit Job</button>
		</div>
		<!-- Space so that button doesn't go behind footer -->
		<br /><br /><br />
	</form>
	<div class="dialog" v-show="submitted">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">Job submitted</h5>
					<button type="button" class="close" @click="submitted=false">
          				<span>&times;</span>
        			</button>
				</div>
				<div class="modal-body">
					<p>Job successfully submitted to the TAMSAT-ALERT server.</p>
					<p>You will receive an email when your job is completed.  If you wish to check on the progress, or download previous jobs, click the button below.</p>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" @click="goToJobs">
							Go to job list
					</button>
					<button type="button" class="btn btn-secondary" @click="submitted=false">
							Close
					</button>
				</div>
			</div>
		</div>
	</div>
</div>
</template>

<script>
import DayMonthPicker from './DayMonthPicker.vue'

export default {
	data() {
		return {
			latitude: 0,
			longitude: 0,
			fDate: new Date(),
			poiStartDayMonth: {
				day: 1,
				month: 1
			},
			poiEndDayMonth: {
				day: 31,
				month: 12
			},
			metric: 'cumRain',
			fcStartDayMonth: {
				day: 1,
				month: 1
			},
			fcEndDayMonth: {
				day: 31,
				month: 12
			},
			t1: 0.33,
			t2: 0.33,
			t3: 0.33,
			statType: 'normal',
			email: '',
			jobRef: 'tamsat-alert',

			submitted: false,
			apiUrl: 'api/'
		}
	},
	computed: {
		forecastDate: {
			get() {
				return this.fDate.toISOString().substring(0, 10)
			},
			set(newVal) {
				this.fDate = new Date(Date.parse(newVal))
			}
		}
	},
	methods: {
		submitForm(e) {
			let failed = false
			// Validate that terciles add up to 1 (ish)
			if (Math.abs(this.t1 + this.t2 + this.t3 - 1.0) > 0.015) {
				failed = true
				document.getElementById('terciles').setCustomValidity('The 3 terciles must add up to 1')
			}
			if (!failed) {
				// Form validates OK.  Send the POST request
				fetch(`${this.apiUrl}tamsatAlertTask`, {
						method: 'POST',
						body: new FormData(this.$el.getElementsByTagName('form')[0])
					})
					.then(resp => {
						if (resp.ok) {
							resp.json()
								.then(data => {
									this.submitted = true
								})
						} else {
							// There is a problem with the request
							resp.json()
								.then(errorJson => {
									// TODO redirect to the error page, passing args
									console.log(errorJson)
								})
						}
					})

			}
		},
		goToJobs() {
			this.$router.push({
				name: 'jobs',
				query: {
					email: this.email,
					ref: this.jobRef
				}
			})
		}
	},
	components: {
		DayMonthPicker
	}
}
</script>

<style scoped>
form {
	/* margin: auto; */
}

fieldset {
	border: 1px solid #aaa;
	border-radius: 3px;
	padding: 0 1.4em 0 1.4em;
	margin: 0 0 0.5em 0;
}

legend {
	width: inherit;
	font-size: 1.2em !important;
	font-weight: bold !important;
	text-align: lef
}

.dialog {
	position: fixed;
	z-index: 2000;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.3);
}
</style>
