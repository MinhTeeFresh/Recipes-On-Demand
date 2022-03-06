// Require all our libraries including express
// which will be used for our backend
const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const fs = require("fs");
const bodyParser = require('body-parser');
app.use(express.static('src'))

// Read recipies
let recipies = require("./src/recipes/recipes.json")

// Use the body parser so we can read incoming json
app.use(bodyParser.json())


// load html home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
})


// return recipes depending on recieved ingredient
app.post('/getRecognizedAndFailed', function (req, res) {
  // Ingredients that the user sent
  let givenList = req.body.ingredientsString.toLowerCase().trim().split(',')
  let result = getRecongnizedAndFailed(givenList)

  // Ingredients that are in the recipies.json file
  res.setHeader('Content-Type', 'application/json');
  res.json({
    failed: result[0],
    recognized: result[1]
  })

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

function getRecongnizedAndFailed(givenList) {
  let list = getIngredients()
  let failedList = []
  let recognizedList = []

  // function get get ingredients from recipies.json
  function getIngredients() {
    let ingredientsList = new Set()

    for (let i = 0; i < recipies.length; i++) {
      for (let ingredient of recipies[i].ingredients) {
        ingredientsList.add(ingredient)
      } 
    }
    return Array.from(ingredientsList)
  }

  // find intersection of both arrays, add to failed
  // or reconginzed lists
  for (let i = 0; i < givenList.length; i++) {
    givenList[i] = givenList[i].trim()
	
	let isInList = false;
	for (let j = 0; j < list.length; j++) {
		if (givenList[i] == list[j] ||
			givenList[i] == list[j] + 's' ||
			givenList[i] == list[j] + 'es')
		{
			recognizedList.push(list[j]);
			isInList = true;
		}
	}
	
	if (!isInList) {
		failedList.push(givenList[i]);
	}
  }

  return [failedList, recognizedList]
}