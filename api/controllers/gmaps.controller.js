const gmapsModel = require('../models/gmaps');
const https = require('https');
const PLACEAPIKEY = 'AIzaSyCsLXMvE-V_AnumPa6sEHFpW5Q8JhNrDDQ';
const RADARAPIKEY = 'prj_test_sk_94bb96c8abf1312bfbd175799409a99724609b0f';


exports.GetAll = function (req, res) {
    return getplaces();
}

function getplaces() {
    https.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=45.4220039,-75.6839884&radius=1500&keyword=food+coffee&key=' + PLACEAPIKEY, (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            let dataArray = JSON.parse(data).results;
            dataArray.forEach((value) => {
                // console.log(value.name);
                // console.log(value.geometry.location);
                createGeofence(value);
                //findCoupons(value);
            })
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}

function createGeofence(value) {
    value.name = value.name.replace(/\s/g, '');

    let data = JSON.stringify({
        description: value.name,
        type: 'circle',
        coordinates: [value.geometry.location.lng.toString(), value.geometry.location.lat.toString()],
        radius: 100
    })
    let options = {
        hostname: 'api.radar.io',
        path: '/v1/geofences/' + value.name + '/' + value.place_id,
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length,
            'Authorization': RADARAPIKEY

        }
    }
    const req = https.request(options, (res) => {
        console.log('statusCode:' + res.statusCode)

        res.on('data', (d) => {
            console.log('Successful')
        })
    })
    req.on('error', (err) => {
        console.log(err);
    })
    req.write(data);
    req.end();

    //Testing
    getAllFences(value);
}

function getAllFences(value) {
    const options = {
        hostname: 'api.radar.io',
        path: '/v1/geofences/' + value.name + '/' + value.place_id,
        method: 'GET',
        headers: {
            'Authorization': RADARAPIKEY
        }
    }
    https.request(options, resp => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            console.log(JSON.parse(data));
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}
exports.Add = async (req, res) => {
    console.log(req.body.username)
    let place = new gmapsModel(
        {
            username: req.body.username,
        })
    try {
        await place.save();
        res.send(place);
    } catch (err) {
        res.status(500).send(err);
    }
}
