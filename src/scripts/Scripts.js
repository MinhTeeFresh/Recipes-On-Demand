$(document).ready(function() {

    $('#recipeContainer').hide();

    // POST
    $('#submitBtn').on('click', function() {
        $('#recipeContainer').show();

        let ingredients = $("#userFill").val();
		
		$.ajax({
			url: "/getRecognizedAndFailed",
			method: 'POST',
			data: JSON.stringify({ ingredientsString : ingredients }),
			contentType: 'application/json',
			success: function (response) {
				console.log(response);
				
				alert(`Matches: ${response.matched}`);
				alert(`Fails: ${response.failed}`);
			}
		});


        //Get user ingredients


        //send user ingredients

        //response = recipe
    })
})