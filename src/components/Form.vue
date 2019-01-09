<template>
<div>
	<form method="POST" action="tamsatAlertTask" @submit.prevent="submitForm">
		<fieldset class="form-group">
			<legend>Location&nbsp;
				<InfoBox :message="help.location" />
			</legend>
			<!-- The TAMSAT alert system takes -->
			<input class="form-control" type="hidden" name="locationType" value="point" />
			<div class="row form-group" id="pointSelection">
				<div class="col">
					<small class="form-text text-muted">Latitude</small>
					<input class="form-control" id="lat" type="number" name="lat" min=-35 max=39 value=0 step="any" />
				</div>
				<div class="col">
					<small class="form-text text-muted">Longitude</small>
					<input class="form-control" id="lon" type="number" name="lon" min=-20 max=52 value=0 step="any" />
				</div>
			</div>
		</fieldset>
		<fieldset class="form-group">
			<legend>Forecast Date&nbsp;
				<InfoBox :message="help.forecastDate" />
			</legend>
			<div class="form-group">
				<input class="form-control" type="date" id="forecastDate" name="initDate" v-model="forecastDate" required>
			</div>
		</fieldset>
		<fieldset class="form-group">
			<legend>Metric&nbsp;
				<InfoBox :message="help.metric" />
			</legend>
			<div class="form-group">
				<div class="form-check">
					<input class="form-check-input" type="radio" id="cumRain" name="metric" value="cumRain" checked v-model="metric" @change="metricChanged">
					<label class="form-check-label" for="cumRain">Cumulative Rainfall</label>
				</div>
				<!--
				<div class="form-check">
					<input class="form-check-input" type="radio" id="soilmoisture" name="metric" value="soilMoisture" v-model="metric" @change="metricChanged">
					<label class="form-check-label" for="soilmoisture">Soil Moisture</label>
				</div>
				<div class="form-check">
					<input class="form-check-input" type="radio" id="wrsi" name="metric" value="wrsi" v-model="metric">
					<label class="form-check-label" for="wrsi">WRSI</label>
				</div> -->
			</div>
			<div class="form-group">
				Period of interest&nbsp;
				<InfoBox :message="help.periodOfInterest" />
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
			<div class="form-group" v-if=showSM>
				<div class="form-group">
					<small class="form-text text-muted">Soil Type&nbsp;
					<InfoBox :message="help.soilType" /></small>
					<select class="form-control" name="soilType" value="clay">
						<option value="clay">Clay</option>
						<option value="silt">Silt</option>
						<option value="sand">Sand</option>
						<option value="loam">Loam</option>
						<option value="silty clay">Silty Clay</option>
						<option value="sandy clay">Sandy Clay</option>
						<option value="clay loam">Clay Loam</option>
						<option value="silty clay loam">Silty Clay Loam</option>
						<option value="sandy clay loam">Sandy Clay Loam</option>
						<option value="silt loam">Silt Loam</option>
						<option value="sandy loam">Sandy Loam</option>
						<option value="loamy sand">Loamy Sand</option>
					</select>
				</div>
			</div>
		</fieldset>
		<fieldset class="form-group">
			<legend>Meteorological Forecast</legend>
			<div class="form-group">
				<label>Meteorological forecast variable&nbsp;<InfoBox :message="help.forecastVar" /></label>
				<select class="form-control" name="fcVar" v-model="fcVar">
					<option value="precipitation">Precipitation</option>
					<option value="temperature">Air temperature</option>
				</select>
			</div>
			<div class="form-group">
				Forecast Region&nbsp;
				<InfoBox :message="help.forecastRegion" />
				<div class="row">
					<div class="col-4 offset-4">
						<small class="form-text text-muted">North</small>
						<input class="form-control region-bounds" type="number" value=10 name="fcLatMax" min=-35 max=39 step="any">
					</div>
				</div>
				<div class="row">
					<div class="col-4">
						<small class="form-text text-muted">West</small>
						<input class="form-control region-bounds" type="number" value=0 name="fcLonMin" min=-20 max=52 step="any">
					</div>
					<div class="col-4 offset-4">
						<small class="form-text text-muted">East</small>
						<input class="form-control region-bounds" type="number" value=10 name="fcLonMax" min=-20 max=52 step="any">
					</div>
				</div>
				<div class="row">
					<div class="col-4 offset-4">
						<small class="form-text text-muted">South</small>
						<input class="form-control region-bounds" type="number" value=0 name="fcLatMin" min=-35 max=39 step="any">
					</div>
				</div>
			</div>
			<div class="form-group">
				Forecast period&nbsp;
				<InfoBox :message="help.forecastPeriod" />
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
				<label>Probability distribution for percentile calculations&nbsp;<InfoBox :message="help.probDist" /></label>
				<select class="form-control" name="stat" v-model="statType">
					<option value="normal">Gaussian</option>
					<option value="ecdf">ECDF</option>
				</select>
			</div>
		</fieldset>
		<fieldset class="form-group">
			<legend>User details</legend>
			<div class="form-group">
				<label for="email">Email address&nbsp;<InfoBox :message="help.email" /></label>
				<input class="form-control" id="email" type="email" name="email" placeholder="Enter email" v-model="email" required />
			</div>
			<div class="form-group">
				<label for="ref">Job/Group Reference&nbsp;<InfoBox :message="help.ref" /></label>
				<input class="form-control" id="ref" type="text" name="ref" v-model="jobRef" required/>
			</div>
		</fieldset>
		<div class="text-center">
			<button class="btn btn-primary" type="submit">Submit Job</button>
		</div>
		<!-- Space so that button doesn't go behind footer -->
		<br /><br /><br />
	</form>
	<div class="dialog" v-show="submitting || submitted || error">
		<div class="modal-dialog" role="document" v-show="submitted">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">Job submitted</h5>
					<button type="button" class="close" @click="submitted=false">
						<span>&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<p>Job successfully submitted to the TAMSAT-ALERT server.</p>
					<p>You will receive an email when your job is completed. If you wish to check on the progress, or download previous jobs, click the button below.</p>
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
		<div class="modal-dialog" role="document" v-show="error">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">Problem submitting job</h5>
					<button type="button" class="close" @click="error=false">
						<span>&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<div v-if="errorMessage">
						<p>The TAMSAT ALERT server has experienced an error. Message from the server:</p>
						<pre>{{errorMessage}}</pre>
					</div>
					<div v-else>
						<p>The TAMSAT ALERT server is currently experiencing a problem.</p>
						<p>Please retry submitting your job again later.</p>
					</div>
					<p>If you continue to experience problems, please <a href="mailto:tamsat@reading.ac.uk">contact</a> the TAMSAT group.</p>

				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" @click="error=false">
							Close
					</button>
				</div>
			</div>
		</div>
		<div v-show="!submitted && !error">
			<img class="center" src="../assets/loading.gif" />
		</div>
	</div>
</div>
</template>

<script>
import DayMonthPicker from './DayMonthPicker.vue'
import InfoBox from './InfoBox.vue'
import help from '../helpstrings'

export default {
	props: ['apiUrl'],
	data() {
		return {
			poiStartDayMonth: {
				day: 1,
				month: 1
			},
			poiEndDayMonth: {
				day: 31,
				month: 12
			},
			metric: 'cumRain',
			fcVar: 'precipitation',
			fcStartDayMonth: {
				day: 1,
				month: 1
			},
			fcEndDayMonth: {
				day: 31,
				month: 12
			},
			statType: 'normal',
			email: '',
			jobRef: 'tamsat-alert',

			help,

			// Need 2-way bindings to update vars for form validation
			fDate: new Date(),
			t1: 0.33,
			t2: 0.33,
			t3: 0.33,

			// State vars for controlling layout
			submitting: false,
			submitted: false,
			error: false,
			errorMessage: '',
			showSM: false
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
		metricChanged(e) {
			this.showSM = e.target.value === 'soilMoisture'
		},
		submitForm(e) {
			let failed = false

			if(this.showSM) {
				window.alert('Soil Moisture is not currently implemented.  Please run a cumulative rainfall task')
				failed = true
			}

			// Validate that terciles add up to 1 (ish)
			if (Math.abs(this.t1 + this.t2 + this.t3 - 1.0) > 0.015) {
				failed = true
				document.getElementById('terciles').setCustomValidity('The 3 terciles must add up to 1')
			}
			if (!failed) {
				const today = new Date()
				let ok = true
				if (this.fDate.getYear() === today.getYear() &&
					this.fDate.getMonth() === today.getMonth() &&
					this.fDate.getDate() === today.getDate()) {
					// Forecast date is set to today
					ok = window.confirm('The forecast date is set to today - due to data latency issues, TAMSAT ALERT will use the most recent possible date, which will most likely not be the selected date.  Continue?')
				}

				// Form validates OK.  Send the POST request
				if (ok) {
					this.submitting = true
					fetch(`${this.apiUrl}tamsatAlertTask`, {
							method: 'POST',
							body: new FormData(this.$el.getElementsByTagName('form')[0])
						})
						.then(resp => {
							this.submitting = false
							if (resp.ok) {
								resp.json()
									.then(data => {
										this.submitted = true
									})
							} else {
								// There is a problem with the request
								this.error = true
								resp.json()
									.then(errorJson => {
										this.errorMessage = errorJson.message
										console.error('Error with request', errorJson)
									})
							}
						})
						.catch(err => {
							this.error = true
							console.error('Error sending request', err)
						})
				}

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
		DayMonthPicker,
		InfoBox
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

.center {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	margin: auto;
	/* width: 100%;
	height: 100%; */
}

.region-bounds {
	margin: 5px;
}
</style>
