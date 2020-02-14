let name = "";
let imgURL = "";
let description = "";
let ingredients = [];
let instructions = [];
let instructionIdx = 0;
let favourites = [];
let recipeURL = "";
let cookTime = "";



//pulling recipe data and appending information to html 
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
        $(`.cookingTime`).append(cookTime);
    
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

function checkIfFavourite(){
    let pullFavourites = JSON.parse( localStorage.favourites );
    let check = pullFavourites.indexOf(recipeURL);

    if (check > 0){
         //changing favourites icon at 2 spots on page 
         var addClass = document.getElementById("changeHeart")
         addClass.classList.add("fa-heart");
         var removeClass = document.getElementById("changeHeart")
         removeClass.classList.remove("fa-heart-o");
         var addClass = document.getElementById("changeHeart2")
         addClass.classList.add("fa-heart");
         var removeClass = document.getElementById("changeHeart2")
         removeClass.classList.remove("fa-heart-o");
    }
}

//Adds URL of recipe to array in local storage so user can access as a favourite for later
function switchFavourite(){

    if($( ".fav" ).hasClass( "fa-heart" ) == false ){

        //add url to local storage
        favourites.push(`${recipeURL}`)
        localStorage.favourites = JSON.stringify( favourites );

        //changing favourites icon at 2 spots on page 
        var addClass = document.getElementById("changeHeart")
        addClass.classList.add("fa-heart");
        var removeClass = document.getElementById("changeHeart")
        removeClass.classList.remove("fa-heart-o");
        var addClass = document.getElementById("changeHeart2")
        addClass.classList.add("fa-heart");
        var removeClass = document.getElementById("changeHeart2")
        removeClass.classList.remove("fa-heart-o");

    } else if($( ".fav" ).hasClass( "fa-heart-o" ) == false ){

        var addClass = document.getElementById("changeHeart")
        addClass.classList.add("fa-heart-o");
        var removeClass = document.getElementById("changeHeart")
        removeClass.classList.remove("fa-heart");
        var addClass = document.getElementById("changeHeart2")
        addClass.classList.add("fa-heart-o");
        var removeClass = document.getElementById("changeHeart2")
        removeClass.classList.remove("fa-heart");
        var removeIdx = favourites.indexOf(recipeURL);
        var removedElements = favourites.splice(removeIdx, 1);
        console.log(`removed: ${removedElements}`)
        favourites.splice(removeIdx, 1); 

        localStorage.favourites = JSON.stringify( favourites );

    }
    
}

if (localStorage.favourites == undefined ){
    console.log(`Local storage is not yet defined: ${localStorage.favourites} once you add a favourite a variable will be created`);
} else{
    favourites = JSON.parse( localStorage.favourites );
    console.log(`Local Storage: ${localStorage.favourites}`)
}

$(`.fa-heart-o`).on("click", switchFavourite);

$(`#letsCookBtn`).on("click", checkIfFavourite);

// $(`.fav`).on("click", addFavourite);
$(`#letsCookBtn`).on("click", scrollToRecipe);

$(`#letsCookBtn`).on("click", dataPull);

$(`#nextBtn`).on("click", nextStep);
$(`#backBtn`).on("click", prevStep);

// $("#firstStep").addClass("hide");
$("#startBtn").on("click", addFirstStep);
$("#startBtn").on("click", scrollTosteps);

function addFirstStep(){
    $("#firstStep").removeClass("hide");
    $("#backBtn").addClass("hide");
    $('#stepIdx').text(`Step ${instructionIdx + 1 }`);
    $(".detailSteps").text(`${instructions[instructionIdx]}`);
}
function scrollTosteps(){
    $('html,body').animate({
        scrollTop: $(".detailSteps").offset().top- $(window).height()/2},
        'slow');
}
function nextStep(){
    // alert(instructions[1]);
    $("#backBtn").removeClass("hide");
    if ( instructionIdx >= instructions.length - 1 ){
        $("#nextBtn").addClass("hide");
        return;
    }
    instructionIdx++;

    console.log(`[nextStep] instructionIdx=${instructionIdx}`)
    console.log("this is the list of " + instructions[instructionIdx])
    $('#stepIdx').text(`Step ${instructionIdx + 1}`)
    $('.detailSteps').text(`${instructions[instructionIdx]}`)
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


//     // console.log(instructions[i]);
// }
// for (i=0; i<instructions.length; i++ ){
//     $('.detailSteps').append(`<p>${instructions[i]}</p>`)
// // 
// }


