// req = request data, res = response data
var request = require("request");
var fs = require("fs");
var axios = require("axios");


function writeFile(data) {
  var json = JSON.stringify(data);
  fs.writeFileSync("weather.json", json);
}

export default (req, res) => {
  const neighborhoods = [
    ["Presidio", "37.7974", "-122.4649"],
    ["Marina", "37.8018", "-122.4392"],
    ["North Beach", "37.7997", "-122.4099"],
    ["Outer Richmond", "37.7774", "-122.4974"],
    ["Inner Richmond", "37.7804", "-122.4660"],
    ["Haight", "37.7757", "-122.4347"],
    ["Downtown", "37.7888", "-122.4117"],
    ["SOMA", "37.7823", "-122.3989"],
    ["Mission", "37.7591", "-122.4273"],
    ["Potrero", "37.7560", "-122.3985"],
    ["Outer Sunset", "37.7531", "-122.4954"],
    ["Inner Sunset", "37.7584", "-122.4659"],
    ["Forest Hill", "37.7457", "-122.4613"],
    ["Noe Valley", "37.7511", "-122.4345"],
    ["Lake Merced", "37.7217", "-122.4871"],
    ["Hunters Point", "37.7293", "-122.3810"],
    ["Ingleside", "37.7214", "-122.4592"],
    ["Excelsior", "37.7214", "-122.4176"]
  ];

  const numN = 18;

   let urls = [];
   for (let v = 0; v < numN; v++) {
     let lat = neighborhoods[v][1];
     let lon = neighborhoods[v][2];
     let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&lang=en&exclude=current,minutely,daily&appid=b8de6b317b0fe4c54fe3f5ba6e6f3db5`;
     urls.push(url);
   }

   let allrequests = [];
   for (let v = 0; v < numN; v++) {
     let req = axios.get(urls[v]);
     allrequests.push(req);
   }


  axios.all(allrequests).then(responseArr => {
    //this will be executed only when all requests are complete
    let obj = {};
    for (let v = 0; v < numN; v++) {
      obj[neighborhoods[v][0]] = {};

      let temps = [];
      let dates = [];
      for (var i = 0; i < responseArr[v].data["hourly"].length; i++) {
        //console.log(a["hourly"][i]);
        dates.push(responseArr[v].data["hourly"][i]["dt"]);
        temps.push(responseArr[v].data["hourly"][i]["temp"]);
      }

      var myObj2 = {};
      for (var x = 0; x < dates.length; x++) {
        myObj2[dates[x]] = temps[x];
      }

      // Dunno
      obj[neighborhoods[v][0]]["dt"] = myObj2;
      console.log(v);
      //console.log("Date created: ", responseArr[v].data);
    }

    console.log(JSON.stringify(obj));

    writeFile(obj);
  });

  res.status(200).json({ text: 'Updated Weather' })
}
