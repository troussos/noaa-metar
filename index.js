const rp = require('request-promise')
const parser = require('xml2json')

const BASE_URL = 'https://aviationweather.gov/adds/dataserver_current/httpparam'
const DEFAULT_HOURS_BEFORE = 4
let options = {
  url: BASE_URL,
  qs: {
    requestType: 'retrieve',
    format: 'xml'
  }
}

function fetchWeather (dataSource, stationString, hoursBeforeNow = DEFAULT_HOURS_BEFORE) {
  stationString = (Array.isArray(stationString)) ? stationString.join(',') : stationString
  options.qs = { ...options.qs, dataSource, stationString, hoursBeforeNow }
  return rp(options)
    .then(weatherResponse => parser.toJson(weatherResponse, { object: true, coerce: true }))
}

module.exports = {
  getMETAR (ICAO, hoursBeforeNow) {
    return fetchWeather('metars', ICAO, hoursBeforeNow)
      .then(paseredMETARS => paseredMETARS.response.data.METAR)
  },
  getTAF (ICAO, hoursBeforeNow) {
    return fetchWeather('tafs', ICAO, hoursBeforeNow)
      .then(parsedTAFS => parsedTAFS.response.data.TAF)
  },
  getAirportWeather (ICAO, hoursBeforeNow) {
    return Promise.all([module.exports.getTAF(ICAO, hoursBeforeNow), module.exports.getMETAR(ICAO, hoursBeforeNow)])
      .then(([TAFS, METARS]) => ({ TAFS, METARS }))
  }
}
