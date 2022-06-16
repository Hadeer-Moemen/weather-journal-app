// Setup empty JS object to act as endpoint for all routes
projectData = {};
// Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Dependencies */
const bodyParser = require('body-parser')
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
// Setup heroku host
# port (as described above) and host are both wrong
const host = 'localhost';
const port = 8000;

# use alternate localhost and the port Heroku assigns to $PORT
const host = '0.0.0.0';
const port = process.env.PORT || 8000;

app.listen(port, host, function() {
  console.log("Server started.......");
});
// GET route
app.get('/all', getprojectData);
function getprojectData(req,res)
 {
  res.send(projectData);
  console.log(projectData);
}
// POST route
app.post('/add', addprojectData)
 function addprojectData(req,res){
  const data=req.body;
  projectData["temp"] = data.temp;
    projectData["date"] = data.date;
    projectData["content"] = data.content;
    res.end();
    console.log(projectData)
}



