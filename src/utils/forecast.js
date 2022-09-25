const request = require('request');

const forecast = (lat, lng, callback) => {

const ACCESS_KEY = 'b3ac6908496a32bf09cf6dd4f4d04b35'
const url = `http://api.weatherstack.com/current?access_key=${ACCESS_KEY}&query=${lat},${lng}`
 
    request({url, json: true}, (error, response, body) => {
    if(error){
        callback("Unable to connect to weather service", undefined);
    }else if (body.error){
        callback(body.error.info, undefined);
    }else{
        const temp = body.current.temperature;
        const apparentTemp = body.current.feelslike;
        callback( undefined, body.current.weather_descriptions[0]+ 
        `. It is currently ${temp} degree. It feels like ${apparentTemp}`)
    }
    });

}

 module.exports = forecast;