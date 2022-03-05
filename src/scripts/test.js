const inputBoxText = document.querySelector('#userFill')
const submitBtn = document.querySelector('#submitBtn')

// get the input from textbox
let ingriedientList = inputBoxText.value

// event listner which sends input text to backend for processing
submitBtn.addEventListener('click', _ => {
    // get the value from the textbox
    ingriedientList = inputBoxText.value

    // send it to backend
    fetch("http://localhost:3000/getRecognizedAndFailed", {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "ingredientsString": ingriedientList
        })
      })

    .then(response => { return response.json() })
    .then(data => {
        console.log(data)
    })
    .catch(err => console.log(err))
})

