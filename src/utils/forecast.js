const request = require('request')
const forecast = (latitude, longitude, callback) => {
  const url = 'https://api.darksky.net/forecast/b6fc252a404242363a23061b9a782de8/'+latitude+','+longitude+''
  request({ url, json: true}, (error, { body }) => {
    if(error) {
        callback('unable to connect forecast service',undefined)
    } else if (body.error) {
        callback('unable to locate coordinate.. try another one.',undefined)
    } else {
        callback(undefined, body.daily.data[0].summary+'it is currently '+body.currently.temperature+' degrees out. there is a '+body.currently.precipProbability+ 'chance of rain and the wind speed is '+body.currently.windSpeed)
      }
  })
}
module.exports = forecast