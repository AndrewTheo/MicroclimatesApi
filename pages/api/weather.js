var fs = require("fs");

export default (req, res) => {
  let rawdata = fs.readFileSync("weather.json");
  let weatherData = JSON.parse(rawdata);
  res.json(weatherData);
}
