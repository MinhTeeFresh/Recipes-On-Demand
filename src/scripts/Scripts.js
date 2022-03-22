$(document).ready(function() {

    $('#recipeContainer').hide();

    // POST
    $('#submitBtn').on('click', function() {
        $('#recipeContainer').show();

        $.ajax ({
            url: "/getRecognizedAndFailed",
            method: 'POST',
            data: $(userFill).val(),
            contentType: 'application/json',
            success: function (response) {
                var error = $();
                var ingredient = $();
				var grocery = $();
                var image = $();
                var instruction = $();

                tbodyEL.html('');

                let tweet_data = '';
                $.each(data, function (key, value) {
                    tweet_data += '<tr>';
                    tweet_data += '<td>' + value.created_at + '</td>';
                    tweet_data += '<td>' + value.text + '</td>';
                    tweet_data += '<td>' + value.id + '</td>';
                    tweet_data += '</tr>';
                });
                $('#tweetTable').append(tweet_data);
			}
        })



        //Get user ingredients


        //send user ingredients

        //response = recipe
    })
})