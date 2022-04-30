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

// Rest API that returns a recipe given ingriedients
app.post('/getAll', (req, res) => {
  // Get ingriedient string from frontend and transform it into a trimmed array
  let givenList = req.body.ingredientsString.toLowerCase().trim().split(',')
  // Split the array into arrays the server can accommodate for and an array that it cannot
  let recongnizedAndFailed = getRecongnizedAndFailed(givenList)
  // Categorize those arrays
  let allMatched = recongnizedAndFailed[1]
  let failed = recongnizedAndFailed[0]
  // Send the recognized ingriedients to match recipies with those ingriedients
  let recipe = matchRecipe(allMatched)
  // Categorize that output
  let matched = getMatchedandUnmatched(recipe, allMatched)[0]
  let unmatched = getMatchedandUnmatched(recipe, allMatched)[1]

  // Send that recipe along with some other info to the server
  res.setHeader('Content-Type', 'application/json');
  res.json({
    recipe: recipe,
    failed: failed,
    matched: matched,
    unmatched: unmatched,
  })
})

// Make sure the server works
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// Function that compares given ingriedients to the one on server
function getRecongnizedAndFailed(givenList) {
  let list = getIngredients()
  let failedList = []
  let recognizedList = []

  // find intersection of both arrays, add to failed
  // or reconginzed lists
  // Go through list user provided
  for (let i = 0; i < givenList.length; i++) {
    givenList[i] = givenList[i].trim()

    let isInList = false;
    // Go through list server provided
    for (let j = 0; j < list.length; j++) {
      // Basic error correction
      if (givenList[i] == list[j] ||
        givenList[i] == list[j] + 's' ||
        givenList[i] == list[j] + 'es') {
        recognizedList.push(list[j]);
        isInList = true;
      }
    }
    // Check bool and if true add to list
    if (!isInList) {
      failedList.push(givenList[i]);
    }
  }
  // return the two lists
  return [failedList, recognizedList]
}

// function to get ingredients from recipies.json
function getIngredients() {
  // use set so we don't get duplicates
  let ingredientsList = new Set()

  // loop that adds all ingredients from all recipies that the server has
  for (let i = 0; i < recipies.length; i++) {
    for (let ingredient of recipies[i].ingredients) {
      ingredientsList.add(ingredient)
    }
  }
  // convert set to array and return
  return Array.from(ingredientsList)
}

// fimd recipe with most ingriedient matches
function matchRecipe(allMatched = []) {
  let recipe = null
  let max = 0

  // brute force O(n*p*m) algorithm
  // go through recipes in json
  for (let i = 0; i < recipies.length; i++) {
    let currMax = 0
    // go through each ingredients in that recipe
    for (let ingredient of recipies[i].ingredients) {
      // go through given allMatched ingriednts list
      for (let j = 0; j < allMatched.length; j++) {
        if (allMatched[j] == ingredient) {
          currMax += 1
          break;
        }
      }
      // update the curr recipe if we found one that has more matches
      if (currMax > max) {
        max = currMax
        recipe = recipies[i]
      }
    }
  }

  return recipe
}

// Get ingredients the server recognizes
function getMatchedandUnmatched(recipe = new Object(), allMatched = []) {
  let matched = []
  let unmatched = []
  // go through all ingredients in the given recipe
  for (let ingredient of recipe.ingredients) {
    let contains = false

    // go through all matched ingredients
    for (let i = 0; i < allMatched.length; i++) {
      if (allMatched[i] == ingredient) {
        contains = true
        break
      }
    }
    // if the ingredient matches the recipe add it to the matched arr
    if (contains) {
      matched.push(ingredient)
    }
    // otherwise add it to unmatched
    else {
      unmatched.push(ingredient)
    }   
  }

  return [matched, unmatched]
}