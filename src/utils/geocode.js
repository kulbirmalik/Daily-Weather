const request = require('request')

const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address + '.json?access_token=pk.eyJ1Ijoia3VsYmlyMTExIiwiYSI6ImNrYWhhZmd6eTBlZnYyc295N2cxNHprejkifQ.dqhZxOVN7DLwNmtEa1mFvQ&limit=1'
    request({url: url,json: true},(error,{body})=>{
        if(error){
            callback('Unable to connect to location services!',undefined)
        }
        else if(body.features.length===0)
        {
            callback('Unable to find location try for other location',undefined)
        }
        else
        {
            callback(undefined,{
                latitutde:body.features[0].center[0],
                longitude:body.features[0].center[1],
                location:body.features[0].place_name
            })
        }

    })
}

module.exports = geocode