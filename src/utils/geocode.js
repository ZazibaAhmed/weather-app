const request = require('request');

const geocode = (address, callback) => {

    const geocoding_key = '3c25e33a6e39b3ad7ea667d04dca21e6'
    const url = `http://api.positionstack.com/v1/forward?access_key=${geocoding_key}&query=${address}`
  
    request({url: url, json: true}, (error, response, body) => {
      if(error){
        callback("Unable to connect to geocoding");
      }else if (body.error) {
        callback(body.error.message)
      }else if (body.data.length === 0){
        callback('Could not find location');
      } else{
        const latitude = body.data[0].latitude;
        const longitude = body.data[0].longitude;
        const label = body.data[0].label;
        
        callback(undefined, {latitude, longitude, label});
      }
    
    });
  }

  module.exports = geocode;