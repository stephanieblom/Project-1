
$(".submitBtn").on('click', showHideFunc);

function showHideFunc(){
$('.recipeDetail').addClass('hide');
$('.nutrientDetail').addClass('hide');
$('.recipeSteps').addClass('hide');
}

$(".recipeBtn").on('click', recipeBtn)
function recipeBtn(){
    $('.recipeDetail').removeClass('hide');
};

$(".nutrientBtn").on('click', nutrientBtn);
function nutrientBtn(){
    $('.nutrientDetail').removeClass('hide');
};

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
    // console.log(response);
    // console.log(response[0].ingredients);
    // console.log(response[0].instructions[0].steps);

    // let name = response[0].name;
    // let img = response[0].images[0];
    // ingredients = response[0].ingredients;
    // let instructions = response[0].instructions[0].steps;
let name = "";
let imgURL = ""
let description = ""
let ingredients = [];
let instructions = [];
let favourites = [];
let recipeURL = ""

function dataPull(){
    recipeURL = $('#recipeURL').val();
    console.log(`Pulling data for URL: ${recipeURL}`);

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
        "data": `${recipeURL}`
    }
    
    $.ajax(settings).done(function (response) {
        console.log(response);
        console.log(response[0].ingredients);
        console.log(response[0].instructions[0].steps);
    
        name = response[0].name;
        imgURL = response[0].images[0];
        ingredients = response[0].ingredients;
        instructions = response[0].instructions[0].steps;
        description = response[0].description;

        $(`#recipeTitle`).append(name);
    
    
    
        $(`.imgContent`).append(`<img src="${imgURL}" alt="picture of complete recipe">`)
    
        for(var i=0; i < ingredients.length; i++){
    
            $('#ingredientList').append(`<li>${ingredients[i]}</li>`);
    
        }
    
        for(var i=0; i < instructions.length; i++){
    
            $('#instructionsList').append(`<li>${instructions[i]}</li>`);
    
        }
    
        //nutritionInfo();
    
    });

}

//ajax call pulling nutritional info on each ingredient 
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

//When user clicks the screen scrolls down to the card with recipe snippet 
function scrollToRecipe(){

    $('html,body').animate({
        scrollTop: $(".detailContent").offset().top- $(window).height()/3},
        'slow');

}

//Adds URL of recipe to array in local storage so user can access as a favourite for later
function addFavourite(){

    favourites.push(`${recipeURL}`)
    localStorage.favourites = JSON.stringify( favourties );
}

if (localStorage.favourites == undefined ){
    console.log(`Local storage is not yet defined: ${localStorage.favourites} once you add a favourite a variable will be created`);
} else{
    favourites = JSON.parse( localStorage.favourites );
    console.log(`Local Storage: ${localStorage.favourites}`)
}

$(`.fa-heart-o`).on("click", addFavourite);

$(`.submitBtn`).on("click", dataPull);



});


