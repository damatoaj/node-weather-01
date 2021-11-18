const request = require('request');

const forecast = (long, lat, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=75330eed652cbb2bd943d5aa46a3cd32&query=${lat},${long}&units=f`
    request({url, json:true}, (error, { body }) => {
        if (error) {
            callback("Unable to connect to the service", undefined)
        } else if (body.error) {
            callback(body.error, undefined)
        } else {
            callback(undefined, 
                // temp:body.current.temperature,
                // feelsLike:body.current.feelslike,
                // weatherDesc:body.current.weather_descriptions[0],
                ('It is ' + body.current.temperature + ' outside and feels like ' + body.current.feelslike + " and the weather is " + body.current.weather_descriptions[0].toLowerCase())
            )
            
        }
    })
};

module.exports = forecast;