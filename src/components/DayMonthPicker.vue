<template>
<div class="date-picker form-row">
	<select class="form-control col"
		   ref="dayPicker"
		   :value="value.day"
		   @input="updateDate" />
	<select class="form-control col"
			ref="monthPicker"
			:value="value.month"
			@input="updateDate"
			@change="monthChanged">
		<option value="1">Jan</option>
		<option value="2">Feb</option>
		<option value="3">Mar</option>
		<option value="4">Apr</option>
		<option value="5">May</option>
		<option value="6">Jun</option>
		<option value="7">Jul</option>
		<option value="8">Aug</option>
		<option value="9">Sep</option>
		<option value="10">Oct</option>
		<option value="11">Nov</option>
		<option value="12">Dec</option>
	</select>
</div>
</template>

<script>
// The number of days in each month
const N_DAYS=[31,29,31,30,31,30,31,31,30,31,30,31]

export default {
	props: ['value'],

	methods: {
		updateDate() {
			this.$emit('input', {
				day: +this.$refs.dayPicker.value,
				month: +this.$refs.monthPicker.value
			})
		},
		monthChanged() {
			let sel = this.$refs.dayPicker
			sel.options.length = 0
			let daysInMonth = N_DAYS[this.$refs.monthPicker.value-1]
			let currentDay = this.value.day
			if(currentDay > daysInMonth) {
				currentDay = daysInMonth
			}
			Array.from({length: daysInMonth}, (x,i) => i+1).forEach(dayNumber => {
				let option = document.createElement('option')
				option.value = dayNumber
				option.text = dayNumber
				sel.appendChild(option)
			})
			this.$refs.dayPicker.selectedIndex = currentDay - 1
			this.updateDate()
		}
	},
	mounted() {
		// Validation of initial values.
		// No need to validate if day is too large, since this will
		// happen in the monthChanged() method anyway
		if(this.value.day < 1) {
			this.value.day = 1
		}
		if(this.value.month < 1) {
			this.value.month = 1
		}
		if(this.value.month > 12) {
			this.value.month = 12
		}
		// Trigger the month changed method, to populate the list of days correctly
		this.monthChanged()
	}

};
</script>

<style>
.date-picker {
	margin: 0;
}
</style>
