const gmapsModel = require("../models/gmaps");
const PLACEAPIKEY = "AIzaSyCsLXMvE-V_AnumPa6sEHFpW5Q8JhNrDDQ";
const path = require("path");
const {
  spawn
} = require("child_process");
const https = require("https");
const RADARAPIKEY = "prj_test_sk_94bb96c8abf1312bfbd175799409a99724609b0f";

exports.GetAll = function (req, res) {
  console.log("here")
  https.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=45.4224162,-75.6867766&radius=1500&keyword=fast+food&key=' + PLACEAPIKEY, (resp) => {
    let data = '';

    // A chunk of data has been recieved.
    resp.on("data", chunk => {
      data += chunk;
    });
    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      let dataArray = JSON.parse(data).results;
      dataArray.forEach((value) => {
        createGeofence(value);
        //findCoupons(value);
      })
      res.send({ "status": "OKAY" });
    });
  }
  )
    .on("error", err => {
      console.log("Error: " + err.message);
    });
}

function createGeofence(value) {
  value.name = value.name.replace(/\s/g, '');
  console.log(value.name);
  let data = JSON.stringify({
    description: value.name,
    type: 'circle',
    coordinates: [value.geometry.location.lng.toString(), value.geometry.location.lat.toString()],
    radius: 500
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
  const req = https.request(options, res => {
    console.log("statusCode:" + res.statusCode);

    res.on("data", d => {
      console.log("Successful");
    });
  });
  req.on("error", err => {
    console.log(err);
  });
  req.write(data);
  req.end();
}

exports.getCoupons = function (req, res) {
  const subprocess = findCoupons(req.params.name);
  subprocess.stdout.on("data", data => {
    console.log(`data:${data}`);
    console.log("Data", data.toString());
    var storesNearby = data.toString();
    return storesNearby
  });
  subprocess.stderr.on("data", data => {
    console.log(`error:${data}`);
  });
  subprocess.stderr.on("close", () => {
    console.log("Closed");
  });
};

function findCoupons(value) {
  // console.log(value)
  return spawn("python", [
    "-u",
    path.join(__dirname, "/scrapper.py"),
    "--foo",
    "some value for foo"
  ]);
}
// print output of script
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
  console.log(req.body.username);
  let place = new gmapsModel({
    username: req.body.username
  });
  try {
    await place.save();
    res.send(place);
  } catch (err) {
    res.status(500).send(err);
  }
};