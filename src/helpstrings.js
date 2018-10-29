export default {
	location: 'Location for the risk assessment. This might be the location of a village, town or community',
	forecastDate: 'Date for which the hindcast or forecast is to be carried out.\nFor operational activities, select today’s date, and the forecast will be carried out as close to today as possible, accounting for latency in driving data.\nFor research purposes, a date in the past can be used. This enables you to see what TAMSAT-ALERT would have predicted, had it been run at some point in the past.',
	probDist: 'Probability distribution for percentile calculations\nRisk assessment quantiles can be derived empirically, or assuming a Gaussian distribution.  For operational purposes, we recommend selecting the Gaussian option because the results are more stable.',
	periodOfInterest: 'Period of interest start and end\nThe is the period of time for which the metric of risk is being assessed. For agricultural applications, this would generally be the peak growing season. So, if your growing season is mid-May to early October, your period of interest start date might be  15/05 and your period of interest end date might be 03/10\nThese dates are not expected to coincide exactly with the forecast period start and end',
	metric: 'Metric of risk.\nThis is an environmental variable that reflects the risk faced.',
	forecastPeriod: 'Forecast period start and end\nThis is the period for which a probabilistic tercile meteorological forecast of temperature or precipitation has been issued.\nFor example, your regional climate outlook forum might issue a forecast for July – September 2017 precipitation, in which case,  your forecast period start is 01/07 and your forecast period end is 30/09.\nThese dates are not expected to coincide exactly with the period of interest start and end',
	forecastRegion: 'TODO',
	forecastVar: 'TODO',
	email: 'Your email address.\nThis will be used to send you an email once the job has been completed, and will be required when downloading it.',
	ref: 'This is an extra reference for the subset job, or a group of subset jobs.  You will need to provide this and your email address when you want to download the data.  You can use the same reference for different jobs.  It is there to prevent other people from downloading your data just by knowing your email address, but is not as secure as a password.'
}
