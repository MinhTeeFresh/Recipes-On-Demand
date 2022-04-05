$(document).ready(function() {

    $('#recipeContainer').hide();

    // POST
    $('#submitBtn').on('click', function() {
        $('#recipeContainer').show();

        let ingredients = $("#userFill").val();
		
		$.ajax({
			url: "/getAll",
			method: 'POST',
			data: JSON.stringify({ ingredientsString : ingredients }),
			contentType: 'application/json',
			success: function (response) {
				console.log(response);
				
				alert(`Matches: ${response.matched}`);
				alert(`Fails: ${response.failed}`);

				var error = $('#errorIngredients');
				var recipeIngredients = $('#recipeIngredients');
				var groceryList = $('#groceryList');
				var image = $('#image');
				var steps = $('#steps');
				var name = $('#recipeTitle');

				// Clearing out all previous entries
                error.html('');
				recipeIngredients.html('');
				groceryList.html('');
				image.html('');
				steps.html('');
				name.html('');

				// Filling/Appending the matched ingredients
				let data = '';
				for(let i = 0; i < response.matched.length; i++) {
					data += '<li>' + response.matched[i] + '</li>';
				}
                recipeIngredients.append(data);

				// Filling in all error/failed entries
				data = '';
				if (response.failed[0] != null) {
					data += response.failed[0];
				 }
				for(let i = 1; i < response.failed.length; i++) {
					data += ', ' + response.failed[i];
				}
                error.append(data);

				// Entering name into box
				name.append(response.recipe.name);

				// Filling in recipe steps
				steps.append(response.recipe.steps);

				// Filling in all unmatched entries
				data = '';
				for(let i = 0; i < response.unmatched.length; i++) {
					data += '<li>' + response.unmatched[i] + '</li>';
				}
                groceryList.append(data);

				// Inserting the image
				
			}
		});


        //Get user ingredients


        //send user ingredients

        //response = recipe
    })
})