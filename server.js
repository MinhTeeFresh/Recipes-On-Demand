// Require all our libraries including express
// which will be used for our backend
const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const fs = require("fs");
const cors = require('cors')
const bodyParser = require('body-parser');

// Read recipies
const favs = require("/src/recipes/recipes.json");

// Use the body parser so we can read incoming json
app.use(bodyParser.json())

// Use cors to deal with security and middleware
app.use(cors({origin: '*'}));

// load html home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
})

// return recipes depending on recieved ingredient
app.get('/get', function (req, res) {
  let ingredients = req.body

  let listOfRecipies = []
  let missSpelledList = []

  // TODO algo to cross reference given ingredients to
  // recipies

  // TODO add miss spelled ingredients to list

  // TODO return list of recipies and miss spelled list
  res.json({
    missSpelled: missSpelledList,
    recipies: listOfRecipies
  })

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})