let ingredients = [];

var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://mycookbook-io1.p.rapidapi.com/recipes/rapidapi",
	"method": "POST",
	"headers": {
		"x-rapidapi-host": "mycookbook-io1.p.rapidapi.com",
		"x-rapidapi-key": "3b8a7d5c9dmsh20b4f77d73d4977p127a4fjsndd1100cc381e",
		"content-type": "text/plain",
		"accept": "text/plain"
	},
	"data": "https://www.thewholesomedish.com/the-best-classic-chili/"
}

$.ajax(settings).done(function (response) {
    console.log(response);
    console.log(response[0].ingredients);
    console.log(response[0].instructions[0].steps);

    let name = response[0].name;
    let img = response[0].images[0];
    ingredients = response[0].ingredients;
    let instructions = response[0].instructions[0].steps;



    $(`#img`).append(`<h1>${name}</h1><br><img src="${img}" attr="Image of completed recipe"/>`)

    for(var i=0; i < ingredients.length; i++){

        $('#ingredientList').append(`<li>${ingredients[i]}</li>`);

    }

    for(var i=0; i < instructions.length; i++){

        $('#instructionsList').append(`<li>${instructions[i]}</li>`);

    }

    nutritionInfo();

});

function nutritionInfo(){

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": `https://edamam-edamam-nutrition-analysis.p.rapidapi.com/api/nutrition-data?ingr=${ingredients[0]}`,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "edamam-edamam-nutrition-analysis.p.rapidapi.com",
            "x-rapidapi-key": "3b8a7d5c9dmsh20b4f77d73d4977p127a4fjsndd1100cc381e"
        }
    }
    
    $.ajax(settings).done(function (response) {
        console.log(response);

        let calories = response.calories;
        let fat = response.totalNutrients.FAT.quantity; 

        $('#nutritionInfo').append(`<li>${ingredients[0]} has ${calories} calories with ${fat} grams of fat</li>`);
    });

}
