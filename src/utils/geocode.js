const request = require('request')
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +encodeURIComponent(address)  +'.json?access_token=pk.eyJ1Ijoic2hhcmFuc2hldHR5IiwiYSI6ImNqeHUzYjk4czBqczQzb3FscG1lcnVramwifQ.WAwaKCNAyjLHUCg7H9dLoA&limit=1'
    request({ url , json: true}, (error, { body } = {}) => {
      if(error) {
        callback('unable to connect geocode',undefined)
      } else if (body.features.length === 0) {
          callback('unable to find location.. try another one.',undefined)
      } else {
        callback(undefined, {
          latitude: body.features[0].center[1],
          longitude: body.features[0].center[0],
          location: body.features[0].place_name
          //console.log(latitude, langitude)
        })
        
      }
    })
    }
    module.exports = geocode