const request = require('request')


const forecast = (latitude, longitude, callback) => {
const url = 'http://api.weatherstack.com/current?access_key=1737c120daeec308973719a4e7989d1f&query=28.6914,' + latitude + ',' + longitude

    request({ url: url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined,"The weather is observed as " + body.current.weather_descriptions[0] + ". Currently the temperature is " + body.current.temperature + " degress.The humidity is "+ body.current.humidity +" % . The Wind direction is towards " + body.current.wind_dir + " . The temperature is going to be " + body.current.feelslike + " degress." )
        }
    })
}

module.exports = forecast