//hiding recipe content until clicked on 
$('.recipeDetail').addClass('hide');
$('.recipeOverview').addClass('hide');
$('.nutrientDetail').addClass('hide');
$('.recipeIngredient').addClass('hide');


$(".ingredientBtn").on('click', showIngreFunc);
$(".ingredientBtn").on("click", scrollToIngredientsDetail);

let recipeLink = "";
if(localStorage.favourites == undefined ){
    console.log(`no favs`)
} else{
    favourites = JSON.parse( localStorage.favourites )
    for( var i = 0; i < favourites.length; i++){
        recipeURL = favourites[i];
        console.log(`Pulling data for URL: ${favourites[i]}`);

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
        "data": `${favourites[i]}`
    }
    
    $.ajax(settings).done(function (response) {
        console.log(response);

        name = response[0].name;
        imgURL = response[0].images[0];
        recipeLink = response[0].url;
        console.log(`Appending card`)

        $('#displayFavourites').append(`
            <div class="col-md" data-URL = "${recipeLink}">
                <div class="card" style="width: 18rem;">
                    <img src="${imgURL}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${name}</h5>
                        <button data-id = "${recipeLink}" class="openBtns Btns">Open</button>
                        <button data-id = "${recipeLink}" class="Del">Remove</button>
                    </div>
                </div>                       
            </div>`)
        });
    }
};

function scrollToIngredientsDetail(){
    $('html,body').animate({
        scrollTop: $(".recipeIngredient").offset().top- $(window).height()/3},
        'slow');
}
function showIngreFunc(){
    $('.recipeIngredient').removeClass('hide');
}


function showHideFunc(){
    $('.recipeOverview').removeClass('hide');
}


$(".recipeBtn").on('click', recipeBtn);
$(".recipeBtn").on("click", scrollToRecipeDetail);
function recipeBtn(){
    $('.recipeDetail').removeClass('hide');
};
function scrollToRecipeDetail(){
    $('html,body').animate({
        scrollTop: $(".recipeDetail").offset().top- $(window).height()/12},
        'slow');
}

$(".nutrientBtn").on('click', nutrientBtn);
$(".nutrientBtn").on("click", scrollToNutrientDetail);

function nutrientBtn(){
    $('.nutrientDetail').removeClass('hide');
};
function scrollToNutrientDetail(){
    $('html,body').animate({
        scrollTop: $(".nutrientDetail").offset().top- $(window).height()/12},
        'slow');
}
$("#crossBtnIngredients").on('click', closeIngreCard);
function closeIngreCard(){
    $('.recipeIngredient').addClass('hide');
}
$("#crossBtnNutrients").on('click', closeNutriCard);
function closeNutriCard(){
    $('.nutrientDetail').addClass('hide');
}

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
let imgURL = "";
let description = "";
let ingredients = [];
let instructions = [];
let instructionIdx = 0;
let favourites = [];
let recipeURL = "";
let cookTime = "";


function dataPull(){
    recipeURL = $(this).data("id");
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
        console.log(response[0][`total-time`]);
    
        name = response[0].name;
        imgURL = response[0].images[0];
        ingredients = response[0].ingredients;
        instructions = response[0].instructions[0].steps;
        description = response[0].description;
        cookTime = response[0][`total-time`];
        cookTime = cookTime.slice(2,10);

        $(`#recipeTitle`).html("")
        $(`#recipeTitle`).append(name);
    
        $(`#recipeDescription`).html("")
        $(`#recipeDescription`).append(description);

        $(`.cookingTime`).html("");
        $(`.cookingTime`).append(`<i class="fa fa-clock-o" aria-hidden="true"></i> Cooking time: ` + cookTime);
    
        $(`.imgContent`).html("");
        $(`.imgContent`).append(`<img src="${imgURL}" alt="Responsive picture of complete recipe" class="img-fluid">`)
    
        $('#ingredientList').html("");
        for(var i=0; i < ingredients.length; i++){
    
            $('#ingredientList').append(`<li>${ingredients[i]}</li>`);
    
        }
        $('#ingredientList2').html("");
        for(var i=0; i < ingredients.length; i++){
    
            $('#ingredientList2').append(`<li>${ingredients[i]}</li>`);
    
        }
    
        $('#instructionsList').html("");
        for(var i=0; i < instructions.length; i++){
    
            $('#instructionsList').append(`<li>${instructions[i]}</li>`);
    
        }
    
    
    });

}

//ajax call pulling nutritional info on each ingredient 
function nutritionInfo(){

    
    for(var i=0; i < ingredients.length; i++){
        console.log(`searing for ${ingredients[i]}`);
        let ingredient = ingredients[i];
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": `https://edamam-edamam-nutrition-analysis.p.rapidapi.com/api/nutrition-data?ingr=${ingredients[i]}`,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "edamam-edamam-nutrition-analysis.p.rapidapi.com",
            "x-rapidapi-key": "3b8a7d5c9dmsh20b4f77d73d4977p127a4fjsndd1100cc381e"
        }
    }
    
    $.ajax(settings).done(function (response) {
        console.log(response);
        
        let calories = "unavailable";
        let fats = "unavailable";
        let sugars = "unavailable";
        let carbs = "unavailable";

        if(!response.calories){
            console.log(`Data not available for this ingredient`)
        } else {
            let cal = response.calories;
            calories = cal.toFixed(1);
        }

        //display fat 
        if( !response.totalNutrients.FAT || !response.totalNutrients.FAT.quantity ){
            console.log(`data is unavilable`)
        }else {
            let fat = response.totalNutrients.FAT.quantity;
            fats = fat.toFixed(1);
        }

        if( !response.totalNutrients.SUGAR.quantity){
            console.log(`data is unavilable`)
        }else {
            sugar = response.totalNutrients.SUGAR.quantity;
            sugars = sugar.toFixed(1);
        }

        if( !response.totalNutrients.CHOCDF.quantity){
            console.log(`data is unavilable`)
        }else {
            let carb = response.totalNutrients.SUGAR.quantity;
            carbs = carb.toFixed(1)
        }

        $('#nutrientTableBody').append(`<tr>
        <td class="ingredient">${ingredient}</td>
        <td class="caloriesValue">${calories}</td>
        <td class="fatValue">${fats}</td>
        <td class="carbValue">${carbs}</td>
        <td class="sugarValue">${sugars}</td>
        </tr>`)

    
        //displ
        console.log(`${ingredient} has ${calories} calories with ${fats} grams of fat, ${sugars} grams of sugars, ${carbs} grams of carbs`)

        
    });

}

}

$(".nutrientBtn").on("click", nutritionInfo);

//When user clicks the screen scrolls down to the card with recipe snippet 
function scrollToRecipe(){

    $('html,body').animate({
        scrollTop: $(".detailContent").offset().top- $(window).height()/3},
        'slow');

}

if (localStorage.favourites == undefined ){
    console.log(`Local storage is not yet defined: ${localStorage.favourites} once you add a favourite a variable will be created`);
    $("#message").show();
} else{
    $("#message").hide();
    favourites = JSON.parse( localStorage.favourites );
    console.log(`Local Storage: ${localStorage.favourites}`)
}

// $(`.fa-heart-o`).on("click", switchFavourite);
$("#firstStep").addClass("hide");

$(`.openBtns`).on("click", showHideFunc);
$(`.openBtns`).on("click", scrollToRecipe);

$(`.openBtns`).on("click", dataPull);

$(`#nextBtn`).on("click", nextStep);
$(`#backBtn`).on("click", prevStep);
$(`#backBtn`).on("click", activateNextBtn);

function scrollTosteps(){
    $('html,body').animate({
        scrollTop: $(".detailSteps").offset().top- $(window).height()/2},
        'slow');
}

$("#startBtn").on("click", addFirstStep)

function addFirstStep(){
    $("#firstStep").removeClass("hide");
    $("#backBtn").addClass("hide");
    $('#stepIdx').text(`Step ${instructionIdx + 1 }`);
    $(".detailSteps").text(`${instructions[instructionIdx]}`);
    scrollTosteps();
}
function scrollTosteps(){
    $('html,body').animate({
        scrollTop: $(".detailSteps").offset().top- $(window).height()/2},
        'slow');
}
function nextStep(){
    $("#backBtn").removeClass("hide");
    
    instructionIdx++;
    
    console.log(`[nextStep] instructionIdx=${instructionIdx}`)
    console.log("this is the list of " + instructions[instructionIdx])
    $('#stepIdx').text(`Step ${instructionIdx + 1}`)
    $('.detailSteps').text(`${instructions[instructionIdx]}`)
    if ( instructionIdx >= instructions.length){
        $("#nextBtn").addClass("hide");
        $('#stepIdx').text(`Congratulations!`)
        $('.detailSteps').text(`You're Done!`)
        $('.cookingPng').html(`
        <img src="assets/confetti - left.png" class="cookingIcon mx-auto" alt="Responsive image">
        <img src="assets/confetti - right.png" class="cookingIcon mx-auto" alt="Responsive image">`)
        return
    }
}
function prevStep(){
    // alert(instructssions[1]);
    if ( instructionIdx < 1 ){
        return;
    }
    instructionIdx--;

    console.log(`[nextStep] instructionIdx=${instructionIdx}`)
    $('#stepIdx').text(`Step ${instructionIdx + 1}`)
    $('.detailSteps').text(`${instructions[instructionIdx]}`)
}
function activateNextBtn(){
    if ( instructionIdx < instructions.length & $("#nextBtn").hasClass("hide")){
        $("#nextBtn").removeClass("hide");
        $('.cookingPng').html(`
        <img src="assets/cooking.png" class="cookingIcon mx-auto" alt="Responsive image">`)
    }
}

function removeFavourite(){

    recipeURL = $(this).data("id")

    favourites = JSON.parse( localStorage.favourites );
    var removeIdx = favourites.indexOf(recipeURL);
    var removedElements = favourites.splice(removeIdx, 1);
    console.log(`removed: ${removedElements}`)
    favourites.splice(removeIdx, 1); 

    localStorage.favourites = JSON.stringify( favourites );
    //$(``).addClass("hide");

    $(this).parent().parent().parent().addClass('hide');

}
    
$(`.Del`).on("click", removeFavourite);


});


