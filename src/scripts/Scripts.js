$(document).ready(function() {

	// Hide The recipe box to start
    $('#recipeContainer').hide();

	// Actions of pressing submit button
	// If the entry is empty, program will activate popup
	// If entry is not empty, program will build the table
	$('#submitBtn').on('click', function() {
		if($("#userFill").val() == "") {
			$(".overlay, .popUp").addClass("active");
		}
		else {
			buildTable();
		}
	})

	// Pop up remove for empty entry
	$('#popBtn').on('click', function() {
		$(".overlay, .popUp").removeClass("active");
	})

	// Pop up remove for invalid only entry
	$('#popBtn2').on('click', function() {
		$(".overlay, .popUp2").removeClass("active");
	})

	// Slow drop-down instructions
	$(".arrow").click(function(){
		$("#prompt").slideToggle("slow");
	});

    // POST Builds table with recipe information
	function buildTable() {

        let ingredients = $("#userFill").val();
		
		$.ajax({
			url: "/getAll",
			method: 'POST',
			data: JSON.stringify({ ingredientsString : ingredients }),
			contentType: 'application/json',
			success: function (response) {
				$('#recipeContainer').hide();
				// slide build table display
				$('#recipeContainer').slideDown("slow");

				// Setting Field variables
				var error = $('#errorIngredients');
				var recipeIngredients = $('#recipeIngredients');
				var groceryList = $('#groceryList');
				var image = $('#image');
				var steps = $('#steps');
				var name = $('#recipeTitle');
				var time = $('#timeFill');
				var source = $('#source');

				// Clearing out all previous entries
				error.html('');
				recipeIngredients.html('');
				groceryList.html('');
				image.html('');
				steps.html('');
				name.html('');
				time.html('');
				source.html('');

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
				data = '';
				for(let i = 0; i < response.recipe.steps.length; i++) {
					data += '<li>' + response.recipe.steps[i] + '</li>';
				}
				steps.append(data);

				// Filling in all unmatched entries
				data = '';
				for(let i = 0; i < response.unmatched.length; i++) {
					data += '<li>' + response.unmatched[i] + '</li>';
				}
				groceryList.append(data);

				// Insert Estimated time of recipe
				time.append(response.recipe.time + " minutes");

				// Inserting the image
				image.append('<image id="foodView" src="' 
				+ response.recipe.image + '" style = "min-width:25rem"></image>')

				// Adding the source to the end of the page
				source.append(response.recipe.reference);
			},
			// if Entry doesn't match anything in database
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				$(".overlay, .popUp2").addClass("active");
			 }
		});
    }
})