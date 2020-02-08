const gmapsModel = require('../models/gmaps');
const https = require('https');
const PLACEAPIKEY = 'AIzaSyCsLXMvE-V_AnumPa6sEHFpW5Q8JhNrDDQ';

exports.GetAll = function (req, res) {
    return getplaces();
}

function getplaces(){
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
                findCoupons(value);

            })
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}
// exports.Get = function (req, res) {
//     if(req.params !== null){
//         userModel.find({ 'username': { $eq: req.params.username } }).sort().then(eachOne => {
//             bcrypt.compare(req.params.password, eachOne[0].password, (err, result) => {
//                 if (result) {
//                     res.json(eachOne);
//                 } else {
//                     return res.status(400).send({
//                         message: 'This is an error!'
//                     });
//                 }
//             })
//         })
//     }
// }
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
