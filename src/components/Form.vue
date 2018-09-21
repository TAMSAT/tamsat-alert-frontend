<template>
<form method="POST" action="tamsatAlertTask" onsubmit="return validateForm()">
	<fieldset class="form-group">
		<legend>Location</legend>
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
		<legend>Time</legend>
		<div class="form-group">
			<label for="forecastDate">Forecast Date</label>
			<input class="form-control" type="date" id="forecastDate" name="initDate" value="2010-12-01" required>
		</div>
		<div class="form-group">
			Period of interest
			<div class="row">
				<div class="col">
					<small class="form-text text-muted">Start</small>
					<input class="form-control" type="date" id="poiStart" name="poiStart" min="1970-01-01" max="1970-12-31" value="1970-11-01" required>
				</div>
				<div class="col">
					<small class="form-text text-muted">End</small>
					<input class="form-control" type="date" id="poiEnd" name="poiEnd" min="2009-01-01" max="2009-12-31" value="2009-02-28" required>
				</div>
			</div>
		</div>
	</fieldset>
	<fieldset class="form-group">
		<legend>Metric</legend>
		<div class="form-group">
			<div class="form-check">
				<input class="form-check-input" type="radio" id="cumRain" name="metric" value="cumRain" checked>
				<label class="form-check-label" for="cumRain">Cumulative Rainfall</label>
			</div>
			<!-- <div class="form-check">
				<input class="form-check-input" type="radio" id="soilmoisture" name="metric" value="soilMoisture">
				<label class="form-check-label" for="soilmoisture">Soil Moisture</label>
			</div>
			<div class="form-check">
				<input class="form-check-input" type="radio" id="wrsi" name="metric" value="wrsi">
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
					<input class="form-control" type="date" id="forecastStart" name="forecastStart" min="1970-01-01" max="1970-12-31" value="1970-01-01" required>
				</div>
				<div class="col">
					<small class="form-text text-muted">End</small>
					<input class="form-control" type="date" id="forecastEnd" name="forecastEnd" min="1970-01-01" max="1970-12-31" value="1970-09-30" required>
				</div>
			</div>
		</div>
		<div class="form-group">
			Tercile Probabilities
			<div class="row">
				<div class="col">
					<small class="form-text text-muted">Tercile 1</small>
					<input class="form-control" type="number" step="any" name="tercileLow" value="0">
				</div>
				<div class="col">
					<small class="form-text text-muted">Tercile 2</small>
					<input class="form-control" type="number" step="any" name="tercileMid" value="0">
				</div>
				<div class="col">
					<small class="form-text text-muted">Tercile 3</small>
					<input class="form-control" type="number" step="any" name="tercileHigh" value="1">
				</div>
			</div>
		</div>
		<div class="form-group">
			<label>Probability distribution for percentile calculations</label>
			<select class="form-control" name="stat">
				<option value="normal">Normal</option>
				<option value="ecdf">ECDF</option>
			</select>
		</div>
	</fieldset>
	<fieldset class="form-group">
		<legend>User details</legend>
		<div class="form-group">
			<label for="email">Email address</label>
			<input class="form-control" id="email" type="email" name="email" placeholder="Enter email" />
		</div>
		<div class="form-group">
			<label for="ref">Job/Group Reference&nbsp;<img src="../assets/img/info.png" title="This is an extra reference for the subset job, or a group of subset jobs.  You will need to provide this and your email address when you want to download the data.  You can use the same reference for different jobs.  It is there to prevent other people from downloading your data just by knowing your email address, but is not as secure as a password."/></label>
			<input class="form-control" id="ref" type="text" name="ref" value="tamsat-alert" />
		</div>
	</fieldset>
	<buttom class="btn btn-primary" type="submit">Submit Job</buttom>
</form>
</template>

<style scoped>
form {
	max-width: 500px;
	margin: auto;
}

.form-group {

}

fieldset {
    border: 1px groove #ddd !important;
    padding: 0 1.4em 0 1.4em;
    margin: 0 0 1.5em 0 !important;
    -webkit-box-shadow:  0px 0px 0px 0px #000;
            box-shadow:  0px 0px 0px 0px #000;
}

legend {
	width: inherit;
    font-size: 1.2em !important;
    font-weight: bold !important;
    text-align: left !important;
}
</style>
