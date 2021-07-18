const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address,
  )}.json?access_token=pk.eyJ1IjoidnM3MjY0NzIiLCJhIjoiY2tyNzBtOXZ6MGI3NTJxcGdoNWRxa2dkbiJ9.OT40_H70F5ZduYC22oeCvw`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("unable to connect to geolocation api", undefined);
    } else if (response.body.features.length === 0) {
      callback("unable to find the location", undefined);
    } else {
      callback(undefined, {
        longitude: response.body.features[0].center[0],
        latitude: response.body.features[0].center[1],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
