const request = require("request");

const weather = (long, lat, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=abca57572ddfbbd79228cd9ef0185690&query=${lat},${long}`;
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather api", undefined);
    } else if (response.body.error) {
      callback("Unable to find data for your location", undefined);
    } else {
      callback(
        undefined,
        `${response.body.current.weather_descriptions}. It is currently ${response.body.current.temperature} degress out. There is a ${response.body.current.humidity}% of humidity.`,
      );
    }
  });
};

module.exports = weather;
