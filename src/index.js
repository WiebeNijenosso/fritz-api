const Fritz = require("fritzapi").Fritz

const { Username, Password, AIN } = require("../config/config.json")
const f = new Fritz(Username,Password,"http://192.168.178.1/")


console.log('Server-side code running');

const express = require('express');

const app = express();

// serve files from the public directory
app.use(express.static('public'));

// start the express web server listening on 8080
app.listen(5000, () => {
  console.log('listening on 8080');
});

// serve the homepage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/clicked', (req, res) => {
    f.setSwitchToggle(AIN)
})