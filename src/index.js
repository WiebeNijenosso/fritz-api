
console.clear()
console.log('Server-side code running');
const express = require('express');

const wait = require('wait');

const config = require('../config/config.json');

const Fritz = require("fritzapi").Fritz;

const f = new Fritz(config.Username, config.Password, "http://192.168.178.1/");

const app = express();

// serve files from the public directory
app.use(express.static('public'));

// start the express web server listening on 8080
var server = app.listen(8080, () => {
  console.log('listening on 8080');
});

async function MyFunction() {
  server.close();
  await wait(2000)
  app.listen(8080, () => {
      console.clear();
      console.log("Server Restarted")
  });
}
// Restarts the server

// serve the homepage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});
  var __clicker1 = 0;
app.post('/clicked', (req, res) => {
    f.setSwitchToggle(config.AIN1);
    __clicker1++;
    console.log(__clicker1);

    if (__clicker1 === 4) {
      __clicker1 = 0;
      MyFunction();
    }
  })

  
app.post('/clicked1', (req, res) => {
  f.setSwitchToggle(config.AIN2);
  
  __clicker1++;
  console.log(__clicker1)
  if (__clicker1 === 4) {
    __clicker1 = 0;
  
    MyFunction();
  }
})


